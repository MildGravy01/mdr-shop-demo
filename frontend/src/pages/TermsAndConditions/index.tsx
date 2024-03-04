import {
  Background,
  Chapter,
  Wrapper,
  ModalBackground,
  Preloader,
} from './style';
import postofficer from 'img/postofficer.png';
import {Image} from './style';
import {translation} from '../../translations';
import {Page, Modal} from 'components';
import {observer} from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import API from '../../api';
import { IDocument } from 'types';

export const TermsAndConditions = observer(() => {
  const [userAgreement, setUserAgreement] = useState<IDocument | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const agreement = (await API.get('/api/userAgreement'))?.data;
      setUserAgreement(agreement as IDocument);
    }
    fetchData();
  },[]);
  return (
    <Page title={translation.t('menu.rules')} description="Условия использования">
      <Wrapper>
        <h1>{translation.t('terms.header')}</h1>
        <Background>
          <Image src={postofficer} />
          {!userAgreement ? (<Preloader />): <Chapter>
               <h2>Политика использования</h2>
                <pre>
                   {userAgreement?.text}
                </pre>
              </Chapter> }
        </Background>
      </Wrapper>
    </Page>
  );
});
