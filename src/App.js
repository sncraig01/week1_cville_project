import React from 'react';
import './App.css';
import Restaurants from './Restaurants.js'
import Banner from './Banner.js'
import { Tabs } from 'antd';
import Query from './Query';


const TabPane = Tabs.TabPane; //for ant design tabs

class App extends React.Component {

  callback = (key) => {
    console.log(key);
  }
  
  render(){
    return (
      <div className="App">
          <Banner/>

          <Tabs defaultActiveKey="1" onChange={this.callback}>
            <TabPane tab="Sort C'ville Restaurants" key="1">
              <Restaurants/>
            </TabPane>
            <TabPane tab="Search for Restaurants" key="2">
              <Query/>
            </TabPane>
          </Tabs>


      </div>
    );
  }

}

export default App;
