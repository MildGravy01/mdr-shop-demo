import {ProductsModel} from '../database/models';

export class ProductService {
  ProductsModel: ProductsModel;

  constructor(ProductsModel: ProductsModel) {
    this.ProductsModel = ProductsModel;
  }
  getFilteredProducts = async (category: string, subcategory: string) => {
    if (!category) {
      throw new Error('no category provided');
    }
    const products = await this.ProductsModel.getProducts();
    let filteredProducts: any = null;
    if (!subcategory) {
      filteredProducts = products.filter(
          (value: any) => value.Category_id === category,
      );
    } else {
      filteredProducts = products.filter(
          (value: any) =>
            value.Category_id === category && value.subcat_id === subcategory,
      );
    }
    if (Array.isArray(filteredProducts)) {
      const finalProducts = await Promise.all(filteredProducts.map(async (product, index) => {
        let descCommands = '';
        if (product?.inherited) {
          const clone = filteredProducts.slice(0, index + 1);
          if(clone?.length){
            for (let i = 0; i < clone?.length; i++) {
              descCommands += clone[i]?.desc_commands + '<br>';
            }
          }
        }
        const finalProduct = {
          id: product.product_id,
          name: product.name,
          shortDescription: product.desc_poss,
          fullDescription: descCommands ? descCommands : product.desc_commands,
          price: product.price,
          discount: product.discount,
          img: product.img,
          countable: !!product.countable,
          inherited: !!product.inherited,
          temporary: !!product.temporary,
        };
        return finalProduct;
      }));
      return finalProducts;
    }
  };

  getSubcategories = async (category: string) => {
    const result = await this.ProductsModel.getSubcategories(category);
    if (!result) {
      throw new Error('error: failed to get subcategories');
    }
    const preparedResult = result.map((el) => ({
      id: el.subcat_id,
      name: el.name,
      type: el.type,
    }));
    return preparedResult;
  };

  getCategories = async () => {
    const categories = await this.ProductsModel.getCategories();
    if (categories) {
      const preparedResult = categories.map((el) => ({
        id: el.Category_id,
        name: el.name,
      }));
      return preparedResult;
    }
  };

  getTempMultipliers = async () => {
    const tempMultipliers = await this.ProductsModel.getTempMultipliers();
    return tempMultipliers;
  };
}
