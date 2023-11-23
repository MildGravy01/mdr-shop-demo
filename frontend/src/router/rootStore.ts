import {RulesStore} from '../pages/Rules/store';
import {ShopStore} from '../pages/Shop/store';
export class RootStore {
  shopStore: ShopStore = new ShopStore(this);
  rulesStore: RulesStore = new RulesStore();
}