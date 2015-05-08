import Api from './Api';

class CommentApi extends Api {
  getCommentsByArticle(articleId) {
    return new Promise(
      (resolve, reject) => {
        this.get('/comments/' + articleId)
          .then(
            (response) => {
              resolve({
                comments: response[1] ? response[1].data.children : []
              });
            }
          );
      }
    );
  }
}

export default new CommentApi();
