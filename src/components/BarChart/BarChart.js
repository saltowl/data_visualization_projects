import React from 'react';
import './BarChart.css';
import * as d3 from 'd3';
import Error from '../Error/Error';

class BarChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            linearScale: null,
            xScale: null,
            yScale: null,
            dates: null,
            GDP: null,
            error: null
        };

        this.getData = this.getData.bind(this);
        this.updateChart = this.updateChart.bind(this);
        this.updateScales = this.updateScales.bind(this);

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
                        .domain([0, d3.max(GDP)])
                        .range([0, this.props.height]),
                    dates: data.data.map(d => new Date(d[0])),
                    GDP,
                    barWidth: this.props.width / GDP.length
                });

                this.updateChart();
            })
            .catch(error => {
                this.setState({ error });
            });
    }

    updateChart() {
        if (this.state.error || !this.state.GDP) return;

        const { dates, GDP, barWidth } = this.state;
        const { height, margin } = this.props;

        this.updateScales();

        const scaledGDP = GDP.map(item => this.state.linearScale(item));

        const bars = d3.select(this.viz)
            .selectAll('.bar')
            .data(scaledGDP)
            .transition().duration(this.props.animDuration)
            .attr('x', (d, i) => this.state.xScale(dates[i]) + margin)
            .attr('y', (d, i) => height - d)
            .attr('width', barWidth)
            .attr('height', d => d);

        const xAxisGroup = d3.select(this.viz)
            .select('#x-axis')
            .call(d3.axisBottom().scale(this.state.xScale));

        const yAxisGroup = d3.select(this.viz)
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

    render() {
        const { error, GDP, barWidth } = this.state;
        const { width, height, margin } = this.props;

        const bars = GDP 
            ? GDP.map((d, i) => (<rect key={`bar${i}`} className='bar' y={ height } x={ margin + i * barWidth } />)) 
            : [];


        const xAxis = <g id='x-axis' transform={`translate(${margin}, ${height})`} />;
        const yAxis = <g id='y-axis' transform={`translate(${margin}, 0)`} />;

        return (
            <div className='main'>
                <div className='container'>
                    { error 
                    ? <Error message={ error.message } /> 
                    : <div className='viz'>
                        <div id='title'>United States GDP</div>
                            <svg ref={ viz => (this.viz = viz) } width={ width + 100 } height={ height + margin }>
                                { bars }
                                { xAxis }
                                { yAxis }
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