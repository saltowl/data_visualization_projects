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
            dotRadius: 6
        };

        this.getData = this.getData.bind(this);
        this.updateChart = this.updateChart.bind(this);
        this.updateScales = this.updateScales.bind(this);
        this.handleMouseOutDot = this.handleMouseOutDot.bind(this);
        this.handleMouseOverDot = this.handleMouseOverDot.bind(this);

        this.getData();
    }

    getData() {
        d3.json('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json')
            .then(data => {
                const processedData = data.map(obj => {
                    const parsedTime = obj.Time.split(':');
                    return {
                        ...obj,
                        Time: new Date(1970, 0, 1, 0, parsedTime[0], parsedTime[1])
                    };
                });

                this.setState({ data: processedData });

                this.updateChart();
            })
            .catch(err => {
                this.setState({ err });
            })
    }

    updateChart() {
        if (this.state.err || !this.state.data) return;

        this.updateScales();

        const { data, xScale, yScale } = this.state;
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
            .transition().duration(this.props.animDuration)
            .attr('cx', d => xScale(d.Year) + margin)
            .attr('cy', d => yScale(d.Time) + cor)
            .attr('r', 6)
            .attr('data-xvalue', d => d.Year)
            .attr('data-yvalue', d => d.Time.toISOString());

    }

    updateScales() {
        const { data } = this.state;
        const { width, height, margin } = this.props;

        const xScale = d3.scaleLinear()
            .domain([d3.min(data, d => d.Year - 1),
                    d3.max(data, d => d.Year + 1)])
            .range([0, width]);

        const yScale = d3.scaleTime()
            .domain(d3.extent(data, d => d.Time))
            .range([0, height]);

        this.setState({ xScale, yScale });
    }

    componentDidMount() {
        this.updateChart();
    }

    handleMouseOutDot() {

    }

    handleMouseOverDot() {

    }

    render() {
        const { err, data, dotRadius } = this.state;
        const { width, height, margin, cor } = this.props;

        const dots = data 
            ? data.map((d, i) => (<circle key={`circle${i}`}  className='dot'
                onMouseOver={ this.handleMouseOverBar } onMouseOut={ this.handleMouseOutBar } 
                cy={ height } cx={ margin } r={ dotRadius } />)) 
            : [];

        return (
            <div className='main'>
                <div className='container'>
                    { err 
                    ? <Error message={err.message} />
                    : <div className='graph'>
                        <div id='title'>Doping in Professional Bicycle Racing</div>
                        <div id='tooltip' />
                        <svg ref={ viz => (this.viz = viz) } width={ width + margin * 2 } height={ height + margin + cor }>
                            <g id='x-axis' transform={ `translate(${ margin }, ${ height + cor })` } />
                            <g id='y-axis' transform={ `translate(${ margin }, ${ cor })` } />
                            { dots }
                        </svg>
                        </div>}
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
    cor: 20
};

export default ScatterplotGraph;