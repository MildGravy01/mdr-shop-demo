export interface IOrder {
    id: string;
    product_id: string;
    price: number;
    player: string;
    userTemporarySelection: TUserTempMultipliers;
    email: string;
    promo_code: string;
    quantity: number;
    status: TOrderStatus;
    date: string;
    server_status: TOrderStatus;
    ServerID: string;
}

export interface IRegisterOrderProps {
      productId: string;
      price: number;
      player: string;
      email: string;
      promoCode: string | null,
      quantity: number,
      serverId: string,
      userTemporarySelection?: TUserTempMultipliers,
}

export type TOrderStatus = 'wating' | 'success' | 'error';
export type TUserTempMultipliers = 'month' | 'threeMonth' | 'forever';