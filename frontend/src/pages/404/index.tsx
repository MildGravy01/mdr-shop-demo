import {useNavigate} from 'react-router-dom';
import {Page, Button} from 'components';
import {translation} from '../../translations';
import {Background, StyledImage} from './style';
import png404 from 'img/404.png';

export const Page404 = () => {
  const navigate = useNavigate();
  return (
    <Page title={translation.t('pages.page404.text')}>
      <Background>
        <h1>404</h1>
        <h2>{translation.t('pages.page404.text')}</h2>
        <Button onClick={() => {
          navigate('/');
        }}>
          {translation.t('pages.page404.button')}
        </Button>
        <StyledImage src={png404} />
      </Background>


    </Page>
  );
};
