import React from 'react';

import ThreadList from '../../components/thread/List';
import ThreadActions from '../../actions/Thread';
import ThreadStore from '../../stores/Thread';
import {Previous, default as Next} from '../../components/pagination/PreviousNext';

class HomePage extends React.Component {
  render() {
    return (
      <section className="page-Home">
        <div className="container-fluid">
          <div className="row-fluid">
            <h1>
              Frontpage

              <span className="pull-right">
                <Previous />
                <Next />
              </span>
            </h1>
          </div>

          <div className="row-fluid">
            <ThreadList type={this.getDataType()} />
          </div>
        </div>
      </section>
    );
  }

  getDataType() {
    switch (this.context.router.getCurrentPath()) {
      case '/':
        return 'frontpage';

      case '/new':
        return 'new';
    }
  }
}

HomePage.contextTypes = {
  router: React.PropTypes.func
};

export default HomePage;
