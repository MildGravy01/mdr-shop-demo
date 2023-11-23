import db from '../connection.js';

export const findPlayer = (player) =>
  new Promise((resolve, reject) => {
    db.then((result) => {
      result.query(
          `SELECT * FROM mc_auth_accounts WHERE player_name=?`,
          [player],
          (err, result) => {
            if (err) {
              reject(new Error({message: 'player: not found', status: 404}));
              throw err;
            } else if (result) {
              if (Array.isArray(result) && result.length > 0) {
                if (result[0]?.player_name) {
                  resolve(result[0]?.player_name);
                  return;
                }
                reject(new Error({message: 'player: not found', status: 404}));
              } else {
                reject(new Error({message: 'player: not found', status: 404}));
              }
            }
          },
      );
    });
  });

export const getInheritance = (nickname, CategoryId, subcatId) =>
  new Promise((resolve, reject) => {
    db.then((result) => {
      result.query(
          `SELECT * FROM Buyers WHERE  nickname= ? AND Category_id= ? AND subcat_id= ?`,
          [nickname, CategoryId, subcatId],
          (err, result) => {
            if (result) {
              resolve(result[0]);
            } else if (err) {
              reject(err);
              throw err;
            } else {
              reject(new Error(''));
            }
          },
      );
    });
  });

export const updateBuyer = (nickname, CategoryId, subcatId, amount) =>
  new Promise((resolve, reject) => {
    db.then((result) => {
      result.query(
          `INSERT IGNORE INTO Buyers SET nickname = ?,Category_id = ?,subcat_id = ?`,
          [nickname, CategoryId, subcatId],
      );
      result.query(
          `UPDATE Buyers SET Amount=Amount+? WHERE nickname = ? AND Category_id = ? AND subcat_id= ?`,
          [amount, nickname, CategoryId, subcatId],
          (err, result) => {
            if (result) {
              resolve(result);
            } else if (err) {
              reject(err);
              throw err;
            }
          },
      );
    });
  });
