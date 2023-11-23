import {Outlet} from 'react-router';
import {Footer, Header} from '../../components/Header';

export const PageLayout = () => {
  return (
    <div id="modal-root">
      <Header />
      <Outlet/>
      <Footer />
    </div>
  );
};
