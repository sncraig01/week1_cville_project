import React from 'react';
import './App.css';
import axios from 'axios';
import {Card, Row, Col, Button, Affix } from 'antd';
import Query_Map from './Query_Map.js'

const api_key = process.env.REACT_APP_API_KEY //API key is hidden


class Query_results extends React.Component{

    state ={
        latitude: this.props.lat,
        longitude: this.props.long,
        price_level: this.props.price,
        keyword: this.props.keyword,

        results: [],

        sort_by_rating: false,
        sort_by_price: false,

        top: 10, //for affix ant design
    }

    componentDidMount(){ 
        this.updateAPI();
    }
    

    updateAPI=()=>{
        let max_price = this.state.price_level;

        let custom_url = 'https://cors-anywhere-hclaunch.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='
            + this.state.latitude + "," + this.state.longitude + 
            "&radius=1500&type=restaurant&opennow&maxprice=" + max_price + 
            '&keyword='+ this.state.keyword + '&key=' + api_key;
        axios.get( custom_url ).then(
            (result) => {
                console.log( "second request" );
                console.log( result );
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
                this.setState( {results: array} );
            }
        )
    }

    mapItems(){
        return this.state.results.map( 
          (item ) => {
            return <Card size="small" title={item.name} style={{ width: 375}}>
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

        let rests_toSort = this.state.results;
        rests_toSort.sort((a,b) => (a.rating > b.rating) ? -1 : ((b.rating > a.rating) ? 1 : 0));  //sort them by RATE

        this.setState( {results: rests_toSort});
    }

    //sort this.state.restaurants by price
    priceSort=()=>{
        this.setState( {sort_by_price: true });

        let rests_toSort = this.state.results;
        rests_toSort.sort((a,b) => (a.price > b.price) ? -1 : ((b.price > a.price) ? 1 : 0));  //sort them by PRICE 

        this.setState( {results: rests_toSort});
    }

    render(){
        return( <div className="App">
                <br/>
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
                        <Affix offsetTop={this.state.top} >
                            {(this.state.results.length !== 0) ?  
                            <Query_Map data={this.state.results} 
                                long={this.state.longitude}
                                lat={this.state.latitude} />  : null } 
                        </Affix>
                    </Col>
                </Row>
                </div>
            </div>
        )
    }


}

export default Query_results;
