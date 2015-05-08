import Dispatcher from '../dispatcher';
import CommentConstants from '../constants/Comment';

class CommentActions {
  getCommentsByArticle(id) {
    Dispatcher.dispatch({
      actionType: CommentConstants.GET_COMMENTS_BY_ARTICLE,
      id
    });
  }

  setActiveComment(comment) {
    console.log('Sending actions setActiveComment', comment);
    Dispatcher.dispatch({
      actionType: CommentConstants.ACTIVE_COMMENT_CHANGED,
      comment: comment
    });
  }
}

export default new CommentActions();
