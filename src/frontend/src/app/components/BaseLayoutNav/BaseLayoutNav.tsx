import React, {PureComponent} from 'react';

import './BaseLayoutNav.less';
import {IMenuItem} from 'types/index';
import {BaseLayoutNavItem} from 'components/BaseLayoutNavItem/BaseLayoutNavItem';
import {routerStore} from '../../App';

class BaseLayoutNav extends PureComponent<{}, {}> {
  menu: IMenuItem[] = [
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
      link: '/employee',
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

      links.push(<div key={key} className={classString}><BaseLayoutNavItem {...link}/></div>);
    });

    return (
      <nav className="nav">
        <ul className="nav-list">
          {links}
        </ul>
      </nav>
    );
  }
}

export {
  BaseLayoutNav,
};
