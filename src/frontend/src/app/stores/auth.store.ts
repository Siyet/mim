import {routerStore} from '../App';
import {action, observable} from 'mobx';

class AuthStore {
  @observable user: any;
  @observable loaded = false;

  @action login = (data: any) => {
    this.user = data;
    this.toRoot();
  }

  toLogin = () => {
    return routerStore.history.replace('/login');
  }

  toRoot = () => {
    return routerStore.history.replace('/');
  }
}

export {
  AuthStore,
};
