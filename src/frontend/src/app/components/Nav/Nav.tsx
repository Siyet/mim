import React, {PureComponent} from 'react';

import './Nav.less';
import {NavItem} from '../NavItem';
import {IMenuItem} from 'types/index';
import {routerStore} from '../../App';

class Nav extends PureComponent<{}, {}> {
  menu = [
    {
      key: 'map',
      title: 'Карта',
      link: '/',
      icon: 'map',
    },
    {
      key: 'registry',
      title: 'Реестр',
      link: '/registry',
      icon: 'registry',
    },
    {
      key: 'employee',
      title: 'Сотрудники организаций',
      link: '/employees',
      icon: 'employee',
    },
    {
      key: 'statistic',
      title: 'Статистика',
      link: '/statistic',
      icon: 'statistic',
    },
  ];

  render() {
    const {pathname} = routerStore.location;
    const links: JSX.Element[] = [];

    this.menu.forEach((link: IMenuItem, key: number) => {
      let classString = '';

      if (pathname === link.link) {
        classString += ' active';
      }

      if (pathname === '/' && link.link === '/messages') {
        classString += ' active';
      }

      links.push(<div key={key} className={classString}><NavItem {...link}/></div>);
    });

    return(
      <nav className="nav">
        <ul className="nav-list">
          {links}
        </ul>
      </nav>
    );
  }
}

export {
  Nav,
};
