import React from 'react';
import CommentStore from '../../../stores/Comment';
import CommentActions from '../../../actions/Comment';
import CommentListItem from './Item';
import CommentListItemActionBar from './Item/ActionBar';
import Loading from '../../ui/Loading';

class CommentList extends React.Component {
  constructor() {
    super();

    this.state = {
      comments: []
    };

    this.onCommentStoreChange = this.onCommentStoreChange.bind(this);
  }

  componentDidMount() {
    if (!this.props.child) {
      CommentStore.addChangeListener(this.onCommentStoreChange);

      // Try get from cache
      this.onCommentStoreChange();

      if (this.state.comments.length === 0) {
        CommentActions.getCommentsByArticle(this.props.thread.id);
      }
    }
  }

  componentWillUnmount() {
    CommentStore.removeChangeListener(this.onCommentStoreChange);

    // Unset the data
    CommentStore.removeData();
  }

  render() {
    // Render a child comment list if we have the child prop
    if (this.props.child) {
      return (<CommentListChild thread={this.props.thread} child={true} />);
    }

    // Render loading if we have no data
    if (!this.props.child && !this.state.comments.length) {
      return (<Loading />);
    }

    return (
      <section className="comment-List">
        {this.state.comments.filter(this.filterNonComments).map((comment) => {
          return (<CommentListItem comment={comment} key={comment.id} />);
        })}
      </section>
    );
  }

  getCommentHtml(html) {
    let divElement = document.createElement('div');
    divElement.innerHTML = html;

    return {
      __html: html ? divElement.childNodes[0].nodeValue : ''
    };
  }

  filterNonComments(comment) {
    console.log(comment);
    return comment;
  }

  onCommentStoreChange() {
    this.setState({
      comments: CommentStore.getAll()
    });
  }
}

CommentList.propTypes = {
  thread: React.PropTypes.object,
  child: React.PropTypes.bool
};

class CommentListChild extends CommentList {
  render() {
    if (!CommentStore.hasActiveComment()) {
      return (<p className="bg-info">Click a comment to show its children</p>);
    }

    let comment = CommentStore.getChildComments(this.props.thread);
    if (comment.length === 0) {
      return (<p className="bg-info">This comment has no replies.</p>);
    }

    return (
      <section className="comment-List child">
        {this.getChildParentQuote()}

        {comment.filter(this.filterNonComments).map((comment) => {
          return (<CommentListItem comment={comment.data} key={'child_' + comment.data.id} />);
        })}
      </section>
    );
  }

  getChildParentQuote() {
    if (this.props.child) {
      return (
        <div className="text-center">
          <CommentListItemActionBar comment={this.props.thread} parent={true} />
          <blockquote dangerouslySetInnerHTML={this.getCommentHtml(this.props.thread.body_html)}></blockquote>
        </div>
      );
    }
  }
}

export {CommentList as default, CommentListChild};
