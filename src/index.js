import React from 'react';
import ReactDOM from 'react-dom';
import Home from './js/busi/containers/Home'
import Gitee from './js/busi/containers/Gitee'
import ProjectFileCount from './js/busi/containers/ProjectFileCount'
import FileCommiterAndLines from './js/busi/containers/FileCommiterAndLines'

import 'antd/dist/antd.css';
import './resource/css/index.css'

import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import * as serviceWorker from './serviceWorker';
export default function App() {
  return (
    <Router>
        <div>
            <Route path="/" render={() => 
                <Home>
                    <Route exact path="/project" component={FileCommiterAndLines} />
                    <Route path="/file" component={FileCommiterAndLines} />
                    <Route exact path="/" component={ProjectFileCount} />
                </Home>
            } />
        </div>
    </Router>
    
  );
}
ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
