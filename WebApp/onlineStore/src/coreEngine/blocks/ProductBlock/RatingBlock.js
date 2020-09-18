import React, { Component } from 'react';
// import "../../../sites/currentSite/blocks/ProductCollageView.css";
import axios from 'axios';
import ProductDetailsHomeView from "../../pages/ProductDetailsEcommerce/ProductDetailsHomeView.js";

import $ from 'jquery';

import './Rating.css';

class Rating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    }
  }
  async componentDidMount() {
  }

  render(){
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ratingBlock">
          <div></div><span>RATINGS</span>
      </div>
  }
}
export default ProductBlock;
