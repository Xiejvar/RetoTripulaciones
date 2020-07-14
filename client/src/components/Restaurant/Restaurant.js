import React, { Component } from 'react';
import './Restaurant.css';
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

class Restaurant extends Component{
    constructor(props){
        super(props)
        this.state = {
            name: 'Nombre del restaurante',
            img: '/images/restaurant.jpg',
            type: '',
            address: 'C/Pez,18',
            location: '',
            terraza: '',
            higiene: ''
        }
    }

    componentDidMount(){
       let id = this.props.match.params.index
       fetch(`http://localhost:1024/restaurant/${id}`)
       .then(res => res.json())
       .then(res => {
           if(res.valid){
               let terr;
               if(res.restaurant.terraza === 1){
                    terr = 'Terraza'
               }
               this.setState({
                   ...this.state,
                   name: res.restaurant.nombre,
                   type: res.restaurant.tipo_local,
                   address: res.restaurant.direccion,
                   location: res.restaurant.barrio,
                   terraza: terr,
                   higiene: res.restaurant.higuiene
               })
           }else {
               this.props.history.push('/')
           }
       })
    }

    render(){
        return(
            <section className='restaurant-view'>
                <Header />
                <figure className='restaurant-figure'>
                    <img src={this.state.img} alt='' />
                </figure>
                <nav className='restaurant-navbar'>
                    <ul>
                        <li><a href='#info'>Información</a></li>
                        <li><a href='#seguridad'>Medidas de seguridad</a></li>
                        <li><a href='#sanciones'>Inspecciones sanitarias</a></li>
                        <li><a href='#contagios'>Contagios</a></li>
                        <li><a href='#opiniones'>Opiniones</a></li>
                    </ul>
                </nav>
                <article className='restaurant-informacion'>
                    <h3 className='restaurant-title' id='info'>Información</h3>
                    <div className='resta-terrTyp'>
                    <p className='restaurant-type'>{this.state.type}</p>
                    <p className='restaurant-terraza'>{this.state.terraza}</p>
                    </div>
                    <p className='restaurant-name'>{this.state.name}</p>
                    <div className='restaurant-inforating'>
                        <img src='/images/escuditoAzul.svg' alt='rating' />
                        <img src='/images/escuditoAzul.svg' alt='rating' />
                        <img src='/images/escuditoAzul.svg' alt='rating' />
                        <img src='/images/escuditoAzul.svg' alt='rating' />
                        <img src='/images/escuditoAzul.svg' alt='rating' />
                        <p>4,5</p>
                        <p>Añadir valoración</p>
                    </div>
                    <p className='restaurant-address'>{this.state.address}</p>
                </article>
                <article className='restaurant-seguridad'>
                    <h3 className='restaurant-title' id='seguridad'>Medidas de seguridad</h3>
                    <span className='restaurant-span'>Valoradas por los clientes</span>
                    <ul className='restaurant-seguridadnav'>
                        <li>Limpieza exhaustiva</li>
                        <li>Distancia de seguridad</li>
                        <li>Precaución del personal</li>
                        <li>Disponibilidad del gel desinfectante</li>
                        <li>Cartas y elementos de autoservicio</li>
                    </ul>
                    <ul className='restaurant-seguridadnav seguridadnavDos'>
                        <li><img src='/images/escuditoAzul.svg' alt='logo-valoración' /></li>
                        <li><img src='/images/escuditoAzul.svg' alt='logo-valoración' /></li>
                        <li><img src='/images/escuditoAzul.svg' alt='logo-valoración' /></li>
                        <li><img src='/images/escuditoAzul.svg' alt='logo-valoración' /></li>
                        <li><img src='/images/escuditoAzul.svg' alt='logo-valoración' /></li>
                    </ul>
                </article>
                <article className='restaurant-sanciones'>
                    <h3 className='restaurant-title' id='sanciones'>Inspecciones sanitarias</h3>
                    <span className='restaurant-span'>Realizadas por la Comunidad de Madrid</span>
                    <table className='restaurant-sancionesTables'>
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Resultado</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>10/10/2018</td>
                                <td>{this.state.higiene}</td>
                            </tr>
                        </tbody>
                    </table>
                </article>
                <article className='restaurant-contagios'>
                    <h3 className='restaurant-title' id='contagios'>Contagios</h3>
                    <span className='restaurant-span'>Nº contagios por COVID-19 registrados en el barrio <span className='res-barrio'>{this.state.location}</span> en los ultimos 14 dias</span>
                    <table className='restaurant-sancionesTables'>
                        <tr>
                            <th>Nº contagios</th>
                            <th>Riesgo de contagio</th>
                        </tr>
                        <tr>
                            <td>07</td>
                            <td>Bajo</td>
                        </tr>
                    </table>
                </article>
                <article className='restaurant-opiniones'>
                    <h3 className='restaurant-title' id='opiniones'>Opiniones</h3>
                    <p className='restaurant-span'>Los usuarios valoran el compromiso del restaurante con las medidas de prevención de contagio.</p>
                    <h5>¿Te has sentido seguro?</h5>
                    {/* componente de las valoraciones de javi */}
                    {/* OPINIONES */}
                </article>
                <Footer class={'footer-blue'}/>
            </section>
        )
    }
}

export default Restaurant