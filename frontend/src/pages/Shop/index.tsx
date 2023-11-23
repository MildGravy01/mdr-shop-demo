import { ProductComponent as Product, SegmentedControl } from "components";
import corousel from "img/corousel.png";
import { ProductModal } from "./components/ProductModal";
import { translation } from "../../translations";
import { Page } from "../../components/Page";
import { SuccessModal } from "./components/SuccesModal";
import { observer } from "mobx-react-lite";
import { useRootStore } from "../../contexts";
import { useEffect } from "react";
import {history} from "../../router";
import Confetti from "react-confetti";
import { faAngleUp, faPaw, faStar, faCoins, faKey } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Wrapper,
  ProductHolder,
  StyledBody,
  ShopImageHolder,
  ShopImg,
  StyledBonus,
  StyledBonusHeader,
} from "./styles";
import { ISegmentedControlItem } from "components/types";

export const Shop = observer(() => {
  const rootStore = useRootStore();
  const {
    filteredProducts,
    setActiveCategory,
    setActiveSubCategory,
    setActiveProduct,
    categories,
    activeProduct,
    subCategories,
    activeCategory,
    successPurchase,
    closeSuccessModal,
    activeSubCategory,
  } = rootStore.shopStore;
  useEffect(() => {
    if (activeCategory) {
      const location =
        "/shop/" +
        activeCategory.id +
        (activeSubCategory ? "/" + activeSubCategory?.id : "") +
        history.location.search;
      history.replace(location);
    }
  }, [activeCategory, activeSubCategory]);

  return (
    <Page
      title={translation.t("menu.shop") + " -> " + activeCategory?.name}
      description={
        "Магазин майнкрафт сервера MDR. Здесь можно купить привилегии, кейсы, платину и многое другое!"
      }
    >
      <Wrapper>
        <StyledBody>
          <ShopImageHolder>
            <ShopImg src={corousel}></ShopImg>
          </ShopImageHolder>
          <div className="shopHeader">
            <h1>{translation.t("pages.shop.header")}</h1>
            <SegmentedControl
              items={categories.map(
                ({ id, name }) =>
                  ({ value: id, label: name } as ISegmentedControlItem)
              )}
              value={activeCategory?.id}
              isLoading={!categories || categories?.length <= 0}
              onChange={(value) => {
                setActiveCategory(value);
              }}
            />
            {subCategories?.length > 0 && (
              <SegmentedControl
              items={subCategories.map(
                ({ id, name }) =>
                  ({ value: id, label: name } as ISegmentedControlItem)
              )}
                value={activeSubCategory?.id}
                isLoading={subCategories?.length <= 0}
                onChange={(value) => setActiveSubCategory(value)}
              />
            )}
            {
              <StyledBonus>
                {filteredProducts?.[0].temporary &&
                  activeSubCategory?.type === "privillege" && (
                    <StyledBonusHeader>
                      <FontAwesomeIcon
                        icon={faClock}
                        width={20}
                        height={20}
                      />{" "}
                      {translation.t("pages.shop.purchaseForever")}
                    </StyledBonusHeader>
                  )}
                {filteredProducts?.[0].inherited && (
                  <StyledBonusHeader>
                    <FontAwesomeIcon
                      icon={faAngleUp}
                      width={20}
                      height={20}
                    />{" "}
                    {translation.t("pages.shop.purchaseInheritance")}
                  </StyledBonusHeader>
                )}
                {activeCategory?.id === "mysterybox" && (
                  <StyledBonusHeader>
                    <FontAwesomeIcon
                      icon={faStar}
                      width={20}
                      height={20}
                    />{" "}
                    {translation.t("pages.shop.mysteryboxAll")}
                  </StyledBonusHeader>
                )}
                {activeCategory?.id === "mysterybox" && (
                  <StyledBonusHeader>
                    <FontAwesomeIcon
                      icon={faPaw}
                      width={20}
                      height={20}
                    />{" "}
                    {translation.t("pages.shop.mysteryboxDescription")}
                  </StyledBonusHeader>
                )}
                {activeSubCategory?.type === "money" && (
                  <StyledBonusHeader>
                    <FontAwesomeIcon
                      icon={faCoins}
                      width={20}
                      height={20}
                    />{" "}
                    {translation.t("pages.shop.platinumDescription")}
                  </StyledBonusHeader>
                )}
                {activeSubCategory?.type === "cases" && (
                  <StyledBonusHeader>
                    <FontAwesomeIcon
                      icon={faKey}
                      width={20}
                      height={20}
                    />{" "}
                    {translation.t("pages.shop.cases")}
                  </StyledBonusHeader>
                )}
              </StyledBonus>
            }
          </div>
          <ProductHolder>
            {filteredProducts && filteredProducts.length > 0
              ? filteredProducts.map((element) => {
                  return (
                    <Product
                      key={element.id}
                      product={element}
                      onClick={() => {
                        setActiveProduct(element?.id);
                      }}
                    />
                  );
                })
              : ""}
            {!filteredProducts &&
              [1, 2, 3, 4, 5, 6].map((el, index) => (
                <Product key={index} product={undefined} />
              ))}
          </ProductHolder>
        </StyledBody>
        <ProductModal closeHandler={() => setActiveProduct(null)} />
        {successPurchase && <Confetti />}
        <SuccessModal
          isOpen={successPurchase}
          closeHandler={() => closeSuccessModal()}
        />
      </Wrapper>
    </Page>
  );
});
