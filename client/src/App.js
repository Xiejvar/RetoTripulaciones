import React from 'react';
import './App.css';
import SignUp from './components/signUp/signUp';
import Login from './components/Login/Login';
import EmailEnviado from './components/EmailEnviado/EmailEnviado';
import CheckEmail from './components/CheckEmail/CheckEmail';
import Home from './components/Home/Home';
import IniciadoSesion from './components/IniciadoSesion/IniciadoSesion';
import Account from './components/Account/Account';
import Restaurant from './components/Restaurant/Restaurant'
import InformacionPersonal from './components/InformacionPersonal/InformacionPersonal'
import Mapa from './components/Mapa/Mapa'

import {Switch,Route} from 'react-router-dom';

import  { VerificationProvider } from './contexts/verificationToken';
import  { RestaurantProvider } from './contexts/findRestaurants'
import LocalRating from './components/Local-Rating/LocalRating'
import ShieldRating from './components/shields/shieldRating'
import RecuperaPass from './components/RecuperaPass/RecuperaPass';
import CorreoRecuperado from './components/CorreoRecuperado/CorreoRecuperado';
// import LocalRating from './components/Local-Rating/LocalRating'
// import StarRating from './components/shields/shield'

class App extends React.Component{
  constructor(props){
    super(props)
    this.state= {
      verification: {
        token: sessionStorage.getItem('token'),
        secret: sessionStorage.getItem('secret')
      },
      restaurantsSearch: []
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

  handleRestaurants(res){
    this.setState({
      ...this.state,
      restaurantsSearch: res
    })
  }
  render(){
      return (
        <div className="App">
           <VerificationProvider value={{tok:this.state.verification, handleVerification: this.handleVerification.bind(this)}}>
            <RestaurantProvider value={{restaurantsSearch: this.state.restaurantsSearch, handleRestaurants: this.handleRestaurants.bind(this)}}>
            <Switch>
              <Route exact path='/' render={ props => <Home {...props} />}  />
              <Route  path="/cuentaInicioSesion" render={ props => <IniciadoSesion {...props} />} />
              <Route  path="/iniciarSesion" render={ props => <Login {...props} />}/>
              <Route  path="/registrarSesion" render={ props => <SignUp {...props} />} />
              <Route  path="/checkEmail" render={ props => <CheckEmail {...props} />} />
              <Route  path="/restaurant/:index" render={ props => <Restaurant {...props} />} />
              <Route  path='/registrado' component={EmailEnviado}  />
              <Route  path='/recuperaPass' render={ props => <RecuperaPass {...props} />}  />
              <Route  path='/recuperaEmailSent' render={ props => <CorreoRecuperado {...props} />}  />
              <Route  path='/map' render={ props => <Mapa {...props} />}  />
              <Route  path='/cuenta' render={ props => <Account {...props} />}  />
              <Route  path='/personalInfo' render={ props => <InformacionPersonal {...props} />}  />
              <Route path='/valorar/:id' render={props => <LocalRating {...props} />} /> 
            </Switch>
            </RestaurantProvider>
          </VerificationProvider>
        </div>
      )
  }
}
export default App;
