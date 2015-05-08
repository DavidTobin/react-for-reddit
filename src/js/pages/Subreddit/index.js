import React from 'react';

import ThreadActions from '../../actions/Thread';
import SubredditActions from '../../actions/Subreddit';
import SubredditStore from '../../stores/Subreddit';
import ThreadList from '../../components/thread/List';
import SubredditSidebar from '../../components/subreddit/Sidebar';

class SubredditPage extends React.Component {
  constructor() {
    super();

    this.state = {
      subreddit: {}
    };

    this.onSubredditStoreChange = this.onSubredditStoreChange.bind(this);
  }

  componentDidMount() {
    // Store listener
    SubredditStore.addChangeListener(this.onSubredditStoreChange);

    ThreadActions.getBySubreddit(this.props.params.subreddit);

    // Try get subreddit from cache
    this.onSubredditStoreChange();

    if (!this.state.subreddit.id) {
      SubredditActions.getAbout(this.props.params.subreddit);
    }
  }

  componentWillUnmount() {
    SubredditStore.removeChangeListener(this.onSubredditStoreChange);
  }

  componentDidUpdate() {
    ThreadActions.getBySubreddit(this.props.params.subreddit);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.subreddit !== this.props.subreddit || nextState !== this.state;
  }

  render() {
    return (
      <section className="page-Subreddit">
        <div className="container-fluid">
          <div className="row-fluid">
            <div className="col-md-12">
              <div data-title={this.state.subreddit.header_title}>
                <img src={this.state.subreddit.header_img} data-title={this.state.subreddit.header_title} />
              </div>
            </div>

            <div className="col-md-8">
              <ThreadList type="subreddit" subreddit={this.props.params.subreddit} />
            </div>

            <div className="col-md-4">
              <SubredditSidebar subreddit={this.state.subreddit} />
            </div>
          </div>
        </div>
      </section>
    );
  }

  onSubredditStoreChange() {
    console.log('Store changed', SubredditStore.getById(this.props.params.subreddit));
    this.setState({
      subreddit: SubredditStore.getById(this.props.params.subreddit)
    });
  }
}

SubredditPage.contextTypes = {
  router: React.PropTypes.func
};

export default SubredditPage;
