import React from 'react';
import './App.css';
import axios from 'axios';
import { Radio } from 'antd';
import { Input, Button } from 'antd';
import Query_results from './Query_results.js'


const api_key = process.env.REACT_APP_API_KEY //API key is hidden

const InputGroup = Input.Group; //for the input field organization from antd

class Query extends React.Component{

    state = {
        price_level : 0,
        price_change : false,

        //address fields
        number: "",
        street: "",
        streetType: "",
        town: "",
        state: "",
        zip: "",

        keyword: "",

        //from api
        lat: 0,
        long: 0,
    }


    //functions that change price_level based on which button is clicked
    buttonOne=()=>{
        this.setState( {price_level: 1})
    }
    buttonTwo=()=>{
        this.setState( {price_level: 2} )
    }
    buttonThree=()=>{
        this.setState( {price_level: 3} )
    }
    buttonFour=()=>{
        this.setState( {price_level: 4} )
    }

    // for the input boxes
    changeNum=( text )=>{
        this.setState( { number : text} );
    }  
    changeStreet=( text )=>{
        this.setState( { street: text} )
    }  
    changeStreetType=( text )=>{
        this.setState( { streetType: text} )
    }  
    changeTown=( text )=>{
        this.setState( { town: text} )
    }  
    changeState=( text )=>{
        this.setState( { state: text} )
    }  
    changeZip=( text )=>{
        this.setState( { zip: text} )
    }  

    changeKeyword=( text )=>{
        this.setState( { keyword: text} )
    }  


    buttonClicked=()=>{
        if( this.state.lat !== 0 ) {
            this.setState({lat : 0}, this.searchGeocodeAPI())
        }
        else{
            this.searchGeocodeAPI();
        }
    }


    searchGeocodeAPI = () => {
            let formatted_query = this.state.number + "+" + this.state.street + "+" + this.state.streetType + ",+" +
            this.state.town + ",+" + this.state.state;
    
            console.log(formatted_query);

            let found_lat = 0; //to be modified by the axios.get request for geocoding
            let found_long = 0;

            let geocode_url = 'https://cors-anywhere-hclaunch.herokuapp.com/https://maps.googleapis.com/maps/api/geocode/json?address=' + formatted_query + "&key=" + api_key;
            axios.get( geocode_url ).then(
                (result) => {
                    console.log(result);
                    found_lat =  result.data.results[0].geometry.location.lat;
                    found_long = result.data.results[0].geometry.location.lng;
        
                    this.setState( {lat:found_lat, long:found_long});
                }
            )
    }

    render(){
        return(
        <div>
            <h3> Find Restaurants Close to... </h3>
            <p> Enter an address </p>
            <div>
                <InputGroup compact>
                    <Input onChange={(e) => this.changeNum(e.target.value)} 
                        size="small" style={{ width: '10%' }} defaultValue="Number" />
                    <Input onChange={(e) => this.changeStreet(e.target.value)} 
                        size="small" style={{ width: '22%' }} defaultValue="Street Name" />
                    <Input onChange={(e) => this.changeStreetType(e.target.value)} 
                        size="small" style={{ width: '10%' }} defaultValue="St/Ln/Rd" />
                    <br/>
                    <Input onChange={(e) => this.changeTown(e.target.value)}
                        size="small" style={{ width: '20%' }} defaultValue="City/Town" />
                    <Input onChange={(e) => this.changeState(e.target.value)}
                        size="small" style={{ width: '15%' }} defaultValue="State" />
                    <Input onChange={(e) => this.changeZip(e.target.value)}
                        size="small" style={{ width: '10%' }} defaultValue="Zip" />
                 </InputGroup>
            </div>
            <br/>
            <h3> Keyword </h3>
            <p> Enter a type or style of food! </p>
            <div>
                <Input onChange={(e) => this.changeKeyword(e.target.value)} 
                        size="small" style={{ width: '25%' }} defaultValue="keyword" />
            </div>
            <br/>
            <h3>  Maximum Price Level </h3>
            <p> 1 being the least expensive, 4 being the most </p>
            <div style={{ margin: 16 }}>
            <Radio.Group defaultValue="a" buttonStyle="solid">
                <Radio.Button value="a" onClick={this.buttonOne}> 1 </Radio.Button>
                <Radio.Button value="b" onClick={this.buttonTwo}> 2 </Radio.Button>
                <Radio.Button value="c" onClick={this.buttonThree}> 3 </Radio.Button>
                <Radio.Button value="d" onClick={this.buttonFour}> 4 </Radio.Button>
            </Radio.Group>
            </div>
            <br/>
            <Button type="primary" size="small" onClick={this.buttonClicked}> Search </Button>
            <br/> 
            { (this.state.lat !== 0) ? 
                <Query_results lat={this.state.lat} 
                    long={this.state.long} 
                    price={this.state.price_level} 
                    keyword={this.state.keyword} /> : null }
        </div>
        )
    }

}

export default Query;