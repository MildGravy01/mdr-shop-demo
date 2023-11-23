import db from '../connection.js';
import {objectify} from './helpers.js';

export const getServer = (serverId) =>
  new Promise((resolve, reject) => {
    db.then((result) => {
      result.query(
          `SELECT * FROM Server WHERE Server_id=?`, [serverId],
          (err, result) => {
            if (err) {
              reject(err);
              throw err;
            } else if (result) {
              resolve(objectify(result)[0]);
            }
          },
      );
    });
  });
