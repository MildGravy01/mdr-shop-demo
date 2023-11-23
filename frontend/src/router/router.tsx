import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import {About, Shop, Page404, Rules} from '../pages';
import {createBrowserHistory} from 'history';
import {PageLayout} from '../pages/Layout';

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<PageLayout />}>
          <Route index element={<Shop />} />
          <Route path="shop/:category" element={<Shop />} />
          <Route path="/shop/:category/:subcategory" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="*" element={<Page404 />} />
        </Route>,
    ),
);

const history = createBrowserHistory();
export {history};
