import {getPaymentComment} from './helpers';
import {RecieptService} from './RecieptService';
import {SMTPService} from './SMTPService';
import {NALOG_CONF, devMode} from '../database/constants.js';
import { OrderModel, ProductsModel, PromoModel } from 'database/models/index.js';
import { IOrder } from 'database/models/Order/types.js';
import { RconService } from './RCONService';

export class ProductExecutorService {
  ProductsModel: ProductsModel;
  PromoModel: PromoModel;
  OrderModel: OrderModel;
  RecieptService: RecieptService | undefined;
  SMTPService: SMTPService;
  RconService: RconService;

  constructor(
    ProductsModel: ProductsModel,
    PromoModel: PromoModel,
    OrderModel: OrderModel,
    SMTPService: SMTPService,
    RconService: RconService) {
    this.ProductsModel = ProductsModel;
    this.PromoModel = PromoModel;
    this.OrderModel = OrderModel;
    this.SMTPService = SMTPService;
    this.RconService = RconService;
    this.initRecieptService();
  }


  initRecieptService = () => {
      if (!this.RecieptService && NALOG_CONF.login && NALOG_CONF.password) {
        this.RecieptService = new RecieptService({
          login: NALOG_CONF.login,
          password: NALOG_CONF.password
        });
      }
  };


  givePurchase = async (order: IOrder) => {
  // eslint-disable-next-line camelcase
    const {id, product_id, price} = order;
    const product = await this.ProductsModel.getProductByID(product_id);
    if (!product) {
      throw Error('error: no product');
    }
    if (price != 0 && !devMode) {
      try {
        this.RecieptService?.addIncome(undefined, getPaymentComment(product, order), undefined, price).then((receipt: any) => {
          if (receipt) {
            this.SMTPService.sendReceiptMail(product, receipt.printUrl, order);
          }
        });
      } catch (err) {
        if (this.RecieptService && !this.RecieptService.refreshToken && NALOG_CONF.login && NALOG_CONF.password) {
          this.RecieptService.auth(NALOG_CONF.login, NALOG_CONF.password);
        }
        console.error(err);
      }
    }

    this.RconService.sendRconCommand(order, product).then(() => {
      this.OrderModel.setOrderStatus(id, 'success').then(
          () => {
            if (order?.promo_code) {
              this.PromoModel.addPromoUse(order.promo_code);
            }
            return 'success';
          },
          () => {
            throw new Error('WRONG ORDER ERROR');
          },
      );
    }).catch((err: any) => {
      throw err;
    });
  };
}

