import Dispatcher from '../dispatcher';
import ThreadConstants from '../constants/Thread';
import Store from './Store';
import {ListingsApi, ThreadApi} from '../api';

class ThreadStore extends Store {
  constructor() {
    super();

    this.setData([]);

    this.dispatcherIndex = Dispatcher.register((payload) => {
      switch (payload.actionType) {
        case ThreadConstants.GET_FRONTPAGE:
          this.setDataType('frontpage');
          this.getFrontpage(payload.params);
          break;

        case ThreadConstants.GET_BY_SUBREDDIT:
          this.setDataType('subreddit');
          this.getThreadBySubreddit(payload.subreddit);
          break;

        case ThreadConstants.GET_BY_ID:
          this.getThreadById(payload.id);
          break;
      }
    });
  }

  getFrontpage(params) {
    const currentMeta = this.getMeta();

    this.setData([]);
    this.emitChange();

    this.setRefresh(ThreadApi.getTop, [params]);

    ListingsApi.getTop(params)
      .then((data) => {
        this.setData(data.threads);
        this.setMeta(data.meta);

        // Set before link to previous after link and vica versa
        if (data.meta.after) {
          this.setMeta(currentMeta.after, 'before');
        } else if (data.meta.before) {
          this.setMeta(currentMeta.before, 'after');
        }

        this.emitChange();
      });
  }

  getThreadBySubreddit(subreddit) {
    // Remove current data
    this.setData([]);
    this.emitChange();

    this.setRefresh(ListingsApi.getBySubreddit, [subreddit]);

    ListingsApi.getBySubreddit(subreddit)
      .then((data) => {
        this.setData(data.threads);

        this.emitChange();
      });
  }

  getThreadById(id) {
    this.setRefresh(ThreadApi.getById, [id]);

    ThreadApi.getById(id)
      .then((data) => {
        this.appendData(data.thread);

        this.emitChange();
      });
  }
}

export default new ThreadStore();
