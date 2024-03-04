import { BaseController } from "../BaseController";
import { OrderService } from "services";
import express from 'express';

export class CreateOrderController extends BaseController {
    OrderService: OrderService;
    constructor(orderService: OrderService) {
        super();
        this.OrderService = orderService;
    }
    protected async executeImplementation(req: express.Request, res: express.Response): Promise<any> {
        try {
            const orderProps = req.body;
            const order = await this.OrderService.processOrder(orderProps);
            res.location(order?.location);
            this.ok(res, order); 
        } catch (err: any) {
          return this.fail(res, err.toString())
        }
    }
}