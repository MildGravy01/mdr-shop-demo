import {observable, makeObservable, action} from 'mobx';
import API from '../../api';
import { IAgreement, IRules } from 'types';


export class RulesStore {
  rules: IRules[] | null = null;
  userAgreement: IAgreement | null = null;

  constructor() {
    makeObservable(this, {
      rules: observable,
      userAgreement: observable,
      fetchRules: action.bound,
    });
    this.fetchRules();
  }
  fetchRules = async () => {
    this.rules = (await API.get('/api/rules'))?.data;
    this.userAgreement = (await API.get('/api/user-agreement'))?.data;
  };
}
