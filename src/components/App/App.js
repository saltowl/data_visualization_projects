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
import ChoroplethMap from '../ChoroplethMap/ChoroplethMap';
import TreeMap from '../TreeMap/TreeMap';


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/bar-chart" component={BarChart} />
          <Route path="/scatterplot-graph" component={ScatterplotGraph} />
          <Route path="/heat-map" component={HeatMap} />
          <Route path="/choropleth-map" component={ChoroplethMap} />
          <Route path="/tree-map" component={TreeMap} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
