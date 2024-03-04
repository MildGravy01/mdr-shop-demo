/* eslint-disable new-cap */
import { 
   CheckOrderController, 
   CreateOrderController, 
   ProductsController, 
   TInfoType, 
   PromoController, 
   StatusController, 
   TStatusSource, 
   ContentController, 
   TContentType,
   ServerController
} from 'controllers';
import express from 'express';
const router = express.Router();

export class AppRouter {
    private ProductsController: ProductsController;
    private ContentController: ContentController;
    private CheckOrderController: CheckOrderController;
    private CreateOrderController: CreateOrderController;
    private PromoController: PromoController;
    private StatusController: StatusController;
    private ServerController: ServerController;

    constructor(
        ProductsController: ProductsController,
        ContentController: ContentController,
        CheckOrderController: CheckOrderController,
        CreateOrderController: CreateOrderController,
        PromoController: PromoController,
        StatusController: StatusController,
        ServerController: ServerController
        ) {
        this.ProductsController = ProductsController;
        this.ContentController = ContentController;
        this.CheckOrderController = CheckOrderController;
        this.CreateOrderController = CreateOrderController;
        this.PromoController = PromoController;
        this.StatusController = StatusController;
        this.ServerController = ServerController;

        //products
        router.get('/categories', (req: express.Request,res: express.Response) => 
           this.ProductsController.execute<TInfoType>(req,res,'getCategories'));
        router.get('/subcategories',(req: express.Request,res: express.Response) => 
           this.ProductsController.execute<TInfoType>(req,res,'getSubcategories'));
        router.get('/products', (req: express.Request,res: express.Response) => 
           this.ProductsController.execute<TInfoType>(req,res,'getProducts'))
        router.get('/tempMultipliers', (req: express.Request, res: express.Response) => 
           this.ProductsController.execute<TInfoType>(req,res,'getTempMultipliers'));
        // order   
        router.post('/createOrder', (req: express.Request, res: express.Response) => 
              this.CreateOrderController.execute(req,res));
        router.get('/checkPurchase', (req: express.Request, res: express.Response) => 
              this.CheckOrderController.execute(req,res));
        // promo
        router.get('/promo', (req: express.Request, res: express.Response) => this.PromoController.execute(req, res));
        // content
        router.get('/rules', (req: express.Request,res: express.Response) => 
           this.ContentController.execute<TContentType>(req, res, 'rules'));
        router.get('/userAgreement', (req: express.Request,res: express.Response) => 
           this.ContentController.execute<TContentType>(req, res, 'agreement'));
        router.get('/publicOffer', (req: express.Request,res: express.Response) => 
           this.ContentController.execute<TContentType>(req, res, 'publicOffer'));
        router.get('/img', (req: express.Request,res: express.Response) => 
           this.ContentController.execute<TContentType>(req, res, 'img'));
        //status
        router.post('/status/lava', (req: express.Request,res: express.Response) => 
        this.StatusController.execute<TStatusSource>(req, res, 'lava'));
        router.post('/status/anypay', (req: express.Request,res: express.Response) => 
        this.StatusController.execute<TStatusSource>(req, res, 'anypay'));
        
        //server
        router.get('/server/status', (req: express.Request, res: express.Response) => this.ServerController.execute(req,res));
      }
      get router (){
         return router;
      }
}

