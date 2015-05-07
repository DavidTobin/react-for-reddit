import React from 'react';
import ThreadListItem from './Item';
import ThreadStore from '../../../stores/Thread';
import ThreadActions from '../../../actions/Thread';
import Loading from '../../ui/Loading';

class ThreadList extends React.Component {
  constructor() {
    super();

    this.state = {
      threads: ThreadStore.getAll()
    };

    this.onThreadStoreChange = this.onThreadStoreChange.bind(this);
  }

  componentDidMount() {
    // Listen for changes
    ThreadStore.addChangeListener(this.onThreadStoreChange);
  }

  componentWillUnmount() {
    ThreadStore.removeChangeListener(this.onThreadStoreChange);
  }

  render() {
    if (this.state.threads.length) {
      return (
        <section className="thread-List">
          {this.state.threads.map((thread) => {
            return (
              <ThreadListItem thread={thread.data} key={thread.data.id} />
            );
          })}
        </section>
      );
    } else {
      return (
        <Loading />
      );
    }
  }

  onThreadStoreChange() {
    this.setState({
      threads: ThreadStore.getAll()
    });
  }
}

export default ThreadList;
