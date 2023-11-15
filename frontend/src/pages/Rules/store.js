import { observable,makeObservable, action } from "mobx";
import API from "../../api";


export class RulesStore{
    rules = null;
    userAgreement = null;

    constructor(){
        makeObservable(this, {
            rules: observable,
            userAgreement: observable,
            fetchRules: action.bound
        });
        this.fetchRules();
    }
    fetchRules = async () => {
       this.rules = (await API.get('/api/rules'))?.data;
       this.userAgreement = (await API.get('/api/user-agreement'))?.data;
    }
}