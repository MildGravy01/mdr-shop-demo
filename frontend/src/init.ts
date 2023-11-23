import {configure} from 'mobx';
import {RootStore} from './router';

function initMobX() {
  configure({enforceActions: 'observed'});
}

export function initApp() {
  initMobX();
  return new RootStore();
}
