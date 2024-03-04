import {
  Background,
  Chapter,
  Wrapper,
  Preloader,
} from './style';
import rulesImg from 'img/Rules_Img.png';
import {Image} from './style';
import {translation} from '../../translations';
import DOMPurify from 'dompurify';
import HTMLReactParser from 'html-react-parser';
import {Page} from 'components';
import {observer} from 'mobx-react-lite';
import { IRules } from 'types';
import API from '../../api';
import { useEffect, useState } from 'react';
import { sanitizeHTML } from '../helpers';

export const Rules = observer(() => {
  const [rules, setRules] = useState<IRules[] | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const _rules = (await API.get('/api/rules'))?.data;
      setRules(_rules as IRules[]);
    }
    fetchData();
  },[]);
  

  return (
    <Page title={translation.t('rules.header')} description="Правила сервера MDR.IP: play.md-resorts.ru">
      <Wrapper>
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

