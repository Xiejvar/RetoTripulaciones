import React from 'react'
import './LocalRating.css'
import Doter from '../Doter/Doter'
import ShieldRating from '../shields/shieldRating'
import ModalValoraciones from '../ModalValoraciones/ModalValoraciones'

import VerificationContext from '../../contexts/verificationToken'



class LocalRatings extends React.Component{
    static contextType = VerificationContext

    constructor(){
        super()

        this.state = {value:0,items:[{firstP:'Valora las medidas de prevencion y seguridad:', h2: 'Limpieza exhaustiva', secondP: 'de mesas, barra, baños...', image:'/images/Cubiertos.svg'},
        {firstP:'Valora las medidas de prevencion y seguridad:', h2: 'Distancia de seguridad', secondP: 'entre mesas, entre clientes...', image:'/images/Distancia de seguridad.svg'},
        {firstP:'Valora las medidas de prevencion y seguridad:', h2: 'Personal profesional', secondP: 'uso de mascarillas, precaucion...', image:'/images/Camarero.svg'},
        {firstP:'Valora las medidas de prevencion y seguridad:', h2: 'Dispensador de gel', secondP: 'gel hidroalcolico en la entrada, en el baño...', image:'/images/Gel.svg'},
        {firstP:'Valora las medidas de prevencion y seguridad:', h2: 'EVITAR CARTA y otros elementos de uso compartido', secondP: 'Servilleteros,aceite y vinagre, y ofrecer menus desechables o en codigo QR...', image:'/images/Menu.svg'},
        {firstP:'Comparte tu experiencia en el restaurante, y ayuda a otros usuarios:', h2: 'Te has sentido seguro?', secondP: '', image:''}],
        class: 'none',
        selected: [],
        selectedName: false,
        showMessageCompleted: false,
        name: 'Anonymus'
        }
    }

    componentDidMount(){
        if(this.context.tok.token === null || this.context.tok.token === undefined){
            this.props.history.push('/cuentaInicioSesion')
            console.log('lleguee')
        }
        this.searchUser()
    }

    searchUser(){
        fetch('http://localhost:1024/findUser',{
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                token: this.context.tok
         })
        }).then(res => res.json())
        .then(data => {
            if(data.valid){
                if(data.surname !== undefined)
                    this.setState({
                        ...this.state,
                        name: data.name + ' ' + data.surname
                    })
                else
                    this.setState({
                        ...this.state,
                        name: data.name 
                    })
            } else {
                sessionStorage.removeItem('token')
                sessionStorage.removeItem('secret')
                this.props.history.push('/cuentaInicioSesion')
            }
        })
    }

    next(event){
        let id = this.state.value
        let rat,newArr;
        if(this.state.rating === undefined)
            rat = 1
        else
            rat = this.state.rating
        if(this.state.selected.length > 0){
            newArr = this.state.selected.filter(e => e.id !== id)
            newArr = [...newArr,{id,rat}]
        }else {
            newArr = [{id,rat}]
        }
        event.preventDefault()
        this.setState({...this.state, value: this.state.value + 1, selected: newArr})

    }
    back(event){
        event.preventDefault()
        this.setState({...this.state, value: this.state.value - 1})

    }

    handleValSel(val){
        this.setState({
            ...this.state,
            rating: val
        })
        
    }

    sendVals(){
        if(!this.state.selectedName)
            this.setState({
                ...this.state,
                opinion: {
                    ...this.state.opinion,
                    name: 'Anonymus'
                },
                selectedName: false
            })
        fetch('http://localhost:1024/ratingValues',{
            method: 'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                    opinion: this.state.opinion,
                    ratings: this.state.selected,
                    id_local: this.props.match.params.id,
                    token: this.context.tok
            })
        }).then(res => res.json())
        .then(data => {
            if(data.valid){
                this.setState({
                    ...this.state,
                    showMessageCompleted: true
                })
            }
        })
    }

    putOpinion(e){
        if(e.target.value.length > 0)
            this.setState({
                ...this.state,
                opinion: {
                    ...this.state.opinion,
                    opinion: e.target.value
                }
            })
        else
        this.setState({
            ...this.state,
            opinion: ''
        })
    }

    nameSelected(e){
        if(e.target.checked){
            this.setState({
                ...this.state,
                opinion: {
                    ...this.state.opinion,
                    name: this.state.name
                },
                selectedName: true
            })
        }else {
            this.setState({
                ...this.state,
                opinion: {
                    ...this.state.opinion,
                    name: 'Anonymus'
                },
                selectedName: false
            })
        }
    }

    buttons(){
        if(this.state.value < 1){

            return <div>
                <div className='shields'>
                    <ShieldRating val={this.handleValSel.bind(this)} />
                </div>
            <div className='btns'>
            <button className='btnblue'  onClick={this.next.bind(this)}>siguiente</button>
            </div>
            </div> 
        } else if(this.state.value > 0 && this.state.value < 5){

            return <div>
                <div className='shields'> 
                    <ShieldRating val={this.handleValSel.bind(this)}/>
                </div>
             <div className='btns'>
            <button className='btnwhite' onClick={this.back.bind(this)}>atras</button>
            <button className='btnblues' onClick={this.next.bind(this)}>siguiente</button>
            </div>
            </div>
        } else{

             return <div className='father'>
                        <div className='val6'>
                            <textarea className='tarea' rows="10" cols="35" placeholder='Comparte detalles relacionados con las medidas de prevención  llevadas a cabo en este lugar.' onChange={this.putOpinion.bind(this)}></textarea>
                            <section className='cbox'>
                            <input type='checkbox' id='cbox' onChange={this.nameSelected.bind(this)}></input>
                            <label >Incluir mi nombre en la publicacion</label>
                            </section>
                        </div>
                        <div className='btns'>
                            <button className='btnwhite' onClick={this.back.bind(this)}>atras</button>
                            <button className='btnblues' onClick={this.sendVals.bind(this)}>enviar</button>
                         </div>
                    </div>
        }
    }

    render(){
        return(
         <div className='god'>
             <ModalValoraciones show={this.state.showMessageCompleted} history={this.props.history}/>
            <div className='demigod'>
                <article className='cross'>
                    <img src='/images/cross.svg' onClick={this.props.history.goBack}></img>
                </article>
                <h3 className='quater'>{this.state.items[this.state.value].firstP}</h3>
                <article className='thisobs quater'>
                    <h2 className='bluel'>{this.state.items[this.state.value].h2}</h2>
                    <p className='elp'>{this.state.items[this.state.value].secondP}</p>
                    <img src={this.state.items[this.state.value].image}></img>
                    {this.buttons()}
                </article>
                <div className='demigod2'>
                < Doter value={this.state.value}/>
                </div>
                </div>
            </div>
        )
    }
}

export default LocalRatings