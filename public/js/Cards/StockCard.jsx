import React from 'react';
import {render} from 'react-dom';


//console.log("Stock Card Loaded");
class StockCard extends React.Component{
    constructor(props){
        super(props);
        //this.state={
            //stock: this.props.stock
        //}
    }

    render(){
        console.log(this.props.stock);
        return(

            <div className="chip">
                {this.props.stock}
                <i className="material-icons" onClick={() => this.props.closeClick(this.props.stock)}>close</i>
            </div>



        )
    }
}


export default StockCard;