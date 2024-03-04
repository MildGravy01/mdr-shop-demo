

/* eslint-disable camelcase */

import { ProductsModel, PromoModel } from "database/models";
import { IPromo } from "database/models/Promo/types";
import express from 'express';
export class PromoService {
  ProductsModel: ProductsModel;
  PromoModel: PromoModel;

  constructor(ProductsModel: ProductsModel, PromoModel: PromoModel) {
    this.ProductsModel = ProductsModel;
    this.PromoModel = PromoModel;
  }

  validatePromo = async (productId: string, code: string): Promise<IPromo | undefined > => {
    const products = await this.ProductsModel.getProducts();
    const promos = await this.PromoModel.getPromo();
    if (!productId || !Array.isArray(products)) {
      throw new Error('promo: error');
    }
    const product = products.find((el) => el.product_id == productId);
    if (!product) {
      throw new Error('promo: product not found');
    }
    if (code && Array.isArray(promos)) {
      const promo = promos.find((el) => el.code == code);
      if (!promo) {
        throw new Error('promo: not found');
      }
      if (new Date(promo.expiry) < new Date()) {
        throw new Error('promo: expired');
      }
      if (promo.max_uses && promo.current_uses) {
        if (promo.max_uses <= promo.current_uses) {
          throw new Error('promo: expired');
        }
      }
      if (promo?.Category_id) {
        if (promo.Category_id !== product.Category_id) {
          throw new Error('promo: product not found');
        }
      }
      if (promo?.subcat_id) {
        if (promo.subcat_id !== product.subcat_id) {
          throw new Error('promo: product not found');
        }
      }
      return promo;
      // todo
    }
  };

  applyPromo = (promo: IPromo, price: number): number => {
    if (promo) {
      switch (promo.type) {
        case 'SALE':
          const newPrice = Number((price - ((price * Number(promo.value))/100)).toFixed(1));
          return newPrice;
        case 'GIFT':
          // todo
          return 0;
        case 'COMMAND':
          // todo
          return 0;
      }
    }
    return price;
  };
};
