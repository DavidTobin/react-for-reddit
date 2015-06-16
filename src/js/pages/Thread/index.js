import React from 'react';

import ThreadListItem from '../../components/thread/List/Item';
import ThreadStore from '../../stores/Thread';
import CommentStore from '../../stores/Comment';
import ThreadActions from '../../actions/Thread';
import CommentList from '../../components/comment/List';

class ThreadPage extends React.Component {
  constructor() {
    super();

    this.state = {
      thread: {},
      activeComment: {}
    };

    this.onThreadStoreChange              = this.onThreadStoreChange.bind(this);
    this.onThreadStoreActiveCommentChange = this.onThreadStoreActiveCommentChange.bind(this);
  }

  componentDidMount() {
    ThreadStore.addChangeListener(this.onThreadStoreChange);
    CommentStore.addActiveCommentChangeListener(this.onThreadStoreActiveCommentChange);

    if (!this.state.thread.id) {
      // Try get from cache
      this.onThreadStoreChange();

      if (!this.state.thread.id) {
        ThreadActions.getById(this.context.router.getCurrentParams().id);
      }
    }
  }

  componentWillUnmount() {
    ThreadStore.removeChangeListener(this.onThreadStoreChange);
    CommentStore.removeActiveCommentChangeListener(this.onThreadStoreActiveCommentChange);
  }

  render() {
    return (
      <section className="page-Thread">
        <div className="container-fluid">
          <div className="row-fluid">
            <ThreadListItem thread={this.state.thread}>
              <img height={400} src={this.state.thread.url + '.jpg'} />

              <div className="row">
                <div className="col-sm-6">
                  <CommentList thread={this.state.thread} />
                </div>

                <div className="col-sm-6">
                  <CommentList thread={this.state.activeComment} child={true} />
                </div>
              </div>
            </ThreadListItem>
          </div>
        </div>
      </section>
    );
  }

  onThreadStoreActiveCommentChange() {
    this.setState({
      activeComment: CommentStore.getActiveComment()
    });
  }

  onThreadStoreChange() {
    this.setState({
      thread: ThreadStore.getById(this.context.router.getCurrentParams().id)
    });

    console.log(this.state);
  }
}

ThreadPage.contextTypes = {
  router: React.PropTypes.func
};

export default ThreadPage;
