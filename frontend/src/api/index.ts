import axios from 'axios';
import axiosRetry from 'axios-retry';
import {toJS} from 'mobx';
import { ICategory, IOrder, IProduct, ISubcategory, ITempMultipliers } from 'types';
const Axios = axios.create();

class API {
  constructor() {
    axiosRetry(Axios, {
      retries: 5,
      retryCondition: (err: any) => err.response.status != 500,
      retryDelay: axiosRetry.exponentialDelay,
    });
  }
  static getCategories = () =>
    new Promise(async (resolve: (data: ICategory[]) => void) => {
      try {
        const {data} = await Axios.get(`/api/categories`);
        resolve(data as ICategory[]);
      } catch (err: any) {
        throw new Error(err);
      }
    });


  static getSubCategories = (activeCategory: ICategory) =>
    new Promise(async (resolve: (data: ISubcategory[]) => void) => {
      try {
        const {data} = await Axios.get(
            `/api/subcategories?category=${activeCategory?.id}`,
        );
        resolve(data as ISubcategory[]);
      } catch (err: any) {
        throw new Error(err);
      }
    });

  static getProducts = (category: ICategory, subcategory?:ICategory | null) =>
    new Promise(async (resolve: (data: IProduct[]) => void) => {
      console.log(category, subcategory);
      try {
        const {data} = await Axios({
          method: 'get',
          url: '/api/products',
          params: {
            category: toJS(category?.id),
            subcategory: subcategory ? subcategory.id : undefined,
          },
        });
        if (Array.isArray(data)) {
          data.forEach((product) => {
            if (product?.img) {
              product.img = `/api/img?image_id=${product.img}`;
            }
          });
        }
        resolve(data as IProduct[]);
      } catch (err) {
        throw err;
      }
    });

  static validatePromo = async (promo: string, productId: string) => {
    try {
      const response = await Axios.get(
          `/api/promo?code=${promo}&productId=${productId}`,
      );
      return response?.data;
    } catch (error: any) {
      if (error.response.data) {
        throw error.response.data;
      } else {
        throw error;
      }
    }
  };

  static applyOrder = async (order: IOrder) => {
    try {
      const response = await Axios.post(`/api/createOrder`, order);
      return response.headers;
    } catch (error: any) {
      console.error('FAILED TO ORDER', error);
      if (error.response.data) {
        throw error.response?.data;
      } else {
        throw error;
      }
    }
  };
  

  static get = async (path: string, callback?: (response: any) => void) => {
    try {
      const response = await Axios.get(path);
      callback?.(response);
      return response;
    } catch (error: any) {
      if (error.response.data) {
        throw error.response.data;
      } else {
        throw error;
      }
    }
  };

  static getTempMultipliers = async () => {
    try {
      const response = await Axios.get(`/api/tempMultipliers`);
      return response.data as ITempMultipliers;
    } catch (error: any) {
      console.error('FAILED TO ORDER', error);
      if (error.response.data) {
        throw error.response?.data;
      } else {
        throw error;
      }
    }
  }
  
}

export default API;

export const debounce = (fn: Function, ms = 300) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId as ReturnType<typeof setTimeout>);
    timeoutId = setTimeout(() => {
      fn.apply(this, args);
      timeoutId = null; // Сбрасываем timeoutId после выполнения функции
    }, ms);
  };
};