import React, { Component } from 'react';
import { Map, Marker,Popup, TileLayer, ZoomControl } from 'react-leaflet';
import { Icon } from 'leaflet';
import './Mapa.css'
import Search from '../Search/Search'
import Header from '../Header/Header'

class Mapa extends Component{
    constructor(){
        super()
    }
    render(){
        return(
            <section>
                <Header />
                <Search />
                <Map center={[40.416775, -3.703790]} zoom={14} className='map-buscador' zoomControl={false}>
                    <TileLayer
                        url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png"
                        attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
                    />
                    <ZoomControl position='bottomright' />
                </Map>
            </section>
            
        )
    }
}

export default Mapa