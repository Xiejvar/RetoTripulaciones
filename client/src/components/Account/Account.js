import React,{ Component } from 'react';
import AccountLoged from '../AccountLoged/AccountLoged'

import './Account.css';
class Account extends Component{

    showPage(){
        if(sessionStorage.getItem('token') === null)
            this.props.history.push('/cuentaInicioSesion')
        else
            return  <AccountLoged history={this.props.history} />
    }

    render(){
        return(
            <>
                {this.showPage()}
            </>
        )
    }
}

export default Account