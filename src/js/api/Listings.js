import Api from './Api';
import _ from 'lodash';

class ListingsApi extends Api {
  getTop(queryParams = {}) {
    console.log(queryParams);
    queryParams = this.toQueryParams(queryParams);

    return new Promise(
      (resolve, reject) => {
        this.get('/top' + '?' + queryParams.join('&'))
          .then(
            (response) => {
              let meta = _.omit(response.data, 'children');

              resolve({
                threads: response.data.children,
                meta
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
                threads: response.data.children,
                meta: _.omit(response.data, 'children')
              });
            }
          );
      }
    );
  }
}

export default new ListingsApi();
