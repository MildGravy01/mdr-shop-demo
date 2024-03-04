import { BaseModel } from "../BaseModel";
import { ICategory, IProduct, ISubcategory, ITempMultiplier } from "./types";

export class ProductsModel extends BaseModel {
  getCategory = async (CategoryId: string): Promise<ICategory> => {
    const result = await this.requestDb(`SELECT Category_id,name,Server_id FROM Category WHERE Category_id = ?`, [CategoryId]) as ICategory[];
    if (!result) {
      throw new Error('error: failed to get category');
    }
    return result[0];
  };

  getCategories = async (): Promise<ICategory[]> => {
    const result = await this.requestDb('SELECT Category_id,name,Server_id FROM Category ORDER BY `order` ASC') as ICategory[];
    if (!result) {
      throw new Error('error: failed to get categories');
    }
    return result;
  };

  getSubcategoryById = async (subcatId: string): Promise<ISubcategory> => {
    const result = await this.requestDb('SELECT * FROM Subcategory WHERE subcat_id=?', [subcatId]) as ISubcategory[];
    if (!result) {
      throw new Error('error: failed to get categories');
    }
    return result[0];
  };

  getSubcategories = async (category: string): Promise<ISubcategory[]> => { // написано через два запроса, чтобы не было sql-инъекций
    if (!category) {
      const subcategories = await this.requestDb('SELECT * FROM Subcategory ORDER BY \'order\'') as ISubcategory[];
      if (!subcategories) {
        throw new Error('error: failed to get subcategories');
      }
      return subcategories;
    }

    const categories = await this.getCategories() as ICategory[];
    if (!categories) {
      throw new Error('failed to get categories');
    }
    const filtered = categories.filter((categoryItem) => {
      return categoryItem.Category_id == category;
    });

    if (filtered?.length <= 0) {
      throw new Error('failed to filter categories');
    }

    const subcategories = await this.requestDb(
        `SELECT * FROM Subcategory AS subcategory
         LEFT JOIN Subcat_Category_Relation AS relations 
         ON(subcategory.subcat_id = relations.Subcategory_id)
          WHERE relations.Category_id=? ORDER BY subcategory.order`, [category]) as ISubcategory[];

    if (!subcategories) {
      throw new Error('error: failed to get subcategories');
    }
    return subcategories;
  };

  getProducts = async (): Promise<IProduct[]> => {
    const result = await this.requestDb('SELECT * FROM Product') as IProduct[];
    if (!result) {
      throw new Error('error: failed to get products');
    }
    return result;
  };

  getProductByID = async (id: string): Promise<IProduct> => {
    const result = await this.requestDb(`SELECT * FROM Product WHERE product_id=? LIMIT 1`, [id]) as IProduct[];
    if (!result) {
      throw new Error('error: failed to get product');
    }
    return result[0];
  };

  getTempMultipliers = async (): Promise<ITempMultiplier> => {
    const result = await this.requestDb(`SELECT * FROM TempProductsMultipliers`) as ITempMultiplier[];
    if (!result) {
      throw new Error('error: failed to get multipliers');
    }

    return result[0];
  };
}
