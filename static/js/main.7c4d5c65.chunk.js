(window.webpackJsonpdata_visualization_projects=window.webpackJsonpdata_visualization_projects||[]).push([[0],{100:function(t,e,a){},101:function(t,e,a){},102:function(t,e,a){},103:function(t,e,a){},109:function(t,e,a){"use strict";a.r(e);var n=a(0),r=a.n(n),i=a(60),o=a.n(i),c=(a(98),a(99),a(62)),l=a(7),s=a(9),u=a(10),d=a(12),h=a(11),m=a(2),p=a(13),g=(a(100),a(1)),f=(a(101),function(t){return r.a.createElement("div",{className:"Error"},r.a.createElement("div",null,t.message))}),v=function(t){function e(t){var a;return Object(s.a)(this,e),(a=Object(d.a)(this,Object(h.a)(e).call(this,t))).state={GDP:null,error:null},a.getData=a.getData.bind(Object(m.a)(a)),a.updateChart=a.updateChart.bind(Object(m.a)(a)),a.updateScales=a.updateScales.bind(Object(m.a)(a)),a.handleMouseOverBar=a.handleMouseOverBar.bind(Object(m.a)(a)),a.handleMouseOutBar=a.handleMouseOutBar.bind(Object(m.a)(a)),a.getData(),a}return Object(p.a)(e,t),Object(u.a)(e,[{key:"componentDidMount",value:function(){this.updateChart()}},{key:"getData",value:function(){var t=this;g.f("https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json").then((function(e){var a=e.data.map((function(t){return t[1]}));t.setState({linearScale:g.k().domain([0,g.g(a)+1e3]).range([0,t.props.height]),rawDates:e.data.map((function(t){return t[0]})),dates:e.data.map((function(t){return new Date(t[0])})),GDP:a,barWidth:t.props.width/a.length}),t.updateChart()})).catch((function(e){t.setState({error:e})}))}},{key:"updateChart",value:function(){var t=this;if(!this.state.error&&this.state.GDP){var e=this.state,a=e.dates,n=e.GDP,r=e.barWidth,i=e.rawDates,o=this.props,c=o.height,l=o.margin;this.updateScales();var s=n.map((function(e){return t.state.linearScale(e)}));g.o(this.viz).selectAll(".bar").data(s).transition().duration(this.props.animDuration).attr("x",(function(e,n){return t.state.xScale(a[n])+l})).attr("y",(function(t,e){return c-t})).attr("width",r).attr("height",(function(t){return t})).attr("data-date",(function(t,e){return i[e]})).attr("data-gdp",(function(t,e){return n[e]})),g.o(this.viz).select("#x-axis").call(g.a().scale(this.state.xScale)),g.o(this.viz).select("#y-axis").call(g.b(this.state.yScale))}}},{key:"updateScales",value:function(){var t=this.state,e=t.dates,a=t.GDP,n=this.props,r=n.width,i=n.height,o=new Date(g.g(e));o.setMonth(o.getMonth()+3);var c=g.m().domain([g.h(e),o]).range([0,r]),l=g.k().domain([0,g.g(a)+1e3]).range([i,0]);this.setState({xScale:c,yScale:l})}},{key:"handleMouseOverBar",value:function(t){var e=g.o("#tooltip"),a=g.o(t.target),n=parseFloat(a.attr("data-gdp")),r=a.attr("data-date"),i=this.viz.getBoundingClientRect(),o=i.x+t.target.x.baseVal.value,c=i.y+i.height-2*this.props.margin;e.transition().duration(200).style("opacity",1),e.html("".concat(r," <br> $ ").concat(n.toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g,"$1,")," Billion")).attr("data-date",r).style("left","".concat(o+10,"px")).style("top","".concat(c,"px"))}},{key:"handleMouseOutBar",value:function(t){g.o("#tooltip").transition().duration(200).style("opacity",0)}},{key:"render",value:function(){var t=this,e=this.state,a=e.error,n=e.GDP,i=e.barWidth,o=this.props,c=o.width,l=o.height,s=o.margin,u=n?n.map((function(e,a){return r.a.createElement("rect",{key:"bar".concat(a),className:"bar",onMouseOver:t.handleMouseOverBar,onMouseOut:t.handleMouseOutBar,y:l,x:s+a*i})})):[];return r.a.createElement("div",{className:"main bar-chart"},r.a.createElement("div",{className:"container"},a?r.a.createElement(f,{message:a.message}):r.a.createElement("div",{className:"graph"},r.a.createElement("div",{id:"title"},"United States GDP"),r.a.createElement("div",{id:"tooltip"}),r.a.createElement("svg",{ref:function(e){return t.viz=e},width:c+100,height:l+s},r.a.createElement("text",{transform:"rotate(-90)",x:-200,y:80},"Gross Domestic Product"),r.a.createElement("text",{x:c-s-20,y:l+50},r.a.createElement("a",{href:"http://www.bea.gov/national/pdf/nipaguid.pdf",target:"_blank",rel:"noopener noreferrer"},"More Information...")),r.a.createElement("g",{id:"x-axis",transform:"translate(".concat(s,", ").concat(l,")")}),r.a.createElement("g",{id:"y-axis",transform:"translate(".concat(s,", 0)")}),u))))}}]),e}(r.a.Component);v.defaultProps={animDuration:800,height:400,width:800,margin:60};var y=v,b=a(61);a(102);function O(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,n)}return a}var x=function(t){function e(t){var a;return Object(s.a)(this,e),(a=Object(d.a)(this,Object(h.a)(e).call(this,t))).state={err:null,data:null,dotRadius:6,legendSide:18},a.getData=a.getData.bind(Object(m.a)(a)),a.updateChart=a.updateChart.bind(Object(m.a)(a)),a.updateScales=a.updateScales.bind(Object(m.a)(a)),a.updateLegend=a.updateLegend.bind(Object(m.a)(a)),a.handleMouseOutDot=a.handleMouseOutDot.bind(Object(m.a)(a)),a.handleMouseOverDot=a.handleMouseOverDot.bind(Object(m.a)(a)),a.getData(),a}return Object(p.a)(e,t),Object(u.a)(e,[{key:"getData",value:function(){var t=this;g.f("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json").then((function(e){var a=e.map((function(t){var e=t.Time.split(":");return function(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?O(a,!0).forEach((function(e){Object(b.a)(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):O(a).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}({},t,{Time:new Date(1970,0,1,0,e[0],e[1])})}));t.setState({data:a}),t.updateChart()})).catch((function(e){t.setState({err:e})}))}},{key:"updateChart",value:function(){if(!this.state.err&&this.state.data){this.updateScales();var t=this.state,e=t.data,a=t.xScale,n=t.yScale,r=t.color,i=t.dotRadius,o=this.props,c=o.margin,l=o.cor;g.o(this.viz).select("#x-axis").call(g.a(a).tickFormat(g.d("d"))),g.o(this.viz).select("#y-axis").call(g.b(n).tickFormat(g.q("%M:%S"))),g.o(this.viz).selectAll(".dot").data(e).transition().duration(this.props.animDuration).attr("cx",(function(t){return a(t.Year)+c})).attr("cy",(function(t){return n(t.Time)+l})).attr("r",i).attr("data-xvalue",(function(t){return t.Year})).attr("data-yvalue",(function(t){return t.Time.toISOString()})).attr("data-name",(function(t){return t.Name})).attr("data-doping",(function(t){return t.Doping})).attr("data-country",(function(t){return t.Nationality})).style("fill",(function(t){return r(""!==t.Doping)})),this.updateLegend()}}},{key:"updateScales",value:function(){var t=this.state.data,e=this.props,a=e.width,n=e.height,r=g.k().domain([g.h(t,(function(t){return t.Year-1})),g.g(t,(function(t){return t.Year+1}))]).range([0,a]),i=g.m().domain(g.c(t,(function(t){return t.Time}))).range([0,n]),o=g.l(g.n);this.setState({xScale:r,yScale:i,color:o})}},{key:"updateLegend",value:function(){var t=this.state.color,e=g.p(".legend").data(t.domain());e.select("rect").style("fill",t),e.select("text").text((function(t){return t?"Riders with doping allegations":"No doping allegations"}))}},{key:"componentDidMount",value:function(){this.updateChart()}},{key:"handleMouseOverDot",value:function(t){var e=g.o("#tooltip"),a=g.o(t.target),n=this.viz.getBoundingClientRect(),r=n.x+t.target.cx.baseVal.value,i=n.y+t.target.cy.baseVal.value,o=a.attr("data-name"),c=a.attr("data-doping"),l=a.attr("data-xvalue"),s=g.q("%M:%S")(new Date(a.attr("data-yvalue"))),u=a.attr("data-country");e.transition().duration(200).style("opacity",1),e.html("".concat(o,": ").concat(u," <br> Year: ").concat(l,", Time: ").concat(s," <br> <br> ").concat(c)).attr("data-year",l).style("left","".concat(r,"px")).style("top","".concat(i,"px"))}},{key:"handleMouseOutDot",value:function(t){g.o("#tooltip").transition().duration(200).style("opacity",0)}},{key:"render",value:function(){var t=this,e=this.state,a=e.err,n=e.data,i=e.dotRadius,o=e.legendSide,c=this.props,l=c.width,s=c.height,u=c.margin,d=c.cor,h=n?n.map((function(e,a){return r.a.createElement("circle",{key:"circle".concat(a),className:"dot",onMouseOver:t.handleMouseOverDot,onMouseOut:t.handleMouseOutDot,cy:s,cx:u,r:i})})):[],m=[0,1].map((function(t,e){return r.a.createElement("g",{className:"legend",key:"legend".concat(e),transform:"translate(0, ".concat(s/2-20*e," )")},r.a.createElement("text",{x:l+u-1.5*o,y:o/2,dy:".35em"}),r.a.createElement("rect",{x:l+u-o,width:o,height:o}))}));return r.a.createElement("div",{className:"main scatterplot"},r.a.createElement("div",{className:"container"},a?r.a.createElement(f,{message:a.message}):r.a.createElement("div",{className:"graph"},r.a.createElement("div",{id:"title"},"Doping in Professional Bicycle Racing"),r.a.createElement("div",{id:"tooltip"}),r.a.createElement("svg",{ref:function(e){return t.viz=e},width:l+2*u,height:s+u+d},r.a.createElement("g",{id:"x-axis",transform:"translate(".concat(u,", ").concat(s+d,")")}),r.a.createElement("g",{id:"y-axis",transform:"translate(".concat(u,", ").concat(d,")")}),r.a.createElement("g",{id:"legend"},m),h))))}}]),e}(r.a.Component);x.defaultProps={animDuration:800,height:420,width:800,margin:60,cor:20};var E=x,D=a(65),S=(a(103),function(t){function e(t){var a;return Object(s.a)(this,e),(a=Object(d.a)(this,Object(h.a)(e).call(this,t))).getData=a.getData.bind(Object(m.a)(a)),a.updateChart=a.updateChart.bind(Object(m.a)(a)),a.updateScales=a.updateScales.bind(Object(m.a)(a)),a.updateLegend=a.updateLegend.bind(Object(m.a)(a)),a.handleMouseOverCell=a.handleMouseOverCell.bind(Object(m.a)(a)),a.handleMouseOutCell=a.handleMouseOutCell.bind(Object(m.a)(a)),a.state={err:null,data:null,description:null},a.getData(),a}return Object(p.a)(e,t),Object(u.a)(e,[{key:"getData",value:function(){var t=this;g.f("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json").then((function(e){var a=e.monthlyVariance[0].year,n=e.monthlyVariance[e.monthlyVariance.length-1].year;t.setState({data:e.monthlyVariance,baseTemperature:e.baseTemperature,description:"".concat(a," - ").concat(n,": base temperature ").concat(e.baseTemperature+t.props.mes)}),t.updateChart()})).catch((function(e){t.setState({err:e})}))}},{key:"updateChart",value:function(){if(!this.state.err&&this.state.data){this.updateScales();var t=this.state,e=t.data,a=t.baseTemperature,n=t.xScale,r=t.yScale,i=t.colorScale;g.o(this.viz).select("#x-axis").call(g.a(n).tickValues(n.domain().filter((function(t){return t%10===0}))).tickSize(10,1)),g.o(this.viz).select("#y-axis").call(g.b(r).tickValues(r.domain()).tickFormat((function(t){var e=new Date(0);return e.setUTCMonth(t),g.q("%B")(e)})).tickSize(10,1)),g.o(this.viz).selectAll(".cell").data(e).transition().duration(this.props.animDuration).attr("x",(function(t){return n(t.year)})).attr("y",(function(t){return r(t.month-1)})).attr("width",n.bandwidth()).attr("height",(function(t){return r.bandwidth()})).attr("fill",(function(t){return i(a+t.variance)})).attr("data-month",(function(t){return t.month-1})).attr("data-year",(function(t){return t.year})).attr("data-temp",(function(t){return a+t.variance})),this.updateLegend()}}},{key:"updateScales",value:function(){var t=this.state,e=t.data,a=t.baseTemperature,n=this.props,r=n.width,i=n.height,o=n.legendColors,c=n.legendWidth,l=g.j().domain(e.map((function(t){return t.year}))).range([0,r]),s=g.j().domain(Object(D.a)(new Set(e.map((function(t){return t.month-1}))))).range([0,i]),u=a+g.h(e,(function(t){return t.variance})),d=a+g.g(e,(function(t){return t.variance})),h=(d-u)/(o.length-1),m=g.i(u,d,h);m.push(d);var p=g.k().domain(m).range(o).interpolate(g.e),f=g.k().domain([u,d]).range([0,c]);this.setState({xScale:l,yScale:s,colorScale:p,legendScale:f})}},{key:"updateLegend",value:function(){var t=this.state,e=t.colorScale,a=t.legendScale,n=this.props.legendColors;g.o(this.viz).select("#gradient").selectAll("stop").data(n).enter().append("stop").attr("offset",(function(t,e){return e/(n.length-1)})).attr("stop-color",(function(t){return t})),g.o(this.viz).select("#legend-axis").call(g.a(a).tickValues(e.domain()).tickFormat(g.d(".1f")))}},{key:"componentDidMount",value:function(){this.updateChart()}},{key:"handleMouseOverCell",value:function(t){var e=g.o("#tooltip"),a=g.o(t.target),n=this.viz.getBoundingClientRect(),r=n.x+t.target.x.baseVal.value+this.props.margin,i=n.y+t.target.y.baseVal.value-1.5*t.target.height.baseVal.value,o=a.attr("data-year"),c=g.q("%B")(new Date(o,a.attr("data-month"))),l=parseFloat(a.attr("data-temp")).toFixed(1);a.transition().duration(10).style("fill-opacity",.2),e.transition().duration(200).style("opacity",1),e.html("".concat(o," - ").concat(c," <br> ").concat(l," ").concat(this.props.mes)).attr("data-year",o).style("left","".concat(r,"px")).style("top","".concat(i,"px"))}},{key:"handleMouseOutCell",value:function(t){g.o(t.target).transition().duration(500).style("fill-opacity",1),g.o("#tooltip").transition().duration(200).style("opacity",0)}},{key:"render",value:function(){var t=this,e=this.state,a=e.err,n=e.data,i=e.description,o=this.props,c=o.width,l=o.height,s=o.margin,u=o.legendHeight,d=o.legendWidth,h=n?n.map((function(e,a){return r.a.createElement("rect",{className:"cell",key:"rect".concat(a),onMouseOver:t.handleMouseOverCell,onMouseOut:t.handleMouseOutCell})})):[];return r.a.createElement("div",{className:"main heatmap"},r.a.createElement("div",{className:"container"},a?r.a.createElement(f,{message:a.message}):r.a.createElement("div",{className:"graph"},r.a.createElement("div",{id:"title"},"Monthly Global Land-Surface Temperature"),r.a.createElement("div",{id:"description"},i),r.a.createElement("div",{id:"tooltip"}),r.a.createElement("svg",{id:"svg-graph",ref:function(e){return t.viz=e},width:c+s,height:l+s+s/2},r.a.createElement("defs",null,r.a.createElement("linearGradient",{id:"gradient"})),r.a.createElement("g",{id:"x-axis",transform:"translate(".concat(s,", ").concat(l,")"),fill:"black"},r.a.createElement("text",{className:"label",transform:"translate(".concat(c/2,", ").concat(s/2,")")},"Years")),r.a.createElement("g",{id:"y-axis",transform:"translate(".concat(s,", 0)")},r.a.createElement("text",{className:"label",transform:"translate(".concat(-s/2,", ").concat((l-s)/2,") rotate(-90)")},"Months")),r.a.createElement("g",{id:"map",transform:"translate(".concat(s,", 0 )")},h),r.a.createElement("g",{id:"legend",transform:"translate(".concat(s+c/2-d/2,", ").concat(l+s,")")},r.a.createElement("text",{className:"label",transform:"translate(".concat(-40,", ").concat(-5,")")},"t ",this.props.mes),r.a.createElement("rect",{fill:"url(#".concat("gradient",")"),transform:"translate(0, ".concat(-u,")"),height:u,width:d}),r.a.createElement("g",{id:"legend-axis"}))))))}}]),e}(r.a.Component));S.defaultProps={animDuration:800,height:400,width:1200,legendWidth:300,legendHeight:20,margin:100,mes:"\u2103",legendColors:["#2c7bb6","#00a6ca","#00ccbc","#90eb9d","#ffff8c","#f9d057","#f29e2e","#e76818","#d7191c"]};var j=S;var w=function(){return r.a.createElement("div",{className:"App"},r.a.createElement(c.a,null,r.a.createElement(l.c,null,r.a.createElement(l.a,{path:"/bar-chart",component:y}),r.a.createElement(l.a,{path:"/scatterplot-graph",component:E}),r.a.createElement(l.a,{path:"/heat-map",component:j}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(w,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()}))},93:function(t,e,a){t.exports=a(109)},98:function(t,e,a){},99:function(t,e,a){}},[[93,1,2]]]);
//# sourceMappingURL=main.7c4d5c65.chunk.js.map