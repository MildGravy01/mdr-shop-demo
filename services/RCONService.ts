import Rcon from 'rcon';
import {getPeriod} from './helpers';
import {devMode} from '../database/constants';
import { PlayerModel, ProductsModel, ServerModel } from 'database/models';
import { IOrder } from 'database/models/Order/types';
import { IProduct } from 'database/models/Products/types';

export class RconService {
  ServerModel: ServerModel;
  ProductsModel: ProductsModel;
  PlayerModel: PlayerModel;

  constructor(serverModel: ServerModel, productsModel: ProductsModel, PlayerModel: PlayerModel) {
    this.ServerModel = serverModel;
    this.ProductsModel = productsModel;
    this.PlayerModel = PlayerModel;
  }
  sendRconCommand = (order: IOrder, product: IProduct) => new Promise(async (resolve) => {
    if (!order) {
      throw new Error('no order found');
    }
    try {
      const server = await this.ServerModel.getServer(order.ServerID);
      if (!server) {
        throw new Error('error: failed to get server on rcon');
      }
      const subcategory = await this.ProductsModel.getSubcategoryById(product.subcat_id);
      const period = getPeriod(order?.userTemporarySelection);
      const commandValue = String(subcategory.Command)
          .concat(' ', product.command)
          .replace('%p', order.player)
          .replace('%q', String(order.quantity))
          .replace('%t', period)
          .replace('%lt', (period === '' || !product.temporary) ? 'add' : 'addtemp');

      if (devMode) {
        console.log('RCON Command:', commandValue, 'Server:', server, 'TempSelection:', order.userTemporarySelection);
        return;
      }
      const {IP, PORT, PASSWORD} = server;

      if (product.subcat_id == 'privilliges' && !product.temporary) {
        this.PlayerModel.updateBuyer({nickname: order.player, amount: order.price, CategoryId: product.Category_id, subcatId: product.subcat_id});
      }

      const connection = new Rcon(IP, PORT, PASSWORD);
      connection.connect();
      connection.on('auth', () => {
        connection.send(commandValue);
      });
      connection.on('server', (res: Express.Response) => resolve(res));
      connection.on('error', (err: any) => {
        throw err;
      });
    } catch (e) {
      throw e;
    }
  });
}


