import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.css'

class Header extends Component{
    render(){
        return(
            <header className='header-app'>
                <h1 className='header-name'><span className='header-name-primary'>eat</span><span className='header-name-secondary'>safe</span></h1>
               <Link to='/cuenta'><img src='images/User.svg' alt='user content' className='header-user' /></Link>
            </header>
        )
    }
}

export default Header