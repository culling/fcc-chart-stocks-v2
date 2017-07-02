// References and useful pages
//https://stackoverflow.com/questions/41216948/this-setstate-is-not-a-function-when-trying-to-save-response-on-state

import React from 'react';
import {render} from 'react-dom';



class HomeContainer extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            activeContainer: "#home-container"
        }

    };

    componentWillMount(){

   }

   componentDidMount(){   
        socket.on('new state', function(newState) {
            console.log("new state found");
            //this.setState(newState);

        }.bind(this));
   }

   componentWillUnmount(){
        socket.removeListener('new state');
   }

    render(){
        return(
            <div id="home-container" className="home-container">
                <b>Home </b>
                {(this.props.user) &&
                <div id="welcome-message">
                    
                    Welcome {this.props.user.username} 
                    
                </div>
                }
            </div>
        )
    }
}


export default HomeContainer;