import React from 'react';
import './App.css';
import SignUp from './components/signUp/signUp'
import Login from './components/Login/Login'
import IniciadoSesion from './components/IniciadoSesion/IniciadoSesion'
import {Switch,Route} from 'react-router-dom'
function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={IniciadoSesion} />
        <Route  path="/iniciarSesion" component={Login} />
        <Route  path="/registrarSesion" component={SignUp} />
      </Switch>
    </div>
  );
}

export default App;
