import { TTempPricings } from "src/pages/Shop/types";

export const getOldPrice = (price: number, sale = 0): number => {
    return +((price * (sale/100)) + price).toFixed(0);
};

