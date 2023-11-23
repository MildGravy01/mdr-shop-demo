export interface IUserForm {
    userName: string;
    userEmail: string;
    userPaymentType: string;
    userPromo: string;
    userProductQuantity: number;
};

export interface IUserError{
    nameInput: string;
    emailInput: string;
    promoInput: string;
}