import React, { Component } from 'react';
import FacebookLoginBtn from 'react-facebook-login';

class LoginFacebook extends Component {
    state = {
        auth: false,
        name: '',
        picture: ''
    }

    componentClicked = () => {
        console.log('Facebook button clicked')
    }

    responseFacebook = (res) => {
        console.log(res)
    }
    render(){
        let facebookdata;

        this.state.auth ?
            facebookdata = (
                <div>
                    Hi!
                </div>
            ) : 
            facebookdata = (
                <FacebookLoginBtn
                    appId= '1290118684713049'
                    autoLoad={true}
                    fields= 'name,picture'
                    onClick={this.componentClicked}
                    callback={this.responseFacebook}
                />
            )
        return(
            <>
                {facebookdata}
            </>
        )
    }
}

export default LoginFacebook