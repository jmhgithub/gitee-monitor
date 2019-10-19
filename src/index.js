import React from 'react';
import ReactDOM from 'react-dom';
import Home from './js/containers/Home'
import Gitee from './js/containers/Gitee'
import './resource/css/index.css'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import * as serviceWorker from './serviceWorker';
export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/gitee">
            <Gitee />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
