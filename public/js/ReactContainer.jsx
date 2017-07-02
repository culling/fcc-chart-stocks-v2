// References and useful pages
//https://stackoverflow.com/questions/41216948/this-setstate-is-not-a-function-when-trying-to-save-response-on-state

import React from 'react';
import {render} from 'react-dom';

//Navbars

//Containers
import StockContainer   from "./Containers/StockContainer.jsx";

//Modals
//import NewUserModal   from "./Modals/NewUserModal.jsx";
//import LoginUserModal from "./Modals/LoginUserModal.jsx";

//SearchBars
// import SearchBar        from "./SearchBar/SearchBar.jsx";


class ReactContainer extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            activeContainer: "#home-container",
            containerIds:[
                "#home-container",
                "#profile-container",
                "#myBoard-container",
                "#allBoard-container"
            ]

        }
        //Binding to this for functions
        this._setActiveContainer = this._setActiveContainer.bind(this);
        //this._getUser            = this._getUser.bind(this);

    };

    componentWillMount(){
        //this._getUser.bind(this);
        //this._getUser();
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

    _getUser(){
        //User
        jQuery.ajax({
            method: 'GET',
            url:"/api/user",
            success: (user)=>{
                this.setState({ user: user });
                console.log(user);
            },
            contentType : "application/json",
            dataType: "JSON"
        });
    };

    _setActiveContainer(newActiveContainerId){
        console.log("Active Container ID changed");
        //Show active container
        jQuery(newActiveContainerId)
            .attr("class", "div-visible");
        
        this.setState({activeContainer: newActiveContainerId});
        //console.log(this.state.activeContainer);
    }


    render(){
        return(
            <div className="row">
                <header className="col s9 m12">
                <b>Free Code Camp - Chart the Stock Market</b>
                </header>


                    <StockContainer />

            </div>
        )
    }

}


render(<ReactContainer />, document.getElementById('react-container'));