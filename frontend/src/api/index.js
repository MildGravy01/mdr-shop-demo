import axios from "axios";
import axiosRetry from 'axios-retry';
import { toJS } from "mobx";
const Axios = axios.create();

class API {
    constructor(){
        axiosRetry(Axios, {
            retries: 5,
            retryCondition: (err) => err.response.status >= 500,
            retryDelay: axiosRetry.exponentialDelay
        });
    }
     static getCategories = () => new Promise(async (resolve) => {
        try{
          const {data} = await Axios.get(`/api/categories`);
          resolve(data);
        } catch(err) {
            throw new Error(err);
        }
      });
    
      static getSubCategories = (activeCategory) => new Promise(async (resolve) => {
        try{
          const {data} = await Axios.get(`/api/subcategories?category=${activeCategory?.Category_id}`);
          resolve(data);
        } catch(err) {
            throw new Error(err);
        }
    
      });

      static getProducts = (category,subcategory) => new Promise(async (resolve) => {
        console.log(category,subcategory);
        try{
          const {data} = await Axios({
             method: "get",
             url: "/api/products",
             params: {
              category: toJS(category?.Category_id),
              subcategory: subcategory?.subcat_id
             }
            });
          if(Array.isArray(data)){
            data.forEach((product) => {
              if(product?.img){
                product.img = `/api/img?image_id=${product.img}`;
              }
            });
          }
          resolve(data);
        } catch(err) {
            throw err;
        }
      });

      static validatePromo = async (promo, product_id) => {
        try{
          const response = await Axios.get(`/api/promo?code=${promo}&product_id=${product_id}`);
          return (response.data);
        } catch (error) {
          if (error.response.data) {
            throw error.response.data;
          } else {
            throw error;
          }
        }
      };

      static applyOrder = async (order) => {
        try{
          const response = await Axios.post(`/api/payment`, order);
          return (response.headers);
        } catch (error) {
          console.error("FAILED TO ORDER", error);
          if (error.response.data) {
            throw error.response.data;
          } else {
            throw error;
          }
        }
      };

      static get = async(path, callback) =>{
        try {
          const response = await Axios.get(path);
          callback?.(response);
          return response;
        } catch (error) {
          if (error.response.data) {
            throw error.response.data;
          } else {
            throw error;
          }
        }
      };
      static post(){

      };
      
}

export default API;