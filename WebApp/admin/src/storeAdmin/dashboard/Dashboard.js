import React,{Component} from 'react';
import { render } from 'react-dom';
import $ from 'jquery';
import jQuery               from 'jquery';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/js/tab.js';

export default class Dashboard extends Component{
  render(){
    return(
      <div className="col-lg-12">
        <div className="row">
          <img src="/images/Dashboard1.png" width="100%" />
        </div>
      </div>
    )
  }
}