// References and useful pages
//https://stackoverflow.com/questions/41216948/this-setstate-is-not-a-function-when-trying-to-save-response-on-state

import React from 'react';
import {render} from 'react-dom';

//Navbars
import PrimaryNavbar    from './Navbars/PrimaryNavbar.jsx';

//Containers
import HomeContainer    from "./Containers/HomeContainer.jsx";
import ProfileContainer from "./Containers/ProfileContainer.jsx";
//import BoardContainer   from "./Containers/BoardContainer.jsx";
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
            <div>
                <header>
                <b>My Bookswap</b>
                <PrimaryNavbar user={this.state.user} setActiveContainer={  this._setActiveContainer.bind(this) } />
                    {this.state.user &&
                        <div>
                            <b>Current User {this.state.user.username}</b>
                        </div>
                    }
                </header>
                    {/*
                    <NewUserModal />
                    <LoginUserModal getUser={ this._getUser.bind(this) } />
                    
                    <SearchBar              />
                    */}

                    {(this.state.activeContainer === "#home-container")&&
                    <HomeContainer          user={this.state.user} twitterUser={this.state.twitterUser} />
                    }
                    {(this.state.activeContainer === "#profile-container")&&
                    <ProfileContainer       user={this.state.user} getUser={ this._getUser.bind(this) } />
                    }
                    {/*(this.state.activeContainer === "#myBoard-container")&&
                    <div id="myBoard-container" >
                        <BoardContainer     user={this.state.user} filterUser={this.state.user} />
                    </div>
                    */}
                    {/*(this.state.activeContainer === "#allBoard-container")&&
                    <div id="allBoard-container" >
                        <BoardContainer     user={this.state.user}  filterUser={{username:null, type:"all"}}/>
                    </div>
                    */}

                    <StockContainer />

            </div>
        )
    }

}


render(<ReactContainer />, document.getElementById('react-container'));