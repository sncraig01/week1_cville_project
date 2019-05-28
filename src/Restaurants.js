import React from 'react';
import './App.css';
import axios from 'axios';
import Map from './Map_new.js';
import {Button, Card} from 'antd';
import { Row, Col, Affix } from 'antd';

//const api_key = process.env.REACT_APP_API_KEY //API key is hidden IN THE BACKEND NOW

class Restaurants extends React.Component {
  state={
    restaurants : [],
    sort_by_rating: false,
    sort_by_price: false,

    top: 10, // for ant design affix
  }

  componentDidMount(){ 
    //access backend for /cvillerecs
    axios.get("/cvillerecs")
       .then(res => {
            console.log( res );
            this.setState({ restaurants: res.data }) 
        })
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
      rests_toSort.sort((a,b) => (a.price > b.price) ? -1 : ((b.price > a.price) ? 1 : (a.price === "no price" ) ? -1 : 0)) //sort them by PRICE 


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