import React from 'react';
import moment from 'moment';

class SubredditSidebar extends React.Component {
  render() {
    return (
      <aside className="subreddit-Sidebar">
        <h1 className="text-center">
          {this.props.subreddit.title}

          <small className="pull-right">##Subscribe Button##</small>
        </h1>

        <hr />

        <dl>
          <dt>Subreddit For</dt>
          <dd>{this.getCreatedDate()}</dd>

          <dt>Subscribers</dt>
          <dd>{this.props.subreddit.subscribers}</dd>

          <dt>Active Subscribers</dt>
          <dd>{this.props.subreddit.accounts_active}</dd>

          <dt>NSFW</dt>
          <dd>{this.props.subreddit.over18 ? 'Yes': 'No'}</dd>

          <dt>Public</dt>
          <dd>{this.props.subreddit.public_traffic ? 'Yes' : 'No'}</dd>
        </dl>

        <blockquote dangerouslySetInnerHTML={this.getSubredditHtml()}></blockquote>
      </aside>
    );
  }

  getCreatedDate() {
    return moment().diff(moment(this.props.subreddit.created_utc * 1000), 'years') + ' years';
  }

  getSubredditHtml() {
    let divElement = document.createElement('div');

    divElement.innerHTML = this.props.subreddit.description_html;

    return {
      __html: divElement.childNodes.length ? this.alterSubredditHTML(divElement.childNodes[0].nodeValue) : ''
    };
  }

  alterSubredditHTML(html) {
    return html.replace('<table>', '<table class="table table-responsive">');
  }
}

SubredditSidebar.propTypes = {
  subreddit: React.PropTypes.object.isRequired
};

export default SubredditSidebar;
