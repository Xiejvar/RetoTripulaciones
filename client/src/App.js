import React from 'react';
import './App.css';
import SignUp from './components/signUp/signUp'
import Login from './components/Login/Login'
import IniciadoSesion from './components/IniciadoSesion/IniciadoSesion'
import {Switch,Route} from 'react-router-dom'

class App extends React.Component{
  constructor(props){
    super(props)
    this.state= {
      testApi: ''
    }
  }
  callAPI(){
    fetch('http://localhost:1024')
      .then(res => res.json())
      .then(res => console.log(res))
  }
  componentDidMount(){
    this.callAPI()
  }
  render(){
      return (
        <div className="App">
          {/* <p>{this.state.testApi}</p> */}
          <Switch>
            <Route exact path="/" component={IniciadoSesion} />
            <Route  path="/iniciarSesion" component={Login} />
            <Route  path="/registrarSesion" component={SignUp} />
          </Switch>
        </div>
      )
  }
}
export default App;
