import Dispatcher from '../dispatcher';
import ThreadConstants from '../constants/Thread';

class ThreadActions {
  getFrontpage() {
    Dispatcher.dispatch({
      actionType: ThreadConstants.GET_FRONTPAGE
    });
  }

  getById(id) {
    Dispatcher.dispatch({
      actionType: ThreadConstants.GET_BY_ID,
      id
    });
  }
}

export default new ThreadActions();
