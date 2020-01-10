import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import Header from '../Header/Header';
import Home from '../Home/Home';
import BarChart from '../BarChart/BarChart';
import ScatterplotGraph from '../ScatterplotGraph/ScatterplotGraph';
import HeatMap from '../HeatMap/HeatMap';
import ChoroplethMap from '../ChoroplethMap/ChoroplethMap';
import TreeMap from '../TreeMap/TreeMap';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
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
