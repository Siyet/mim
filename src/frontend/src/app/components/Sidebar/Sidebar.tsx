import React, {PureComponent} from 'react';

import './Sidebar.less';

class Sidebar extends PureComponent<{}, {}> {
  state = {
  
  };

  render() {
    const {children} = this.props;

    return(
      <aside className="sidebar">
        {children}
      </aside>
    );
  }
}

export {
  Sidebar,
};
