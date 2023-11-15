import db from "./connection.js";
import { objectify } from "./helpers.js";

export const getRules = new Promise((resolve, reject) => {
    db.then((result) => {
      result.query(`SELECT * FROM Rules`, (err, result) => {
        if (err) {
          reject(err);
        } else if (result) {
          resolve(objectify(result));
        }
      });
    });
  });
  
  export const getAgreement = new Promise((resolve, reject) => {
    db.then((result) => {
      result.query(`SELECT * FROM UserAgreement`, (err, result) => {
        if (err) {
          reject(err);
        } else if (result) {
          resolve(objectify(result));
        }
      });
    });
  });