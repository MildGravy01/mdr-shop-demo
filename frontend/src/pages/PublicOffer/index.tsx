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
import DOMPurify from 'dompurify';
import HTMLReactParser from 'html-react-parser';
import { sanitizeHTML } from '../helpers';

export const PublicOffer = observer(() => {
  const [publicOffer, setOffer] = useState<IDocument | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const offer = (await API.get('/api/publicOffer'))?.data;
      setOffer(offer as IDocument);
    }
    fetchData();
  },[]);
  return (
    <Page title={translation.t('terms.publicOffer')} description="Публичная оферта">
      <Wrapper>
        <h1>{translation.t('terms.publicOffer')}</h1>
        <Background>
          <Image src={postofficer} />
          {!publicOffer ? (<Preloader />): <Chapter>
                <pre>
                {HTMLReactParser(sanitizeHTML(publicOffer.text))}
                </pre>
              </Chapter> }
        </Background>
      </Wrapper>
    </Page>
  );
});
