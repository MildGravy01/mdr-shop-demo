import {
  Background,
  Chapter,
  Wrapper,
  ModalBackground,
  Preloader,
} from './style';
import rulesImg from 'img/Rules_Img.png';
import {Image} from './style';
import {translation} from '../../translations';
import DOMPurify from 'dompurify';
import HTMLReactParser from 'html-react-parser';
import {useSearchParams} from 'react-router-dom';
import {useState} from 'react';
import {Page, Modal} from 'components';
import {useRootStore} from '../../contexts';
import {history} from '../../router';
import {observer} from 'mobx-react-lite';
import { IRules } from 'types';

const sanitizeHTML = (html: string) => {
  return DOMPurify.sanitize(html, {
    USE_PROFILES: {html: true},
  });
};
export const Rules = observer(() => {
  const {rulesStore} = useRootStore();
  const {rules, userAgreement} = rulesStore;
  const [searchParams] = useSearchParams();
  const userAgreementState = searchParams.get('userAgreement');
  const [modal, setModal] = useState(userAgreementState != null);

  return (
    <Page title={translation.t('menu.rules')} description="Правила сервера MDR.
      Все правила сервера. IP: play.md-resorts.ru ">
      <Wrapper>
        <Modal
          isOpen={modal}
          closeHandler={() => {
            searchParams.delete('userAgreement');
            history.replace({search: searchParams.toString()});
            setModal(false);
          }}
        >
          <ModalBackground>
            <h1>Политика использования</h1>
            {userAgreement?.agreement}
          </ModalBackground>
        </Modal>
        <h1>{translation.t('rules.header')}</h1>
        <Background>
          <Image src={rulesImg} />
          {!rules && [1, 2, 3].map((el, index) =>
            <Preloader key={String(index)}/>)}
          {rules &&
            rules.map((rules: IRules) => (
              <Chapter key={rules.chapter}>
                {HTMLReactParser(sanitizeHTML(rules.chapter))}
              </Chapter>
            ))}
        </Background>
      </Wrapper>
    </Page>
  );
});
