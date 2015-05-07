'use strict';

import Router from './router/Router';

new Router(document.querySelector('#application')).run(() => {
  console.log('Router is working..');
});
