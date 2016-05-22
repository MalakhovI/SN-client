/**
 * Created by Ivan on 22.05.2016.
 */
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import SignUpForm from './components/SignUpForm'
import mainTEMP from './components/mainTEMP'
import App from './containers/App'
export default (
    <Route path="/" component={App}>
        <IndexRoute component={mainTEMP} />
        <Route path="SignUpForm" component={SignUpForm} />
        <Route path="mainTEMP" component={mainTEMP} />
    </Route>
);