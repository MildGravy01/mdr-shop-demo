/* eslint-disable max-len */
import express from 'express';
import forge from 'node-forge';
import {
  findPlayer,
  getProductByID,
  registerOrder,
  getOrder,
  setOrderStatus,
  getInheritance,
  addPromoUse,
} from '../../dataBase/queries';

export const payment = express.Router();
import anyDigitId from 'any-digit-id';
import {sendRconCommand} from '../../rcon/index.js';
import {QIWI_API} from '../../dataBase/connection.js';
import {
  validateEmail,
  applyPromo,
  validatePromo,
} from '../../helpers/index.js';
import {QIWI_CONF, ANYPAY_CONF, PAYOK_CONF} from '../../dataBase/config.js';

const givePurchase = async (billId, response) => {
  // eslint-disable-next-line camelcase
  const {id, product_id} = await getOrder(billId);
  const product = await getProductByID(product_id);
  if (!product) {
    response?.status(404).send('ERROR');
    console.error('CANT GET PRODUCT', product_id);
    return;
  }
  sendRconCommand(billId)
      .then(() => {
        setOrderStatus(id, 'success').then(
            () => {
              if (order?.promo_code) {
                addPromoUse(order.promo_code);
              }
              response?.status(200);
              response?.send('success');
            },
            () => {
              response?.status(404);
              console.log('WRONG ORDER');
              response?.send('WRONG ORDER ERROR');
            },
        );
      })
      .catch((err) => {
        console.error(err);
        response?.status(500).send('ERROR');
        console.error('CANT GET ERROR');
      });
};


payment.post('/status/qiwi', (request, response) => {
  if (request.body) {
    const hash = request.header('X-Api-Signature-SHA256');
    const {bill} = request.body;
    const {billId, amount, status} = bill;
    if (!billId || !amount || !status) {
      response.status(404);
      response.send('ERROR');
      console.error('NO BILL ID', billId);
      return;
    }
    const valid = QIWI_API.checkNotificationSignature(
        hash,
        request.body,
        QIWI_CONF.SECRET_KEY,
    );
    if (!valid) {
      response.status(404);
      response.send('ERROR');
      console.error('NOT VALID', billId);
      return;
    }
    givePurchase(billId, response);
  }
});

payment.post('/status/payok', (request, response) => {
  if (request.body) {
    const {
      payment_id: billId,
      shop,
      amount,
      desc,
      currency,
      sign: initialHash,
    } = request.body;
    const string = `${PAYOK_CONF.SECRET_KEY}|${desc}|${currency}|${shop}|${billId}|${amount}`;
    const controlHash = forge.md.md5
        .create()
        .update(string, 'utf8')
        .digest()
        .toHex();
    if (controlHash !== initialHash) {
      console.log('WRONG SIGN');
      response.status(404).send('WRONG SIGN');
      return;
    }
    givePurchase(billId, response);
  }
});

payment.post('/status/anypay', (request, response) => {
  if (request.body) {
    const {
      pay_id: billId,
      amount,
      currency,
      sign: initialHash,
      status,
    } = request.body;
    const string = `${currency}:${amount}:${billId}:${ANYPAY_CONF.PROJECT_ID}:${status}:${ANYPAY_CONF.SECRET_KEY}`;
    const controlHash = forge.md.sha256
        .create()
        .update(string, 'utf8')
        .digest()
        .toHex();
    if (controlHash !== initialHash) {
      console.log('WRONG SIGN');
      response.status(404).send('WRONG SIGN');
      return;
    }
    givePurchase(billId, response);
  }
});

payment.post('/payment', async (req, res) => {
  if (!req.body) {
    res.status(400).send('invalid request');
    return;
  }
  const order = req.body;
  if (!validateEmail(order.email)) {
    res.status(400).send('email: not valid');
    return;
  }
  order.order_id = anyDigitId({digit: 15, type: 'numbers'});
  try {
    const player = await findPlayer(order.player);
    const product = await getProductByID(order.product_id);
    let price = Number((product.price * order.quantity).toFixed(1));
    if (order.promo_code) {
      const promo = await validatePromo(product.product_id, order.promo_code);
      price = applyPromo(promo, price);
    }
    const inheritance = await getInheritance(player, product.Category_id, product.subcat_id);
    if (product.subcat_id === 'privilliges' && inheritance) {
      if (inheritance.Amount >= order.price) {
        res.status(400).send('player: has inheritance');
        return;
      } else {
        price -= inheritance.Amount;
      }
    }
    registerOrder(
        order.order_id,
        order.product_id,
        price,
        player,
        order.email,
        order?.promo_code,
        order.quantity,
    ).then(() => {
      if (order.promo_code) {
        if (price == 0) {
          givePurchase(order.order_id);
          res.status(200).location(`https://md-resorts.ru/?purchase=${order.order_id}`).send();
          return;
        }
      }
      const lifetime = QIWI_API.getLifetimeByDay(1);
      let link = '';
      let params = {};
      switch (order.payment_type) {
        case 'qiwi':
          params = {
            'publicKey': QIWI_CONF.PUBLIC_KEY,
            'amount': price,
            'comment': `Покупка ${product.name} ${
              order.quantity > 1 ? `(x${order.quantity})` : ''
            } для игрока ${player}`,
            'billId': order.order_id,
            'successUrl': `https://md-resorts.ru?purchase=${order.order_id}`,
            'expirationDateTime': lifetime,
            'customFields[themeCode]': QIWI_CONF.THEME_CODE,
            'customFields[paySourcesFilter]': 'qw',
          };
          link = QIWI_API.createPaymentForm(params);
          res.status(200).header('Referer-Policy', 'no-referrer-when-downgrade')
              .location(link).send();
          break;
        case 'card':
          params = {
            'customFields[themeCode]': QIWI_CONF.THEME_CODE,
            'customFields[paySourcesFilter]': 'card',
            'publicKey': QIWI_CONF.PUBLIC_KEY,
            'amount': price,
            'comment': `Покупка ${product?.name} ${
              order.quantity > 1 ? `(x${order.quantity})` : ''
            } для игрока ${player}`,
            'billId': order.order_id,
            'successUrl': `https://md-resorts.ru?purchase=${order.order_id}`,
            'expirationDateTime': lifetime,
          };
          link = QIWI_API.createPaymentForm(params);
          res.status(200)
              .header('Referer-Policy', 'no-referrer-when-downgrade')
              .location(link)
              .send();
          break;
        case 'anypay':
          params = {
            merchant_id: ANYPAY_CONF.PROJECT_ID,
            pay_id: order.order_id,
            desc: `Покупка ${product?.name} ${
              order.quantity > 1 ? `(x${order.quantity})` : ''
            } для игрока ${player}`,
            amount: price,
            email: order.email,
            success_url: `https://md-resorts.ru?purchase=${order.order_id}`,
            sign: function() {
              const sign = forge.md.sha256
                  .create()
                  .update(
                      `${ANYPAY_CONF.PROJECT_ID}:${order.order_id}:${price}:RUB:${this.desc}:${this.success_url}:${this.success_url}:${ANYPAY_CONF.SECRET_KEY}`,
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
          res.status(200).location(link).send();
          break;
        case 'mobile':
          params = {
            amount: price,
            desc: `Покупка ${product.name} ${
              order.quantity > 1 ? `(x${order.quantity})` : ''
            } для игрока ${player}`,
            shop: PAYOK_CONF.PROJECT_ID,
            currency: 'RUB',
            email: order.email,
            payment: order.order_id,
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
          res.status(200).location(link).send();
          break;
      }
    });
  } catch (err) {
    res.status(err.status).send(err.message);
    return;
  }
});
