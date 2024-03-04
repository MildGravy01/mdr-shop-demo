import { TUserTempMultipliers } from "database/models/Order/types";

export interface IOrderProps {
    id?: number;
    productId: string;
    name: string;
    email: string;
    paymentType: string;
    promo: string;
    productAmount: number;
    durationChoice?: TUserTempMultipliers;
}
