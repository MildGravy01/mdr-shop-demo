import { BaseModel } from "../BaseModel";
import { IAgreement, IOffer } from "./types";

export class ContentModel extends BaseModel{
  getRules = async () => {
    const result = await this.requestDb(`SELECT * FROM Rules`);
    if (!result) {
      throw new Error('error: failed to get rules');
    }
    return result;
  };

  getAgreement = async () => {
    const result = await this.requestDb(`SELECT * FROM UserAgreement`) as IAgreement[];
    if (!result) {
      throw new Error('error: failed to get user agreement');
    }
    return result[0];
  };

  getPublicOffer = async () => {
    const result = await this.requestDb(`SELECT * FROM PublicOffer`) as IOffer[];
    if (!result) {
      throw new Error('error: failed to get PublicOffer');
    }
    return result[0];
  }; ;
}

