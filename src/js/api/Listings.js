import Api from './Api';

class ListingsApi extends Api {
  getTop() {
    return new Promise(
      (resolve, reject) => {
        this.get('/top')
          .then(
            (response) => {
              resolve({
                threads: response.data.children
              });
            }
          );
      }
    );
  }

  getBySubreddit(subreddit) {
    return new Promise(
      (resolve, reject) => {
        this.get('/r/' + subreddit)
          .then(
            (response) => {
              resolve({
                threads: response.data.children
              });
            }
          );
      }
    );
  }
}

export default new ListingsApi();
