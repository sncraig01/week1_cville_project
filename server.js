const axios = require( 'axios' );
const express = require( 'express' );
const app = express(); 
const port = 9000;

console.log( process.env.REACT_APP_API_KEY )//API key is hidden

app.get('/', (req,res) => res.send("get information here") );

//for cville restaurants
app.get('/cvillerecs', (req,res) => { 
    //console.log( api_key ) 
    let URL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=38.0293,-78.4767&radius=1500&type=restaurant&opennow&key=' + process.env.REACT_APP_API_KEY;

    axios.get( URL ).then( //do the actually axios.get request to Google Books
      (result) => { 
        console.log( result.data.results[0] )
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
        res.send(array);
      }
    )  
})

//for geocoding
app.get( '/geocode', (req,res) => {
    let formatted_query = req.query.address;
    let URL = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + formatted_query + "&key=" + process.env.REACT_APP_API_KEY;

    axios.get( URL ).then(
        (result) => {
            //console.log(result);
            let found_lat =  result.data.results[0].geometry.location.lat;
            let found_long = result.data.results[0].geometry.location.lng;

            res.send( [found_lat, found_long]);
        }
    )
})

app.get( '/findrecs', (req,res) => {
    let custom_url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='
    + req.query.lat + "," + req.query.long + "&radius=1500&type=restaurant&opennow&maxprice=" + req.query.maxprice + 
    '&keyword='+ req.query.key + '&key=' + process.env.REACT_APP_API_KEY;

    axios.get( custom_url ).then(
        (result) => {
           // console.log( result)
            let array = [];
            let price = result.data.results[i].price_level
            if( result.data.results[i].price_level === 'undefined' ){
                price = "no price";
            }
            for( let i=0; i < result.data.results.length; i++ ){
                array.push( {
                    name: result.data.results[i].name,
                    rating: result.data.results[i].rating,
                    price: price,
                    address: result.data.results[i].vicinity,
                    long: result.data.results[i].geometry.location.lng,
                    lat: result.data.results[i].geometry.location.lat,
                })
            }
            res.send( array );
        }
    )
})



app.listen(port, () => console.log(`Example app listening on port ${port}!`))