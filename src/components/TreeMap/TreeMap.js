import React from 'react';
import './TreeMap.css';
import * as d3 from 'd3';
import Error from '../Error/Error';

const wrap = (text) => {
    text.each(function() {
        let text = d3.select(this),
            words = text.text().split(/\s+/).reverse(),
            word,
            line = [],
            lineNumber = 0,
            lineHeight = 1.1,
            x = text.attr('x'),
            y = text.attr('y'),
            dy = 0,
            tspan = text.text(null)
                        .append('tspan')
                        .attr('x', x)
                        .attr('y', y)
                        .attr('dy', `${dy}em`);

        const width = text._groups[0][0].parentNode.__data__.x1
            - text._groups[0][0].parentNode.__data__.x0 - 8;
        
        while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(' ').trim());
            if (tspan.node().getComputedTextLength() > width) {
                line.pop();
                tspan.text(line.join(' '));
                line = [word];
                tspan = text.append('tspan')
                            .attr('x', x)
                            .attr('y', y)
                            .attr('dy', `${++lineNumber * lineHeight + dy}em`)
                            .text(word);
            }
        }
    });
};

class TreeMap extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            err: null
        };

        this.getData = this.getData.bind(this);
        this.createRoot = this.modifyData.bind(this);
        this.updateChart = this.updateChart.bind(this);
        this.updateScales = this.updateScales.bind(this);
        this.updateLegend = this.updateLegend.bind(this);

        this.getData();
    }

    getData() {
        d3.json('https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json')
            .then(data => {
                this.setState({ data });
                this.modifyData();
                this.updateChart();
            })
            .catch(err => {
                this.setState({ err });
            });

    }

    modifyData() {
        const { data } = this.state;

        const root = d3.hierarchy(data)
            .sum(d => d.value)
            .sort((a, b) => b.value - a.value);

        const categories = root.leaves()
            .map(n => n.data.category)
            .filter((category, index, self) => self.indexOf(category) === index);

        this.setState({ root, categories });
    }

    updateChart() {
        if (this.state.err || !this.state.data || !this.state.root) return;
        
        this.updateScales();

        const { colorScale, root } = this.state;
        const { width, height } = this.props;

        const treemap = d3.treemap()
            .tile(d3.treemapResquarify)
            .size([width, height])
            .paddingInner(1);

        treemap(root);
        
        // cells
        d3.select(this.viz)
            .selectAll('.cell')
            .data(root.leaves())
            .transition().duration(this.props.animDuration)
            .attr('transform', d => `translate(${d.x0}, ${d.y0})`);
        
        // tiles
        d3.select(this.viz)
            .selectAll('.tile')
            .data(root.leaves())
            .attr('width', d => d.x1 - d.x0)
            .attr('height', d => d.y1 - d.y0)
            .attr('data-name', d => d.data.name)
            .attr('data-category', d => d.data.category)
            .attr('data-value', d => d.data.value)
            .attr('fill', d => colorScale(d.data.category))
        
        // tiles' labels
        d3.select(this.viz)
            .selectAll('.tile-text')
            .data(root.leaves())
            .attr('x', 4)
            .attr('y', 15)
            .text(d => d.data.name)
            .call(wrap);

        this.updateLegend();

    }

    updateScales() {
        const colorScale = d3.scaleOrdinal(d3.schemePastel1);
        
        this.setState({ colorScale });
    }

    updateLegend() {
        const { categories, colorScale } = this.state;
        const { legendRectSize } = this.props;

        d3.select('#legend')
            .selectAll('.legend-item')
            .data(categories)
            .attr('fill', d => colorScale(d))
            .attr('width', legendRectSize)
            .attr('height', legendRectSize);

        d3.select('#legend')
            .selectAll('.legend-text')
            .data(categories)
            .transition().duration(this.props.animDuration)
            .attr('x', legendRectSize * 1.5)
            .attr('y', legendRectSize * 2 / 3)
            .text(d => d);
    }

    componentDidMount() {
        this.updateChart();
    }

    render() {
        const { width, height, legendWidth, legendHeight, margin, legendRectSize, legendLabelWidth, legendLabelHeight } = this.props;
        const { err, root, categories } = this.state;

        const cells = root
        ? root.leaves().map((d, i) => 
            (<g className='cell' key={`cell${i}`} x={ 0 } y={ 0 } >
                <rect className='tile' />
                <text className='tile-text' />
            </g>))
        : [];

        const legend = categories
        ? categories.map((d, i) => 
            (<g key={`legendItem${i}`} 
                transform={`translate(
                        ${ (i % 3) * legendLabelWidth }, 
                        ${ Math.floor(i / 3) * legendRectSize + legendLabelHeight * Math.floor(i / 3) })` } >
                <rect className='legend-item'/>
                <text className='legend-text'/>
            </g>))
        : [];

        return (
            <div className='main treemap'>
                <div className='container'>
                    { err
                    ? <Error message={err.message} />
                    : <div className='graph'>
                        <div id='title'>Movie Sales</div>
                        <div id='description'>Top 100 Highest Grossing Movies Grouped By Genre</div>
                        <svg transform={ `translate(${ margin }, 0)`} ref={ viz => (this.viz = viz)} width={ width } height={ height }>
                            { cells }
                        </svg>
                        <svg transform={ `translate(${ margin }, 0)`} width={ legendWidth } height={ legendHeight } >
                            <g id='legend' transform={ `translate(${ (legendWidth - legendLabelWidth * 3) / 2 + margin }, ${ margin })`}>
                                { legend }
                            </g>
                        </svg>
                    </div>}
                </div>
            </div>
        );
    }
}


TreeMap.defaultProps = {
    animDuration: 800,
    height: 850,
    width: 940,
    legendWidth: 940,
    legendHeight: 200,
    legendRectSize: 20,
    legendLabelWidth: 150,
    legendLabelHeight: 30,
    margin: 30
};

export default TreeMap;