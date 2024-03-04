import { ContentService } from "services";
import { BaseController } from "./BaseController";
import express from 'express';
export type TContentType = 'rules' | 'agreement' | 'publicOffer' | 'img';


export class ContentController extends BaseController{

  contentService: ContentService;
  constructor(contentService: ContentService) {
    super();
    this.contentService = contentService;
  }

  protected async executeImplementation<TContentType>(req: express.Request, res: express.Response, type?: TContentType): Promise<void | any> {
    try {
        switch (type) {
          case 'rules':
            const rules = await this.contentService.getRules();
            this.ok(res, rules);
            return;
          case 'agreement':
            const agreement = await this.contentService.getUserAgreement();
            this.ok(res, agreement);
            return;
          case 'publicOffer':
            const publicOffer = await this.contentService.getPublicOffer();
            this.ok(res, publicOffer);
            return;
          case 'img':
            const img = this.contentService.getImg(req.query?.image_id as string);
            console.log("img", req.query?.image_id);
            res.setHeader('Cache-Control', 'max-age=86400');
            this.file(res, img);
            return;
          default: 
             this.notFound(res);
             return;
        }   
    } catch (err: any) {
      return this.fail(res, err.toString())
    }
  }
}
