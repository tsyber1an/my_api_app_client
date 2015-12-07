import React from 'react';
import Router, {Route} from 'react-router';
import AuthenticatedApp from './components/AuthenticatedApp'
import Login from './components/Login';
import Home from './components/Home';
import RouterContainer from './services/RouterContainer';
import LoginActions from './actions/LoginActions';

var routes = (
  <Route handler={AuthenticatedApp}>
    <Route name="login" handler={Login}/>
    <Route name="home" path="/" handler={Home}/>
  </Route>
);

var router = Router.create({routes});
RouterContainer.set(router);

router.run(function (Handler) {
  React.render(<Handler />, document.getElementById('content'));
});
