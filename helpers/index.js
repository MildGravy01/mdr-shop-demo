import {getPromo, getProducts} from '../dataBase/queries';

export const validateEmail = (email) => {
  return String(email)
      .toLowerCase()
      .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
};

export const validatePromo = (productId, code) => new Promise((resolve, reject) => {
  getProducts().then((products) => {
    if (!productId || !Array.isArray(products)) {
      reject(new Error({message: 'promo: error', status: 412}));
      return;
    }
    const product = products.find((el) => el.product_id == productId);
    if (!product) {
      reject(new Error({message: 'promo: product not found', status: 412}));
    }
    getPromo.then((result) => {
      if (code && Array.isArray(result)) {
        const promo = result.find((el) => el.code == code);
        if (!promo) {
          reject(new Error({message: 'promo: not found', status: 412}));
          return;
        }
        if (new Date(promo.expiry) < new Date()) {
          reject(new Error({message: 'promo: expired', status: 412}));
          return;
        }
        if (promo.max_uses && promo.current_uses) {
          if (promo.max_uses <= promo.current_uses) {
            reject(new Error({message: 'promo: expired', status: 412}));
            return;
          }
        }
        if (promo?.Category_id) {
          if (promo.Category_id !== product.Category_id) {
            reject(new Error({message: 'promo: product not found', status: 412}));
            return;
          }
        }
        if (promo?.subcat_id) {
          if (promo.subcat_id !== product.subcat_id) {
            reject(new Error({message: 'promo: product not found', status: 412}));
            return;
          }
        }
        if (promo.type === 'SALE') {
          resolve({type: promo.type, discount: promo.value});
        }
        if (promo.type === 'GIFT') {
          resolve({type: promo.type, discount: promo.value});
        }
        // todo
      }
    }).catch((err) => {
      throw err;
    });
  });
});

export const applyPromo = (promo, price) => {
  if (promo) {
    switch (promo.type) {
      case 'SALE':
        const newPrice = (price - ((price * promo.discount)/100)).toFixed(1);
        return newPrice;
      case 'GIFT':
        // todo
        return 0;
      case 'COMMAND':
        // todo
        return {status: 202};
    }
  }
  return price;
};
