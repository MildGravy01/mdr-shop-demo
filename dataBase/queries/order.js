import db from "./connection.js";
import { objectify } from "./helpers.js";

export const getOrder = (order_id) =>
  new Promise((resolve, reject) => {
    db.then((result) => {
      result.query(
        `SELECT * FROM orders WHERE id=?`,
        [order_id],
        (err, result) => {
          if (err) {
            reject(err);
          } else if (result) {
            resolve(objectify(result));
          }
        }
      );
    });
  });

export const setOrderStatus = (order_id, status) =>
  new Promise((resolve, reject) => {
    db.then((result) => {
      result.query(
        `UPDATE orders SET status=? WHERE id=?`,
        [status, order_id],
        (err, result) => {
          if (err) {
            reject(err);
          } else if (result) {
            resolve();
          }
        }
      );
    });
  });

export const registerOrder = (
  order_id,
  product_id,
  price,
  player,
  email,
  promo_code = null,
  quantity
) =>
  new Promise((resolve) => {
    const promoValue = promo_code ? promo_code : null;
    const sql = `INSERT INTO orders (id,product_id,price,player,email,promo_code,quantity) VALUES 
      (?,?,?,?,?,?,?)`;
    db.then((result) => {
      result.query(
        sql,
        [order_id, product_id, price, player, email, promoValue, quantity],
        (err, result) => {
          if (err) {
            throw err;
          } else {
            if (result) {
              resolve(result);
            }
          }
        }
      );
    });
  });
