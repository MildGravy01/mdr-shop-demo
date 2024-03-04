import {ShopStore} from '../pages/Shop/store';
export class RootStore {
  shopStore: ShopStore = new ShopStore(this);
}