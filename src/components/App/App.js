import React from 'react';
import './App.css';
import {
  HashRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

import BarChart from '../BarChart/BarChart';
import ScatterplotGraph from '../ScatterplotGraph/ScatterplotGraph';
import HeatMap from '../HeatMap/HeatMap';


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/bar-chart" component={BarChart} />
          <Route path="/scatterplot-graph" component={ScatterplotGraph} />
          <Route path="/heat-map" component={HeatMap} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
