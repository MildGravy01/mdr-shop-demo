
import forge from 'node-forge';
import {ANYPAY_CONF, PAYOK_CONF, LAVA_CONF, devMode} from '../../database/constants.js';
import axios from 'axios';
import {createSignature,validateEmail, getPaymentComment} from '../helpers.js';
import {PromoService} from '../PromoService.js';
import { OrderModel, PlayerModel, ProductsModel, ServerModel } from 'database/models/index.js';
import { ProductExecutorService } from '../ProductExecutorService';
import { IOrderProps } from './types';

export class OrderService {
    PlayerModel: PlayerModel;
    ProductsModel: ProductsModel;
    ServerModel: ServerModel;
    OrderModel: OrderModel;
    PromoService: PromoService;
    ProductExecutorService: ProductExecutorService;


  constructor(PlayerModel: PlayerModel, 
    ProductsModel: ProductsModel,
    ServerModel: ServerModel, 
    OrderModel: OrderModel,
    PromoService: PromoService,
    ProductExecutorService: ProductExecutorService) {
    this.PlayerModel = PlayerModel;
    this.ProductsModel = ProductsModel;
    this.ServerModel = ServerModel;
    this.PromoService = PromoService;
    this.OrderModel = OrderModel;
    this.ProductExecutorService = ProductExecutorService;
  }
  processOrder = async (orderProps: IOrderProps) => {
    if (!validateEmail(orderProps.email)) {
      throw new Error('email: not valid');
    }
    const player = await this.PlayerModel.findPlayer(orderProps.name);
    const product = await this.ProductsModel.getProductByID(orderProps.productId);
    const server = await this.ServerModel.getServerByProduct(product.product_id);
    if (!server) {
      throw new Error('error: failed to identify server');
    }

    let price = Number((product.price * orderProps.productAmount).toFixed(1));

    if (orderProps?.durationChoice && product?.temporary && orderProps.durationChoice != 'month') {
      const tempMultipliers = await this.ProductsModel.getTempMultipliers();
      const multiplier = tempMultipliers?.[`${orderProps.durationChoice}Multiplier`];
      if (multiplier) {
        price *= multiplier;
      }
    }

    if (orderProps.promo) {
      const promo = await this.PromoService.validatePromo(product.product_id, orderProps.promo);
      if(promo){
        price = this.PromoService.applyPromo(promo, price);
      }
    }
    if (product.subcat_id === 'privilliges') {
      const inheritance = await this.PlayerModel.getInheritance({
          nickname: player,
          CategoryId: product.Category_id,
          subcatId: product.subcat_id,
    });
      if (inheritance && !devMode) {
        console.log(inheritance, price);
        if (price - inheritance <= 1) {
          throw new Error('player: has inheritance');
        } else {
          price -= inheritance;
        }
      }
    }
    const order = await this.OrderModel.registerOrder({
      productId: orderProps.productId,
      price: price,
      player: player,
      email: orderProps.email,
      promoCode: orderProps.promo,
      quantity: orderProps.productAmount,
      serverId: server.Server_id,
      userTemporarySelection: orderProps.durationChoice
    }
    );
    if (order) {
      if (price == 0) {
        this.ProductExecutorService.givePurchase(order);
        return {location: `https://md-resorts.ru/?purchase=${order.id}`};
      }
      let link = '';
      let params: any;
      switch (orderProps.paymentType) {
        case 'lava':
          params = {
            'sum': price,
            'orderId': order.id,
            'shopId': LAVA_CONF.PROJECT_ID,
            'comment': getPaymentComment(product, order),
            'successUrl': `https://md-resorts.ru?purchase=${order.id}`,
          };
          if(LAVA_CONF.SECRET_KEY){
            const sign = createSignature(LAVA_CONF.SECRET_KEY, params);
            const lavaRes = await axios({
              method: 'post',
              url: 'https://api.lava.ru/business/invoice/create',
              data: JSON.stringify(params),
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Signature': sign,
              },
            });
            if (lavaRes.status !== 200) {
              throw new Error('failed to create bill');
            }
            return {location: lavaRes?.data.data.url};
          }
        case 'anypay':
          params = {
            merchant_id: ANYPAY_CONF.PROJECT_ID,
            pay_id: order.id,
            desc: getPaymentComment(product, order),
            amount: price,
            email: order.email,
            success_url: `https://md-resorts.ru?purchase=${order.id}`,
            sign: function() {
              const sign = forge.md.sha256
                  .create()
                  .update(
                      `${ANYPAY_CONF.PROJECT_ID}:${order.id}:${price}:RUB:${this.desc}:${this.success_url}:${this.success_url}:${ANYPAY_CONF.SECRET_KEY}`,
                      'utf8',
                  )
                  .digest()
                  .toHex();
              console.log(sign);
              return sign;
            },
          };
          link = `https://anypay.io/merchant?merchant_id=${
            params.merchant_id
          }&pay_id=${params.pay_id}&desc=${params.desc}&currency=RUB&amount=${
            params.amount
          }&email=${params.email}&success_url=${params.success_url}&fail_url=${
            params.success_url
          }&sign=${params.sign()}`;
          return {location: link};
        case 'mobile':
          params = {
            amount: price,
            desc: getPaymentComment(product, order),
            shop: PAYOK_CONF.PROJECT_ID,
            currency: 'RUB',
            email: order.email,
            payment: order.id,
            sign: function() {
              const string = `${this.amount}|${this.payment}|${this.shop}|${this.currency}|${this.desc}|${PAYOK_CONF.SECRET_KEY}`;
              const sign = forge.md.md5
                  .create()
                  .update(string, 'utf8')
                  .digest()
                  .toHex();
              return sign;
            },
          };
          link = `https://payok.io/pay?amount=${params.amount}&payment=${
            params.payment
          }&shop=${params.shop}&desc=${params.desc}&email=${
            params.email
          }&currency=${params.currency}&sign=${params.sign()}`;
          return {location: link};
      }
    }
  };

  checkPurchase = async (orderId: number) => {
    const order = await this.OrderModel.getOrder(orderId);
    if (order) {
      return order;
    }
  };
}
