'use strict';

import React from 'react';
import {default as ReactRouter, Route, DefaultRoute} from 'react-router';
import {DefaultLayout} from '../layout';
import {HomePage, ThreadPage, SubredditPage} from '../pages';
import {UserSettingsPage} from '../pages/User';

class Router {
  constructor(node) {
    this.node = node;
  }

  getRoutes() {
    return (
      <Route path="/" handler={DefaultLayout}>
        <DefaultRoute name="home" handler={HomePage} />

        <Route path="/thread/:id" name="thread" handler={ThreadPage} />

        <Route path="/user/settings" name="user.settings" handler={UserSettingsPage} />

        <Route path="/r/:subreddit" name="subreddit" handler={SubredditPage} />
      </Route>
    );
  }

  run(callback) {
    ReactRouter.run(this.getRoutes(), (Handler) => {
      React.render(<Handler />, this.node);
    });

    callback();
  }
}

export default Router;
