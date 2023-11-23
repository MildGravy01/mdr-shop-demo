import db from '../connection.js';
import {objectify} from './helpers.js';

export const getCategory = (CategoryId) =>
  new Promise((resolve, reject) => {
    db.then((result) => {
      result.query(
          `SELECT * FROM Category WHERE Category_id = ?`,
          [CategoryId],
          (err, result) => {
            if (err) {
              throw err;
            } else if (result) {
              resolve(objectify(result)[0]);
            }
          },
      );
    });
  });

export const getCategories = () =>
  new Promise((resolve) => {
    db.then((result) => {
      result.query(
          'SELECT * FROM Category ORDER BY `order` ASC',
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

export const getSubcategories = (category) =>
  new Promise((resolve, reject) => {
    db.then((result) => {
      if (!category) {
        console.log('NO CATEGORY ON Request');
        result.query(
            'SELECT * FROM Subcategory ORDER BY \'order\'',
            (err, result) => {
              if (err) {
                reject(err);
              } else {
                if (result) {
                  resolve(objectify(result));
                }
              }
            },
        );
      }
      getCategories().then((categories) => {
        if (categories) {
          const filtered = categories.filter((categoryItem) => {
            return categoryItem.Category_id == category;
          });
          if (filtered.length > 0) {
            result.query(
              category ?
                `SELECT * FROM Subcategory AS subcategory
                        LEFT JOIN Subcat_Category_Relation AS relations ON(subcategory.subcat_id = relations.Subcategory_id) WHERE relations.Category_id=\'${category}\' ORDER BY subcategory.order` :
                'SELECT * FROM Subcategory ORDER BY \'order\'',
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
          }
        }
      });
    });
  });
