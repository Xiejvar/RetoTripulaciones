import React,{ Component } from 'react';
import AccountLoged from '../AccountLoged/AccountLoged'
import './Account.css';
class Account extends Component{
    constructor(){
        super()
    }

    render(){
        return(
            <AccountLoged history={this.props.history}/>
        )
    }
}

export default Account