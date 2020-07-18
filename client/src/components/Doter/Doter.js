import React, { Component } from 'react';
import './Doter.css'

class Doter extends Component {
    constructor(props){
      super(props)
      this.state ={arraydoter:[...Array(6)]}
    }

    render() {
      return (
        <section className='god2'>
          <section className='secdot'>
          {this.state.arraydoter.map((e,i)=> this.props.value === i ? <div className='dot selected'></div> : <div className='dot'></div>)}
          </section>
        </section>
      );
    }
  }

export default Doter