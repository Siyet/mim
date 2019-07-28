import React, {PureComponent} from 'react';

import './BaseLayoutContent.less';

class BaseLayoutContent extends PureComponent<{}, {}> {
  render() {
    const {children} = this.props;

    return(
      <div className="content">
        {children}
      </div>
    );
  }
}

export {
  BaseLayoutContent,
};
