import { BaseController } from "../BaseController";
import { OrderService } from "services";
import express from 'express';

export class CheckOrderController extends BaseController {
    OrderService: OrderService;
    constructor(orderService: OrderService) {
        super();
        this.OrderService = orderService;
    }
    protected async executeImplementation(req: express.Request, res: express.Response): Promise<any> {
        try {
            const orderId = req.query?.orderId;
            const order = await this.OrderService.checkPurchase(Number(orderId));
            this.ok(res, order); 
        } catch (err: any) {
          return this.fail(res, err.toString())
        }
    }
}