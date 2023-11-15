import React, { useContext } from 'react';

// ---------- RootStoreContext ----------
export const RootStoreContext = React.createContext(
    undefined
);

// ---------- useRootStore ----------
export function useRootStore() {
    const rootStore = useContext(RootStoreContext);
    if (rootStore === undefined) {
        /* istanbul ignore next */
        throw new Error('useRootStore must be used within a RootStoreProvider');
    }
    return rootStore;
}