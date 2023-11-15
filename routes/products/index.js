import express, { response } from "express";
import { getCategories, getSubcategories, getProducts, getPromo, getOrder } from "../../dataBase/queries.js";
import { validatePromo } from "../../helpers/index.js";

export const products = express.Router();

products.get('/img', (request,response) => {
    response.set('Cache-control', 'public, max-age=5000');
    if(request.query.image_id){
        const __dirname = new URL('../../', import.meta.url).pathname;
        response.sendFile(__dirname + `/images/${request.query.image_id}`);
    }
});

products.get('/products', (req,response) => {
    const category = req.query?.category;
    const subcategory = req.query?.subcategory;
    if(!category){
        response.status(404).send("no category provided");
        console.error("NO CATEGORY PROVIDED")
        return;
    }
    getProducts().then(products => {
        let filteredProducts = null;
        if(!subcategory){
            filteredProducts = products.filter((value) => value.Category_id === category);
        } else {
            filteredProducts = products.filter(
                (value) =>
                  value.Category_id === category &&
                  value.subcat_id === subcategory
              );
        }
        if(Array.isArray(filteredProducts)){
            let finalProducts = filteredProducts.map((product, index) => {
                if(product?.inherited){
                    let desc_commands = "";
                    let finalProduct;
                    let clone = filteredProducts.slice(0, index +1);
                    for(let i = 0; i < clone.length;i++){
                        desc_commands += clone[i]?.desc_commands + '<br>';
                    }
                    if(desc_commands != undefined) {
                        finalProduct = {...product, desc_commands};
                    }
                    return finalProduct;
                } else {
                    return product;
                }
            });
            response.status(200).send(finalProducts);
        }

    },error=>{
        throw error;
    })
});

products.get('/categories', (req,response) => {
    getCategories.then(result => {
        response.send(result);
    },error=>{
        throw error;
    })
});

products.get('/subcategories',(req,response) => {
    getSubcategories(req.query.category).then(subcategories => {
        response.send(subcategories);
    },error=>{
        throw error;
    })
});

products.get('/promo',async (req, response) => {  // ?code=&product_id=
    validatePromo(req?.query?.product_id, req?.query?.code).then((value) => {
        response.status(200).send(value);
    }).catch( (error) => response.status(error?.status).send(error?.message));
});

products.get('/checkPurchase', async (req,response) => {
    try{
        const order = await getOrder(req?.query?.order_id);
        if(order){
            response.send({});
        } else {
            response.status(404).send("purchase not found");
        }
    } catch (E) {
        console.error(E);
    }
});