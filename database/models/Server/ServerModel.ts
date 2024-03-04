import { BaseModel } from '../BaseModel.js';
import { IServer } from './types.js';

export class ServerModel extends BaseModel{
  getServer = async (serverId: string) => {
    const result = await this.requestDb(`SELECT * FROM Server WHERE Server_id=?`, [serverId]) as IServer[];
  
    if (!result) {
      throw new Error('error: failed to get server');
    }
  
    return result[0];
  };
  
  getServerByProduct = async (productId: string) => {
    const result = await this.requestDb(`SELECT * FROM Server s 
    JOIN Category c ON s.Server_id = c.Server_id  
    JOIN Product p ON c.Category_id = p.Category_id 
    WHERE p.product_id = ?`, [productId]) as IServer[];
  
    if (!result) {
      throw new Error('error: failed to get server');
    }
    return result[0];
  };
}

