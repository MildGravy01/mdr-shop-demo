/* eslint-disable react-hooks/exhaustive-deps */
import { SegmentedSelector as CategorySelector } from "../../components/SegmentedSelector";
import { Product } from "./components/Product";
import corousel from "../../img/corousel.png";
import { ProductModal } from "./components/ProductModal";
import { translation } from "../../translations";
import { Page } from "../../components/Page";
import { SuccessModal } from "./components/SuccesModal";
import { observer } from "mobx-react-lite";
import { useRootStore } from "../../contexts";
import { useEffect } from "react";
import history from "../../router/router";
import Confetti  from "react-confetti";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Wrapper,ProductHolder,StyledBody,ShopImageHolder,ShopImg, StyledBonus, StyledBonusHeader } from "./styles";

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
    activeSubCategory
  } = rootStore.shopStore;
  useEffect(() => {
    if(activeCategory){
      const location = "/shop/" + activeCategory.Category_id + (activeSubCategory ? "/" + activeSubCategory?.subcat_id : "") + history.location.search;
      history.replace(location);
    }
  },[activeCategory,activeSubCategory]);
  
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
          <div className="shopHeader" >
            <h1>{translation.t("pages.shop.header")}</h1>
            <CategorySelector
              items={categories}
              value={activeCategory?.Category_id}
              isLoading={!categories || categories?.length <= 0 }
              onChange={(value) => {
                setActiveCategory(value);
              }}
              defaultIndex={0}
            />
            {subCategories?.length > 0 &&
              <CategorySelector
                items={subCategories}
                value={activeSubCategory?.subcat_id}
                isLoading={subCategories?.length <= 0}
                onChange={(value) => setActiveSubCategory(value)}
                defaultIndex={0}
              />
              }
          {<StyledBonus>
            {filteredProducts?.[0].temporary === 0 && activeSubCategory?.subcat_id === "privilliges" && <StyledBonusHeader><FontAwesomeIcon icon="fa-regular fa-clock" width={20} height={20} /> {translation.t("pages.shop.purchaseForever")}</StyledBonusHeader>}
            {filteredProducts?.[0].inherited === 1 && <StyledBonusHeader><FontAwesomeIcon icon="fa-solid fa-angles-up" width={20} height={20} /> {translation.t("pages.shop.purchaseInheritance")}</StyledBonusHeader>}
            {activeCategory?.Category_id === "mysterybox" && <StyledBonusHeader><FontAwesomeIcon icon="fa-solid fa-star" width={20} height={20} /> {translation.t("pages.shop.mysteryboxAll")}</StyledBonusHeader>}
            {activeCategory?.Category_id === "mysterybox" && <StyledBonusHeader><FontAwesomeIcon icon="fa-solid fa-paw" width={20} height={20} /> {translation.t("pages.shop.mysteryboxDescription")}</StyledBonusHeader>}
            {activeSubCategory?.subcat_id === "money" && <StyledBonusHeader><FontAwesomeIcon icon="fa-solid fa-coins" width={20} height={20} /> {translation.t("pages.shop.platinumDescription")}</StyledBonusHeader>}
            {activeSubCategory?.subcat_id === "cases" && <StyledBonusHeader><FontAwesomeIcon icon="fa-solid fa-key" width={20} height={20} /> {translation.t("pages.shop.cases")}</StyledBonusHeader>}
          </StyledBonus>}
          </div>
          <ProductHolder length={filteredProducts?.length}>
            {filteredProducts?.length > 0 ? filteredProducts.map((element) => {
                  return (
                      <Product
                        key={element.product_id}
                        product={element}
                        onClick={() => {
                          setActiveProduct(element?.product_id);
                        }}
                      />
                  );
                })
              : ""}
            {!filteredProducts &&
              [1, 2, 3, 4, 5, 6].map((el, index) => (
              <Product key={index} isLoading={filteredProducts} />
              ))}
          </ProductHolder>
        </StyledBody>
        <ProductModal
          closeHandler={() => setActiveProduct(null)}
          isOpen={activeProduct}
        />
        {successPurchase && <Confetti />}
        <SuccessModal isOpen={successPurchase} closeHandler={() => closeSuccessModal()} />
      </Wrapper>
    </Page>
  );
});


