import React from 'react';
import Header from './components/Header';
import Output from './components/Output';
import Help from './components/Help';
import Terms from './components/Terms';
import { Route, Switch } from "react-router-dom";

class App extends React.Component {

  render() {
    return (
      <div className="app">
        <Header />
        <Switch>
          <Route exact path="/" component={Output} />
          <Route path='/help' component={Help} />
          <Route path='/terms-of-service' component={Terms} />
        </Switch>
      </div>
    )
  }
}

export default App;
