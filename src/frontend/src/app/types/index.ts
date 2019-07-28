import {RouterStore} from 'mobx-react-router';

interface IRoutesProps {
  routerStore?: RouterStore;
}

interface IMenuItem {
  key: string;
  title: string;
  link: string;
  icon: string;
}

export {
  IRoutesProps,
  IMenuItem,
};
