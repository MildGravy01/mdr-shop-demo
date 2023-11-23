
import db from '../connection.js';
import {objectify} from './helpers.js';

export const getProducts = () => new Promise((resolve) => {
  db.then((result) => {
    result.query('SELECT * FROM Product', function(err, result) {
      if (err) {
        reject(err);
      } else {
        if (result) {
          resolve(objectify(result));
        }
      }
    });
  });
});

export const getProductByID = (id) =>
  new Promise((resolve, reject) => {
    db.then((result) => {
      result.query(
          `SELECT * FROM Product WHERE product_id=? LIMIT 1`, [id],
          (err, result) => {
            if (err) {
              reject(new Error({message: 'product: error', status: 500}));
              throw err;
            } else if (result) {
              resolve(objectify(result)[0]);
            } else {
              reject(new Error({message: 'product: not found', status: 404}));
            }
          },
      );
    });
  });
