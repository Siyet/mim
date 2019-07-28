import 'assets/less/index.less';

import React, {Component} from 'react';
import {Router} from 'react-router';

import {LocaleProvider} from 'antd';
import ruRU from 'antd/lib/locale-provider/ru_RU';
import {Provider} from 'mobx-react';
import {RouterStore, syncHistoryWithStore} from 'mobx-react-router';
// import createBrowserHistory from 'history/createBrowserHistory';
import * as historyPkg from 'history';

import {AppStore} from 'stores/app.store';
import {AuthStore} from 'stores/auth.store';

import {Auth} from 'components/Auth';

export const routerStore = new RouterStore();
export const appStore = new AppStore();
export const authStore = new AuthStore();

const stores = {
  routerStore,
  appStore,
  authStore,
};
const browserHistory = historyPkg.createBrowserHistory();
const history = syncHistoryWithStore(browserHistory, routerStore);

class App extends Component<{}, {}> {
  render() {
    return (
      <LocaleProvider locale={ruRU}>
        <Provider {...stores}>
          <Router history={history}>
            <Auth/>
          </Router>
        </Provider>
      </LocaleProvider>
    );
  }
}

export {
  App,
};
