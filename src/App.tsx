import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

// Pages
import Home from './Pages/Home/Home'
import Join from './Pages/Join/Join'
import Landing from './Pages/Landing/Landing'
import NewPoll from './Pages/NewPoll/NewPoll'

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

const constNewPoll = () => (
  <div>
    <NewPoll />
  </div>
)

class App extends React.Component {
  public render() {
    return (
      <div>
        <Switch>
          <Route path="/" exact={true} component={constLanding}/>
          <Route path="/home" exact={true} component={constHome}/>
          <Route path="/join" exact={true} component={constJoin}/>
          <Route path="/newpoll" exact={true} component={constNewPoll}/>
        </Switch>
      </div>
    );
  }
}

export default App;
