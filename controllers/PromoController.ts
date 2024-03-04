import { PromoService } from "services/PromoService";
import { BaseController } from "./BaseController";
import express from 'express';

export class PromoController extends BaseController {
    PromoService: PromoService;
    constructor(PromoService: PromoService) {
        super();
        this.PromoService = PromoService;
    }

    protected async executeImplementation(req: express.Request, res: express.Response): Promise<any> {
        try {
            const {productId, code} = req.query;
            if(!productId || !code) throw new Error('no params provided');
            
            const {value, type} = await this.PromoService.validatePromo(productId as string, code as string);
            this.ok(res, {value, type}); 
        } catch (err: any) {
          return this.fail(res, err.toString())
        }
    }
}