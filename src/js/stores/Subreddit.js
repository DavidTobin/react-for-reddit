import Dispatcher from '../dispatcher';
import SubredditConstants from '../constants/Subreddit';
import Store from './Store';
import {SubredditApi} from '../api';

class SubredditStore extends Store {
  constructor() {
    super();

    this.dispatcherIndex = Dispatcher.register((payload) => {
      switch (payload.actionType) {
        case SubredditConstants.GET_SUBREDDIT_ABOUT:
          this.getAbout(payload.subreddit);
      }
    });
  }

  getAbout(subreddit) {
    SubredditApi.getAbout(subreddit)
      .then(
        (response) => {
          response.subreddit.id = subreddit;

          this.appendData(response.subreddit);
          this.emitChange();
        }
      );
  }
}

export default new SubredditStore();
