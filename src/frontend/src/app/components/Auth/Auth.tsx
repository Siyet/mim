import React, {Component} from 'react';
import axios from 'axios';

import {Routes} from '../../Router';
import {inject, observer} from 'mobx-react';
import {AuthStore} from 'stores/auth.store';
import {AppStore} from 'stores/app.store';

interface IAuthProps {
  authStore?: AuthStore;
  appStore?: AppStore;
}

@inject('authStore')
@inject('appStore')
@observer
class Auth extends Component<IAuthProps, {}> {
  getElevatorInfo = () => {
    axios.get(`http://95.214.63.201:5984/status/_design/error/_view/by_lift_id/?reduce=false&include_docs=true&keys=["${encodeURIComponent('9040ae5ec3cd4dc30e21f5393c0014bf')}"]`)
      .then((res) => {
        const data = res.data.rows[0];
        this.props.appStore!.setElevatorWithError(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidMount() {
    setInterval(() => {
      this.getElevatorInfo();
    }, 1000);
  }

  render() {
    return (
      <Routes/>
    );
  }
}

export {
  Auth,
};
