import React from 'react';
import UserActionMenu from '../../menu/User/Action';

class UserActionBar extends React.Component {
  render() {
    return (
      <aside className="user-ActionBar clearfix">
        <div className="container-fluid">
          <div className="row-fluid">
            <div className="col-md-4 hidden-sm hidden-xs">
              <input type="search" placeholder="Search.." />
            </div>

            <div className="col-xs-12 col-sm-12 col-md-8 text-right">
              <UserActionMenu />
            </div>
          </div>
        </div>
      </aside>
    );
  }
}

export default UserActionBar;
