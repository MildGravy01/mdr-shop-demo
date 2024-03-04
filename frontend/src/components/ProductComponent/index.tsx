import {
  Background,
  Preloader,
  ProductHeader,
  ProductImage,
  ProductShortDescription,
  StyledPriceBadge,
  Wrapper,
} from './style';
import {SaleBadge} from '../SaleBadge';
import {Button} from './style';
import {translation} from '../../translations';
import {sanitize} from 'dompurify';
import HTMLReactParser from 'html-react-parser';
import { IProductComponentProps } from './types';
import { colorize } from '../../utils/minecraftColors';
import { getOldPrice } from '../../utils/helpers';

export const ProductComponent = ({product, onClick}: IProductComponentProps) => {
  if (!product) {
    return <Preloader></Preloader>;
  }

  return (
    <Background onClick={() => onClick?.(product)}>
      <Wrapper>
        <ProductHeader>
          <h2>{product.name}</h2>
          {product.discount && <SaleBadge>{product.discount}</SaleBadge>}
        </ProductHeader>
        <ProductShortDescription>
          {HTMLReactParser(sanitize(colorize(product.shortDescription)))}
        </ProductShortDescription>
        <StyledPriceBadge price={product.price} 
            oldPrice={getOldPrice(product.price, product.discount)} 
            startingFrom={!!product.temporary}
        />
        <Button
          type={'primary'}
          onClick={() => onClick?.(product)}
        >
          {translation.t('product.more')}
        </Button>
        <ProductImage src={product.img} alt="" />
      </Wrapper>
    </Background>
  );
};
