import React from 'react'



class ShieldRat extends React.Component{
constructor(props){
    super(props)
        this.state ={arrayShield:[...Array(5)],
        blueShield: './images/escuditoAzul.svg',
        greyShield: './images/escuditos.svg'}
}


    shieldArray(){
       return this.state.arrayShield.map((e,i)=> <img  src={this.state.greyShield}></img>)
        
    }
render(){
        return(
            <section>
                {this.shieldArray()}.
            </section>
        )
    }
}

export default ShieldRat