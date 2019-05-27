import React from 'react';
import './App.css';
import axios from 'axios';
import Map from './Map_new.js';
import {Button, Card} from 'antd';
import { Row, Col, Affix } from 'antd';

const api_key = process.env.REACT_APP_API_KEY //API key is hidden

class Restaurants extends React.Component {
  state={
    restaurants : [],
    sort_by_rating: false,
    sort_by_price: false,

    top: 10, // for ant design affix
  }

  componentDidMount(){ 
    let URL = 'https://cors-anywhere-hclaunch.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=38.0293,-78.4767&radius=1500&type=restaurant&opennow&key=' + api_key;

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
      (item) => {;
        return  <Card size="small" title={item.name} style={{ width: 375 }}>
        <p>Rating: {item.rating}</p>
        <p>Price Level: {item.price}</p>
        <p>Location: {item.address}</p>
      </Card>
      }
    )
  }

  //sort this.state.restaurants by rating
  ratingSort = () =>{ 
      this.setState( {sort_by_rating: true} );

      let rests_toSort = this.state.restaurants;
      rests_toSort.sort((a,b) => (a.rating > b.rating) ? -1 : ((b.rating > a.rating) ? 1 : 0));  //sort them by RATE

      this.setState( {restaurants: rests_toSort});
  }
  
  //sort this.state.restaurants by price
  priceSort=()=>{
      this.setState( {sort_by_price: true });

      let rests_toSort = this.state.restaurants;
      rests_toSort.sort((a,b) => (a.price > b.price) ? -1 : ((b.price > a.price) ? 1 : 0));  //sort them by PRICE 

      this.setState( {restaurants: rests_toSort});
  }

  render(){
    return (
      <div className="App">
          <div> 
            <Button type="danger" size="small" onClick={this.ratingSort}> Sort by Rating </Button>
            <Button type="danger" size="small" onClick={this.priceSort}> Sort by Price </Button>
          </div> 
        <br/>
        <div align="center">
            <Row>
            <Col span={12}>  
                { this.mapItems() } 
            </Col>
            <Col span={12}> 
                <Affix offsetTop={this.state.top}>
                {  (this.state.restaurants.length !== 0) ? 
                    <Map data={this.state.restaurants}/> : null } 
                </Affix>
            </Col>
            </Row>

        </div>
      </div>
    );
  }

}
export default Restaurants;