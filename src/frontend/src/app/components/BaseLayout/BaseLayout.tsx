import React, {FunctionComponent} from 'react';

import './BaseLayout.less';

import {BaseLayoutSidebar} from 'components/BaseLayoutSidebar';
import {BaseLayoutContent} from 'components/BaseLayoutContent';
import {BaseLayoutCard} from 'components/BaseLayoutCard';

const BaseLayout: FunctionComponent = ({children}): JSX.Element => {
  return (
    <div className="layout">
      <BaseLayoutSidebar/>
      <BaseLayoutContent>
          {children}
      </BaseLayoutContent>
      <BaseLayoutCard/>
    </div>
  );
};

export {
  BaseLayout,
};
