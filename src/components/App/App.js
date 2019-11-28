import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

import BarChart from '../BarChart/BarChart';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/bar-chart" component={BarChart} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
