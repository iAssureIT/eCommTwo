import React,{Component} from 'react';
// import TrackerReact from 'meteor/ultimatejs:tracker-react';
// import { render } from 'react-dom';
import {BrowserRouter as Router, Route,Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import $ from "jquery";


import './Rightsidebar.css';

export default class Rightsidebar extends Component{
  
  constructor(props) {
   super(props);
    this.state = {}
  }
   
componentDidMount(){
                 
          }    
  

  render(){
    return(
      <Router>
    <div>
        <div className="sidebar-header">
            <h4>Admin Tasks</h4>
        </div>
          
          <li>
              <a href="#rightsidebar" data-toggle="collapse" aria-expanded="false">
                  
                  User Management
              </a>
              <ul className="collapse list-unstyled" id="rightsidebar">
                  <li><a href="/umlistofusers">List of Users</a></li>
                
              </ul>

          </li>
          {/* <a href="ViewTemplates">NotificationManagement</a> */}
          <a href="/companysetting">Store Configuration System</a>
          <a href="/ViewTemplates">Notification Management</a>
      </div>
      </Router>
    );
  }
}
