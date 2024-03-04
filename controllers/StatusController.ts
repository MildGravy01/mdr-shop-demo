import { LavaStatusService } from "services";
import { BaseController } from "./BaseController";
import express from 'express';
import { AnypayStatusService } from "services";

export type TStatusSource = 'lava' | 'anypay';

export class StatusController extends BaseController{
    LavaStatusService: LavaStatusService;
    AnypayStatusService: AnypayStatusService;
    constructor(Lava: LavaStatusService, Anypay: AnypayStatusService) {
        super();
        this.LavaStatusService = Lava;
        this.AnypayStatusService = Anypay;
    }

    protected async executeImplementation<TStatusSource>(req: express.Request, res: express.Response, type: TStatusSource): Promise<any> {
        try {
            if(type == 'anypay'){
              const {
                  billId,
                  amount,
                  currency,
                  initialHash,
                  status} = req.body;

              const result = await this.AnypayStatusService.processAnypayStatus(billId, amount, currency, initialHash, status);
              this.ok(res, result);
            return;
           } 
           if(type == 'lava'){
             const hash = req.header('Authorization');
             const bill = req.body;

             const result = await this.LavaStatusService.processLavaStatus(hash, bill);
             this.ok(res, result);
           }
        } catch (err: any) {
          return this.fail(res, err.toString())
        }
    }
}