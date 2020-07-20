import React, { Component } from 'react';
import { Map, Marker,Popup, TileLayer, ZoomControl } from 'react-leaflet';
import { Icon } from 'leaflet';
import './Mapa.css'
import Search from '../Search/Search'
import Header from '../Header/Header'
import MapRestaurant from '../MapRestaurant/MapRestaurant';
import RestaurantContext from '../../contexts/findRestaurants'

class Mapa extends Component{
    static contextType = RestaurantContext
    constructor(){
        super()
        this.state = {
            class: 'restaurants-slider',
            up: false,
            location: [40.423378400000004, -3.692763],
            searchResta: []
        }
    }

    componentDidMount(){
        // this.getPosition()
        console.log(this.context.restaurantsSearch)
        this.setState({...this.state, searchResta: this.context.restaurantsSearch})
        console.log(this.context.restaurantsSearch)

    }

    componentDidUpdate(prevP,prevS){
        if(prevS.searchResta !== this.context.restaurantsSearch)
            this.setState({
                ...this.state,
                searchResta: this.context.restaurantsSearch
            })
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
                console.log(this.state.location)

                // fetch(`http://localhost:1024/cercaDeMI/${lat}/${lon}`)
                // .then(res => res.json())
                // .then(data => {
                //     this.setState({
                //         ...this.state,
                //         searchResta: data.nearRestaurants
                //     })
                //})
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
        // this.props.history.push('/map')
        console.log(this.state.searchValue)
        this.fetchValue(this.state.searchValue)
    }

    async fetchValue(val){
        let res = await fetch(`http://localhost:1024/searcher/${val}`)
        let datos = await res.json()
        console.log(datos)
        if(datos.valid){
            this.context.handleRestaurants(datos.response)
        
        }
    }


    getValue(val){

        this.setState({
            ...this.state,
            searchValue: val
        })
    }

    render(){
        return(
            <section className='mapSection'>
                <Header className='holasoyclass'/>
                <form className='home-searchForm' onSubmit={this.submitingSearch.bind(this)}>
                    <Search searchValue= {this.getValue.bind(this)}/>
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
                    {this.state.searchResta.map(e => < Marker position= {[e.long, e.lat]}> </Marker>)}
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