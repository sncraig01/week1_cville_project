import React from 'react';
import './App.css';

class Banner extends React.Component{

    render(){
        return(
        <div className="App">
            <h1>  
                <img className="imageStyling" src="https://scontent-iad3-1.cdninstagram.com/vp/4fece744ea4808ec0133e2a4838ac231/5D5E1F59/t51.2885-15/e35/39049041_312051196197998_5602304819202097152_n.jpg?_nc_ht=scontent-iad3-1.cdninstagram.com"/> 
                Charlottesville Restaurants 
                <img className="imageStyling" src="https://scontent-iad3-1.cdninstagram.com/vp/4fece744ea4808ec0133e2a4838ac231/5D5E1F59/t51.2885-15/e35/39049041_312051196197998_5602304819202097152_n.jpg?_nc_ht=scontent-iad3-1.cdninstagram.com"/> 
            </h1>
        </div>
        )
    }
}

export default Banner;