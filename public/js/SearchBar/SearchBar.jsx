import React from 'react';
import {render} from 'react-dom';



class SearchBar extends React.Component{
    constructor(props){
        super(props);
        this.state={
            searchText: "Stock Market Ticker - NASD",
            stocks: []
        }
        this.defaultSearchLocation = "Stock Market Ticker - NASD";
    }

    componentWillMount(){
        $('document').ready(function() {
            console.log("javascript Loaded");
        });


        this.setState({stocks: this.props.stocks});
        socket.on('new state', function(newState) {
            console.log("NEW STATE IN SEARCH BAR");
            this.setState(newState);

        }.bind(this));        
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.stocks !== this.state.stocks){
            this.setState({stocks: nextProps.stocks});
        }
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
        
        jQuery.ajax({ url: '/api/stock', 
            contentType: 'application/json', // for request
            dataType: 'json', //for response
            type: 'POST',
            data: JSON.stringify(newStateDiff) 
        });
        
        console.log(newStateDiff);
        console.log("Save to DB called");
    }
    //End NETWORK Sync


    _formSubmit(event){
        //Set the value before submission unless it is the default text;
        console.log("Search Submitted")

        event.preventDefault();
        var searchText = jQuery("#searchText").val();

        var alreadyExists = (this.props.stocks.indexOf(searchText) >= 0);


        //if(alreadyExists != true){
            if (searchText == ""){
                console.log("searchText is blank");
            }else{
                //console.log(this.state);
                var stocks = this.state.stocks.map((stock)=>{
                    return stock;
                });
                stocks.push(searchText);
                console.log(stocks);

                this.networkSetState({stocks: stocks });
                jQuery("#searchText").val("");
            }
        //}

    }







    render(){
        
        var searchBar = <input ref={(input)=> this.search = input} id="searchText" 
            className="col s9" placeholder={this.state.searchText} 
            defaultValue={""} name="searchText" type="text" ></input>
        //}

        return (

            <form id="search" action="/" method="get" onSubmit={this._formSubmit.bind(this) }  >
                <div className="col s9">
                    <input ref={(input)=> this.search = input} id="searchText" 
                     placeholder={this.state.searchText} 
                    defaultValue={""} name="searchText" type="text" ></input>

                </div>
                <span className="input-group-btn col s3">
                    <button type="submit" className="btn btn-block btn-primary"  > <i className="material-icons">search</i>  </button>
                </span>
            </form>
    )}

}


export default SearchBar;
