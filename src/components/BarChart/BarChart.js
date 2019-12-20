import React from 'react';
import './BarChart.css';
import * as d3 from 'd3';
import Error from '../Error/Error';

class BarChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            GDP: null,
            error: null
        };

        this.getData = this.getData.bind(this);
        this.updateChart = this.updateChart.bind(this);
        this.updateScales = this.updateScales.bind(this);
        this.handleMouseOverBar = this.handleMouseOverBar.bind(this);
        this.handleMouseOutBar = this.handleMouseOutBar.bind(this);

        this.getData();
    }

    componentDidMount() {
        this.updateChart();
    }

    getData() {
        d3.json('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json')
            .then((data) => {
                const GDP = data.data.map(item => item[1]);

                this.setState({
                    linearScale: d3.scaleLinear()
                        .domain([0, d3.max(GDP) + 1000])
                        .range([0, this.props.height]),
                    rawDates: data.data.map(d => d[0]),
                    dates: data.data.map(d => new Date(d[0])),
                    GDP,
                    barWidth: this.props.width / GDP.length,
                });

                this.updateChart();
            })
            .catch(error => {
                this.setState({ error });
            });
    }

    updateChart() {
        if (this.state.error || !this.state.GDP) return;

        const { dates, GDP, barWidth, rawDates } = this.state;
        const { height, margin } = this.props;

        this.updateScales();

        const scaledGDP = GDP.map(item => this.state.linearScale(item));

        d3.select(this.viz)
            .selectAll('.bar')
            .data(scaledGDP)
            .transition().duration(this.props.animDuration)
            .attr('x', (d, i) => this.state.xScale(dates[i]) + margin)
            .attr('y', (d, i) => height - d)
            .attr('width', barWidth)
            .attr('height', d => d)
            .attr('data-date', (d, i) => rawDates[i])
            .attr('data-gdp', (d, i) => GDP[i]);

        d3.select(this.viz)
            .select('#x-axis')
            .call(d3.axisBottom().scale(this.state.xScale));

        d3.select(this.viz)
            .select('#y-axis')
            .call(d3.axisLeft(this.state.yScale));

    }

    updateScales() {
        const { dates, GDP } = this.state;
        const { width, height } = this.props;

        let xMax = new Date(d3.max(dates));
        xMax.setMonth(xMax.getMonth() + 3);

        const xScale = d3.scaleTime()
            .domain([d3.min(dates), xMax])
            .range([0, width]);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(GDP) + 1000])
            .range([height, 0]);

        this.setState({xScale, yScale});
    }

    handleMouseOverBar(e) {
        const tooltip = d3.select('#tooltip');
        const bar = d3.select(e.target);
        const gdp = parseFloat(bar.attr('data-gdp'));
        const date = bar.attr('data-date');
        const bounds = this.viz.getBoundingClientRect();
        const left = bounds.x + e.target.x.baseVal.value;
        const top = bounds.y + bounds.height - 2 * this.props.margin;

        tooltip.transition()
            .duration(200)
            .style('opacity', 1);

        tooltip.html(`${ date } <br> $ ${ gdp.toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') } Billion`)
            .attr('data-date', date)
            .style('left', `${ left + 10 }px`)
            .style('top', `${ top }px`);
    }

    handleMouseOutBar(e) {
        d3.select('#tooltip')
            .transition()
            .duration(200)
            .style('opacity', 0);
    }

    render() {
        const { error, GDP, barWidth } = this.state;
        const { width, height, margin } = this.props;

        const bars = GDP 
            ? GDP.map((d, i) => (<rect key={`bar${i}`} className='bar' 
                onMouseOver={ this.handleMouseOverBar } onMouseOut={ this.handleMouseOutBar } 
                y={ height } x={ margin + i * barWidth } />)) 
            : [];

        return (
            <div className='main bar-chart'>
                <div className='container'>
                    { error 
                    ? <Error message={ error.message } /> 
                    : <div className='graph'>
                        <div id='title'>United States GDP</div>
                            <div id='tooltip' />
                            <svg ref={ viz => (this.viz = viz) } width={ width + 100 } height={ height + margin }>
                                <text transform={ 'rotate(-90)' } x={ -200 } y={ 80 }>
                                    Gross Domestic Product
                                </text>
                                <text x={ width - margin - 20 } y={ height + 50 }>
                                    <a href='http://www.bea.gov/national/pdf/nipaguid.pdf' target='_blank' rel='noopener noreferrer'>
                                        More Information...
                                    </a>
                                </text>
                                <g id='x-axis' transform={ `translate(${margin}, ${height})` } />
                                <g id='y-axis' transform={ `translate(${margin}, 0)` } />
                                { bars }
                            </svg>
                        </div> 
                    }
                </div>
            </div>
        );
    }
}

BarChart.defaultProps = {
    animDuration: 800,
    height: 400,
    width: 800,
    margin: 60
};

export default BarChart;