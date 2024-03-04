import { BaseModel } from '../BaseModel';
import { IGetInheritanceProps, IUpdateBuyerProps } from './types';

export class PlayerModel extends BaseModel{
  findPlayer = async (player: string) => {
    const result = await this.requestDb(`SELECT player_name FROM mc_auth_accounts WHERE player_name=?`, [player]);

    if (!result || !Array.isArray(result) || result.length <= 0) {
      throw new Error('player: not found');
    }
    return result[0].player_name;
  };

  getInheritance = async ({nickname, CategoryId, subcatId} : IGetInheritanceProps) => {
    const result = await this.requestDb(`SELECT Amount FROM Buyers WHERE  nickname= ? AND Category_id= ? AND subcat_id= ?`, [nickname, CategoryId, subcatId]) as number[];
    if (!result) {
      throw new Error('player: not found');
    }
    return result[0];
  };

  updateBuyer = async ({nickname, CategoryId, subcatId, amount}: IUpdateBuyerProps) => {
    await this.requestDb(`INSERT IGNORE INTO Buyers SET nickname = ?,Category_id = ?,subcat_id = ?`, [nickname, CategoryId, subcatId]);
    const update = await this.requestDb(`UPDATE Buyers SET Amount=Amount+? WHERE nickname = ? AND Category_id = ? AND subcat_id= ?`, [amount, nickname, CategoryId, subcatId]);
    if (!update) {
      throw new Error('error: failed to update buyer');
    }
    return update;
  };
}

// export const findPlayer = async (player) =>
//   new Promise((resolve, reject) => {
//     db().then((result) => {
//       result.query(
//           `SELECT * FROM mc_auth_accounts WHERE player_name=?`,
//           [player],
//           (err, result) => {
//             if (err || !result) {
//               reject(new RequestError('player: not found', 404));
//               throw err;
//             }
//             if(!Array.isArray(result) || result.length <= 0 ){
//               throw
//             }
//             if (Array.isArray(result) && result.length > 0) {
//               if (result[0]?.player_name) {
//                 resolve(result[0]?.player_name);
//                 return;
//               }
//               reject(new RequestError('player: not found', 404));
//             } else {
//               reject(new RequestError('player: not found', 404));
//             }
//           },
//       );
//     });
//   });
