import ApiConfig from '../config/api';
import request from 'superagent';

class API {
  constructor() {
    this.namespace = ApiConfig.api;
  }

  get(path) {
    path = this.createApiPath(path);

    return new Promise(
      (resolve, reject) => {
        request
          .get(path)
          .end((err, response) => {
            if (err) {
              reject(err);
            } else {
              resolve(response.body);
            }
          });
      }
    );
  }

  post() {}
  put() {}
  delete() {}

  createApiPath(path) {
    return [this.namespace, path].join('');
  }
}

export default API;
