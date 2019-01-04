import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Switch, withRouter, Redirect} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import Signin from '/imports/ui/Signin';
import Signup from '/imports/ui/Signup';
import Home from '/imports/ui/Home';
import PageNotFound from '/imports/ui/PageNotFound';

const unauthenticatedPages = ['/signup','/signin'];
const authenticatedPages = ['/'];
let isUnauthenticatedPage = true;
let isAuthenticatedPage = false;

const history = createHistory();


const onEnterPublicPage = () => {
  if (Meteor.userId()) {
    history.replace('/');
  }
};
const onEnterPrivatePage = () => {
  if (!Meteor.userId()) {
    history.replace('/signin');
  }
};

const routes = (
  <Router history={history}>
    <Switch>
        <Route exact={true} path="/signin" component={Signin} onEnter={onEnterPublicPage} />
        <Route path="/signup" component={Signup} onEnter={onEnterPublicPage}/>
        <Route path="/" component={Home} onEnter={onEnterPrivatePage}/>
        <Route component={PageNotFound}/>
    </Switch>
  </Router>
  
  );

Tracker.autorun(() => {
  
    const isAuthenticated = !!Meteor.userId(); 
    const pathName = history.location.pathname;
    
    isUnauthenticatedPage = unauthenticatedPages.includes(pathName);
    isAuthenticatedPage = authenticatedPages.includes(pathName);
   

    if (isUnauthenticatedPage && isAuthenticated) {
      history.replace('/');
    } else if (isAuthenticatedPage && !isAuthenticated) {
      history.replace('/signin');
    }

  });


Meteor.startup (() => {
  ReactDOM.render(routes, document.getElementById('app'));
});

    