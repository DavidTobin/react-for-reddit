import ApiConfig from '../config/api';
import request from 'superagent';
import _ from 'lodash';

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

  toQueryParams(queryParams) {

    return _.zip(_.keys(queryParams), _.values(queryParams))
      .map((param => param.join('=')));
  }

  createApiPath(path) {
    return [this.namespace, path].join('');
  }
}

export default API;
