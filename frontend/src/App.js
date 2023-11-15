import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import './index.css';
import { RouterProvider } from 'react-router';
import API from './api'
import { RootStoreContext } from './contexts';
import { initApp } from './init';
import { router } from './router';

function App() {
  new API();
  library.add(fab,fas,far);
  const rootStore = initApp(router);

  return (
    <RootStoreContext.Provider value={rootStore}>
        <RouterProvider router={router} />    
    </RootStoreContext.Provider>
  );
}

export {App};

