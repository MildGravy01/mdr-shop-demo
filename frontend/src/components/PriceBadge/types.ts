export interface IPriceBadgeProps {
    price: number;
    sale: number;
    promo?: IPromo | null;
    amount?: number;
}

export interface IPromo {
    discount: number
}