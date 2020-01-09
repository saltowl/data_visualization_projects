import React from 'react';
import './ScatterplotGraph.css';
import * as d3 from 'd3';
import Error from '../Error/Error';

class ScatterplotGraph extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      err: null,
      data: null,
      dotRadius: 6,
      legendSide: 18,
    };

    this.getData = this.getData.bind(this);
    this.updateChart = this.updateChart.bind(this);
    this.updateScales = this.updateScales.bind(this);
    this.updateLegend = this.updateLegend.bind(this);
    this.handleMouseOutDot = this.handleMouseOutDot.bind(this);
    this.handleMouseOverDot = this.handleMouseOverDot.bind(this);

    this.getData();
  }

  getData() {
    d3.json(
      'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json',
    )
      .then(data => {
        const processedData = data.map(obj => {
          const parsedTime = obj.Time.split(':');
          return {
            ...obj,
            Time: new Date(1970, 0, 1, 0, parsedTime[0], parsedTime[1]),
          };
        });

        this.setState({ data: processedData });

        this.updateChart();
      })
      .catch(err => {
        this.setState({ err });
      });
  }

  updateChart() {
    if (this.state.err || !this.state.data) return;

    this.updateScales();

    const { data, xScale, yScale, color, dotRadius } = this.state;
    const { margin, cor } = this.props;

    d3.select(this.viz)
      .select('#x-axis')
      .call(d3.axisBottom(xScale).tickFormat(d3.format('d')));

    d3.select(this.viz)
      .select('#y-axis')
      .call(d3.axisLeft(yScale).tickFormat(d3.timeFormat('%M:%S')));

    d3.select(this.viz)
      .selectAll('.dot')
      .data(data)
      .transition()
      .duration(this.props.animDuration)
      .attr('cx', d => xScale(d.Year) + margin)
      .attr('cy', d => yScale(d.Time) + cor)
      .attr('r', dotRadius)
      .attr('data-xvalue', d => d.Year)
      .attr('data-yvalue', d => d.Time.toISOString())
      .attr('data-name', d => d.Name)
      .attr('data-doping', d => d.Doping)
      .attr('data-country', d => d.Nationality)
      .style('fill', d => color(d.Doping !== ''));

    this.updateLegend();
  }

  updateScales() {
    const { data } = this.state;
    const { width, height } = this.props;

    const xScale = d3
      .scaleLinear()
      .domain([d3.min(data, d => d.Year - 1), d3.max(data, d => d.Year + 1)])
      .range([0, width]);

    const yScale = d3
      .scaleTime()
      .domain(d3.extent(data, d => d.Time))
      .range([0, height]);

    const color = d3.scaleOrdinal(d3.schemeDark2);

    this.setState({ xScale, yScale, color });
  }

  updateLegend() {
    const { color } = this.state;

    const legend = d3.selectAll('.legend').data(color.domain());

    legend.select('rect').style('fill', color);

    legend
      .select('text')
      .text(d => (d ? 'Riders with doping allegations' : 'No doping allegations'));
  }

  componentDidMount() {
    this.updateChart();
  }

  handleMouseOverDot(e) {
    const tooltip = d3.select('#tooltip');
    const dot = d3.select(e.target);

    const bounds = this.viz.getBoundingClientRect();
    const left = bounds.x + e.target.cx.baseVal.value;
    const top = bounds.y + e.target.cy.baseVal.value;

    const name = dot.attr('data-name');
    const doping = dot.attr('data-doping');
    const year = dot.attr('data-xvalue');
    const time = d3.timeFormat('%M:%S')(new Date(dot.attr('data-yvalue')));
    const country = dot.attr('data-country');

    tooltip
      .transition()
      .duration(200)
      .style('opacity', 1);

    tooltip
      .html(`${name}: ${country} <br> Year: ${year}, Time: ${time} <br> <br> ${doping}`)
      .attr('data-year', year)
      .style('left', `${left}px`)
      .style('top', `${top}px`);
  }

  handleMouseOutDot(e) {
    d3.select('#tooltip')
      .transition()
      .duration(200)
      .style('opacity', 0);
  }

  render() {
    const { err, data, dotRadius, legendSide } = this.state;
    const { width, height, margin, cor } = this.props;

    const dots = data
      ? data.map((d, i) => (
          <circle
            key={`circle${i}`}
            className="dot"
            onMouseOver={this.handleMouseOverDot}
            onMouseOut={this.handleMouseOutDot}
            cy={height}
            cx={margin}
            r={dotRadius}
          />
        ))
      : [];

    const legend = [0, 1].map((d, i) => (
      <g
        className="legend"
        key={`legend${i}`}
        transform={`translate(0, ${height / 2 - i * 20} )`}
      >
        <text x={width + margin - legendSide * 1.5} y={legendSide / 2} dy={'.35em'} />
        <rect x={width + margin - legendSide} width={legendSide} height={legendSide} />
      </g>
    ));

    return (
      <div className="main scatterplot">
        <div className="container">
          {err ? (
            <Error message={err.message} />
          ) : (
            <div className="graph">
              <div id="title">Doping in Professional Bicycle Racing</div>
              <div id="tooltip" />
              <svg
                ref={viz => (this.viz = viz)}
                width={width + margin * 2}
                height={height + margin + cor}
              >
                <g id="x-axis" transform={`translate(${margin}, ${height + cor})`} />
                <g id="y-axis" transform={`translate(${margin}, ${cor})`} />
                <g id="legend">{legend}</g>
                {dots}
              </svg>
            </div>
          )}
        </div>
      </div>
    );
  }
}

ScatterplotGraph.defaultProps = {
  animDuration: 800,
  height: 420,
  width: 800,
  margin: 60,
  cor: 20,
};

export default ScatterplotGraph;
