import React,{Component} from 'react';
import GoogleLogin from 'react-google-login';
import './Google.css';
import VerificationContext from '../../contexts/verificationToken'

class LoginGoogle extends Component{
    static contextType = VerificationContext
    constructor(){
        super()
    }
    sendUser({profileObj,accessToken,tokenId}){
        fetch('http://localhost:1024/login', {
           method: 'POST',
           headers: {
               'Content-Type' : 'application/json'
           },
           body: JSON.stringify({
                name: profileObj.name,
                email: profileObj.email,
                auth: accessToken,
                secret: tokenId
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
        const responseGoogle = (res) => {
            if(res.accessToken !== undefined){
                console.log(res)
                this.sendUser(res)
            }
        }
        return(
            <section >
                <GoogleLogin className='google'
                    clientId='176336676067-pi8j6uv799ba1hpl9ejrcp99ss31o19e.apps.googleusercontent.com'
                    buttonText='Google'
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                />
            </section>
        )
    }
}

export default LoginGoogle