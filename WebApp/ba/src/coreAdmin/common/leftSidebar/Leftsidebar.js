import React,{Component} from 'react';
// import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch,Link,location } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import $ from "jquery";

// import Header from '../header/Header.js'
import './Leftsidebar.css';

export default class Leftsidebar extends Component{
  
  constructor(props) {
   super(props);
    this.state = {}
  }
   
  componentDidMount(){
     /*$(document).ready(function () {
     $('#sidebarCollapse').on('click', function () {
         $('#sidebar').toggleClass('active');
     });
  });*/
  }    

  render(){
    return(
      <div>
        <aside className="leftsidebar">
          <div className="wrapper">
            <nav id="sidebar">

              <div className="sidebar-header">
                <h4 className="text-center"><b><img className="slidlogo1" src="/images/anasLogo.png"/></b></h4>
                <strong><img className="slidlogo" src="images/furniture-logo1.png"/></strong>
              </div>
              

              <ul className="list-unstyled components">
                <li className="active sidebarMenuText">
                  <a href="/dashboard">
                    <i className="fa fa-dashboard"></i>
                    Dashboard
                  </a>
                </li>
                
                <li className="sidebarMenuText">
                  <a href="#baData" data-toggle="collapse" aria-expanded="false">
                    <i className="fa fa-map-marker" />
                    Shipment Tracking
                  </a>
                  <ul className="collapse list-unstyled" id="baData">
                    <li>
                      <a href="/ba-order-list">
                        <i className="fa fa-circle-o" /> 
                        <span className="sidebarMenuSubText">Shipment Tracking</span>
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="sidebarMenuText">
                  <a href="/">
                    <i className="fa fa-file"></i>
                    Agreement Management
                  </a>
                </li>
                <li className="sidebarMenuText">
                  <a href="#Report" data-toggle="collapse" aria-expanded="false">
                    <i className="fa fa-line-chart" />
                    Reports
                  </a>
                  <ul className="collapse list-unstyled" id="Report">
                    <li>
                      <a href="/report">
                        <i className="fa fa-circle-o" /> 
                        <span className="sidebarMenuSubText">Sales Report</span>
                      </a>
                    </li>
                    <li>
                      <a href="/report">
                        <i className="fa fa-circle-o" /> 
                        <span className="sidebarMenuSubText">Category Wise Sales Report</span>
                      </a>
                    </li>
                  </ul>
                </li>          
              </ul>
            </nav>
          </div>
        </aside>
      </div>
    );
  }
}
