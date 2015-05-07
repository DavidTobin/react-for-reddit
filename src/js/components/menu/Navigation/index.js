import React from 'react';
import {Link} from 'react-router';

class NavigationMenu extends React.Component {
  render() {
    return (
      <nav className="menu menu-Navigation">
        <ul>
          <li>
            <Link to="home">Frontpage</Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default NavigationMenu;
