export interface IGetInheritanceProps{
    nickname: string;
    CategoryId: string;
    subcatId?: string;
}
export interface IUpdateBuyerProps extends IGetInheritanceProps {
    amount: number;
}