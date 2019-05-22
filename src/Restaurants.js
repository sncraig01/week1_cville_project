import React from 'react';
import './App.css';
import axios from 'axios';
import Map from './Map_new.js';

const api_key = process.env.REACT_APP_API_KEY; //API key is hidden

class Restaurants extends React.Component {
  state={
    restaurants : [],
    //sort_by_rating: false;
  }

  componentDidMount(){ 
    let URL = 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=38.0293,-78.4767&radius=1500&type=restaurant&opennow&key=' + api_key;

    axios.get( URL ).then(
      (result) => {
        console.log( result )
        let array = [];
        for( let i=0; i < result.data.results.length; i++ ){
          array.push( {
            name: result.data.results[i].name,
            rating: result.data.results[i].rating,
            price: result.data.results[i].price_level,
            address: result.data.results[i].vicinity,
            long: result.data.results[i].geometry.location.lng,
            lat: result.data.results[i].geometry.location.lat,
          })
        }
        this.setState( {restaurants: array} );

      }
    )
  }

  mapItems(){
    return this.state.restaurants.map( 
      (item) => {
        return <div> 
           <li align='left' style={{color: 'blue'}}> {item.name}</li>
           <div align="left"> _____ Rating: {item.rating} </div>
           <div align="left"> _____ Price level: {item.price}</div> 
           <div align="left"> _____ Location: {item.address}</div> 
        </div>
      }
    )
  }

  /*
  ratingSort = () =>{
      this.setState( {sort_by_rating: true} );

  }
  <button onClick> sort by rating </button>
*/
  render(){
    return (
      <div className="App">
          <b > Charlottesville Restaurants </b>
          
          {this.mapItems()}
          { (this.state.restaurants.length != 0) ? <Map data={this.state.restaurants}/> : null }
      </div>
    );
  }

}

export default Restaurants;
