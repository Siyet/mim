import React, {PureComponent} from 'react';

import './BaseLayoutSidebar.less';
import {BaseLayoutNav} from 'components/BaseLayoutNav/BaseLayoutNav';

class BaseLayoutSidebar extends PureComponent<{}, {}> {
  render() {
    return(
      <aside className="base-sidebar">
        <BaseLayoutNav/>
      </aside>
    );
  }
}

export {
  BaseLayoutSidebar,
};
