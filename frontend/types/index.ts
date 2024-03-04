import { IUserForm } from "src/pages/Shop/types";

export interface IProduct {
    id: string;
    name: string;
    price: number;
    oldPrice: number;
    discount: number;
    shortDescription: string;
    fullDescription?: string;
    img: string;
    countable?: boolean;
    temporary?: boolean;
    inherited?: boolean;
}

export interface ITempMultipliers {
    threeMonthMultiplier: number;
    foreverMultiplier: number;
}

export interface IOrder extends IUserForm {
    productId: string; 
}

export interface ICategory{
    name: string;
    id: string;
}

export interface ISubcategory extends ICategory{
    type: TSubcategoryType;
}

export type TSubcategoryType = 'cases' | 'misc' | 'privillege' | 'command';

export interface IRules {
    chapter: string;
}
export interface IDocument {
    text: string;
}