import {ProductExecutorService} from '../ProductExecutorService.js';
import {ANYPAY_CONF} from '../../database/constants.js';
import forge from 'node-forge';
import { OrderModel } from 'database/models/index.js';


export class AnypayStatusService {
  OrderModel: OrderModel;
  ProductExecutorService: ProductExecutorService;
  constructor(OrderModel: OrderModel, 
    ProductExecutor: ProductExecutorService) {
    this.OrderModel = OrderModel;
    this.ProductExecutorService = ProductExecutor;
  }

  processAnypayStatus = async (billId: any, amount: number, currency: string, initialHash: string, status: any) => {
      const order = await this.OrderModel.getOrder(billId);
      if (!order) {
        throw new Error('order not found');
      }
      if (order.status === 'success') {
        return 200;
      }
      const string = `${currency}:${amount}:${billId}:${ANYPAY_CONF.PROJECT_ID}:${status}:${ANYPAY_CONF.SECRET_KEY}`;
      const controlHash = forge.md.sha256
          .create()
          .update(string, 'utf8')
          .digest()
          .toHex();
      if (controlHash !== initialHash) {
        throw new Error('wrong sign');
      }
      this.ProductExecutorService.givePurchase(order);
  };
}

