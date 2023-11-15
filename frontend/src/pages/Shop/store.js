import {
  action,
  makeObservable,
  observable
} from "mobx";
import API from "../../api/index.js";
import history from "../../router/router.js";
import { translation } from "../../translations/index.js";

export class ShopStore {
  searchParams = new URLSearchParams(history.location.search);
  rootStore = null;
  categories = null;
  subCategories = null;
  activeCategory = null;
  activeSubCategory = null;
  activeProduct = null;
  filteredProducts = null;
  
  userForm = {
    userName: "",
    userEmail: "",
    userPaymentType: "qiwi",
    userPromo: "",
    userProductQuantity: 1
  };

  userError = {
    nameInput: "",
    emailInput: "",
    promoInput: "",
  };
  successPurchase = false;
  userPromoValue = null;

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeObservable(this, {
      activeCategory: observable,
      activeSubCategory: observable,
      activeProduct: observable,
      userForm: observable,
      userError: observable,
      userPromoValue: observable,
      successPurchase: observable,
      filteredProducts: observable,
      closeSuccessModal: action.bound,
      fetchData: action.bound,
      setActiveCategory: action.bound,
      setActiveSubCategory: action.bound,
      setActiveProduct: action.bound,
      setFilteredProducts: action.bound,
      setUserError: action.bound,
      resetPromoValue: action.bound,
      resetUserErrors: action.bound,
      applyForPayment: action.bound,
      setUserPromo: action.bound,
      setUserForm: action.bound
    });
    this.fetchData();
  }
  fetchData = async () => {
  
    try{
     const categories = await API.getCategories();
     this.categories = categories;
     const URL = history.location.pathname.split('/');
     const categoryURL = URL[2];
     const subcategoryURL = URL[3];
     const productQuery = this.searchParams.get('product');
     const userQuery = this.searchParams.get('username');
     const afterPurchase = this.searchParams.get('purchase');
     if(userQuery){
      this.userForm = {...this.userForm, userName: userQuery};
     }
     if(categoryURL){
      this.setActiveCategory(categoryURL, subcategoryURL);
     } else {
      if(this.activeCategory == null){
        this.setActiveCategory(categories[0].Category_id);
      }
     }
      if(productQuery){
        this.setActiveProduct(productQuery);
      } 
      if(afterPurchase){
        const purchase = await API.get("/api/checkPurchase"); 
        if(purchase?.status === 200){
          this.successPurchase = true;
        }
      }
    } catch (err){
      console.error(err);
    }
    
  };

  setActiveCategory = async (category, subcategoryID) => {
    this.filteredProducts = null;
    try {
      this.activeSubCategory = null;
      this.activeCategory = this?.categories.find(
        (el) => el.Category_id === category
      );
      const subCategories = await API.getSubCategories(this.activeCategory);
      this.subCategories = subCategories;
      if(subcategoryID){
        this.setActiveSubCategory(subcategoryID);
      } else {
        this.setActiveSubCategory(subCategories[0]?.subcat_id);
      }
      this.setFilteredProducts();
    } catch (err) {
      console.error(err);
    }
  };

  setActiveSubCategory(subcategory) {
    this.filteredProducts = null;
    this.activeSubCategory = this?.subCategories.find(
      (el) => el.subcat_id === subcategory
    );
    this.setFilteredProducts();
  }

  resetPromoValue() {
    this.userPromoValue = null;
  }

  async setActiveProduct(product) {
    if(!product){
      this.searchParams.delete("product");
      history.push({search: this.searchParams.toString()});
    }
    if(!this.filteredProducts){
      return;
    }
    const preProductPosition = await this.filteredProducts?.findIndex((el) => el.product_id === Number(product));
    const preProduct = this.filteredProducts[preProductPosition];
    // if(preProduct?.inherited) {
    //   let desc_commands = "";
    //   preProduct.desc_commands = "";
    //   for(let i = 0; i <= preProductPosition; i++){
    //     let description = this.filteredProducts[i]?.desc_commands;
    //     if(description && !desc_commands.includes(description)){
    //       desc_commands += description + "<br>";
    //     }
    //   }
    //   preProduct.desc_commands = desc_commands;
    // }
    this.activeProduct = preProduct;
    if(this.activeProduct && !this.searchParams.get("product")){
      this.searchParams.append("product", this.activeProduct.product_id);
      history.push({search: this.searchParams.toString()});
    }
  }

  setFilteredProducts = async () => {
    this.filteredProducts = await API.getProducts(this.activeCategory,this.activeSubCategory);
  };

  setUserForm(value) {
    this.userForm = value;
  }

  setUserError(key, value){
    this.userError = {...this.userError, [key]: value};
  }

  resetUserErrors(){
    this.userError = Object.keys(this.userError).reduce((acc, curr) => ({...acc, [curr]: ""}), {});
  }

  setUserPromo = async (promo) => {
    if(!promo) {
        this.userPromoValue = null;
        return;
    }
    try{
      const promoValue = await API.validatePromo(promo,this?.activeProduct?.product_id);
      if(promoValue?.type === "SALE"){
        this.userPromoValue = promoValue;
      }
      if(promoValue?.type === "GIFT"){
        this.userPromoValue = {...promoValue, discount: 100};
      }
    } catch(err) {
      switch (err){
        case "promo: expired":
          this.setUserError("promoInput",translation.t("product.modal.errors.promo_expired"));
        break;
        case "promo: not found":
          this.setUserError("promoInput",translation.t("product.modal.errors.promo_not_found"));
          break;
        case "promo: product not found":
          this.setUserError("promoInput",translation.t("product.modal.errors.promo_wrong_product"));
          break;
        default:
          this.setUserError("promoInput",translation.t("product.modal.errors.promo_unavailable"));
          break; 
      }
    }
  }

  closeSuccessModal() {
    this.successPurchase = false;
    this.searchParams.delete('purchase');
    history.push({search: this.searchParams.toString()});
  }

  applyForPayment(errorHandler){
    if(this?.userForm?.userPromo !== "" && this?.userPromoValue == null) {
        this.setUserPromo(this?.userForm.userPromo);
    } else {
          API.applyOrder({
                product_id: this?.activeProduct?.product_id,
                price: this?.activeProduct?.price,
                quantity: this?.userForm?.userProductQuantity,
                player: this?.userForm?.userName,
                email: this?.userForm?.userEmail,
                promo_code: this?.userForm?.userPromo,
                payment_type: this?.userForm?.userPaymentType
              }).then(
                (response) => {
                  if (response.location) {
                    window.location.assign(response.location);
                  }
                }, (err) => {
                  switch (err){
                    case "email: not valid":
                      this.setUserError("emailInput",translation.t("product.modal.errors.not_valid_email"));
                      break;
                    case "player: not found":
                      this.setUserError("nameInput", translation.t("product.modal.errors.player_not_found"));
                      break;
                    case "player: has inheritance":
                      this.setUserError("nameInput", translation.t("product.modal.errors.purchase_isHigher"));  
                      break;
                    default:
                      //todo snackbar
                  }
                }
        );
    }
  }
}
