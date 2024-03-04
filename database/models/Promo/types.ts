export interface IPromo {
    code: string;
    type: TPromoType;
    value: string;
    expiry: Date;
    max_uses: number;
    current_uses: number;
    Category_id: string;
    subcat_id: string;
}

export type ISPromo = Pick<IPromo, 'type' | 'value'>

export type TPromoType = 'SALE' | 'GIFT' | 'COMMAND';