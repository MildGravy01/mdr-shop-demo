import db from '../connection.js';
import {objectify} from './helpers.js';

export const getPromo = new Promise((resolve, reject) => {
  db.then((result) => {
    result.query(
        `SELECT * FROM promo`,
        function(err, result) {
          if (err) {
            reject(err);
          } else {
            if (result) {
              resolve(objectify(result));
            }
          }
        },
    );
  });
});

export const addPromoUse = (promo) => new Promise((resolve, reject) => {
  db.then((result) => {
    result.query(`UPDATE promo SET \'current_uses\'=\'current_uses+1\' WHERE code = ?`, [promo], (err, result) => {
      if (err) {
        throw err;
      }
    });
  });
});
