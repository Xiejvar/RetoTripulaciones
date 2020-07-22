import React, { Component } from 'react';
import { Map, Marker,Popup, TileLayer, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import './Mapa.css'
import Search from '../Search/Search'
import Header from '../Header/Header'
import MapRestaurant from '../MapRestaurant/MapRestaurant';
import RestaurantContext from '../../contexts/findRestaurants'
import Filters from '../Filters/Filters';

class Mapa extends Component{
    static contextType = RestaurantContext
    constructor(){
        super()
        this.state = {
            class: 'restaurants-slider',
            up: false,
            location: [40.416775, -3.703790],
            searchResta: [],
            searchValue: undefined,
            filters: undefined,
            rangeValue: undefined
        }
    }

    componentDidMount(){
        // this.getPosition()
        this.setState({...this.state, searchResta: this.context.restaurantsSearch})

    }

    componentDidUpdate(prevP,prevS){
        if(prevS.searchResta !== this.context.restaurantsSearch){
            this.setState({
                ...this.state,
                searchResta: this.context.restaurantsSearch
            })
        }
        if(prevS.filters !== this.state.filters || prevS.searchValue !== this.state.searchValue || prevS.rangeValue !== this.state.rangeValue){
            this.fetchValue()
        }
    }

    getPosition(){
        let lat,lon;
        if('geolocation' in navigator){
           navigator.geolocation.getCurrentPosition((position) => {
                lat = position.coords.latitude
                lon = position.coords.longitude
                this.setState({
                    ...this.state,
                    location: [lat,lon]
                })
                if(this.state.searchResta.length === 0)
                    fetch(`http://localhost:1024/cercaDeMI/${lat}/${lon}`)
                    .then(res => res.json())
                    .then(data => {
                        this.setState({
                            ...this.state,
                            searchResta: data.nearRestaurants
                        })
                    })
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

    async fetchValue(){
        let val = this.state.searchValue;
        let filter = this.state.filters;
        let range= this.state.rangeValue;
        if(val == undefined && filter == undefined && range == undefined)
            console.log(val,filter)
        else
            console.log(val)
            fetch('http://localhost:1024/searcher', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                        name : val,
                        filters: filter,
                        rangeValue: range
                    })
            }).then(res => res.json())
            .then(datos => {
                if(datos.valid){
                    this.context.handleRestaurants(datos.response)
                    this.props.history.push('/map')
                }
            })
    }


    getValue(val){
        this.setState({
            ...this.state,
            searchValue: val
        })
    }

    addFilters(value){
        this.setState({...this.state, filters: value.fin, rangeValue: value.rang})
    }

    getFilts(){
        let filts = this.state.filters
        this.setState({
            ...this.state,
            filters: undefined
        })
        return filts
    }

    render(){
        const iconShield = new L.Icon({
            iconUrl: require('./images/escuditoCeleste.svg'),
            iconRetinaUrl: require('./images/escuditoAzul.svg'),
            iconAnchor: null,
            popupAnchor: [0,0],
            shadowUrl: null,
            shadowSize: null,
            shadowAnchor: null,
            iconSize: new L.Point(24, 28),
            className: 'leaflet-div-icon'
        })
        return(
            <section className='mapSection'>
                <Header className='holasoyclass'/>
                <form className='home-searchForm' onSubmit={this.submitingSearch.bind(this)}>
                    <Search searchValue={this.getValue.bind(this)} filtss={this.addFilters.bind(this)} selectedFil={this.state.filters !== undefined} getFilters={this.getFilts.bind(this)}/>
                </form>
                <Map center={this.state.location} zoom={14} className='map-buscador' zoomControl={false}>
                    <TileLayer
                        url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png"
                        attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
                    />
                    <ZoomControl position='bottomright' />
                    <Marker position={this.state.location}>
                        <Popup>Tu ubicación</Popup>
                    </Marker>
                    {this.state.searchResta.map((e,i)=> < Marker position= {[e.long, e.lat]} icon={iconShield} key={i}><Popup key={i}>{e.nombre_local}<br/>{e.calle}</Popup></Marker>)}
                </Map>
                <section className={this.state.class}>
                    <button onClick={this.changeClass.bind(this)}></button>
                    {this.state.searchResta.map((ele,i) => <MapRestaurant item={ele} history={this.props.history} key={i}/>)}
                </section>
            </section>
            
        )
    }
}

export default Mapa