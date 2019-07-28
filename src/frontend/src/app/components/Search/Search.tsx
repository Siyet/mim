import React, {PureComponent} from 'react';

import './Search.less';

import {Icon} from 'antd';

import {YandexService} from 'services/yandex.service';

interface IProps {
  callBack: (pos: any) => void;
}

class Search extends PureComponent<IProps, {}> {
  state = {
    value: '',
  };

  yandexService: YandexService = new YandexService();

  setSearchValue = (stateProperty: string) => (e) => {
    this.setState({
      [stateProperty]: e.target.value,
    });
  }

  blur = () => {
    const address = this.state.value;

    if (address) {
      this.yandexService.getByAddress(address)
        .then((response) => {
          if (response.status === 200) {
            console.log(response);
            return response.data.response.GeoObjectCollection.featureMember;
          }

          Promise.reject('Ошибка');
        })
        .then((response) => {
          return response[0];
        })
        .then((response) => {
          return response.GeoObject.Point.pos;
        })
        .then((point) => {
          return point;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  keyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      const address = this.state.value;

      if (address) {
        this.yandexService.getByAddress(address)
          .then((response) => {
            console.log(response);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }

  render() {
    return (
      <div className="search">
        <span className="search-field-wrapper">
          <input type="text" className="search-field" placeholder="Поиск по адресу"
                 onChange={this.setSearchValue('value')} onBlur={this.blur} onKeyPress={this.keyPress}/>
          <span className="search-icon">
            <Icon type="search"/>
          </span>
        </span>
      </div>
    );
  }
}

export {
  Search,
};
