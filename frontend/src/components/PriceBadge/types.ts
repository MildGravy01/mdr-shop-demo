export interface IPriceBadgeProps {
    price: number;
    oldPrice: number;
    countable?: number;
    activated?: boolean;
    startingFrom?: boolean;
}

export interface IPromo {
    value: number
}