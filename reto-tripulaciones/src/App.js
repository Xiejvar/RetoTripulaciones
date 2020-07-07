import React from 'react';
import './App.css';
import SignUp from './components/signUp/signUp'
import Login from './components/Login/Login'
<<<<<<< HEAD

function App() {
  return (
    <div className="App">
      <SignUp />
    <Login />
=======
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
>>>>>>> 1a457e79438722523ae1fd02d1d2004c60b45748
    </div>
  );
}

export default App;
