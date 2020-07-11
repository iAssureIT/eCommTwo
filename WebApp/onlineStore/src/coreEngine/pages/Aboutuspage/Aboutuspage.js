import React, { Component }       from 'react';
import Aboutusbanner              from "../../blocks/Aboutusbanner/Aboutusbanner.js";
import Aboutusmultistore          from "../../blocks/Aboutusmultistore/Aboutusmultistore.js";
import Aboutusteam                from "../../blocks/Aboutusteam/Aboutusteam.js";
import Aboutushistory             from "../../blocks/Aboutushistory/Aboutushistory.js";
import Aboutusclient              from "../../blocks/Aboutusclient/Aboutusclient.js";
// import { connect }                from 'react-redux';
class Aboutuspage extends Component {
    constructor(props){
    super(props);
      this.state = {
      };
    }

    componentDidMount() {
      
    }  
  render() {
    return (
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 backColorGray">
          <div className="row">
            <Aboutusbanner />
            <Aboutusmultistore />
            {/* <Aboutusteam /> */}
            {/* <Aboutushistory /> */}
            {/* <Aboutusclient /> */}
          </div>
        </div>
    );
  }
}

export default (Aboutuspage);
