import {Modal, SaleBadge, PriceBadge, AmountSelector, Tooltip,Button } from 'components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import qiwi from 'img/qiwi.svg';
import anypay from 'img/anypay.svg';
import card from 'img/card.svg';
import mobile from 'img/mobile.svg';
import {translation} from '../../../../translations';
import {sanitize} from 'dompurify';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import HTMLReactParser from 'html-react-parser';
import {
  ModalBody,
  Header,
  CloseButton,
  InfoHolder,
  Description,
  FormHolder,
  PaymentHolder,
  PaymentImage,
  ImageHolder,
  StyledSelector,
  InputHolder,
  ProductImage,
} from './styles';
import {useEffect} from 'react';
import {colorize} from '../../../../utils/minecraftColors';
import {observer} from 'mobx-react-lite';
import {Input} from 'components';
import {useRootStore} from '../../../../contexts';
import { IModalProps } from 'components/types';

export const ProductModal = observer(({closeHandler}: Pick<IModalProps, 'closeHandler'>) => {
  const {
    activeProduct,
    activeSubCategory,
    userForm,
    userError,
    applyForPayment,
    setUserForm,
    setUserError,
    resetUserErrors,
    resetPromoValue,
    userPromoValue,
    setUserPromo,
  } = useRootStore().shopStore;

  useEffect(() => {
    setUserForm({...userForm, userPromo: '', userProductQuantity: 1});
    setUserPromo(undefined);
  }, []);

  const getDescriptionHeader = () => {
    switch (activeSubCategory?.type) {
      case 'cases':
        return translation.t('product.modal.case_contains');
      case 'command':
        return translation.t('product.modal.gives');
      default:
        return translation.t('product.modal.commands');
    }
  };

  const getMinHeight = () => {
    switch (activeSubCategory?.type) {
      case 'cases':
        return {modal: '300px', info: '150px'};
      case 'command':
        return {modal: '300px', info: '200px'};
      default:
        return {modal: '450px', info: '200px'};
    }
  };

  return (
    <Modal
      isOpen={activeProduct != null}
      closeHandler={closeHandler}
      onClose={resetUserErrors}
    >
      <ModalBody
        onClick={(e) => e.stopPropagation()}
        height={getMinHeight()?.modal}
      >
        <Header>
          <div>
            {activeProduct?.name}
            {activeProduct?.discount && (
              <SaleBadge fontSize={20}>{activeProduct?.discount}</SaleBadge>
            )}
          </div>
          <CloseButton onClick={() => closeHandler?.()}>
            <FontAwesomeIcon icon={faXmark} fontSize={'20px'} />
          </CloseButton>
        </Header>
        <InfoHolder height={getMinHeight()?.info}>
          <div className="commands">
            {getDescriptionHeader()}
            {activeProduct?.shortDescription && <Description style={{backgroundColor: '#212126'}}>
              {HTMLReactParser(
                  sanitize(colorize(activeProduct.shortDescription)),
              )}
            </Description>}
          </div>
          {!activeProduct?.countable &&
          activeSubCategory?.type === 'privillege' ? (
            <div className="possibilities">
              {translation.t('product.modal.possibilities')}
              {activeProduct && <Description>
                {HTMLReactParser(sanitize(activeProduct.shortDescription))}
              </Description>}
            </div>
          ) : (
            <ImageHolder>
              {' '}
              {activeProduct?.img && (
                <ProductImage
                  src={activeProduct.img}
                  countable={activeProduct?.countable}
                />
              )}
            </ImageHolder>
          )}
        </InfoHolder>
        <div className="price-holder">
          { activeProduct?.price &&
          <PriceBadge
            price={activeProduct?.price}
            amount={
              activeProduct?.countable ? userForm.userProductQuantity : undefined
            }
            sale={activeProduct?.discount}
            promo={userPromoValue}
          />}
          {activeProduct?.countable ? (
            <div style={{position: 'absolute', right: 40}}>
              <AmountSelector
                onChange={(value) =>
                  setUserForm({...userForm, userProductQuantity: +value})
                }
              />{' '}
            </div>
          ) : (
            ''
          )}
        </div>
        {activeProduct?.countable ||
        activeSubCategory?.type !== 'privillege' ? (
          ''
        ) : (
          <ProductImage src={activeProduct?.img} />
        )}
      </ModalBody>
      <ModalBody
        margin={'20px 0px 50px 0px'}
        height={'200px'}
        onClick={(e) => e.stopPropagation()}
      >
        <Header>{translation.t('product.modal.payment')}</Header>
        <FormHolder>
          <InputHolder>
            <Input
              label={translation.t('product.modal.username_label')}
              value={userForm.userName}
              onChange={(value) =>
                setUserForm({...userForm, userName: value})
              }
              error={userError.nameInput}
              isRequried
            ></Input>
          </InputHolder>
          <InputHolder>
            <Input
              label={translation.t('product.modal.email_label')}
              onChange={(value) =>
                setUserForm({...userForm, userEmail: value})
              }
              error={userError.emailInput}
              isRequried
            ></Input>
          </InputHolder>
        </FormHolder>
        <FormHolder>
          <InputHolder>
            <StyledSelector
              value={userForm?.userPaymentType}
              onSelect={(value) =>
                setUserForm({...userForm, userPaymentType: value})
              }
            >
              <Button data-value={'qiwi'} key={1} type="secondary">
                <Tooltip text={'Киви-кошелек'} position="top">
                  <PaymentImage src={qiwi} alt="" />
                </Tooltip>
              </Button>
              <Button data-value={'card'} key={2} type="secondary">
                <Tooltip text={'Банковскими картами через Киви'} position="top">
                  <PaymentImage src={card} alt="" />
                </Tooltip>
              </Button>
              <Button data-value={'anypay'} key={3} type="secondary">
                <Tooltip
                  text={'AdvCash,BTC,ETH,Tether и другие'}
                  position="top"
                >
                  <PaymentImage src={anypay} alt="" />
                </Tooltip>
              </Button>
              <Button data-value={'mobile'} key={4} type="secondary">
                <Tooltip
                  text={
                    // eslint-disable-next-line max-len
                    'На данный момент, мобильные платежи доступны только через Мегафон'
                  }
                  position="top"
                >
                  <PaymentImage src={mobile} alt="" />
                </Tooltip>
              </Button>
            </StyledSelector>
          </InputHolder>
          <InputHolder>
            <Input
              label={translation.t('product.modal.promo_label')}
              value={userForm.userPromo}
              onChange={(value) => {
                setUserForm({...userForm, userPromo: value});
                setUserError('promoInput', '');
                resetPromoValue();
              }}
              error={userError.promoInput}
            ></Input>
          </InputHolder>
        </FormHolder>
        <PaymentHolder>
          <Button
            type={'primary'}
            onClick={() => {
              applyForPayment();
              resetUserErrors();
            }}
          >
            {translation.t('product.modal.buy')}
          </Button>
          <br></br>
          {translation.t('product.modal.agreement_text')}
          <a href="/rules">{translation.t('product.modal.agreement_link')}</a>
        </PaymentHolder>
      </ModalBody>
    </Modal>
  );
});
