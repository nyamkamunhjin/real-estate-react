import React, { Component } from "react";

import GridView from "../../components/GridView/GridView";

import "./Buy.css";
import data from "../../fakeData.json";

class Buy extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="buy-container">
        <div className="map">
          <h1>hello from map</h1>
        </div>
        <GridView info={data} />
      </div>
    );
  }
}

export default Buy;
