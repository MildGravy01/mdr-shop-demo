import {translation} from '../../translations';
import PropTypes from 'prop-types';
import { IPriceBadgeProps } from './types';
import { PriceHolder, Background, CurrentPrice, OldPrice } from './styles';

export const PriceBadge = ({price, sale, promo, amount = 1} : IPriceBadgeProps) => {
  return (
    <PriceHolder>
      <Background promo={promo}>
        <CurrentPrice promo={promo}>
          {promo?.discount ?
            (amount ?
                +price * amount -
                  ((+price * amount) / 100) * +promo?.discount :
                +price - (+price / 100) * +promo?.discount
            ).toFixed(0) :
            (amount ? price * amount : price).toFixed(0)}{' '}
          {translation.t('product.currency_symbol')}
        </CurrentPrice>
        {(sale || promo) && (
          <OldPrice>
            {getOldPrice(price, sale || promo?.discount)} ₽
            {amount > 1 && translation.t('product.countable_price')}
          </OldPrice>
        )}
      </Background>
    </PriceHolder>
  );
};

const getOldPrice = (price: number, sale: number = 0) => {
  return ((price / (100 - sale)) * 100).toFixed(0);
};