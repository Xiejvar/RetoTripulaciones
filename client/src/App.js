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



class App extends React.Component{
  constructor(props){
    super(props)
    this.state= {
      testApi: ''
    }
  }

  render(){
      return (
        <div className="App">
          <Switch>
            <Route exact path='/' component={Home}  />
            <Route  path="/cuentaInicioSesion" component={IniciadoSesion} />
            <Route  path="/iniciarSesion" component={Login} />
            <Route  path="/registrarSesion" render={ props => <SignUp {...props} />} />
            <Route  path="/checkEmail" render={ props => <CheckEmail {...props} />} />
            <Route path='/registrado' component={EmailEnviado}  />
            <Route path='/cuenta' render={ props => <Account {...props} />}  />
          </Switch>
        </div>
      )
  }
}
export default App;
