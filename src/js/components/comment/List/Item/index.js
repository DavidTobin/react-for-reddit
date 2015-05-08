import React from 'react';

import CommentListItemActionBar from './ActionBar';
import CommentActions from '../../../../actions/Comment';

class CommentListItemMore extends React.Component {
  render() {
    return (
      <p>More link...</p>
    );
  }
}

class CommentListItem extends React.Component {
  render() {
    return (
      <article className="comment-ListItem" onClick={this.onClick.bind(this)}>
        <CommentListItemActionBar comment={this.props.comment} />
        <div dangerouslySetInnerHTML={this.getCommentHtml()}></div>
      </article>
    );
  }

  getCommentHtml() {
    let divElement = document.createElement('div');
    divElement.innerHTML = this.props.comment.body_html;

    return {
      __html: this.props.comment.body_html ? divElement.childNodes[0].nodeValue : ''
    };
  }

  onClick() {
    CommentActions.setActiveComment(this.props.comment);
  }
}

CommentListItem.propTypes = {
  comment: React.PropTypes.object.isRequired
};

export default CommentListItem;
