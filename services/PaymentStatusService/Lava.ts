
import {OrderModel} from '../../database/models/index.js';
import {LAVA_CONF} from '../../database/constants.js';
import {ProductExecutorService} from '../ProductExecutorService.js';
import {createSignature, sortObject} from '../helpers.js';

export class LavaStatusService {
  OrderModel: OrderModel;
  ProductExecutorService: ProductExecutorService;
  constructor(OrderModel: OrderModel, 
    ProductExecutor: ProductExecutorService) {
    this.OrderModel = OrderModel;
    this.ProductExecutorService = ProductExecutor;
  }
  
  processLavaStatus = async (hash: any, bill: any) => {
    const {order_id, amount, status} = bill; 
      if (!order_id || !amount || !status) {
        throw new Error('error');
      }
      const order = await this.OrderModel.getOrder(order_id);
      if (!order) {
        throw new Error('error');
      }
      if (order.status === 'success') {
        return 200;
      }
      
      if(LAVA_CONF.ADD_KEY){
        const sign = createSignature(LAVA_CONF.ADD_KEY, sortObject(bill));
        if (hash !== sign) {
          throw new Error('wrong sign');
        }
        this.ProductExecutorService.givePurchase(order);
      }
  };
}

