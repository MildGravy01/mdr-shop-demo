import { MysqlError } from 'mysql';
import db from '../connection';

export class BaseModel {
    public objectify = (result: []) => {
        const array = result.map((mysqlObj) => {
          return Object.assign({}, mysqlObj);
        });
        return array;
      };
      
      public requestDb = async (request: string, params?:any, callback?: (result: []) => void) => {
        const dataBase = await db();
        if (!dataBase) {
          throw new Error('connection to db failed');
        }
        return new Promise((resolve) => dataBase.query(request, params, (err: MysqlError | null, result: []) => {
          if (err) {
            throw err;
          }
          if (result) {
            callback?.(result);
            resolve(Array.isArray(result) ? this.objectify(result) : result);
          }
        }));
      };
      
}