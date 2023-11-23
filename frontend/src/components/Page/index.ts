import {useEffect} from 'react';
import { IPageProps } from './types';

export const Page = ({title, description, keywords, children}: IPageProps) => {
  useEffect(() => {
    document.title = title;
    if(keywords){
      document.querySelector("meta[name=keywords]")?.setAttribute("content", keywords);
    }if(description){
      document.querySelector("meta[name=keywords]")?.setAttribute("content", description);
    }
  }, [title, description, keywords]);

  return children;
};
