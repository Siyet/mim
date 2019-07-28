import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom';

import './NavItem.less';

interface INavItemProps {
  key?: any;
  title: string;
  link: string;
  icon: string;
}

class NavItem extends PureComponent<INavItemProps, {}> {
  render() {
    const {title, link, icon} = this.props;

    return(
      <Link to={link} title={title} className="nav-router-link">
        <li className={'nav-item' + ' ' + icon}/>
      </Link>
    );
  }
}

export {
  NavItem,
};
