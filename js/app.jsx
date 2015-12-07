import React from 'react';
import Router, {Route} from 'react-router';
import AuthenticatedApp from './components/AuthenticatedApp'
import Login from './components/Login';
import Home from './components/Home';
import Users from './components/Users';
import Epics from './components/Epics';
import NewUser from './components/NewUser';
import NewEpic from './components/NewEpic';
import RouterContainer from './services/RouterContainer';
import LoginActions from './actions/LoginActions';

var routes = (
  <Route handler={AuthenticatedApp}>
    <Route name="login" handler={Login}/>
    <Route name="home" path="/" handler={Home}/>
    <Route name="users" path="/users" handler={Users}/>
    <Route name="newUser" path="/users/new" handler={NewUser}/>

    <Route name="epics" path="/epics" handler={Epics}/>
    <Route name="newEpic" path="/epics/new" handler={NewEpic}/>
  </Route>
);

var router = Router.create({routes});
RouterContainer.set(router);

router.run(function (Handler) {
  React.render(<Handler />, document.getElementById('app'));
});
