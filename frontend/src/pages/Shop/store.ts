import {action, makeObservable, observable} from 'mobx';
import API from '../../api/';
import {history} from '../../router';
import {translation} from '../../translations';
import { RootStore } from 'src/router/rootStore';
import { ICategory, IProduct, ISubcategory } from 'types';
import { IUserError, IUserForm } from './types';
import { IPromo } from 'src/components/PriceBadge/types';

export class ShopStore {
  searchParams = new URLSearchParams(history.location.search);
  rootStore: RootStore;
  categories: ICategory[] = [];
  subCategories: ISubcategory[] = [];
  activeCategory?: ICategory | null = null;
  activeSubCategory?: ISubcategory | null = null;
  activeProduct: IProduct | null = null;
  filteredProducts: IProduct[] | null = [];

  userForm: IUserForm = {
    userName: '',
    userEmail: '',
    userPaymentType: 'qiwi',
    userPromo: '',
    userProductQuantity: 1,
  };

  userError: IUserError = {
    nameInput: '',
    emailInput: '',
    promoInput: '',
  };
  successPurchase = false;
  userPromoValue: IPromo | null = null;

  constructor(rootStore: RootStore) {
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
      setUserForm: action.bound,
    });
    this.fetchData();
  }
  fetchData = async () => {
    try {
      const categories = await API.getCategories();
      this.categories = categories;
      const URL = history.location.pathname.split('/');
      const categoryURL = URL[2];
      const subcategoryURL = URL[3];
      const productQuery = this.searchParams.get('product');
      const userQuery = this.searchParams.get('username');
      const afterPurchase = this.searchParams.get('purchase');
      if (userQuery) {
        this.userForm = {...this.userForm, userName: userQuery};
      }
      if (categoryURL) {
        this.setActiveCategory(categoryURL, subcategoryURL);
      } else {
        if (this.activeCategory == null) {
          this.setActiveCategory(categories[0].id);
        }
      }
      if (productQuery) {
        this.setActiveProduct(productQuery);
      }
      if (afterPurchase) {
        const purchase = await API.get('/api/checkPurchase');
        if (purchase?.status === 200) {
          this.successPurchase = true;
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  setActiveCategory = async (categoryID: string | number, subcategoryID?: string | number) => {
    this.filteredProducts = null;
    try {
      this.activeSubCategory = null;
      this.activeCategory = this?.categories.find(
          (el) => el.id === categoryID,
      );
      if(this.activeCategory){
        const subCategories = await API.getSubCategories(this.activeCategory);
        this.subCategories = subCategories;
        if (subcategoryID) {
          this.setActiveSubCategory(subcategoryID);
        } else {
          this.setActiveSubCategory(subCategories[0]?.id);
        }
        this.setFilteredProducts();
      }
    } catch (err) {
      console.error(err);
    }
  };

  setActiveSubCategory(subcategory: number | string) {
    this.filteredProducts = null;
    this.activeSubCategory = this?.subCategories.find(
        (el) => el.id === subcategory,
    );
    this.setFilteredProducts();
  }

  resetPromoValue() {
    this.userPromoValue = null;
  }

  async setActiveProduct(product: string | number | null) {
    if (!product) {
      this.searchParams.delete('product');
      history.push({search: this.searchParams.toString()});
    }
    if (!this.filteredProducts) {
      return;
    }
    const preProductPosition = await this.filteredProducts?.findIndex(
        (el) => el.id === product,
    );
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
    if (this.activeProduct && !this.searchParams.get('product')) {
      this.searchParams.append('product', String(this.activeProduct.id));
      history.push({search: this.searchParams.toString()});
    }
  }

  setFilteredProducts = async () => {
    if(this.activeCategory && this.activeSubCategory){
      this.filteredProducts = await API.getProducts(
        this.activeCategory,
        this.activeSubCategory,
    );
    }
  };

  setUserForm(value: IUserForm) {
    this.userForm = value;
  }

  setUserError(key: string, value: string) {
    this.userError = {...this.userError, [key]: value};
  }

  resetUserErrors() {
    this.userError = Object.keys(this.userError).reduce(
        (acc, curr) => ({...acc, [curr]: ''}),
        {},
    ) as IUserError;
  }

  setUserPromo = async (promo?: string) => {
    if (!promo) {
      this.userPromoValue = null;
      return;
    }
    try {
      if(this.activeProduct){
        const promoValue = await API.validatePromo(
          promo,
          this?.activeProduct?.id,
      );
      if (promoValue?.type === 'SALE') {
        this.userPromoValue = promoValue;
      }
      if (promoValue?.type === 'GIFT') {
        this.userPromoValue = {...promoValue, discount: 100};
      }
      }
    } catch (err) {
      switch (err) {
        case 'promo: expired':
          this.setUserError(
              'promoInput',
              translation.t('product.modal.errors.promo_expired'),
          );
          break;
        case 'promo: not found':
          this.setUserError(
              'promoInput',
              translation.t('product.modal.errors.promo_not_found'),
          );
          break;
        case 'promo: product not found':
          this.setUserError(
              'promoInput',
              translation.t('product.modal.errors.promo_wrong_product'),
          );
          break;
        default:
          this.setUserError(
              'promoInput',
              translation.t('product.modal.errors.promo_unavailable'),
          );
          break;
      }
    }
  };

  closeSuccessModal() {
    this.successPurchase = false;
    this.searchParams.delete('purchase');
    history.push({search: this.searchParams.toString()});
  }

  applyForPayment() {
    if (this?.userForm?.userPromo !== '' && this?.userPromoValue == null) {
      this.setUserPromo(this?.userForm.userPromo);
    } else {
      if(this.activeProduct){
        API.applyOrder({
          product_id: this.activeProduct.id, 
          price: this?.activeProduct?.price,
          quantity: this?.userForm?.userProductQuantity,
          player: this?.userForm?.userName,
          email: this?.userForm?.userEmail,
          promo_code: this?.userForm?.userPromo,
          payment_type: this?.userForm?.userPaymentType,
        }).then(
            (response) => {
              if (response.location) {
                window.location.assign(response.location);
              }
            },
            (err) => {
              switch (err) {
                case 'email: not valid':
                  this.setUserError(
                      'emailInput',
                      translation.t('product.modal.errors.not_valid_email'),
                  );
                  break;
                case 'player: not found':
                  this.setUserError(
                      'nameInput',
                      translation.t('product.modal.errors.player_not_found'),
                  );
                  break;
                case 'player: has inheritance':
                  this.setUserError(
                      'nameInput',
                      translation.t('product.modal.errors.purchase_isHigher'),
                  );
                  break;
                default:
              // todo snackbar
              }
            },
        );
      }
    }
  }
}
