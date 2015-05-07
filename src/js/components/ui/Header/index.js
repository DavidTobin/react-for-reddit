import React from 'react';
import SiteConfig from '../../../config/site';
import UserKarmaCircle from '../../user/Karma/Circle';
import {Link} from 'react-router';

class Header extends React.Component {
  render() {
    return (
      <header className="ui-Header">
        <div className="row">
          <div className="col-sm-12 col-md-8">
            <h1>
              <Link to="home">
                {SiteConfig.name}
              </Link>
            </h1>
          </div>

          <div className="col-sm-4 hidden-sm hidden-xs">
            <div className="text-right">
              <UserKarmaCircle karma={20} size="small" />
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
