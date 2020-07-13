import React from 'react';
import './App.css';
import SignUp from './components/signUp/signUp';
import Login from './components/Login/Login';
import EmailEnviado from './components/EmailEnviado/EmailEnviado';
import CheckEmail from './components/CheckEmail/CheckEmail';
import Home from './components/Home/Home';
import IniciadoSesion from './components/IniciadoSesion/IniciadoSesion';
import Account from './components/Account/Account';
import {Switch,Route} from 'react-router-dom';

import  { VerificationProvider } from './contexts/verificationToken'

class App extends React.Component{
  constructor(props){
    super(props)
    this.state= {
      verification: {
        token: sessionStorage.getItem('token'),
        secret: sessionStorage.getItem('secret')
      }
    }
  }

  handleVerification({ token ,secret }){
    if(sessionStorage.getItem('token') !== null && sessionStorage.getItem('secret') !== null){
      this.setState({
        ...this.state,
        verification: {
          token: token,
          secret: secret
        }
      })
    } else {
      this.setState({
        ...this.state,
        verification: {
          token: null,
          secret: null
        }
      })
    }
  }

  render(){
      return (
        <div className="App">
          <VerificationProvider value={{tok:this.state.verification, handleVerification: this.handleVerification.bind(this)}}>
            <Switch>
              <Route exact path='/' component={Home}  />
              <Route  path="/cuentaInicioSesion" component={IniciadoSesion} />
              <Route  path="/iniciarSesion" render={ props => <Login {...props} />}/>
              <Route  path="/registrarSesion" render={ props => <SignUp {...props} />} />
              <Route  path="/checkEmail" render={ props => <CheckEmail {...props} />} />
              <Route path='/registrado' component={EmailEnviado}  />
              <Route path='/cuenta' render={ props => <Account {...props} />}  />
            </Switch>
          </VerificationProvider>
        </div>
      )
  }
}
export default App;
