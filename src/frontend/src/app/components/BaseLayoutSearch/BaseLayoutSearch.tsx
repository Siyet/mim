import React, {PureComponent} from 'react';

import './BaseLayoutSearch.less';
import {Icon} from 'antd';

interface ISearch {
  search: (value: string) => void;
}

class BaseLayoutSearch extends PureComponent<ISearch, {}> {
  state = {
    value: '',
  };

  input = (e) => {
    this.setState({
      value: e.target.value,
    });
  }

  search = () => {
    const {value} = this.state;

    this.props.search(value);
  }

  keyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const {value} = this.state;
      this.props.search(value);
    }
  }

  render() {
    return(
      <div className="base-search">
        <span className="base-search-field-wrapper">
          <input type="text" className="base-search-field" placeholder="Поиск по адресу"
                 onChange={this.input} onBlur={this.search} onKeyPress={this.keyPress}/>
          <span className="base-search-icon">
            <Icon type="search"/>
          </span>
        </span>
      </div>
    );
  }
}

export {
  BaseLayoutSearch,
};
