import React, {PureComponent} from 'react';

import './ElevatorCard.less';
import {AppStore} from 'stores/app.store';
import {inject, observer} from 'mobx-react';

interface IElevatorCardProps {
  appStore?: AppStore;
}

@inject('appStore')
@observer
class ElevatorCard extends PureComponent<IElevatorCardProps, {}> {
  render() {
    const {elevatorInMap} = this.props.appStore!;

    return(
      <>
        {
          elevatorInMap &&
          <div className="card-wrapper">
            <div className="card">
              <div className="card-image"></div>
              <div className="card-info">
                <p className="card-info-title"></p>
                <p className="card-info-title"></p>
                <p>
                  <span className="card-info-title">Модель: </span>
                </p>
                <p>
                  <span className="card-info-title">Груз: </span>
                </p>
                <p>
                  <span className="card-info-title">Этаж: </span>
                </p>
                <p>
                  <span className="card-info-title">Состояние: </span>
                </p>
              </div>
            </div>
          </div>
        }
      </>
    );
  }
}

export {
  ElevatorCard,
};
