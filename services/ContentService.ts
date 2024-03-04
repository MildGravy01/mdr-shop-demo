import { ContentModel } from "database/models";
import { IAgreement, IDocument, IOffer } from "database/models/Content/types";

export class ContentService {

  ContentModel: ContentModel;

  constructor(ContentModel: ContentModel) {
    this.ContentModel = ContentModel;
  }
  getRules = async () => {
    const result = await this.ContentModel.getRules();
    if (result) {
      return result;
    }
  };

  getUserAgreement = async (): Promise<IDocument> => {
    const result = await this.ContentModel.getAgreement();
    if (result) {
      return {text: result.Agreement};
    }
  };

  getPublicOffer = async (): Promise<IDocument> => {
    const result = await this.ContentModel.getPublicOffer();
    if (result) {
      return {text: result.offer};
    }
  };


  getImg = (imageId: string) => {
    if (!imageId) {
      throw new Error('no img');
    }
    const __dirname = new URL('../', import.meta.url).pathname;
    return __dirname + `/images/${imageId}`;
  };
}
