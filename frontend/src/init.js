import { configure } from 'mobx';
import { RootStore } from './router';

function initMobX() {
    configure({ enforceActions: 'observed' });
}

export function initApp(router) {
    initMobX();
    return new RootStore(router);
}