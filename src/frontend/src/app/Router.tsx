import React, {FunctionComponent} from 'react';
import {inject, observer} from 'mobx-react';
import {Route, Switch} from 'react-router';

import {IRoutesProps} from 'types/index';
import {PrivateRoute} from './PrivateRouter';

import {YandexMap} from 'components/YandexMap';
import {AuthFormWrapper} from 'components/AuthPage';
import {Registry} from 'components/Registry';
import {Employee} from 'components/Employee/Employee';

const Routes: FunctionComponent<IRoutesProps> = inject('routerStore')(observer(({routerStore}) => (
  <Switch location={routerStore!.location}>
    <PrivateRoute exact path="/" component={YandexMap}/>
    <PrivateRoute exact path="/registry" component={Registry}/>
    <PrivateRoute exact path="/employee" component={Employee}/>

    <Route exact path="/login" component={AuthFormWrapper}/>
  </Switch>
)));

export {
  Routes,
};
