import React from 'react';
import {render} from 'react-dom';


//Cards
import StockCard   from "./../Cards/StockCard.jsx";

//SearchBars
import SearchBar        from "./../SearchBar/SearchBar.jsx";

//Graph
import Graph        from "./../Graphs/Graph.jsx";


class StockContainer extends React.Component{
    constructor(){
        super();
        this.state = {
            graphSeriesData: [],
            stocks:[],
            testStocks: ["AKAM","AMZN", "GOOG"]
        }
    };



    componentWillMount(){
            jQuery.ajax({
                method: 'GET',
                url:("/api/stock/"),
                success: (rawResult)=>{
                    var resultObject = JSON.parse(rawResult);
                    //console.log(resultObject.length);
                    if(resultObject.length > 0){
                        var stocks = [];
                        for(var i = 0; i< resultObject.length; i++){
                            stocks.push(resultObject[i].ticker);
                        };
                        console.log(stocks);
                        this.setState({stocks: stocks});
                    }else{
                        this.setState({stocks: this.state.testStocks});
                    }
                }
            });


        socket.on('new state', function(newState) {
            if (newState){
                console.log(newState);
                this.setState(newState);
            }
        }.bind(this));
    }


    _closeClick(stockToRemove){
        var stocks =  this.state.stocks.filter(function(stock){return ( stock != stockToRemove)  });
        console.log(stocks);
        if (stocks.length == 0){
            stocks = [];
        }

        this.networkSetState({stocks: stocks});
    }

    //NETWORK Sync
    networkSetState(newStateDiff) {
        // do some awesome network things here
        // 1. put the entire state into the database
        this.saveStateToDB(newStateDiff);
        // 2. put diffs onto the websocket
        this.postToSocket(newStateDiff);
        // 3. set state as per usual
        this.setState(newStateDiff);
    }

    postToSocket(newStateDiff) {
        socket.emit('new state', newStateDiff);
    }

    saveStateToDB(newStateDiff) {
        console.log(newStateDiff);
        jQuery.ajax({ url: '/api/stock', 
            contentType: 'application/json', // for request
            dataType: 'json', //for response
            type: 'POST',
            data: JSON.stringify(newStateDiff) 
        });
        console.log("Save to DB called");
    }
    //End NETWORK Sync



    render(){
        //console.log(this.state.stocks.length)
        return(
            <div>
                
                {/*(this.state.stocks.length > 0) &&            
                    <SearchBar stocks={this.state.stocks} />
                */}
                <SearchBar stocks={this.state.stocks} />
                
                <div className="row">
                    <div className="col s12">
                    {this.state.stocks.map((stock, i) => 
                        (<StockCard key={i} stock={stock} closeClick={this._closeClick.bind(this) } />)
                    )}
                    </div>
                </div>

                {this.state.stocks.length > 0 &&
                    <Graph stocks={this.state.stocks} />
                }

            </div>
        )
    }

}


export default StockContainer;