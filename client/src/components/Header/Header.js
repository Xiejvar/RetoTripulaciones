import React, { Component } from 'react';
import './Header.css'

class Header extends Component{
    render(){
        return(
            <header className='header-app'>
                <h1 className='header-name'><span className='header-name-primary'>eat</span><span className='header-name-secondary'>safe</span></h1>
                <img src='images/User.svg' alt='user content' className='header-user' />
            </header>
        )
    }
}

export default Header