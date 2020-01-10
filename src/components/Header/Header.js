import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => (
  <header>
    <nav className="nav-bar">
      <ul>
        <li>
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li>
          <Link to="/bar-chart" className="nav-link">
            Bar Chart
          </Link>
        </li>
        <li>
          <Link to="/scatterplot-graph" className="nav-link">
            Scatterplot Graph
          </Link>
        </li>
        <li>
          <Link to="/heat-map" className="nav-link">
            Heat Map
          </Link>
        </li>
        <li>
          <Link to="/choropleth-map" className="nav-link">
            Choropleth Map
          </Link>
        </li>
        <li>
          <Link to="/tree-map" className="nav-link">
            Treemap Diagram
          </Link>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;
