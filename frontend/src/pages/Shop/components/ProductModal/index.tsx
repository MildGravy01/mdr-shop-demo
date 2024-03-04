import {
  Modal,
  SaleBadge,
  PriceBadge,
  AmountSelector,
  Tooltip,
  Button,
  SegmentedControl,
  Input
} from "components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import anypay from "img/anypay.svg?url";
import lava from "img/lava.svg?url";
import { translation } from "../../../../translations";
import { sanitize } from "dompurify";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import HTMLReactParser from "html-react-parser";
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
} from "./styles";
import { useEffect } from "react";
import { colorize } from "../../../../utils/minecraftColors";
import { observer } from "mobx-react-lite";
import { useRootStore } from "../../../../contexts";
import { IModalProps } from "components/types";
import { TTempPricings } from "../../types";
import { getOldPrice } from "../../../../utils/helpers";
import { ITempMultipliers } from "types";

export const ProductModal = observer(
  ({ closeHandler }: Pick<IModalProps, "closeHandler">) => {
    const {
      activeProduct,
      activeSubCategory,
      userForm,
      userError,
      applyForPayment,
      setUserForm,
      setUserError,
      resetUserErrors,
      tempProductsMultiplier,
      resetPromoValue,
      userPromoValue,
      setUserPromo,
    } = useRootStore().shopStore;

    useEffect(() => {
      setUserForm("promo", "");
      setUserForm("productAmount", 1);
      setUserPromo(undefined);
    }, []);

    const getProductPrice = (oldPrice?: boolean): number => {
      let price = 0;
      if(activeProduct){
        price = activeProduct.tempPrice || activeProduct.price;
        if(userPromoValue){
          price = +(price - (price /100) * userPromoValue.value).toFixed(0);
        }
      }
      return price;
    }

    const getPreparedOldPrice = () => {
      if(activeProduct){
        let baseOldPrice = getOldPrice(activeProduct.price, activeProduct?.discount);
        if(!!activeProduct.temporary && userForm.durationChoice && tempProductsMultiplier){
          const multiplierKey: keyof ITempMultipliers = `${userForm.durationChoice}Multiplier` as keyof ITempMultipliers;
          if(userForm.durationChoice != "month"){
            baseOldPrice *= tempProductsMultiplier[multiplierKey];
          }
        }
        return baseOldPrice;
      }
      return 0;
    }

    const getDescriptionHeader = () => {
      switch (activeSubCategory?.type) {
        case "cases":
          return translation.t("product.modal.case_contains");
        case "command":
          return translation.t("product.modal.contains");
        default:
          return translation.t("product.modal.commands");
      }
    };

    const getMinHeight = () => {
      switch (activeSubCategory?.type) {
        case "cases":
          return { modal: "300px", info: "150px" };
        case "command":
          return { modal: "300px", info: "150px" };
        default:
          return { modal: "unset", info: "200px" };
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
              {!!activeProduct?.discount && (
                <SaleBadge fontSize={20}>{activeProduct?.discount}</SaleBadge>
              )}
            </div>
            <CloseButton onClick={() => closeHandler?.()}>
              <FontAwesomeIcon icon={faXmark} fontSize={"20px"} />
            </CloseButton>
          </Header>
          <InfoHolder height={getMinHeight()?.info}>
            {activeProduct?.fullDescription && (
              <div className="commands">
                {getDescriptionHeader()}
                <Description style={{ backgroundColor: "#212126" }}>
                  {HTMLReactParser(
                    sanitize(colorize(activeProduct.fullDescription))
                  )}
                </Description>
              </div>
            )}
            {!activeProduct?.countable &&
            activeSubCategory?.type === "privillege" ? (
              <div className="possibilities">
                {translation.t("product.modal.possibilities")}
                {activeProduct && (
                  <Description>
                    {HTMLReactParser(
                      sanitize(colorize(activeProduct.shortDescription))
                    )}
                  </Description>
                )}
              </div>
            ) : (
              <ImageHolder>
                {" "}
                {activeProduct?.img && (
                  <ProductImage
                    src={activeProduct.img}
                    countable={activeProduct?.countable}
                  />
                )}
              </ImageHolder>
            )}
          </InfoHolder>

          <div className="footerHolder">
            <div>
              {activeProduct?.price && (
                <PriceBadge
                  price={getProductPrice()}
                  oldPrice={getPreparedOldPrice()}
                  activated={!!userPromoValue}
                />
              )}
              {!!activeProduct?.temporary && (
                <div>
                  <SegmentedControl
                    className="temporarySelector"
                    items={[
                      { label: "На месяц", value: "month" },
                      { label: "На 3 месяца ", value: "threeMonth" },
                      { label: "Навсегда", value: "forever" },
                    ]}
                    onChange={(value) => setUserForm("durationChoice", value as TTempPricings)}
                  />
                </div>
              )}
            </div>
            {!!activeProduct?.countable && (
                <div>
                  <AmountSelector
                    onChange={(value) =>
                      setUserForm("productAmount", value)
                    }
                  />
                </div>
              )}

            {!!activeProduct?.countable ||
              (activeSubCategory?.type === "privillege" && (
                <ProductImage src={activeProduct?.img} />
              ))}
          </div>
        </ModalBody>
        <ModalBody
          margin={"20px 0px 50px 0px"}
          height={"200px"}
          onClick={(e) => e.stopPropagation()}
        >
          <Header>{translation.t("product.modal.payment")}</Header>
          <FormHolder>
            <InputHolder>
              <Input
                label={translation.t("product.modal.username_label")}
                value={userForm.name}
                onChange={(value) => setUserForm("name", value)
                }
                error={userError.nameInput}
                isRequried
              ></Input>
            </InputHolder>
            <InputHolder>
              <Input
                label={translation.t("product.modal.email_label")}
                onChange={(value) => setUserForm("email", value)}
                error={userError.emailInput}
                isRequried
              ></Input>
            </InputHolder>
          </FormHolder>
          <FormHolder>
            <InputHolder>
              <StyledSelector
                value={userForm?.paymentType}
                onSelect={(value) => setUserForm("paymentType", value)}
              >
                <Button data-value={"lava"} key={1} type="secondary">
                  <Tooltip
                    text={"Киви, банковские карты и Лава кошелек"}
                    position="top"
                  >
                    <PaymentImage src={lava} alt="" />
                  </Tooltip>
                </Button>
                <Button data-value={"anypay"} key={3} type="secondary">
                  <Tooltip
                    text={"AdvCash,BTC,ETH,Tether и другие"}
                    position="top"
                  >
                    <PaymentImage src={anypay} alt="" />
                  </Tooltip>
                </Button>
              </StyledSelector>
            </InputHolder>
            <InputHolder>
              <Input
                label={translation.t("product.modal.promo_label")}
                value={userForm.promo}
                onChange={(value) => {
                  setUserForm("promo", value);
                  setUserError("promoInput", "");
                  resetPromoValue();
                }}
                error={userError.promoInput}
              ></Input>
            </InputHolder>
          </FormHolder>
          <PaymentHolder>
            <Button
              type={"primary"}
              onClick={() => {
                applyForPayment();
                resetUserErrors();
              }}
            >
              {translation.t("product.modal.buy")}
            </Button>
            <br />
            {translation.t("product.modal.agreement_text")}
            <a href="/rules">{translation.t("product.modal.agreement_link")}</a>
            {translation.t("product.modal.agreement_and")}
            <a href="/publicOffer">
              {translation.t("product.modal.publicOffer_link")}
            </a>
          </PaymentHolder>
        </ModalBody>
      </Modal>
    );
  }
);
