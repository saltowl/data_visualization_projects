(window.webpackJsonpdata_visualization_projects=window.webpackJsonpdata_visualization_projects||[]).push([[0],{132:function(t,e,a){t.exports=a(153)},137:function(t,e,a){},138:function(t,e,a){},139:function(t,e,a){},146:function(t,e,a){},147:function(t,e,a){},148:function(t,e,a){},149:function(t,e,a){},150:function(t,e,a){},151:function(t,e,a){},152:function(t,e,a){},153:function(t,e,a){"use strict";a.r(e);var n=a(0),r=a.n(n),i=a(77),c=a.n(i),o=(a(137),a(138),a(12)),l=a(13),s=(a(139),function(){return r.a.createElement("header",null,r.a.createElement("nav",{className:"nav-bar"},r.a.createElement("ul",null,r.a.createElement("li",null,r.a.createElement(o.b,{to:"/",className:"nav-link"},"Home")),r.a.createElement("li",null,r.a.createElement(o.b,{to:"/bar-chart",className:"nav-link"},"Bar Chart")),r.a.createElement("li",null,r.a.createElement(o.b,{to:"/scatterplot-graph",className:"nav-link"},"Scatterplot Graph")),r.a.createElement("li",null,r.a.createElement(o.b,{to:"/heat-map",className:"nav-link"},"Heat Map")),r.a.createElement("li",null,r.a.createElement(o.b,{to:"/choropleth-map",className:"nav-link"},"Choropleth Map")),r.a.createElement("li",null,r.a.createElement(o.b,{to:"/tree-map",className:"nav-link"},"Treemap Diagram")))))}),u=(a(145),a(146),function(){return r.a.createElement("div",{className:"home"},r.a.createElement("h1",null,"Welcome to my ",r.a.createElement("i",{className:"fas fa-chart-pie"}),"ata Visu",r.a.createElement("i",{className:"fas fa-chart-line"}),"zation Pr",r.a.createElement("i",{className:"fas fa-table"}),"jects"))}),d=a(6),h=a(7),m=a(10),p=a(8),g=a(2),f=a(9),v=(a(147),a(1)),b=(a(148),function(t){return r.a.createElement("div",{className:"Error"},r.a.createElement("div",null,t.message))}),y=function(t){function e(t){var a;return Object(d.a)(this,e),(a=Object(m.a)(this,Object(p.a)(e).call(this,t))).state={GDP:null,error:null},a.getData=a.getData.bind(Object(g.a)(a)),a.updateChart=a.updateChart.bind(Object(g.a)(a)),a.updateScales=a.updateScales.bind(Object(g.a)(a)),a.handleMouseOverBar=a.handleMouseOverBar.bind(Object(g.a)(a)),a.handleMouseOutBar=a.handleMouseOutBar.bind(Object(g.a)(a)),a.getData(),a}return Object(f.a)(e,t),Object(h.a)(e,[{key:"componentDidMount",value:function(){this.updateChart()}},{key:"getData",value:function(){var t=this;v.h("https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json").then((function(e){var a=e.data.map((function(t){return t[1]}));t.setState({linearScale:v.m().domain([0,v.i(a)+1e3]).range([0,t.props.height]),rawDates:e.data.map((function(t){return t[0]})),dates:e.data.map((function(t){return new Date(t[0])})),GDP:a,barWidth:t.props.width/a.length}),t.updateChart()})).catch((function(e){t.setState({error:e})}))}},{key:"updateChart",value:function(){var t=this;if(!this.state.error&&this.state.GDP){var e=this.state,a=e.dates,n=e.GDP,r=e.barWidth,i=e.rawDates,c=this.props,o=c.height,l=c.margin;this.updateScales();var s=n.map((function(e){return t.state.linearScale(e)}));v.r(this.viz).selectAll(".bar").data(s).transition().duration(this.props.animDuration).attr("x",(function(e,n){return t.state.xScale(a[n])+l})).attr("y",(function(t,e){return o-t})).attr("width",r).attr("height",(function(t){return t})).attr("data-date",(function(t,e){return i[e]})).attr("data-gdp",(function(t,e){return n[e]})),v.r(this.viz).select("#x-axis").call(v.a().scale(this.state.xScale)),v.r(this.viz).select("#y-axis").call(v.b(this.state.yScale))}}},{key:"updateScales",value:function(){var t=this.state,e=t.dates,a=t.GDP,n=this.props,r=n.width,i=n.height,c=new Date(v.i(e));c.setMonth(c.getMonth()+3);var o=v.o().domain([v.j(e),c]).range([0,r]),l=v.m().domain([0,v.i(a)+1e3]).range([i,0]);this.setState({xScale:o,yScale:l})}},{key:"handleMouseOverBar",value:function(t){var e=v.r("#tooltip"),a=v.r(t.target),n=parseFloat(a.attr("data-gdp")),r=a.attr("data-date"),i=this.viz.getBoundingClientRect(),c=i.x+t.target.x.baseVal.value,o=i.y+i.height-2*this.props.margin;e.transition().duration(200).style("opacity",1),e.html("".concat(r," <br> $ ").concat(n.toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g,"$1,")," Billion")).attr("data-date",r).style("left","".concat(c+10,"px")).style("top","".concat(o,"px"))}},{key:"handleMouseOutBar",value:function(t){v.r("#tooltip").transition().duration(200).style("opacity",0)}},{key:"render",value:function(){var t=this,e=this.state,a=e.error,n=e.GDP,i=e.barWidth,c=this.props,o=c.width,l=c.height,s=c.margin,u=n?n.map((function(e,a){return r.a.createElement("rect",{key:"bar".concat(a),className:"bar",onMouseOver:t.handleMouseOverBar,onMouseOut:t.handleMouseOutBar,y:l,x:s+a*i})})):[];return r.a.createElement("div",{className:"main bar-chart"},r.a.createElement("div",{className:"container"},a?r.a.createElement(b,{message:a.message}):r.a.createElement("div",{className:"graph"},r.a.createElement("div",{id:"title"},"United States GDP"),r.a.createElement("div",{id:"tooltip"}),r.a.createElement("svg",{ref:function(e){return t.viz=e},width:o+100,height:l+s},r.a.createElement("text",{transform:"rotate(-90)",x:-200,y:80},"Gross Domestic Product"),r.a.createElement("text",{x:o-s-20,y:l+50},r.a.createElement("a",{href:"http://www.bea.gov/national/pdf/nipaguid.pdf",target:"_blank",rel:"noopener noreferrer"},"More Information...")),r.a.createElement("g",{id:"x-axis",transform:"translate(".concat(s,", ").concat(l,")")}),r.a.createElement("g",{id:"y-axis",transform:"translate(".concat(s,", 0)")}),u))))}}]),e}(r.a.Component);y.defaultProps={animDuration:800,height:400,width:800,margin:60};var O=y,E=a(80);a(149);function x(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,n)}return a}var j=function(t){function e(t){var a;return Object(d.a)(this,e),(a=Object(m.a)(this,Object(p.a)(e).call(this,t))).state={err:null,data:null,dotRadius:6,legendSide:18},a.getData=a.getData.bind(Object(g.a)(a)),a.updateChart=a.updateChart.bind(Object(g.a)(a)),a.updateScales=a.updateScales.bind(Object(g.a)(a)),a.updateLegend=a.updateLegend.bind(Object(g.a)(a)),a.handleMouseOutDot=a.handleMouseOutDot.bind(Object(g.a)(a)),a.handleMouseOverDot=a.handleMouseOverDot.bind(Object(g.a)(a)),a.getData(),a}return Object(f.a)(e,t),Object(h.a)(e,[{key:"getData",value:function(){var t=this;v.h("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json").then((function(e){var a=e.map((function(t){var e=t.Time.split(":");return function(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?x(a,!0).forEach((function(e){Object(E.a)(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):x(a).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}({},t,{Time:new Date(1970,0,1,0,e[0],e[1])})}));t.setState({data:a}),t.updateChart()})).catch((function(e){t.setState({err:e})}))}},{key:"updateChart",value:function(){if(!this.state.err&&this.state.data){this.updateScales();var t=this.state,e=t.data,a=t.xScale,n=t.yScale,r=t.color,i=t.dotRadius,c=this.props,o=c.margin,l=c.cor;v.r(this.viz).select("#x-axis").call(v.a(a).tickFormat(v.d("d"))),v.r(this.viz).select("#y-axis").call(v.b(n).tickFormat(v.t("%M:%S"))),v.r(this.viz).selectAll(".dot").data(e).transition().duration(this.props.animDuration).attr("cx",(function(t){return a(t.Year)+o})).attr("cy",(function(t){return n(t.Time)+l})).attr("r",i).attr("data-xvalue",(function(t){return t.Year})).attr("data-yvalue",(function(t){return t.Time.toISOString()})).attr("data-name",(function(t){return t.Name})).attr("data-doping",(function(t){return t.Doping})).attr("data-country",(function(t){return t.Nationality})).style("fill",(function(t){return r(""!==t.Doping)})),this.updateLegend()}}},{key:"updateScales",value:function(){var t=this.state.data,e=this.props,a=e.width,n=e.height,r=v.m().domain([v.j(t,(function(t){return t.Year-1})),v.i(t,(function(t){return t.Year+1}))]).range([0,a]),i=v.o().domain(v.c(t,(function(t){return t.Time}))).range([0,n]),c=v.n(v.p);this.setState({xScale:r,yScale:i,color:c})}},{key:"updateLegend",value:function(){var t=this.state.color,e=v.s(".legend").data(t.domain());e.select("rect").style("fill",t),e.select("text").text((function(t){return t?"Riders with doping allegations":"No doping allegations"}))}},{key:"componentDidMount",value:function(){this.updateChart()}},{key:"handleMouseOverDot",value:function(t){var e=v.r("#tooltip"),a=v.r(t.target),n=this.viz.getBoundingClientRect(),r=n.x+t.target.cx.baseVal.value,i=n.y+t.target.cy.baseVal.value,c=a.attr("data-name"),o=a.attr("data-doping"),l=a.attr("data-xvalue"),s=v.t("%M:%S")(new Date(a.attr("data-yvalue"))),u=a.attr("data-country");e.transition().duration(200).style("opacity",1),e.html("".concat(c,": ").concat(u," <br> Year: ").concat(l,", Time: ").concat(s," <br> <br> ").concat(o)).attr("data-year",l).style("left","".concat(r,"px")).style("top","".concat(i,"px"))}},{key:"handleMouseOutDot",value:function(t){v.r("#tooltip").transition().duration(200).style("opacity",0)}},{key:"render",value:function(){var t=this,e=this.state,a=e.err,n=e.data,i=e.dotRadius,c=e.legendSide,o=this.props,l=o.width,s=o.height,u=o.margin,d=o.cor,h=n?n.map((function(e,a){return r.a.createElement("circle",{key:"circle".concat(a),className:"dot",onMouseOver:t.handleMouseOverDot,onMouseOut:t.handleMouseOutDot,cy:s,cx:u,r:i})})):[],m=[0,1].map((function(t,e){return r.a.createElement("g",{className:"legend",key:"legend".concat(e),transform:"translate(0, ".concat(s/2-20*e," )")},r.a.createElement("text",{x:l+u-1.5*c,y:c/2,dy:".35em"}),r.a.createElement("rect",{x:l+u-c,width:c,height:c}))}));return r.a.createElement("div",{className:"main scatterplot"},r.a.createElement("div",{className:"container"},a?r.a.createElement(b,{message:a.message}):r.a.createElement("div",{className:"graph"},r.a.createElement("div",{id:"title"},"Doping in Professional Bicycle Racing"),r.a.createElement("div",{id:"tooltip"}),r.a.createElement("svg",{ref:function(e){return t.viz=e},width:l+2*u,height:s+u+d},r.a.createElement("g",{id:"x-axis",transform:"translate(".concat(u,", ").concat(s+d,")")}),r.a.createElement("g",{id:"y-axis",transform:"translate(".concat(u,", ").concat(d,")")}),r.a.createElement("g",{id:"legend"},m),h))))}}]),e}(r.a.Component);j.defaultProps={animDuration:800,height:420,width:800,margin:60,cor:20};var k=j,S=a(81),C=(a(150),function(t){function e(t){var a;return Object(d.a)(this,e),(a=Object(m.a)(this,Object(p.a)(e).call(this,t))).getData=a.getData.bind(Object(g.a)(a)),a.updateChart=a.updateChart.bind(Object(g.a)(a)),a.updateScales=a.updateScales.bind(Object(g.a)(a)),a.updateLegend=a.updateLegend.bind(Object(g.a)(a)),a.handleMouseOverCell=a.handleMouseOverCell.bind(Object(g.a)(a)),a.handleMouseOutCell=a.handleMouseOutCell.bind(Object(g.a)(a)),a.state={err:null,data:null,description:null},a.getData(),a}return Object(f.a)(e,t),Object(h.a)(e,[{key:"getData",value:function(){var t=this;v.h("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json").then((function(e){var a=e.monthlyVariance[0].year,n=e.monthlyVariance[e.monthlyVariance.length-1].year;t.setState({data:e.monthlyVariance,baseTemperature:e.baseTemperature,description:"".concat(a," - ").concat(n,": base temperature ").concat(e.baseTemperature+t.props.mes)}),t.updateChart()})).catch((function(e){t.setState({err:e})}))}},{key:"updateChart",value:function(){if(!this.state.err&&this.state.data){this.updateScales();var t=this.state,e=t.data,a=t.baseTemperature,n=t.xScale,r=t.yScale,i=t.colorScale;v.r(this.viz).select("#x-axis").call(v.a(n).tickValues(n.domain().filter((function(t){return t%10===0}))).tickSize(10,1)),v.r(this.viz).select("#y-axis").call(v.b(r).tickValues(r.domain()).tickFormat((function(t){var e=new Date(0);return e.setUTCMonth(t),v.t("%B")(e)})).tickSize(10,1)),v.r(this.viz).selectAll(".cell").data(e).transition().duration(this.props.animDuration).attr("x",(function(t){return n(t.year)})).attr("y",(function(t){return r(t.month-1)})).attr("width",n.bandwidth()).attr("height",(function(t){return r.bandwidth()})).attr("fill",(function(t){return i(a+t.variance)})).attr("data-month",(function(t){return t.month-1})).attr("data-year",(function(t){return t.year})).attr("data-temp",(function(t){return a+t.variance})),this.updateLegend()}}},{key:"updateScales",value:function(){var t=this.state,e=t.data,a=t.baseTemperature,n=this.props,r=n.width,i=n.height,c=n.legendColors,o=n.legendWidth,l=v.l().domain(e.map((function(t){return t.year}))).range([0,r]),s=v.l().domain(Object(S.a)(new Set(e.map((function(t){return t.month-1}))))).range([0,i]),u=a+v.j(e,(function(t){return t.variance})),d=a+v.i(e,(function(t){return t.variance})),h=(d-u)/(c.length-1),m=v.k(u,d,h);m.push(d);var p=v.m().domain(m).range(c).interpolate(v.g),g=v.m().domain([u,d]).range([0,o]);this.setState({xScale:l,yScale:s,colorScale:p,legendScale:g})}},{key:"updateLegend",value:function(){var t=this.state,e=t.colorScale,a=t.legendScale,n=this.props.legendColors;v.r(this.viz).select("#gradient").selectAll("stop").data(n).enter().append("stop").attr("offset",(function(t,e){return e/(n.length-1)})).attr("stop-color",(function(t){return t})),v.r(this.viz).select("#legend-axis").call(v.a(a).tickValues(e.domain()).tickFormat(v.d(".1f")))}},{key:"componentDidMount",value:function(){this.updateChart()}},{key:"handleMouseOverCell",value:function(t){var e=v.r("#tooltip"),a=v.r(t.target),n=this.viz.getBoundingClientRect(),r=n.x+t.target.x.baseVal.value+this.props.margin,i=n.y+t.target.y.baseVal.value-1.5*t.target.height.baseVal.value,c=a.attr("data-year"),o=v.t("%B")(new Date(c,a.attr("data-month"))),l=parseFloat(a.attr("data-temp")).toFixed(1);a.transition().duration(10).style("fill-opacity",.2),e.transition().duration(200).style("opacity",1),e.html("".concat(c," - ").concat(o," <br> ").concat(l," ").concat(this.props.mes)).attr("data-year",c).style("left","".concat(r,"px")).style("top","".concat(i,"px"))}},{key:"handleMouseOutCell",value:function(t){v.r(t.target).transition().duration(500).style("fill-opacity",1),v.r("#tooltip").transition().duration(200).style("opacity",0)}},{key:"render",value:function(){var t=this,e=this.state,a=e.err,n=e.data,i=e.description,c=this.props,o=c.width,l=c.height,s=c.margin,u=c.legendHeight,d=c.legendWidth,h=n?n.map((function(e,a){return r.a.createElement("rect",{className:"cell",key:"rect".concat(a),onMouseOver:t.handleMouseOverCell,onMouseOut:t.handleMouseOutCell})})):[];return r.a.createElement("div",{className:"main heatmap"},r.a.createElement("div",{className:"container"},a?r.a.createElement(b,{message:a.message}):r.a.createElement("div",{className:"graph"},r.a.createElement("div",{id:"title"},"Monthly Global Land-Surface Temperature"),r.a.createElement("div",{id:"description"},i),r.a.createElement("div",{id:"tooltip"}),r.a.createElement("svg",{id:"svg-graph",ref:function(e){return t.viz=e},width:o+s,height:l+s+s/2},r.a.createElement("defs",null,r.a.createElement("linearGradient",{id:"gradient"})),r.a.createElement("g",{id:"x-axis",transform:"translate(".concat(s,", ").concat(l,")"),fill:"black"},r.a.createElement("text",{className:"label",transform:"translate(".concat(o/2,", ").concat(s/2,")")},"Years")),r.a.createElement("g",{id:"y-axis",transform:"translate(".concat(s,", 0)")},r.a.createElement("text",{className:"label",transform:"translate(".concat(-s/2,", ").concat((l-s)/2,") rotate(-90)")},"Months")),r.a.createElement("g",{id:"map",transform:"translate(".concat(s,", 0 )")},h),r.a.createElement("g",{id:"legend",transform:"translate(".concat(s+o/2-d/2,", ").concat(l+s,")")},r.a.createElement("text",{className:"label",transform:"translate(".concat(-40,", ").concat(-5,")")},"t ",this.props.mes),r.a.createElement("rect",{fill:"url(#".concat("gradient",")"),transform:"translate(0, ".concat(-u,")"),height:u,width:d}),r.a.createElement("g",{id:"legend-axis"}))))))}}]),e}(r.a.Component));C.defaultProps={animDuration:800,height:400,width:1200,legendWidth:300,legendHeight:20,margin:100,mes:"\u2103",legendColors:["#2c7bb6","#00a6ca","#00ccbc","#90eb9d","#ffff8c","#f9d057","#f29e2e","#e76818","#d7191c"]};var D=C,M=(a(151),a(27)),w=function(t){function e(t){var a;return Object(d.a)(this,e),(a=Object(m.a)(this,Object(p.a)(e).call(this,t))).state={err:null,counties:null,edication:null},a.getData=a.getData.bind(Object(g.a)(a)),a.updateChart=a.updateChart.bind(Object(g.a)(a)),a.updateLegend=a.updateLegend.bind(Object(g.a)(a)),a.updateScales=a.updateScales.bind(Object(g.a)(a)),a.handleMouseOverCounty=a.handleMouseOverCounty.bind(Object(g.a)(a)),a.handleMouseOutCounty=a.handleMouseOutCounty.bind(Object(g.a)(a)),a.getData(),a}return Object(f.a)(e,t),Object(h.a)(e,[{key:"getData",value:function(){var t=this;Promise.all(["https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/counties.json","https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/for_user_education.json"].map((function(t){return v.h(t)}))).then((function(e){t.setState({education:e[1],counties:e[0]}),t.updateChart()})).catch((function(e){t.setState({err:e})}))}},{key:"updateChart",value:function(){if(!this.state.err&&this.state.counties&&this.state.education){this.updateScales();var t=this.state,e=t.counties,a=t.education,n=t.colorScale,r=v.e();v.r(this.viz).selectAll(".county").data(M.a(e,e.objects.counties).features).attr("d",r).attr("fill",(function(t){var e=a.filter((function(e){return e.fips===t.id}))[0];return n(e?e.bachelorsOrHigher:0)})).attr("data-fips",(function(t){return t.id})).attr("data-education",(function(t){var e=a.filter((function(e){return e.fips===t.id}))[0];return e?e.bachelorsOrHigher:0})),v.r(this.viz).select("#states").datum(M.b(e,e.objects.states,(function(t,e){return t!==e}))).attr("d",r),this.updateLegend()}}},{key:"updateScales",value:function(){var t=this.state.education,e=this.props,a=e.legendWidth,n=e.legendColors,r=v.j(t,(function(t){return t.bachelorsOrHigher})),i=v.i(t,(function(t){return t.bachelorsOrHigher})),c=(i-r)/(n.length-1),o=v.k(r,i,c);o.push(i);var l=r-c;o.unshift(l);var s=v.m().domain(o).range(n).interpolate(v.g),u=v.m().domain([l,i]).range([0,a]);this.setState({colorScale:s,legendScale:u})}},{key:"updateLegend",value:function(){var t=this.state,e=t.colorScale,a=t.legendScale,n=this.props.legendColors;v.r(this.viz).select("#gradient").selectAll("stop").data(n).enter().append("stop").attr("offset",(function(t,e){return e/(n.length-1)})).attr("stop-color",(function(t){return t})),v.r(this.viz).select("#legend-axis").call(v.a(a).tickValues(e.domain().filter((function(t,a){return 0!==a&&a!==e.domain().length-1}))).tickFormat((function(t){return v.d(".0f")(t)+"%"})))}},{key:"componentDidMount",value:function(){this.updateChart()}},{key:"handleMouseOverCounty",value:function(t){var e=this.state.education,a=v.r("#tooltip"),n=v.r(t.target),r=t.pageX,i=t.pageY;n.transition().duration(10).style("fill-opacity",.2),a.transition().duration(200).style("opacity",.9);var c=t.target.__data__.id,o=n.attr("data-education"),l=e.filter((function(t){return t.fips===c}))[0].state,s=e.filter((function(t){return t.fips===c}))[0].area_name;a.html("".concat(s,", ").concat(l,": ").concat(o,"%")).style("left","".concat(r,"px")).style("top","".concat(i,"px")).attr("data-education",o)}},{key:"handleMouseOutCounty",value:function(t){v.r(t.target).transition().duration(300).style("fill-opacity",1),v.r("#tooltip").transition().duration(200).style("opacity",0)}},{key:"render",value:function(){var t=this,e=this.state.err,a=this.props,n=a.width,i=a.height,c=a.margin,o=a.legendHeight,l=a.legendWidth,s=this.state.counties?this.state.counties.objects.counties.geometries.map((function(e,a){return r.a.createElement("path",{className:"county",key:"county".concat(a),onMouseOver:t.handleMouseOverCounty,onMouseOut:t.handleMouseOutCounty})})):[];return r.a.createElement("div",{className:"main choroplethmap"},r.a.createElement("div",{className:"container"},e?r.a.createElement(b,{message:e.message}):r.a.createElement("div",{className:"graph"},r.a.createElement("div",{id:"title"},"United States Educational Attainment"),r.a.createElement("div",{id:"description"},"Percentage of adults age 25 and older with a bachelor's degree or higher (2010-2014)"),r.a.createElement("div",{id:"tooltip"}),r.a.createElement("svg",{ref:function(e){return t.viz=e},width:n+c,height:i},r.a.createElement("defs",null,r.a.createElement("linearGradient",{id:"gradient"})),r.a.createElement("g",{id:"legend",transform:"translate(".concat(2*n/3+c/2,", ").concat(2*o,")")},r.a.createElement("rect",{fill:"url(#".concat("gradient",")"),transform:"translate(0, ".concat(-o,")"),height:o,width:l}),r.a.createElement("g",{id:"legend-axis"})),r.a.createElement("g",{className:"counties",transform:"translate(".concat(c,", 0 )")},s),r.a.createElement("path",{id:"states",transform:"translate(".concat(c,", 0 )")})))))}}]),e}(r.a.Component);w.defaultProps={height:600,width:960,legendWidth:250,legendHeight:15,margin:100,legendColors:["#2c7bb6","#00a6ca","#00ccbc","#90eb9d","#ffff8c","#f9d057","#f29e2e","#e76818","#d7191c"]};var N=w,z=(a(152),function(t){t.each((function(){for(var t,e=v.r(this),a=e.text().split(/\s+/).reverse(),n=[],r=0,i=e.attr("x"),c=e.attr("y"),o=e.text(null).append("tspan").attr("x",i).attr("y",c).attr("dy","".concat(0,"em")),l=e._groups[0][0].parentNode.__data__.x1-e._groups[0][0].parentNode.__data__.x0-8;t=a.pop();)n.push(t),o.text(n.join(" ").trim()),o.node().getComputedTextLength()>l&&(n.pop(),o.text(n.join(" ")),n=[t],o=e.append("tspan").attr("x",i).attr("y",c).attr("dy","".concat(1.1*++r+0,"em")).text(t))}))}),P=function(t){function e(t){var a;return Object(d.a)(this,e),(a=Object(m.a)(this,Object(p.a)(e).call(this,t))).state={err:null},a.getData=a.getData.bind(Object(g.a)(a)),a.createRoot=a.modifyData.bind(Object(g.a)(a)),a.updateChart=a.updateChart.bind(Object(g.a)(a)),a.updateScales=a.updateScales.bind(Object(g.a)(a)),a.updateLegend=a.updateLegend.bind(Object(g.a)(a)),a.handleMouseOverCell=a.handleMouseOverCell.bind(Object(g.a)(a)),a.handleMouseOutCell=a.handleMouseOutCell.bind(Object(g.a)(a)),a.getData(),a}return Object(f.a)(e,t),Object(h.a)(e,[{key:"getData",value:function(){var t=this;v.h("https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json").then((function(e){t.setState({data:e}),t.modifyData(),t.updateChart()})).catch((function(e){t.setState({err:e})}))}},{key:"modifyData",value:function(){var t=this.state.data,e=v.f(t).sum((function(t){return t.value})).sort((function(t,e){return e.value-t.value})),a=e.leaves().map((function(t){return t.data.category})).filter((function(t,e,a){return a.indexOf(t)===e}));this.setState({root:e,categories:a})}},{key:"updateChart",value:function(){if(!this.state.err&&this.state.data&&this.state.root){this.updateScales();var t=this.state,e=t.colorScale,a=t.root,n=this.props,r=n.width,i=n.height;v.u().tile(v.v).size([r,i]).paddingInner(1)(a),v.r(this.viz).selectAll(".cell").data(a.leaves()).transition().duration(this.props.animDuration).attr("transform",(function(t){return"translate(".concat(t.x0,", ").concat(t.y0,")")})),v.r(this.viz).selectAll(".tile").data(a.leaves()).attr("width",(function(t){return t.x1-t.x0})).attr("height",(function(t){return t.y1-t.y0})).attr("data-name",(function(t){return t.data.name})).attr("data-category",(function(t){return t.data.category})).attr("data-value",(function(t){return t.data.value})).attr("fill",(function(t){return e(t.data.category)})),v.r(this.viz).selectAll(".tile-text").data(a.leaves()).attr("x",4).attr("y",15).text((function(t){return t.data.name})).call(z),this.updateLegend()}}},{key:"updateScales",value:function(){var t=v.n(v.q);this.setState({colorScale:t})}},{key:"updateLegend",value:function(){var t=this.state,e=t.categories,a=t.colorScale,n=this.props.legendRectSize;v.r("#legend").selectAll(".legend-item").data(e).attr("fill",(function(t){return a(t)})).attr("width",n).attr("height",n),v.r("#legend").selectAll(".legend-text").data(e).transition().duration(this.props.animDuration).attr("x",1.5*n).attr("y",2*n/3).text((function(t){return t}))}},{key:"componentDidMount",value:function(){this.updateChart()}},{key:"handleMouseOverCell",value:function(t){var e=v.r("#tooltip"),a=v.r(t.target),n=t.pageX,r=t.pageY,i=a.attr("data-name"),c=a.attr("data-category"),o=a.attr("data-value"),l=o.replace(/(?=\B(?:\d{3})+(?!\d))/g," ");a.transition().duration(10).style("fill-opacity",.2),e.transition().duration(200).style("opacity",.95),e.html("<mark>Name:</mark> <b>".concat(i,"</b> <br>\n            <mark>Category:</mark> <b>").concat(c,"</b> <br>\n            <mark>Value:</mark> <b>$ ").concat(l,"</b>")).style("left","".concat(n,"px")).style("top","".concat(r,"px")).attr("data-value",o)}},{key:"handleMouseOutCell",value:function(t){v.r(t.target).transition().duration(500).style("fill-opacity",1),v.r("#tooltip").transition().duration(200).style("opacity",0)}},{key:"render",value:function(){var t=this,e=this.props,a=e.width,n=e.height,i=e.legendWidth,c=e.legendHeight,o=e.margin,l=e.legendRectSize,s=e.legendLabelWidth,u=e.legendLabelHeight,d=this.state,h=d.err,m=d.root,p=d.categories,g=m?m.leaves().map((function(e,a){return r.a.createElement("g",{className:"cell",key:"cell".concat(a),x:0,y:0},r.a.createElement("rect",{className:"tile",onMouseOver:t.handleMouseOverCell,onMouseOut:t.handleMouseOutCell}),r.a.createElement("text",{className:"tile-text"}))})):[],f=p?p.map((function(t,e){return r.a.createElement("g",{key:"legendItem".concat(e),transform:"translate(\n                        ".concat(e%3*s,", \n                        ").concat(Math.floor(e/3)*l+u*Math.floor(e/3),")")},r.a.createElement("rect",{className:"legend-item"}),r.a.createElement("text",{className:"legend-text"}))})):[];return r.a.createElement("div",{className:"main treemap"},r.a.createElement("div",{className:"container"},h?r.a.createElement(b,{message:h.message}):r.a.createElement("div",{className:"graph"},r.a.createElement("div",{id:"title"},"Movie Sales"),r.a.createElement("div",{id:"description"},"Top 100 Highest Grossing Movies Grouped By Genre"),r.a.createElement("svg",{transform:"translate(".concat(o,", 0)"),ref:function(e){return t.viz=e},width:a,height:n},g),r.a.createElement("svg",{transform:"translate(".concat(o,", 0)"),width:i,height:c},r.a.createElement("g",{id:"legend",transform:"translate(".concat((i-3*s)/2+o,", ").concat(o,")")},f)),r.a.createElement("div",{id:"tooltip"}))))}}]),e}(r.a.Component);P.defaultProps={animDuration:800,height:850,width:940,legendWidth:940,legendHeight:200,legendRectSize:20,legendLabelWidth:150,legendLabelHeight:30,margin:30};var _=P;var L=function(){return r.a.createElement("div",{className:"App"},r.a.createElement(o.a,null,r.a.createElement(s,null),r.a.createElement(l.c,null,r.a.createElement(l.a,{exact:!0,path:"/",component:u}),r.a.createElement(l.a,{path:"/bar-chart",component:O}),r.a.createElement(l.a,{path:"/scatterplot-graph",component:k}),r.a.createElement(l.a,{path:"/heat-map",component:D}),r.a.createElement(l.a,{path:"/choropleth-map",component:N}),r.a.createElement(l.a,{path:"/tree-map",component:_}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(L,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()}))}},[[132,1,2]]]);
//# sourceMappingURL=main.ab3382e4.chunk.js.map