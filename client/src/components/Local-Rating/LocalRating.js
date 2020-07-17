import React from 'react'
import './LocalRating.css'
import Doter from '../Doter/Doter'
import ShieldRating from '../shields/shieldRating'



class LocalRatings extends React.Component{
    constructor(){
        super()

        this.state = {value:0,items:[{firstP:'Valora las medidas de prevencion y seguridad:', h2: 'Limpieza exhaustiva', secondP: 'de mesas, barra, baños...', image:'./images/Cubiertos.svg'},
        {firstP:'Valora las medidas de prevencion y seguridad:', h2: 'Distancia de seguridad', secondP: 'entre mesas, entre clientes...', image:'./images/Distancia de seguridad.svg'},
        {firstP:'Valora las medidas de prevencion y seguridad:', h2: 'Personal profesional', secondP: 'uso de mascarillas, precaucion...', image:'./images/Camarero.svg'},
        {firstP:'Valora las medidas de prevencion y seguridad:', h2: 'Dispensador de gel', secondP: 'gel hidroalcolico en la entrada, en el baño...', image:'./images/Gel.svg'},
        {firstP:'Valora las medidas de prevencion y seguridad:', h2: 'EVITAR CARTA y otros elementos de uso compartido', secondP: 'Servilleteros,aceite y vinagre, y ofrecer menus desechables o en codigo QR...', image:'./images/Menu.svg'},
        {firstP:'Comparte tu experiencia en el restaurante, y ayuda a otros usuarios:', h2: 'Te has sentido seguro?', secondP: '', image:''}],
        class: 'none',


        }
    }

    next(event){
        event.preventDefault()
            this.setState({...this.state, value: this.state.value + 1})

    }
    back(event){
        event.preventDefault()
            this.setState({...this.state, value: this.state.value - 1})

    }

    buttons(){
        if(this.state.value < 1){
            return <div>
                <div className='shields'>
                    < ShieldRating/>
                </div>
            <div className='btns'>
            <button className='btnblue'  onClick={this.next.bind(this)}>siguiente</button>
            </div>
            </div> 
        } else if(this.state.value > 0 && this.state.value < 5){
            return <div>
                <div className='shields'> 
                    < ShieldRating/>
                </div>
             <div className='btns'>
            <button className='btnwhite' onClick={this.back.bind(this)}>atras</button>
            <button className='btnblues' onClick={this.next.bind(this)}>siguiente</button>
            </div>
            </div>
        } else{
             return <div className='father'>
                 <div className='val6'>
                <textarea className='tarea' rows="10" cols="35">Comparte detalles relacionados con las medidas de prevención  llevadas a cabo en este lugar.</textarea>
                <section className='cbox'>
                <input type='checkbox' id='cbox'></input>
                <label for='cbox'>Incluir mi nombre en la publicacion</label>
                </section>
                </div>
                <div className='btns'>
                <button className='btnwhite' onClick={this.back.bind(this)}>atras</button>
             <button className='btnblues'>enviar</button>
             </div>
             </div>  
        }
    }


    render(){
        return(
         <div className='god'>
            <div className='demigod'>
                <article className='cross'>
                    <img src='./images/cross.svg'></img>
                </article>
                <h3 className='quater'>{this.state.items[this.state.value].firstP}</h3>
                <article className='thisobs quater'>
                    
                    <h2 className='bluel'>{this.state.items[this.state.value].h2}</h2>
                    <p className='elp'>{this.state.items[this.state.value].secondP}</p>
                    <img src={this.state.items[this.state.value].image}></img>
                    {this.buttons()}
                </article>
                <div>
                < Doter value={this.state.value}/>
                </div>

                </div>
               
            </div>
        )
    }
}

export default LocalRatings