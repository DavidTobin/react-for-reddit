import Api from './Api';

class ThreadApi extends Api {
  getById(id) {
    return new Promise(
      (resolve, reject) => {
        if (!id) {
          reject();
        }

        this.get('/by_id/t3_' + id)
          .then(
            (response) => {
              resolve({
                thread: response.data.children[0]
              });
            }
          );
      }
    );
  }
}

export default new ThreadApi();
