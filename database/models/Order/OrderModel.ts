import { BaseModel } from '../BaseModel.js';
import { IOrder, IRegisterOrderProps } from './types.js';
import anyDigitId from 'any-digit-id';

export class OrderModel extends BaseModel {
  getOrder = async (orderId: number) => {
    const result = await this.requestDb(`SELECT * FROM orders WHERE id=?`, [orderId]) as IOrder[];
    if (!result) {
      throw new Error('error: failed to get order');
    }
    return result[0];
  };

  setOrderStatus = async (orderId: string, status: string) => {
    const result = await this.requestDb(`UPDATE orders SET status=? WHERE id=?`, [status, orderId]);
    if (!result) {
      throw new Error('error: failed to update');
    }
    return result;
  };

  registerOrder = async (
    {
    productId,
    price,
    player,
    email,
    promoCode = null,
    quantity,
    serverId,
    userTemporarySelection}: IRegisterOrderProps) => {
    const orderId = anyDigitId({digit: 15, type: 'numbers'});
    const request = await this.requestDb(`INSERT INTO orders (id,product_id,price,player,email,promo_code,quantity,ServerID,userTemporarySelection) VALUES (?,?,?,?,?,?,?,?,?)`, [orderId, productId, price, player, email, promoCode ? promoCode : null, quantity, serverId, userTemporarySelection ? userTemporarySelection : null]);
    if (!request) {
      throw new Error('error: failed to register order');
    }
    
    const result = await this.requestDb(`SELECT * FROM orders WHERE id=?`, [orderId]) as IOrder[];
    if (!result) {
      throw new Error('error: failed to get new order');
    }
    return result[0];
  };
}
