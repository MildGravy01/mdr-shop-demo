import { IProduct } from "types";

export interface IUserForm {
    name: string;
    email: string;
    paymentType: string;
    promo: string;
    productAmount: number;
    durationChoice?: TTempPricings;
};
export interface IActiveProduct extends IProduct{
    tempPrice?: number;
}
export type TKey<T> = keyof T;

export type TTempPricings = 'month' | 'threeMonth' | 'forever';

export interface IUserError{
    nameInput: string;
    emailInput: string;
    promoInput: string;
}