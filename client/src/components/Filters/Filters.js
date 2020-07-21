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
                                <li><label>Rápida</label><input type='checkbox' id='Asiatica' value='Rápida' /></li>
                                <li><label>Mejicana</label><input type='checkbox' id='Asiatica' value='Mejicana' /></li>
                                <li><label>De autor</label><input type='checkbox' id='Asiatica' value='De_autor' /></li>
                                <li><label>Mediterránea</label><input type='checkbox' id='Asiatica' value='Mediterránea' /></li>
                                <li><label>Nepalí</label><input type='checkbox' id='Asiatica' value='Nepalí' /></li>
                                <li><label>Italiana</label><input type='checkbox' id='Asiatica' value='Italiana' /></li>
                                <li><label>Rusa</label><input type='checkbox' id='Asiatica' value='Rusa' /></li>
                                <li><label>Griega</label><input type='checkbox' id='Asiatica' value='Griega' /></li>
                            </ul>
                        </article>
                        <button className='filtros-button'>Aplicar</button>
                </section>
            </section>
        )
    }
}