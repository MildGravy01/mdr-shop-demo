
export interface IProduct {
    id: string;
    name: string;
    price: number;
    discount: number;
    shortDescription: string;
    fullDescription: string;
    img: string;
    countable: boolean;
    temporary: boolean;
    inherited: boolean;
}

export interface IOrder {
    product_id: string; 
    price: number;
    quantity: number;
    player: string;
    email: string;
    promo_code: string;
    payment_type: string;
}

export interface ICategory{
    name: string;
    id: string;
}

export interface ISubcategory extends ICategory{
    type: TSubcategoryType;
}

export type TSubcategoryType = 'cases' | 'money' | 'privillege' | 'command';

export interface IRules {
    chapter: string;
}
export interface IAgreement {
    agreement: string;
}