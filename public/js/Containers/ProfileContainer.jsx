// References and useful pages
//https://stackoverflow.com/questions/41216948/this-setstate-is-not-a-function-when-trying-to-save-response-on-state

import React from 'react';
import {render} from 'react-dom';



class ProfileContainer extends React.Component{

    constructor(props){
        super(props);

    };

    componentWillMount(){

        socket.on('new state', function(newState) {
            console.log("new state found");
            //this.setState(newState);
        }.bind(this));
        Materialize.updateTextFields();
   }


    _objectifyForm(formArray) {//serialize data function
        var returnArray = {};
        for (var i = 0; i < formArray.length; i++){
            returnArray[formArray[i]['name']] = formArray[i]['value'];
        }
        return returnArray;
    };




    _updateProfileClick(){
        let _this = this;
        var formDataSerializedArray = jQuery("#profileForm").serializeArray();
        var formDataObject = this._objectifyForm(formDataSerializedArray);
        console.log(JSON.stringify( formDataObject ));
        jQuery.ajax({
            type: "PUT",
            url: "api/user",
            data: JSON.stringify(formDataObject ),
            success: function(){
                console.log("success");
                _this.props.getUser();
            },
            dataType: "text",
            contentType : "application/json"
        });        
    }



    render(){
        return(
            <div id="profile-container" className="div-hidden">
                
                <header>
                    <b>Profile</b>
                </header>
                {this.props.user &&
                <form id="profileForm">
                    <input id="username" name="username" 
                        type="text" disabled
                        value={this.props.user.username || ""} 
                    />

                    <div className="input-field">
                        <i className="material-icons prefix">lock</i>
                        <input type="password" name="password" id="password" required 
                            className="validate" pattern=".{5,64}" 
                            defaultValue={  this.props.user.password || "" }  />
                        <label htmlFor="password" >Password </label>
                    </div>

                    <div className="input-field">
                        <i className="material-icons prefix"> </i>
                        <input type="text" name="firstName" id="firstName" required 

                            defaultValue={  this.props.user.firstName || "" }  />
                        <label htmlFor="firstName" className="active" >First Name </label>
                    </div>
                    
                    <div className="input-field">
                        <i className="material-icons prefix"> </i>
                        <input type="text" name="lastName" id="lastName" required 
                            
                            defaultValue={  this.props.user.lastName || "" }  />
                        <label htmlFor="lastName" className="active" >Last Name </label>
                    </div>

                    <div className="input-field">
                        <i className="material-icons prefix"> </i>
                        <input type="text" name="city" id="city" required 
                            
                            defaultValue={  this.props.user.city || "" }  />
                        <label htmlFor="city" className="active" > City </label>
                    </div>


                    <div className="input-field">
                        <i className="material-icons prefix"> </i>
                        <input type="text" name="state" id="state" required 
                            
                            defaultValue={  this.props.user.state || "" }  />
                        <label htmlFor="state" className="active" > State </label>
                    </div>


                    <div className="input-field">
                        <i className="material-icons prefix"> </i>
                        <input type="text" name="country" id="country" required 
                            
                            defaultValue={  this.props.user.country || "" }  />
                        <label htmlFor="country" className="active" > Country </label>
                    </div>


                <button type="button" className="btn" onClick={ () => this._updateProfileClick() } >Submit</button>
                </form>
                }
            </div>
        )
    }
}


export default ProfileContainer;