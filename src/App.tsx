import * as React from 'react';
import { Route, Switch, Router } from 'react-router-dom';
import history from './history';
import './App.css';

// Pages
import Home from './Pages/Home/Home'
import Join from './Pages/Join/Join'
import SignIn from './Pages/SignIn/SignIn'
import Landing from './Pages/Landing/Landing'
import NewPoll from './Pages/NewPoll/NewPoll'
import Poll from './Pages/Poll/Poll'
import Result from './Pages/Result/Result'

const constLanding = () => (
  <div>
    <Landing />
  </div>
)

const constHome = () => (
  <div>
    <Home />
  </div>
)

const constJoin = () => (
  <div>
    <Join />
  </div>
)

const constSignIn = () => (
  <div>
    <SignIn />
  </div>
)

const constNewPoll = () => (
  <div>
    <NewPoll />
  </div>
)

const constPoll = () => (
  <div>
    <Poll />
  </div>
)

const constResult = () => (
  <div>
    <Result />
  </div>
)


class App extends React.Component {
  public render() {
    return (
      <div>
        <Router history={history}>
          <Switch>
            <Route path="/" exact={true} component={constLanding}/>
            <Route path="/home" exact={true} component={constHome}/>
            <Route path="/join" exact={true} component={constJoin}/>
            <Route path="/signin" exact={true} component={constSignIn}/>
            <Route path="/newpoll" exact={true} component={constNewPoll}/>
            <Route path="/poll" component={constPoll}/>
            <Route path="/result" component={constResult} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
