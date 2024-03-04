import {translation} from '../../translations';
import PropTypes from 'prop-types';
import { IPriceBadgeProps } from './types';
import { PriceHolder, Background, CurrentPrice, OldPrice } from './styles';

export const PriceBadge = ({price, oldPrice, countable, activated,startingFrom } : IPriceBadgeProps) => {
  return (
    <PriceHolder>
      <Background activated={activated}>
        <CurrentPrice activated={activated}>
          {startingFrom && "от "}
          {price + " "}
          {translation.t('product.currency_symbol')}
        </CurrentPrice>
        {oldPrice && (
          <OldPrice>
            {oldPrice} {translation.t('product.currency_symbol')}
            {countable && translation.t('product.countable_price')}
          </OldPrice>
        )}
      </Background>
    </PriceHolder>
  );
};