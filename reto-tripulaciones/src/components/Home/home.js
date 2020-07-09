import React from 'react'
import './home.css'


class Home extends React.Component{
    render(){
        return(
            <div>
                <div>
                <h1>Encuentra Restaurantes</h1>
                <h1>donde sentirte seguro</h1>
                <input type='search'></input>
                </div>
                <div>
                    <h2>Los Restaurantes mas seguros</h2>
                    <article>
                        <img></img>
                        <p>tipo de restaurante</p>
                        <p>Nombre del restaurante</p>
                        
                    </article>
                </div>
            </div>
        )
    }
}

export default Home