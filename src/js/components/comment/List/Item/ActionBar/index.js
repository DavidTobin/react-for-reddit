import React from 'react';
import moment from 'moment';

class CommentListItemActionBar extends React.Component {
  render() {
    return (
      <aside className={this.getClassNames()}>
        <div className="row">
          <div className="col-md-6">
            <strong>{this.props.comment.author}</strong>

            &nbsp;<small className="text-muted">({this.props.comment.score} points)</small>
          </div>

          <div className="col-md-3">
            <small>Posted: {this.getDate()}</small>
          </div>

          <div className="col-md-3 text-right">
            <small><strong>{this.props.comment.replies ? this.props.comment.replies.data.children.length : 0} replies</strong></small>
          </div>
        </div>
      </aside>
    );
  }

  getClassNames() {
    let classNames = ['comment-ListItemActionBar'];

    if (this.props.parent) {
      classNames.push('parent');
    }

    return classNames.join(' ');
  }

  getDate() {
    return moment(this.props.comment.created_utc * 1000).fromNow();
  }
}

CommentListItemActionBar.propTypes = {
  comment: React.PropTypes.object.isRequired,
  parent: React.PropTypes.bool
};

export default CommentListItemActionBar;
