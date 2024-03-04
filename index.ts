import express from 'express';
import 'module-alias/register';
import path from 'path';
import { AppRouter } from './Router';
import dotenv from 'dotenv';
import { 
  ProductsController, 
  ContentController, 
  PromoController, 
  StatusController, 
  CheckOrderController, 
  CreateOrderController, 
  ServerController} from './controllers';
import { 
  OrderService, 
  AnypayStatusService,
  LavaStatusService,
  ContentService,
  ProductExecutorService,
  ProductService,
  PromoService, 
  RconService,
  SMTPService } from './services';
import { 
  ContentModel, 
  OrderModel, 
  PlayerModel, 
  ProductsModel, 
  PromoModel, 
  ServerModel, 
  devMode} from './database';

const PORT = process.env.PORT || 3001;
const app = express();
dotenv.config();
class MDRShopApp {
   private ContentModel: ContentModel = new ContentModel();
   private OrderModel: OrderModel = new OrderModel();
   private ProductsModel: ProductsModel = new ProductsModel();
   private PromoModel: PromoModel = new PromoModel();
   private ServerModel: ServerModel = new ServerModel();
   private PlayerModel: PlayerModel = new PlayerModel();

   private ContentService: ContentService = new ContentService(this.ContentModel);
   private ProductsService: ProductService = new ProductService(this.ProductsModel);
   private PromoService: PromoService = new PromoService(this.ProductsModel, this.PromoModel);
   private RconService: RconService = new RconService(this.ServerModel, this.ProductsModel, this.PlayerModel);
   private SMTPService: SMTPService = new SMTPService({login: process.env.USER_EMAIL ?? '', password: process.env.USER_PASSWORD ?? '', emailFrom: process.env.EMAIL_FROM ?? ''});
   private ProductExecutorService: ProductExecutorService = new ProductExecutorService(this.ProductsModel,this.PromoModel,this.OrderModel, this.SMTPService, this.RconService);
   private OrderService: OrderService = new OrderService(this.PlayerModel, this.ProductsModel, this.ServerModel, this.OrderModel,this.PromoService, this.ProductExecutorService);
   private AnypayService: AnypayStatusService = new AnypayStatusService(this.OrderModel, this.ProductExecutorService);
   private LavaService: LavaStatusService = new LavaStatusService(this.OrderModel, this.ProductExecutorService);

   private ServerController: ServerController = new ServerController();
   private ProductsController: ProductsController = new ProductsController(this.ProductsService);
   private ContentController: ContentController = new ContentController(this.ContentService);
   private PromoController: PromoController = new PromoController(this.PromoService);
   private StatusController: StatusController = new StatusController(this.LavaService, this.AnypayService);
   private CheckOrderController: CheckOrderController = new CheckOrderController(this.OrderService);
   private CreateOrderController: CreateOrderController = new CreateOrderController(this.OrderService);
   constructor (){
    app.use(express.urlencoded({extended: true}));
    app.use(express.json());
    app.use('/api', new AppRouter(this.ProductsController, this.ContentController, this.CheckOrderController, this.CreateOrderController, this.PromoController, this.StatusController, this.ServerController).router);
    app.listen(PORT, () => console.log('SERVER STARTED ON PORT', PORT, '\n'));
    if(!devMode){
      app.use(express.static('frontend/build'));
      app.get('*', function(req, res) {
        const __dirname = new URL('./', import.meta.url).pathname;
        res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
      });
      app.use('/sitemap.xml', (req, res) => {
        const __dirname = new URL('./', import.meta.url).pathname;
        res.sendFile(path.join(__dirname, 'sitemap.xml'));
      });
      app.use('/api/texturepack/survival', (req, res) => {
        const __dirname = new URL('./resourcepack', import.meta.url).pathname;
        res.sendFile(path.join(__dirname, 'survival.zip'));
      });
      app.use('/api/texturepack/grief', (req, res) => {
        const __dirname = new URL('./resourcepack', import.meta.url).pathname;
        res.sendFile(path.join(__dirname, 'grief.zip'));
      });
    }
   }
}
new MDRShopApp();





