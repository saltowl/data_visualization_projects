import React from 'react';
import './ChoroplethMap.css';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import Error from '../Error/Error';

class ChoroplethMap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      err: null,
      counties: null,
      edication: null,
    };

    this.getData = this.getData.bind(this);
    this.updateChart = this.updateChart.bind(this);
    this.updateLegend = this.updateLegend.bind(this);
    this.updateScales = this.updateScales.bind(this);
    this.handleMouseOverCounty = this.handleMouseOverCounty.bind(this);
    this.handleMouseOutCounty = this.handleMouseOutCounty.bind(this);

    this.getData();
  }

  getData() {
    const files = [
      'https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/counties.json',
      'https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/for_user_education.json',
    ];

    Promise.all(files.map(url => d3.json(url)))
      .then(values => {
        this.setState({
          education: values[1],
          counties: values[0],
        });

        this.updateChart();
      })
      .catch(err => {
        this.setState({ err });
      });
  }

  updateChart() {
    if (this.state.err || !this.state.counties || !this.state.education) return;

    this.updateScales();

    const { counties, education, colorScale } = this.state;

    const path = d3.geoPath();

    // counties
    d3.select(this.viz)
      .selectAll('.county')
      .data(topojson.feature(counties, counties.objects.counties).features)
      .attr('d', path)
      .attr('fill', d => {
        const result = education.filter(obj => obj.fips === d.id)[0];
        return result ? colorScale(result.bachelorsOrHigher) : colorScale(0);
      })
      .attr('data-fips', d => d.id)
      .attr('data-education', d => {
        const result = education.filter(obj => obj.fips === d.id)[0];
        return result ? result.bachelorsOrHigher : 0;
      });

    // states border
    d3.select(this.viz)
      .select('#states')
      .datum(topojson.mesh(counties, counties.objects.states, (a, b) => a !== b))
      .attr('d', path);

    this.updateLegend();
  }

  updateScales() {
    const { education } = this.state;
    const { legendWidth, legendColors } = this.props;

    const minEducatedCount = d3.min(education, obj => obj.bachelorsOrHigher);
    const maxEducatedCount = d3.max(education, obj => obj.bachelorsOrHigher);
    const step = (maxEducatedCount - minEducatedCount) / (legendColors.length - 1);
    const colorRange = d3.range(minEducatedCount, maxEducatedCount, step);
    colorRange.push(maxEducatedCount);
    const firstLegendVal = minEducatedCount - step;
    colorRange.unshift(firstLegendVal);

    const colorScale = d3
      .scaleLinear()
      .domain(colorRange)
      .range(legendColors)
      .interpolate(d3.interpolateHcl);

    const legendScale = d3
      .scaleLinear()
      .domain([firstLegendVal, maxEducatedCount])
      .range([0, legendWidth]);

    this.setState({ colorScale, legendScale });
  }

  updateLegend() {
    const { colorScale, legendScale } = this.state;
    const { legendColors } = this.props;

    d3.select(this.viz)
      .select('#gradient')
      .selectAll('stop')
      .data(legendColors)
      .enter()
      .append('stop')
      .attr('offset', (d, i) => i / (legendColors.length - 1))
      .attr('stop-color', d => d);

    d3.select(this.viz)
      .select('#legend-axis')
      .call(
        d3
          .axisBottom(legendScale)
          .tickValues(
            colorScale
              .domain()
              .filter((_, i) => i !== 0 && i !== colorScale.domain().length - 1),
          )
          .tickFormat(perc => d3.format('.0f')(perc) + '%'),
      );
  }

  componentDidMount() {
    this.updateChart();
  }

  handleMouseOverCounty(e) {
    const { education } = this.state;

    const tooltip = d3.select('#tooltip');
    const county = d3.select(e.target);

    const left = e.pageX;
    const top = e.pageY;

    county
      .transition()
      .duration(10)
      .style('fill-opacity', 0.2);

    tooltip
      .transition()
      .duration(200)
      .style('opacity', 0.9);

    const countyId = e.target.__data__.id;
    const percent = county.attr('data-education');
    const state = education.filter(obj => obj.fips === countyId)[0].state;
    const area = education.filter(obj => obj.fips === countyId)[0].area_name;

    tooltip
      .html(`${area}, ${state}: ${percent}%`)
      .style('left', `${left}px`)
      .style('top', `${top}px`)
      .attr('data-education', percent);
  }

  handleMouseOutCounty(e) {
    d3.select(e.target)
      .transition()
      .duration(300)
      .style('fill-opacity', 1);

    d3.select('#tooltip')
      .transition()
      .duration(200)
      .style('opacity', 0);
  }

  render() {
    const { err } = this.state;
    const { width, height, margin, legendHeight, legendWidth } = this.props;

    const counties = this.state.counties
      ? this.state.counties.objects.counties.geometries.map((d, i) => (
          <path
            className="county"
            key={`county${i}`}
            onMouseOver={this.handleMouseOverCounty}
            onMouseOut={this.handleMouseOutCounty}
          />
        ))
      : [];

    const legendGradient = 'gradient';

    return (
      <div className="main choroplethmap">
        <div className="container">
          {err ? (
            <Error message={err.message} />
          ) : (
            <div className="graph">
              <div id="title">United States Educational Attainment</div>
              <div id="description">
                Percentage of adults age 25 and older with a bachelor's degree or higher
                (2010-2014)
              </div>
              <div id="tooltip" />
              <svg ref={viz => (this.viz = viz)} width={width + margin} height={height}>
                <defs>
                  <linearGradient id={legendGradient} />
                </defs>
                <g
                  id="legend"
                  transform={`translate(${(width * 2) / 3 + margin / 2}, ${legendHeight *
                    2})`}
                >
                  <rect
                    fill={`url(#${legendGradient})`}
                    transform={`translate(0, ${-legendHeight})`}
                    height={legendHeight}
                    width={legendWidth}
                  />
                  <g id="legend-axis" />
                </g>
                <g className="counties" transform={`translate(${margin}, 0 )`}>
                  {counties}
                </g>
                <path id="states" transform={`translate(${margin}, 0 )`} />
              </svg>
            </div>
          )}
        </div>
      </div>
    );
  }
}

ChoroplethMap.defaultProps = {
  height: 600,
  width: 960,
  legendWidth: 250,
  legendHeight: 15,
  margin: 100,
  legendColors: [
    '#2c7bb6',
    '#00a6ca',
    '#00ccbc',
    '#90eb9d',
    '#ffff8c',
    '#f9d057',
    '#f29e2e',
    '#e76818',
    '#d7191c',
  ],
};

export default ChoroplethMap;
