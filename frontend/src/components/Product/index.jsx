import { Background, Preloader, ProductHeader, ProductImage, ProductShortDescription, StyledPriceBadge, Wrapper } from "./style";
import { SaleBadge } from "../../../../components/SaleBadge";
import { PriceBadge } from "../../../../components/PriceBadge";
import React, {useEffect, useState} from "react";
import { Button } from "./style";
import { translation } from "../../../../translations";
import { sanitize } from "dompurify";
import HTMLReactParser from "html-react-parser";
import { get } from "../../../../api";

export const Product = ({product,onClick}) => {
    const [opacity,setOpacity] = useState(1);
      if(!product?.name)
        return(<Preloader></Preloader>)
    return(
        <Background opacity={opacity}>
            <Wrapper>
                <ProductHeader>
                    <h2>{product?.name}</h2>
                    {product?.discount && <SaleBadge>{product?.discount}</SaleBadge>}
                </ProductHeader>
                <ProductShortDescription>
                    {HTMLReactParser(sanitize(product?.desc_poss))}
                </ProductShortDescription>
                <StyledPriceBadge price={product?.price} sale={product?.discount}/>
                <Button type={"primary"} margin_top={15} onClick={() => onClick(product)}>{translation.t("product.more")}</Button>
                <ProductImage src={product.img} alt=""/>
            </Wrapper>
        </Background>
    );
}
