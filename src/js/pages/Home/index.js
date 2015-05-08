import React from 'react';

import ThreadList from '../../components/thread/List';
import ThreadActions from '../../actions/Thread';
import ThreadStore from '../../stores/Thread';

class HomePage extends React.Component {
  componentDidMount() {
    if (ThreadStore.getDataType() !== 'frontpage' || ThreadStore.getAll().length === 0) {
      ThreadActions.getFrontpage();
    }
  }

  render() {
    return (
      <section className="page-Home">
        <div className="container-fluid">
          <div className="row-fluid">
            <h1>Frontpage</h1>
          </div>

          <div className="row-fluid">
            <ThreadList type="frontpage" />
          </div>
        </div>
      </section>
    );
  }
}

export default HomePage;
