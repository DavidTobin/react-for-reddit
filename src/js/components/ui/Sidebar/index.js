import React from 'react';

import NavigationMenu from '../../menu/Navigation';

class Sidebar extends React.Component {
  constructor() {
    super();

    this.state = {
      sticky: false
    };
  }

  render() {
    return (
      <aside className={this.getClassNames()} onClick={this.onClick.bind(this)}>
        <NavigationMenu />
      </aside>
    );
  }

  getClassNames() {
    let classNames = ['ui-Sidebar'];

    if (this.state.sticky) {
      classNames.push('sticky');
    }

    return classNames.join(' ');
  }

  onClick(e) {
    if (e.target.nodeName !== 'A') {
      this.setState({
        sticky: !this.state.sticky
      });
    }
  }
}

export default Sidebar;
