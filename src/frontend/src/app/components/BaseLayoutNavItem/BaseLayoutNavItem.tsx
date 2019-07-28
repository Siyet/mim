import React, {PureComponent} from 'react';

import './BaseLayoutNavItem.less';
import {Link} from 'react-router-dom';
import {IMenuItem} from 'types/index';

class BaseLayoutNavItem extends PureComponent<IMenuItem, {}> {
  render() {
    const {title, link, icon} = this.props;

    return(
      <Link to={link} title={title} className="base-nav-router-link">
        <li className={'base-nav-item' + ' ' + icon}/>
      </Link>
    );
  }
}

export {
  BaseLayoutNavItem,
};
