import React from 'react';
import {render} from 'react-dom';

class Graph extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            graphSeriesData: [],
            stocks: this.props.stocks
        }
    };

    componentWillMount(){
        console.log("Graph.js is Loaded");
        //$.getJSON('https://www.highcharts.com/samples/data/jsonp.php?filename=aapl-c.json&callback=?', function (data) {
        this.state.stocks.map((stock)=>{
            this._loadCompanyData(stock);
        });

        socket.on('new state', function(newState) {
            this.setState({graphSeriesData: []});
            this.setState(newState);
            this.state.stocks.map((stock)=>{
                this._loadCompanyData(stock);
            });

        }.bind(this));
    }

    _loadCompanyData(companyID){
        var graphSeriesStocks   = this.state.graphSeriesData.map((cd)=>{return cd.name});
        //console.log(graphSeriesStocks);
        var alreadyExists = (graphSeriesStocks.indexOf(companyID) >= 0);


        if(alreadyExists != true){
        jQuery.ajax({
            method: "GET",
            url:('/api/stock/' + companyID),
            success: (rawResult)=> {
                var graphSeriesData = [];
                graphSeriesData     = this.state.graphSeriesData.map((cd)=>{return cd});

                var resultObject = JSON.parse(rawResult);
                var resultsArray = [];

                for(var i = 0; i< resultObject.length; i++){
                    resultsArray.push(resultObject[i]);
                };

                var companyData = {
                    name: companyID,
                    data: resultsArray,
                    tooltip: {
                        valueDecimals: 2
                    },
                    _colorIndex: (graphSeriesData.length)
                };

                graphSeriesData.push(companyData);
                graphSeriesData = graphSeriesData.filter((thing) => {return thing});
                //console.log(graphSeriesData);
                this.setState({graphSeriesData: graphSeriesData});
            }
        });
        }
    }


    render(){
        if(this.state.graphSeriesData.length == this.state.stocks.length){
            
            Highcharts.stockChart('stock-graph-reactRendered', {
                rangeSelector: {
                    selected: 1
                },

                title: {
                    text: 'Stock Prices'
                },

                series: this.state.graphSeriesData
            });
        }

    return(
        <div>
            <div id="stock-graph-reactRendered"></div> 
        </div>
    )};

}


export default Graph;