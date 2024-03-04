import { IOrder, TUserTempMultipliers } from 'database/models/Order/types';
import { IProduct } from 'database/models/Products/types';
import crypto from 'node:crypto';

export const createSignature = (key: string, data: any) => {
  return crypto.createHmac('sha256', key)
      .update(JSON.stringify(data))
      .digest('hex');
};

export const sortObject = (o: any) => Object.keys(o).sort().reduce((r: any, k: any) => (r[k] = o[k], r), {});


export const validateEmail = (email: string) => {
  return String(email)
      .toLowerCase()
      .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
};

export const getPaymentComment = (product: IProduct, order: IOrder) => {
  return `Применение ${product.name}${order?.quantity > 1 ? ` (x${order.quantity})` : ''} на сервере play.md-resorts.ru для игрока ${order?.player}`;
};

export const getPeriod = (period: TUserTempMultipliers) => {
  switch (period) {
    case 'month':
      return '30d';
    case 'threeMonth':
      return '90d';
    default:
      return '';
  };
};


