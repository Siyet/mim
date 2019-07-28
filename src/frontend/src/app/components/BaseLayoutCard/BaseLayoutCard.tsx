import React, {PureComponent} from 'react';

import './BaseLayoutCard.less';
import {Spin} from 'antd';
import {inject, observer} from 'mobx-react';
import {AppStore} from 'stores/app.store';

interface IProps {
  appStore: AppStore;
}

@inject('appStore')
@observer
class BaseLayoutCard extends PureComponent<IProps, {}> {
  render() {
    const {elevator} = this.props.appStore;
    const el = elevator || {} as any;

    const {address, max_floor, mechanic_phone, type, error} = el;
    console.log(error);

    return(
      <>
        {
          el._id &&
          <div className="base-card-wrapper">
            <div className="base-card">
              <Spin spinning={false}>
                <div className="base-card-image">
                  <div className={'base-card-image-status ' + (error ? 'warning' : 'success')}/>
                </div>
                <div className="base-card-info">
                  <p className="base-card-info-title">{address}</p>
                  <p>
                    <span className="base-card-info-title">Модель: </span>{type}
                  </p>
                  <p>
                    <span className="base-card-info-title">Груз: </span>Нет
                  </p>
                  <p>
                    <span className="base-card-info-title">Этаж: </span>{max_floor}
                  </p>
                  <p>
                    <span className="base-card-info-title">Состояние: </span>Работает
                  </p>
                  <p>
                    <span className="base-card-info-title">Телефон механика: </span><br/>
                    {mechanic_phone}
                  </p>
                  {
                    error &&
                    <p>
                      <span className="base-card-info-title">Код ошибки: </span>{error}<br/>
                      (Отличие скорости открывания дверей от номинала на основании более 3 итераций)
                    </p>
                  }
                </div>
              </Spin>
            </div>
          </div>
        }
      </>
    );
  }
}

export {
  BaseLayoutCard,
};
