import React from 'react';
import './HeatMap.css';
import * as d3 from 'd3';
import Error from '../Error/Error';

class HeatMap extends React.Component {
    constructor(props) {
        super(props);

        this.getData = this.getData.bind(this);
        this.updateChart = this.updateChart.bind(this);
        this.updateScales = this.updateScales.bind(this);
        this.updateLegend = this.updateLegend.bind(this);

        this.state = {
            err: null,
            data: null,
            description: null
        };

        this.getData();
    }

    getData() {
        d3.json('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json')
            .then(data => {
                const minYear = data.monthlyVariance[0].year;
                const maxYear = data.monthlyVariance[data.monthlyVariance.length - 1].year;

                this.setState({ 
                    data: data.monthlyVariance,
                    baseTemperature: data.baseTemperature,
                    description: `${minYear} - ${maxYear}: base temperature ${data.baseTemperature + this.props.mes}`
                });

                this.updateChart();
            })
            .catch(err => {
                this.setState({ err });
            });
    }

    updateChart() {
        if (this.state.err || !this.state.data) return;

        this.updateScales();

        const { data, baseTemperature, xScale, yScale, colorScale } = this.state;

        d3.select(this.viz)
            .select('#x-axis')
            .call(
                    d3.axisBottom(xScale)
                    .tickValues(xScale.domain().filter(year => year % 10 === 0))
                    .tickSize(10, 1)
                );


        d3.select(this.viz)
            .select('#y-axis')
            .call(
                    d3.axisLeft(yScale)
                    .tickValues(yScale.domain())
                    .tickFormat(month => {
                        let date = new Date(0);
                        date.setUTCMonth(month);
                        return d3.timeFormat('%B')(date);
                    })
                    .tickSize(10, 1)
                );
        
        d3.select(this.viz)
            .selectAll('.cell')
            .data(data)
            .transition().duration(this.props.animDuration)
            .attr('x', d => xScale(d.year))
            .attr('y', d => yScale(d.month - 1))
            .attr('width', xScale.bandwidth())
            .attr('height', d => yScale.bandwidth())
            .attr('fill', d => colorScale(baseTemperature + d.variance))
            .attr('data-month', d => d.month - 1)
            .attr('data-year', d => d.year)
            .attr('data-temp', d => baseTemperature + d.variance);
            
        this.updateLegend();
    }

    updateScales() {
        const { data, baseTemperature } = this.state;
        const { width, height, legendColors, legendWidth } = this.props;

        const xScale = d3.scaleBand()
            .domain(data.map(d => d.year))
            .range([0, width]);

        const yScale = d3.scaleBand()
            .domain([...new Set(data.map(d => d.month - 1))])
            .range([0, height]);
            
        const minTemp = baseTemperature + d3.min(data, t => t.variance);
        const maxTemp = baseTemperature + d3.max(data, t => t.variance);
        const step = (maxTemp - minTemp) / (legendColors.length - 1);
        const colorRange = d3.range(minTemp, maxTemp, step);
        colorRange.push(maxTemp);

        const colorScale = d3.scaleLinear()
            .domain(colorRange)
            .range(legendColors)
            .interpolate(d3.interpolateHcl);

        const legendScale = d3.scaleLinear()
            .domain([minTemp, maxTemp])
            .range([0, legendWidth]);

        this.setState({ xScale, yScale, colorScale, legendScale });
    }

    updateLegend() {
        const { colorScale, legendScale } = this.state;
        const { legendColors } = this.props

        d3.select(this.viz)
            .select('#gradient')
            .selectAll('stop')
            .data(legendColors)             
            .enter().append('stop')
            .attr('offset', (d, i) => i / (legendColors.length - 1))   
            .attr('stop-color', d => d);
        
        d3.select(this.viz)
            .select('#legend-axis')
            .call(
                    d3.axisBottom(legendScale)
                    .tickValues(colorScale.domain())
                    .tickFormat(d3.format('.1f'))
                );
    }

    componentDidMount() {
        this.updateChart();
    }

    render() {
        const { err, data, description } = this.state;
        const { width, height, margin, legendHeight, legendWidth } = this.props;

        const cells = data
        ? data.map((d, i) => (<rect className='cell' key={`rect${i}`} />))
        : [];

        const legendGradient = 'gradient';

        return (
            <div className='main heatmap'>
                <div className='container'>
                    { err
                    ? <Error message={err.message} /> 
                    : <div className='graph'>
                        <div id='title'>Monthly Global Land-Surface Temperature</div>
                        <div id='description'>{ description }</div>
                        <svg id='svg-graph' ref={ viz => (this.viz = viz) } width={ width + margin } height={ height + margin + margin / 2 } >
                            <defs>
                                <linearGradient id={legendGradient} />
                            </defs>
                            <g id='x-axis' transform={ `translate(${ margin }, ${ height })` } fill='black' >
                                <text className='label' transform={ `translate(${ width / 2 }, ${ margin / 2 })` } >Years</text>
                            </g>
                            <g id='y-axis' transform={ `translate(${ margin }, 0)` } >
                                <text className='label' transform={ `translate(${ -margin / 2 }, ${ (height - margin) / 2 }) rotate(-90)` } >Months</text>
                            </g>
                            <g id='map' transform={ `translate(${ margin }, 0 )`} >
                                { cells }
                            </g>
                            <g id='legend' transform={ `translate(${ margin + width / 2 - legendWidth / 2 }, ${ height + margin })` } >
                                <text className='label' transform={ `translate(${ -40 }, ${ -5 })` } >t {this.props.mes}</text>
                                <rect fill={`url(#${legendGradient})`} transform={ `translate(0, ${ -legendHeight })` } height={ legendHeight }  width={ legendWidth } />
                                <g id='legend-axis' />
                            </g>
                        </svg>
                    </div>}
                </div>
            </div>
        );
    }
}

HeatMap.defaultProps = {
    animDuration: 800,
    height: 400,
    width: 1200,
    legendWidth: 300,
    legendHeight: 20,
    margin: 100,
    mes: '℃',
    legendColors: ["#2c7bb6", "#00a6ca","#00ccbc","#90eb9d","#ffff8c","#f9d057","#f29e2e","#e76818","#d7191c"]
};

export default HeatMap;