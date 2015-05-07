'use strict';

import React from 'react';
import {RouteHandler} from 'react-router';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import UserActionBar from '../../components/user/ActionBar';

class DefaultLayout extends React.Component {
  render() {
    return (
      <section className="layout-DefaultLayout">
        <Header />

        <Sidebar />

        <main>
          <UserActionBar />
          <RouteHandler />
        </main>
      </section>
    );
  }
}

export default DefaultLayout;
