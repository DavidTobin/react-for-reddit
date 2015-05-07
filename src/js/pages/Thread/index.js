import React from 'react';

import ThreadListItem from '../../components/thread/List/Item';
import ThreadStore from '../../stores/Thread';
import ThreadActions from '../../actions/Thread';

class ThreadPage extends React.Component {
  constructor() {
    super();

    this.state = {
      thread: {}
    };

    this.onThreadStoreChange = this.onThreadStoreChange.bind(this);
  }

  componentDidMount() {
    ThreadStore.addChangeListener(this.onThreadStoreChange);

    if (!this.state.thread.id) {
      // Try get from cache
      this.onThreadStoreChange();

      if (!this.state.thread.id) {
        ThreadActions.getById(this.context.router.getCurrentParams().id);
      }
    }

    if (this.state.thread.id) {
      console.log('Get comments...');
    }
  }

  componentWillUnmount() {
    ThreadStore.removeChangeListener(this.onThreadStoreChange);
  }

  render() {
    return (
      <section className="page-Thread">
        <div className="container-fluid">
          <div className="row-fluid">
            <ThreadListItem thread={this.state.thread}>
              Hello world
            </ThreadListItem>
          </div>
        </div>
      </section>
    );
  }

  onThreadStoreChange() {
    this.setState({
      thread: ThreadStore.getById(this.context.router.getCurrentParams().id)
    });
  }
}

ThreadPage.contextTypes = {
  router: React.PropTypes.func
};

export default ThreadPage;
