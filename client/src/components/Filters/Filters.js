import React, { Component } from 'react';
import './Filters.css'

export default class Filters extends Component{
    constructor(props){
        super(props)
        this.state = {
            asian: false,
            rapida: false,
            mejicana: false,
            de_autor: false,
            mediterranea: false,
            nepali: false,
            italiana: false,
            rusa: false,
            griega: false,
            finalVal: []
        }
    }

    handleChangeAsian(e){
        if(e.target.checked){
            this.setState({...this.state, asian: true, finalVal: [...this.state.finalVal,e.target.value]})
        }else{
            let arr = this.state.finalVal.filter(e => e !== '0')
            this.setState({...this.state, finalVal: arr})
        }
    }
    handleChangeFast(e){
        if(e.target.checked){
            this.setState({...this.state, finalVal: [...this.state.finalVal,e.target.value]})
        }else{
            let arr = this.state.finalVal.filter(e => e !== '1')
            this.setState({...this.state, finalVal: arr})
        }
    }
    handleChangeMex(e){
        if(e.target.checked){
            this.setState({...this.state, finalVal: [...this.state.finalVal,e.target.value]})
        }else{
            let arr = this.state.finalVal.filter(e => e !== '2')
            this.setState({...this.state, finalVal: arr})
        }
    }
    handleChangeIndie(e){
        if(e.target.checked){
            this.setState({...this.state, finalVal: [...this.state.finalVal,e.target.value]})
        }else{
            let arr = this.state.finalVal.filter(e => e !== '3')
            this.setState({...this.state, finalVal: arr})
        }
    }
    handleChangeMed(e){
        if(e.target.checked){
            this.setState({...this.state, finalVal: [...this.state.finalVal,e.target.value]})
        }else{
            let arr = this.state.finalVal.filter(e => e !== '4')
            this.setState({...this.state, finalVal: arr})
        }
    }
    handleChangeNepal(e){
        if(e.target.checked){
            this.setState({...this.state, finalVal: [...this.state.finalVal,e.target.value]})
        }else{
            let arr = this.state.finalVal.filter(e => e !== '5')
            this.setState({...this.state, finalVal: arr})
        }
    }
    handleChangeItalian(e){
        if(e.target.checked){
            this.setState({...this.state, finalVal: [...this.state.finalVal,e.target.value]})
        }else{
            let arr = this.state.finalVal.filter(e => e !== '6')
            this.setState({...this.state, finalVal: arr})
        }
    }
    handleChangeRusian(e){
        if(e.target.checked){
            this.setState({...this.state, finalVal: [...this.state.finalVal,e.target.value]})
        }else{
            let arr = this.state.finalVal.filter(e => e !== '7')
            this.setState({...this.state, finalVal: arr})
        }
    }
    handleChangeGreek(e){
        if(e.target.checked){
            this.setState({...this.state, finalVal: [...this.state.finalVal,e.target.value]})
        }else{
            let arr = this.state.finalVal.filter(e => e !== '8')
            this.setState({...this.state, finalVal: arr})
        }
    }

    sendValues(){
        this.props.vals(this.state.finalVal)
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
                                <li><label>Asiática</label><input type='checkbox' id='Asiatica' value="0" onChange={this.handleChangeAsian.bind(this)} defaultChecked={this.state.asian}/></li>
                                <li><label>Rápida</label><input type='checkbox' id='Rápida' value="1" onChange={this.handleChangeFast.bind(this)} defaultChecked={this.state.rapida}/></li>
                                <li><label>Mejicana</label><input type='checkbox' id='Mejicana' value="2" onChange={this.handleChangeMex.bind(this)} defaultChecked={this.state.mejicana}/></li>
                                <li><label>De autor</label><input type='checkbox' id='De_autor' value="3" onChange={this.handleChangeIndie.bind(this)} defaultChecked={this.state.de_autor}/></li>
                                <li><label>Mediterránea</label><input type='checkbox' id='mediterránea' value="4" onChange={(this.handleChangeMed.bind(this))} defaultChecked={this.state.mediterranea}/></li>
                                <li><label>Nepalí</label><input type='checkbox' id='Nepalí' value="5" onChange={this.handleChangeNepal.bind(this)} defaultChecked={this.state.nepali}/></li>
                                <li><label>Italiana</label><input type='checkbox' id='Italiana' value="6" onChange={this.handleChangeItalian.bind(this)} defaultChecked={this.state.italiana}/></li>
                                <li><label>Rusa</label><input type='checkbox' id='Rusa' value="7" onChange={this.handleChangeRusian.bind(this)} defaultChecked={this.state.rusa}/></li>
                                <li><label>Griega</label><input type='checkbox' id='Griega' value="8" onChange={this.handleChangeGreek.bind(this)} defaultChecked={this.state.griega}/></li>
                            </ul>
                        </article>
                        <button className='filtros-button' onClick={this.sendValues.bind(this)} type='submit'>Aplicar</button>
                </section>
            </section>
        )
    }
}