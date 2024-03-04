import express from 'express';
import { devMode } from '../database';

export abstract class BaseController {
    protected abstract executeImplementation<T> (
        req: express.Request, res: express.Response, type?: T
      ): Promise<void | any>;

    public async execute<T = any> (
        req: express.Request, res: express.Response, type?: T): Promise<void> {
        try {
          await this.executeImplementation(req, res, type);
        } catch (err) {
          console.log(`[BaseController]: Uncaught controller error`);
          console.error(err);
          this.fail(res, 'An unexpected error occurred')
       }
    }

      public fail (res: express.Response, error: Error | string) {
        return res.status(500).json({
          message: error.toString()
        })
      }

    public ok<T> (res: express.Response, dto?: T) {
        if (!!dto) {
          res.type('application/json');
          return res.status(200).json(dto);
        } else {
          return res.sendStatus(200);
        }
      }

    public file (res: express.Response, fileLink: string) {
        res.set('Cache-control', 'public, max-age=5000');
        return res.status(200).sendFile(fileLink);
      }

      public static jsonResponse (
        res: express.Response, code: number, message: string
      ) {
        return res.status(code).json({ message })
      }

      public paymentRequired (res: express.Response, message?: string) {
        return BaseController.jsonResponse(res, 402, message ? message : 'Payment required');
      }
    
      public forbidden (res: express.Response, message?: string) {
        return BaseController.jsonResponse(res, 403, message ? message : 'Forbidden');
      }
    
      public notFound (res: express.Response, message?: string) {
        return BaseController.jsonResponse(res, 404, message ? message : 'Not found');
      }
    
      public conflict (res: express.Response, message?: string) {
        return BaseController.jsonResponse(res, 409, message ? message : 'Conflict');
      }
    
      public tooMany (res: express.Response, message?: string) {
        return BaseController.jsonResponse(res, 429, message ? message : 'Too many requests');
      }
}