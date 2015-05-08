import Api from './Api';

class SubredditApi extends Api {
  getAbout(subreddit) {
    return new Promise(
      (resolve, reject) => {
        this.get('/r/' + subreddit + '/about')
          .then(
            (response) => {
              resolve({
                subreddit: response.data
              });
            }
          );
      }
    );
  }
}

export default new SubredditApi();
