import Dispatcher from '../dispatcher';
import SubredditConstants from '../constants/Subreddit';

class SubredditActions {
  getAbout(subreddit) {
    Dispatcher.dispatch({
      actionType: SubredditConstants.GET_SUBREDDIT_ABOUT,
      subreddit
    });
  }
}

export default new SubredditActions();
