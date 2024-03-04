import { ProductService } from "services";
import { BaseController } from "./BaseController";
import express from 'express';


export type TInfoType = 'getProducts' | 'getSubcategories' | 'getCategories' | 'getTempMultipliers';


export class ProductsController extends BaseController{

  ProductsService: ProductService;
  constructor(productsService: ProductService) {
    super();
    this.ProductsService = productsService;
  }

  protected async executeImplementation<TInfoType>(req: express.Request, res: express.Response, type?: TInfoType): Promise<void | any> {
        const category: string = req.query.category as string;
        switch (type) {
          case 'getProducts':
            const subcategory:string = req.query.subcategory as string;
            if(!category){
                this.notFound(res);
                return;
            }
            const products = await this.ProductsService.getFilteredProducts(category, subcategory);
            this.ok(res, products);
            return;
          case 'getCategories':
            const categories = await this.ProductsService.getCategories();
            this.ok(res, categories);
            return;
          case 'getSubcategories':
            const subcategories = await this.ProductsService.getSubcategories(category);
            this.ok(res, subcategories);
            return;
          case 'getTempMultipliers':
            const tempMultipliers = await this.ProductsService.getTempMultipliers();
            this.ok(res, tempMultipliers);
            return;
          default: 
             this.notFound(res);
            return;
        }   
  }
}
