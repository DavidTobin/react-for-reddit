import Dispatcher from '../dispatcher';
import CommentConstants from '../constants/Comment';
import Store from './Store';
import {CommentApi} from '../api';
import _ from 'lodash';

class CommentStore extends Store {
  constructor() {
    super();

    this.activeComment = {};

    this.dispatcherIndex = Dispatcher.register((payload) => {
      switch (payload.actionType) {
        case CommentConstants.GET_COMMENTS_BY_ARTICLE:
          this.getCommentsByArticle(payload.id);
          break;

        case CommentConstants.ACTIVE_COMMENT_CHANGED:
          this.setActiveComment(payload.comment);
          break;
      }
    });
  }

  emitActiveCommentChanged() {
    this.emit(CommentConstants.ACTIVE_COMMENT_CHANGED);
  }

  addActiveCommentChangeListener(callback) {
    this.on(CommentConstants.ACTIVE_COMMENT_CHANGED, callback);
  }

  removeActiveCommentChangeListener(callback) {
    this.removeListener(CommentConstants.ACTIVE_COMMENT_CHANGED, callback);
  }

  setActiveComment(comment) {
    this.activeComment = comment || {};

    this.emitActiveCommentChanged();
  }

  hasActiveComment() {
    return !!this.activeComment;
  }

  getActiveComment() {
    return this.activeComment || {};
  }

  getCommentsByArticle(id) {
    CommentApi.getCommentsByArticle(id)
      .then((response) => {
        // Store data
        this.setData(response.comments);
        this.emitChange();
      });
  }

  getAll() {
    let comments = super.getAll();

    return _.map(comments, (comment) => {
      return comment.kind === 't1' ? comment.data : {};
    });
  }

  getChildComments(comment) {
    if (!comment.replies || comment.replies.kind === 'more') {
      return [];
    }

    return comment.replies.data.children;
  }

  getMoreLink() {
    return _.map(this.data, (comment) => (comment.kind === 'more'));
  }

  removeData() {
    super.removeData();

    this.activeComment = {};
  }
}

export default new CommentStore();
