import { useEffect } from "react";
import styled, {css} from "styled-components"
import { translation } from "../../translations";

export const PriceBadge = ({price,sale,promo,quantity}) => {
    return(
        <PriceHolder>
    <Background promo={promo}>
        <CurrentPrice promo={promo}>{promo?.discount ? (quantity? ((+price*quantity) - (+price*quantity)/100 * +promo?.discount) : +price - (+price/100 * +promo?.discount)).toFixed(0) : (quantity? price*quantity : price).toFixed(0)} {translation.t("product.currency_symbol")}</CurrentPrice>
        {(sale || promo) && <OldPrice>{getOldPrice(price,sale||promo.discount)} ₽{quantity>1&&translation.t("product.countable_price")}</OldPrice>}
    </Background>
    </PriceHolder>
    );
}

const getOldPrice = (price,sale) => {
    return (price/(100-sale)*100).toFixed(0);
}
const PriceHolder = styled.div`
    display: flex;
`
const Background = styled.div`
    border: 1px dashed #2F2F36;
    ${({promo}) => promo && css`
         border: 1.5px dashed #4d1c36;
        `
    }
    border-radius: 6px;
    display: flex;
    cursor: default;
`
const CurrentPrice = styled.div`
    border: 1.5px solid #4541EA;
    ${({promo}) => promo && css`
         border: 1.5px solid #F0158B;
        `
    }
    font-family: "Raleway";
    padding: 2px 5px;
    margin: 1px;
    color: #fff;
    border-radius: 4px;
`

const OldPrice = styled.div`
  padding: 4px 5px;
  font-family: "Raleway";
  color:white;
  opacity: 0.4;
  text-decoration-line: line-through;
`