import React, { Component } from 'react';
import FacebookLoginBtn from 'react-facebook-login';
import './Facebook.css';

class LoginFacebook extends Component {
    state = {
        auth: false,
        name: '',
        picture: '',
        email: ''
    }

    componentClicked = () => {
        console.log('Facebook button clicked')
    }

    responseFacebook = (res) => {
        if(res.status !== 'unknown')
            this.setState({
                auth: true,
                name: res.name,
                picture: res.picture.data.url,
                email: res.email
            })
    }
    render(){
        let facebookdata;

        this.state.auth ?
            facebookdata = (
                <div className="cajita-facebook">
                    <img src={this.state.picture} alt={this.state.name} className="facebook-img"/>
                    <h2>Bienvenido, {this.state.name}</h2>
                </div>
            ) : 
            facebookdata = (
                <FacebookLoginBtn
                    appId= '1290118684713049'
                    autoLoad={true}
                    fields= 'name,email,picture'
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