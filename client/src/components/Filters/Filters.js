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
            griega: false
        }
    }

    handleChangeAsian(e){
        if(e.target.checked){
            this.setState({...this.state, asian: true, asiatica: e.target.value})
        }else{this.setState({...this.state, asian: false,  asiatica: ""})}
    }
    handleChangeFast(e){
        if(e.target.checked){
            this.setState({...this.state, rapida: e.target.value})
        }else{this.setState({...this.state, rapida: ""})}
    }
    handleChangeMex(e){
        if(e.target.checked){
            this.setState({...this.state, mejicana: e.target.value})
        }else{this.setState({...this.state, mejicana: ""})}
    }
    handleChangeIndie(e){
        if(e.target.checked){
            this.setState({...this.state, de_autor: e.target.value})
        }else{this.setState({...this.state, de_autor: ""})}
    }
    handleChangeMed(e){
        if(e.target.checked){
            this.setState({...this.state, mediterranea: e.target.value})
        }else{this.setState({...this.state, mediterranea: ""})}
    }
    handleChangeNepal(e){
        if(e.target.checked){
            this.setState({...this.state, nepali: e.target.value})
        }else{this.setState({...this.state, nepali: ""})}
    }
    handleChangeItalian(e){
        if(e.target.checked){
            this.setState({...this.state, italiana: e.target.value})
        }else{this.setState({...this.state, italiana: ""})}
    }
    handleChangeRusian(e){
        if(e.target.checked){
            this.setState({...this.state, rusa: e.target.value})
        }else{this.setState({...this.state, rusa: ""})}
    }
    handleChangeGreek(e){
        if(e.target.checked){
            this.setState({...this.state, griega: e.target.value})
        }else{this.setState({...this.state, griega: ""})}
    }

    sendValues(){
        let finalVal= ""
        if(this.state.asian){
            finalVal += "&asian="+this.state.asiatica
        }
        if(this.state.rapida){
            finalVal += "&rapida="+this.state.rapida
        }
        if(this.state.mejicana){
            finalVal += "&mejicana="+this.state.mejicana
        }
        if(this.state.de_autor){
            finalVal += "&de_autor="+this.state.de_autor
        }
        if(this.state.mediterranea){
            finalVal += "&mediterranea="+this.state.mediterranea
        }
        if(this.state.nepali){
            finalVal += "&nepali="+this.state.nepali
        }
        if(this.state.italiana){
            finalVal += "&italiana="+this.state.italiana
        }
        if(this.state.rusa){
            finalVal += "&rusa="+this.state.rusa
        }
        if(this.state.griega){
            finalVal += "&griega="+this.state.griega
        }
        this.props.vals(finalVal)

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
                                <li><label>Asiática</label><input type='checkbox' id='Asiatica' value="asiatica" onChange={this.handleChangeAsian.bind(this)} defaultChecked={this.state.asian}/></li>
                                <li><label>Rápida</label><input type='checkbox' id='Rápida' value="rapida" onChange={this.handleChangeFast.bind(this)} defaultChecked={this.state.rapida}/></li>
                                <li><label>Mejicana</label><input type='checkbox' id='Mejicana' value="mejicana" onChange={this.handleChangeMex.bind(this)} defaultChecked={this.state.mejicana}/></li>
                                <li><label>De autor</label><input type='checkbox' id='De_autor' value="de_autor" onChange={this.handleChangeIndie.bind(this)} defaultChecked={this.state.de_autor}/></li>
                                <li><label>Mediterránea</label><input type='checkbox' id='mediterránea' value="mediterranea" onChange={(this.handleChangeMed.bind(this))} defaultChecked={this.state.mediterranea}/></li>
                                <li><label>Nepalí</label><input type='checkbox' id='Nepalí' value="nepali" onChange={this.handleChangeNepal.bind(this)} defaultChecked={this.state.nepali}/></li>
                                <li><label>Italiana</label><input type='checkbox' id='Italiana' value="italiana" onChange={this.handleChangeItalian.bind(this)} defaultChecked={this.state.italiana}/></li>
                                <li><label>Rusa</label><input type='checkbox' id='Rusa' value="rusa" onChange={this.handleChangeRusian.bind(this)} defaultChecked={this.state.rusa}/></li>
                                <li><label>Griega</label><input type='checkbox' id='Griega' value="griega" onChange={this.handleChangeGreek.bind(this)} defaultChecked={this.state.griega}/></li>
                            </ul>
                        </article>
                        <button className='filtros-button' onClick={this.sendValues.bind(this)}>Aplicar</button>
                </section>
            </section>
        )
    }
}