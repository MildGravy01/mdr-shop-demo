import { IProduct } from "types";

export interface IProductComponentProps {
    product?: IProduct;
    onClick?: (product: IProduct) => void;
}