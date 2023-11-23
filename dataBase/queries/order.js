import db from '../connection.js';
import {objectify} from './helpers.js';

export const getOrder = (orderId) =>
  new Promise((resolve, reject) => {
    db.then((result) => {
      result.query(
          `SELECT * FROM orders WHERE id=?`,
          [orderId],
          (err, result) => {
            if (err) {
              reject(err);
            } else if (result) {
              resolve(objectify(result)[0]);
            }
          },
      );
    });
  });

export const setOrderStatus = (orderId, status) =>
  new Promise((resolve, reject) => {
    db.then((result) => {
      result.query(
          `UPDATE orders SET status=? WHERE id=?`,
          [status, orderId],
          (err, result) => {
            if (err) {
              reject(err);
            } else if (result) {
              resolve();
            }
          },
      );
    });
  });

export const registerOrder = (
    orderId,
    productId,
    price,
    player,
    email,
    promoCode = null,
    quantity,
) =>
  new Promise((resolve) => {
    const promoValue = promoCode ? promoCode : null;
    const sql = `INSERT INTO orders (id,product_id,price,player,email,promo_code,quantity) VALUES 
      (?,?,?,?,?,?,?)`;
    db.then((result) => {
      result.query(
          sql,
          [orderId, productId, price, player, email, promoValue, quantity],
          (err, result) => {
            if (err) {
              throw err;
            } else {
              if (result) {
                resolve(result);
              }
            }
          },
      );
    });
  });
