/**
 * Created by Ivan on 22.05.2016.
 */
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from  './containers/App'

import SignUpForm from './components/SignUpForm'
import Home from './components/Home'
import Page from  './components/Page'
import IndexPage from './components/IndexPage'

export default (
    <Route path="/" component={App}>
        <IndexRoute component={IndexPage} />
        <Route path="SignUpForm" component={SignUpForm} />
        <Route path="Page" component={Page} />

    </Route>
);