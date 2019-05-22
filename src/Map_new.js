import React from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styled from 'styled-components';

const Wrapper = styled.div`
    width: ${props => props.width};
    height: ${props => props.height};
`;

class Map extends React.Component{
    componentDidMount(){
        //make and initialize the map
        this.map = L.map( 'map', {
            center: [ 38.0293,-78.4767 ],
            zoom: 14,
            zoomControl: true,
        });
        let mapbox_key = 'pk.eyJ1Ijoid3lubmViYXJzYW50aSIsImEiOiJjanZ5Nnh0cHkwY3JjNDhwY3hxZnY5NTIzIn0.TM8fVggjHFXeRe4md2GOaw'
        L.tileLayer( 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {    
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,  
            id: 'mapbox.streets',
            accessToken: mapbox_key,     
        }).addTo( this.map );

        //pull the restaurants from props
        let restaurants = this.props.data;
      
        //add a circle for each restaurant
        for (let x = 0; x < restaurants.length; x++ ){
            var circle = L.circle([ restaurants[x].lat, restaurants[x].long], {
                color: 'red',
                fillColor: '#f03',
                fillOpacity: 0.5,
                radius: 5,
            }).addTo( this.map );
            circle.bindPopup( `<b>${restaurants[x].name}</b> <br>${restaurants[x].address}`);
        }
        
          
    }

    render(){
        return <div align="center"><Wrapper width="720px" height="400px" id="map" /> </div>  
    }
}

export default Map;
