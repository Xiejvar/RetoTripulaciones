import React, { Component } from 'react';
import { Map, Marker,Popup, TileLayer, ZoomControl } from 'react-leaflet';
import { Icon } from 'leaflet';
import './Mapa.css'
import Search from '../Search/Search'
import Header from '../Header/Header'
import MapRestaurant from '../MapRestaurant/MapRestaurant';

class Mapa extends Component{
    constructor(){
        super()
        this.state = {
            class: 'restaurants-slider',
            up: false,
            location: [40.416775, -3.703790],
            searchResta: [{ "index" : 17, "id_local" : 280011539, "nombre" : "LA CARMEN", "direccion" : "PLAZA CARMEN 5", "tipo_local" : "RESTAURANTE", "barrio" : "SOL                 ", "terraza" : 1, "higuiene" : "Pendiente" },{ "index" : 17, "id_local" : 280011539, "nombre" : "LA CARMEN", "direccion" : "PLAZA CARMEN 5", "tipo_local" : "RESTAURANTE", "barrio" : "SOL                 ", "terraza" : 1, "higuiene" : "Pendiente" },{ "index" : 17, "id_local" : 280011539, "nombre" : "LA CARMEN", "direccion" : "PLAZA CARMEN 5", "tipo_local" : "RESTAURANTE", "barrio" : "SOL                 ", "terraza" : 1, "higuiene" : "Pendiente" },{ "index" : 17, "id_local" : 280011539, "nombre" : "LA CARMEN", "direccion" : "PLAZA CARMEN 5", "tipo_local" : "RESTAURANTE", "barrio" : "SOL", "terraza" : 1, "higuiene" : "Pendiente" },{ "index" : 17, "id_local" : 280011539, "nombre" : "LA CARMEN", "direccion" : "PLAZA CARMEN 5", "tipo_local" : "RESTAURANTE", "barrio" : "SOL                 ", "terraza" : 1, "higuiene" : "Pendiente" },{ "index" : 17, "id_local" : 280011539, "nombre" : "LA CARMEN", "direccion" : "PLAZA CARMEN 5", "tipo_local" : "RESTAURANTE", "barrio" : "SOL                 ", "terraza" : 1, "higuiene" : "Pendiente" },{ "index" : 17, "id_local" : 280011539, "nombre" : "LA CARMEN", "direccion" : "PLAZA CARMEN 5", "tipo_local" : "RESTAURANTE", "barrio" : "SOL                 ", "terraza" : 1, "higuiene" : "Pendiente" },{ "index" : 17, "id_local" : 280011539, "nombre" : "LA CARMEN", "direccion" : "PLAZA CARMEN 5", "tipo_local" : "RESTAURANTE", "barrio" : "SOL", "terraza" : 1, "higuiene" : "Pendiente" }]
        }
    }

    componentDidMount(){
        this.getPosition()
    }

    getPosition(){
        let lat,lon;
        if('geolocation' in navigator){
           navigator.geolocation.watchPosition((position) => {
                lat = position.coords.latitude
                lon = position.coords.longitude
                this.setState({
                    ...this.state,
                    location: [lat,lon]
                })

                fetch(`http://localhost:1024/cercaDeMI/${lat}/${lon}`)
                .then(res => res.json())
                .then(data => console.log(data))
            });
        }
    }
    changeClass(){
        if(!this.state.up)
            this.setState({
                ...this.state,
                up: true,
                class: 'restaurants-slider top'
            })
        else
            this.setState({
                ...this.state,
                up: false,
                class: 'restaurants-slider'
            })
    }

    submitingSearch(e){
        e.preventDefault()
    }

    getValue(val){
        this.setState({
            ...this.state,
            serchValue: val
        })
    }

    render(){
        return(
            <section className='mapSection'>
                <Header className='holasoyclass'/>
                <form className='home-searchForm' onSubmit={this.submitingSearch.bind(this)}>
                    <Search value={this.getValue.bind(this)}/>
                </form>
                <Map center={this.state.location} zoom={14} className='map-buscador' zoomControl={false}>
                    <TileLayer
                        url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png"
                        attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
                    />
                    <ZoomControl position='bottomright' />
                    <Marker position={this.state.location}>
                        <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
                    </Marker>
                </Map>
                <section className={this.state.class}>
                    <button onClick={this.changeClass.bind(this)}></button>
                    {this.state.searchResta.map(ele => <MapRestaurant item={ele} />)}
                </section>
            </section>
            
        )
    }
}

export default Mapa