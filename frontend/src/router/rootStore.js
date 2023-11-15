import { RulesStore } from '../pages/Rules/store.js';
import { ShopStore } from '../pages/Shop/store.js';
export class RootStore {
  shopStore = new ShopStore(this);
  rulesStore = new RulesStore();
  }