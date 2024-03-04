export interface ICategory {
    Category_id: string;
    name: string;
    Server_id: string;
}

export interface ISubcategory{
    subcat_id: string;
    name: string;
    type: string;
    Command: string;
}

export interface IProduct{
    product_id: string;
    Category_id: string;
    subcat_id: string;
    name: string;
    command: string;
    img: string;
    price: number;
    discount: number;
    desc_commands: string;
    desc_poss: string;
    countable: boolean;
    temporary: boolean;
    inherited: boolean;
}

export interface ITempMultiplier {
    threeMonthMultiplier: number;
    foreverMultiplier: number;
}