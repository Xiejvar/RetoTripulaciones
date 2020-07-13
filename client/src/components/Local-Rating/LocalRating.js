import React from 'react'



class LocalRatings extends React.Component{
    constructor(){
        super()

        this.state = {value:0,items:[{firstP:'Valora las medidas de prevencion y seguridad', h2: 'Limpieza exhaustiva', secondP: 'de mesas, barra, baños...', image:'',img2:''},
        {firstP:'Valora las medidas de prevencion y seguridad', h2: 'Distancia de seguridad', secondP: 'entre mesas, entre clientes...', image:'',img2:''},
        {firstP:'Valora las medidas de prevencion y seguridad', h2: 'Personal profesional', secondP: 'uso de mascarillas, precaucion...', image:'',img2:''},
        {firstP:'Valora las medidas de prevencion y seguridad', h2: 'Dispensador de gel', secondP: 'gel hidroalcolico en la entrada, en el baño...', image:'',img2:''},
        {firstP:'Valora las medidas de prevencion y seguridad', h2: 'EVITAR CARTA y otros elementos de uso compartido', secondP: 'Servilleteros,aceite y vinagre, y ofrecer menus desechables o en codigo QR...', image:'',img2:''}]

        }
    }

    next(event){
        event.preventDefault()
            this.setState({...this.state, value: this.state.value + 1})

    }

    
    render(){
        return(
            <div>
                <button></button>
                <p>{this.state.items[this.state.value].firstP}</p>
                <h2>{this.state.items[this.state.value].h2}</h2>
                <p>{this.state.items[this.state.value].secondP}</p>
                <img src={this.state.items[this.state.value].image}></img>
                <img src={this.state.items[this.state.value].image2}></img>

                <button onClick={this.next.bind(this)}>siguiente</button>
            </div>
        )
    }
}

export default LocalRatings