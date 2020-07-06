import React,{Component} from 'react';
import GoogleLogin from 'react-google-login';
import './Google.css';
class LoginGoogle extends Component{
    render(){
        const responseGoogle = (res) => {
            console.log(res)
        }

        return(
            <section >
                <GoogleLogin className='google'
                    clientId='176336676067-pi8j6uv799ba1hpl9ejrcp99ss31o19e.apps.googleusercontent.com'
                    buttonText='LOGIN WITH GOOGLE'
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                />
            </section>
        )
    }
}

export default LoginGoogle