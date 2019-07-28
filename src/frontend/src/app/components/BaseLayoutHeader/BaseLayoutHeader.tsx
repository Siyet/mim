import React, {PureComponent} from 'react';

import './BaseLayoutHeader.less';
import {BaseLayoutSearch} from 'components/BaseLayoutSearch';

interface IHeaderProps {
  search: (value: string) => void;
}

class BaseLayoutHeader extends PureComponent<IHeaderProps, {}> {
  state = {
  
  };

  render() {
    return(
      <header className="header">
        <BaseLayoutSearch search={this.props.search}/>
      </header>
    );
  }
}

export {
  BaseLayoutHeader,
};
