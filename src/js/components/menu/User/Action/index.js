import React from 'react';
import {Link} from 'react-router';
import ThreadActions from '../../../../actions/Thread';

class UserActionMenu extends React.Component {
  render() {
    return (
      <aside className="menu menu-UserAction">
        <ul>
          <li data-title="Refresh">
            <a className={this.getRefreshClassNames()} onClick={this.onClickRefresh.bind(this)}>
              <span className="glyphicon glyphicon-refresh"></span>
            </a>
          </li>
        </ul>

        <ul>
          <li data-title="Account">
            <Link to="home">
              <span className="glyphicon glyphicon-user"></span>
            </Link>
          </li>
          <li data-title="Messages">
            <a href="">
              <span className="glyphicon glyphicon-comment"></span>
            </a>
          </li>

          <li data-title="Mod">
            <a href="">
              <span className="glyphicon glyphicon-eye-open"></span>
            </a>
          </li>

          <li data-title="Settings">
            <Link to="user.settings">
              <span className="glyphicon glyphicon-cog"></span>
            </Link>
          </li>
        </ul>
      </aside>
    );
  }

  getRefreshClassNames() {
    let classNames = [];

    if (this.context.router.getCurrentPath() !== '/') {
      classNames.push('hide');
    }

    return classNames.join(' ');
  }

  onClickRefresh() {
    ThreadActions.getFrontpage();
  }
}

UserActionMenu.contextTypes = {
  router: React.PropTypes.func
};

export default UserActionMenu;
