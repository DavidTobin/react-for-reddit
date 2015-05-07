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
          this.getFrontpage();
          break;

        case ThreadConstants.GET_BY_ID:
          this.getThreadById(payload.id);
          break;
      }
    });
  }

  getFrontpage() {
    this.setData([]);
    this.emitChange();

    ListingsApi.getTop()
      .then((data) => {
        this.setData(data.threads);

        this.emitChange();
      });
  }

  getThreadById(id) {
    ThreadApi.getById(id)
      .then((data) => {
        this.appendData(data.thread);

        this.emitChange();
      });
  }
}

export default new ThreadStore();
