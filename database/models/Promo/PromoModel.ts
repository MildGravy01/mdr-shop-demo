import { BaseModel } from "../BaseModel";
import { IPromo } from "./types";

export class PromoModel extends BaseModel {
  getPromo = async () => {
    const result = await this.requestDb(`SELECT * FROM promo`) as IPromo;
    if (!result) {
      throw new Error('error: failed to get promo');
    }
    return result;
  };
  
  addPromoUse = async (promo: string) => {
    const result = await this.requestDb(`CALL AddPromoUse(?);`, [promo]);
    if (!result) {
      throw new Error('error: failed to add promo use');
    }
    return result;
  };
}


