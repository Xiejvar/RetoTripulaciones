import React, { Component } from 'react';
import FacebookLoginBtn from 'react-facebook-login';
import './Facebook.css';
import VerificationContext from '../../contexts/verificationToken'

class LoginFacebook extends Component {
    static contextType = VerificationContext
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
                email: res.email,
                id: res.id,
                auth: res.accessToken
            })
    }

    sendUser(){
        let user = this.state
        fetch('http://localhost:1024/login', {
           method: 'POST',
           headers: {
               'Content-Type' : 'application/json'
           },
           body: JSON.stringify({
                name: this.state.name,
                email: user.email,
                auth: user.auth,
                secret: this.state.id
            })
       }).then(res => res.json())
       .then(res => {
           console.log(res)
           if(res.valid){
                sessionStorage.setItem('token', res.tok)
                sessionStorage.setItem('secret', res.sec)
               let user = {
                   token: res.tok,
                   secret: res.sec
                }
                this.context.handleVerification(user)
            this.props.history.push('/')
           }else{
            this.setState({
                ...this.state,
                show: true
            })
           }
       })
    }
    render(){
        let facebookdata;

        this.state.auth ?
            facebookdata = (
                this.sendUser()
            ) : 
            facebookdata = (
                <FacebookLoginBtn
                    appId= '1290118684713049'
                    autoLoad={false}
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