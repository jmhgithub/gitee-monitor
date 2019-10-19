import React from 'react';
import ReactDOM from 'react-dom';
import Home from './js/busi/containers/Home'
import ProjectFileCount from './js/busi/containers/summary/ProjectFileCount'
import FileCommiterAndLines from './js/busi/containers/projects/FileCommiterAndLines'
import FileDetail from './js/busi/containers/files/FileDetail'
import StoryCommit from './js/busi/containers/iteration/StoryCommit'

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
                    <Route path="/file" component={FileDetail} />
                    <Route path="/iteration" component={StoryCommit} />
                    <Route exact path="/" component={ProjectFileCount} />
                </Home>
            } />
        </div>
    </Router>
    
  );
}
ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
