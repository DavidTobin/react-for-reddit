import React from 'react';
import moment from 'moment';
import _ from 'lodash';

import ThreadImageThumbnail from '../../Image/Thumbnail';
import ThreadImageThumbnailExpandable from '../../Image/Thumbnail/Expandable';
import UserKarmaCircle from '../../../user/Karma/Circle';
import Loading from '../../../ui/Loading';
import {Link} from 'react-router';

class ThreadListItem extends React.Component {
  render() {
    if (!this.props.thread.id) {
      return (<Loading />);
    }

    return (
      <article className={this.getClassNames()} onClick={this.onClick.bind(this)}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-1">
              <div className="half-block center-block">
                <ThreadImageThumbnailExpandable>
                  <ThreadImageThumbnail src={this.props.thread.thumbnail} resolve={this.getResolvableImage()} />
                </ThreadImageThumbnailExpandable>
              </div>
            </div>

            <div className="col-md-9">
              <h1>
                <a href={this.props.thread.url}>{this.props.thread.title}</a>

                <small> ({this.props.thread.domain})</small>
              </h1>

              <p className="text-muted">
                {this.getDate(this.props.thread.created_utc)}
                &nbsp;by <Link to="home">{this.props.thread.author}</Link>
                &nbsp;to <Link to="home">/r/{this.props.thread.subreddit}</Link>
                &nbsp;-
                <small><strong>{this.props.thread.num_comments || 0}</strong></small> comments
              </p>
            </div>

            <div className="col-md-2 text-right">
              <UserKarmaCircle karma={this.props.thread.score} size="small" />
            </div>
          </div>

          {this.props.children}
        </div>
      </article>
    );
  }

  /**
   * Returns a list of classes to use on the base element
   */
  getClassNames() {
    let classNames = ['thread-ListItem'];

    return classNames.join(' ');
  }

  getDate(date) {
    return moment(date * 1000).fromNow();
  }

  getResolvableImage() {
    const resolvers = ['i.imgur.com'];

    return _.includes(resolvers, this.props.thread.domain) ? this.props.thread.url : '';
  }

  /**
   * Toggles expand mode
   */
  onClick() {
    // Open thread page
    if (this.props.thread.id) {
      this.context.router.transitionTo('thread', {
        id: this.props.thread.id
      });
    }
  }

  /**
   * Returns the view when expanded mode is toggled
   */
  getExpandedView() {
    return (
      <section className="thread-ListItem-expand">
        <div>## SELF TEXT ##</div>
        <div>## COMMENTS ##</div>
      </section>
    );
  }
}

ThreadListItem.propTypes = {
  thread: React.PropTypes.object.isRequired,
  children: React.PropTypes.any
};

ThreadListItem.contextTypes = {
  router: React.PropTypes.func
};

export default ThreadListItem;
