import React, { Component } from 'react';
import './Filters.css'

export default class Filters extends Component{
    constructor(props){
        super(props)
        
    }
    
    render(){
        return(
            <section className='filter-box'>
                <section className='filtros'>
                        <div className='filtros-header'>
                            <h4>Filtros</h4>
                            <img src='/images/Exit.svg' alt='cross' onClick={() => this.props.close(false)}/>
                        </div>
                        <input type='range' step='1' min='1' max='3' className='filtros-range'/>
                        <article className='type_food'>
                            <h3>Tipo de comida:</h3>
                            <ul>
                                <li><label>Asiática</label><input type='checkbox' id='Asiatica' value='asiática' /></li>
                                <li><label>Rápida</label><input type='checkbox' id='rápida' value='rápida' /></li>
                                <li><label>Mejicana</label><input type='checkbox' id='mejicana' value='mejicana' /></li>
                                <li><label>De autor</label><input type='checkbox' id='de_autor' value='de_autor' /></li>
                                <li><label>Mediterránea</label><input type='checkbox' id='mediterránea' value='mediterránea' /></li>
                                <li><label>Nepalí</label><input type='checkbox' id='nepalí' value='nepalí' /></li>
                                <li><label>Italiana</label><input type='checkbox' id='italiana' value='italiana' /></li>
                                <li><label>Rusa</label><input type='checkbox' id='rusa' value='rusa' /></li>
                                <li><label>Griega</label><input type='checkbox' id='griega' value='griega' onChange={this.getValue.bind(this)} /></li>
                            </ul>
                        </article>
                        <button className='filtros-button'>Aplicar</button>
                </section>
            </section>
        )
    }
}