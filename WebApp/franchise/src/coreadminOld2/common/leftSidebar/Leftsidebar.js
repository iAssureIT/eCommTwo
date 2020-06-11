import React,{Component}                              from 'react';
import { render }                                     from 'react-dom';
import $                                              from "jquery";
import { BrowserRouter, Route, Switch,Link,location } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css'; 
import './Leftsidebar.css';

export default class Leftsidebar extends Component{
  
  constructor(props) {
   super(props);
    this.state = {}
  }
  componentDidMount(){
  /* Highlight current li*/
     $(document).ready(function () {
      $('.activeClass li').on('click', function() {
        $('.activeClass li').removeClass('activeOne');
        $(this).addClass('activeOne');
      });
    });
     var getURL = localStorage.getItem("currentURL");
     var getEvent = localStorage.getItem("currentEvent");
     //console.log("getURL",getURL);
     //console.log("getEvent",getEvent);
     // var x = document.getElementById("sidebar");

     // var y = x.getElementsByTagName("a");
     // var xxxxxx=x.getAttribute("href");
     var x = document.querySelectorAll("a[href]");

     // if(getURL === )
     // {

     // }
  }    
  Addclass(event){
    $("pull-right-container").children('i').css({"transform": "rotate(-90deg)"});
  }   
  eventclk1(event){
    $(event.currentTarget).children(".menuContent").children(".rotate").toggleClass("down");
    var currentEvent =  event.currentTarget
    var getCurrentUrl = window.location.pathname;
    //console.log("getCurrentUrl",getCurrentUrl);
    localStorage.setItem("currentURL",getCurrentUrl)
    localStorage.setItem("currentEvent",currentEvent)
    /*var x = document.getElementById(targetId);
    var targetId = $(event.currentTarget).children('.activeClass').attr("id");
    var getValue = x.getAttribute('aria-expanded');
    $('.activeClass').removeClass('in');
    $(event.currentTarget).children('.activeClass').addClass('in')*/
  } 
  render(){
    var sidebarHeight = window.screen.height - 180;
    var roles = localStorage.getItem("roles") 
                ? localStorage.getItem("roles").split(',') 
                : ['superAdmin'] ;

    return(
      <div>
        <aside className="leftsidebar">
          <div className="wrapper">
            <nav id="sidebar">
              <div className="sidebar-header textAlignCenter">
                <label  className="headerImage">Anas Handicrafts</label>
                <img className="sidebarLogoName strong" src="/images/iAssureIT_favicon_white.png"/>
              </div>
              <ul className="list-unstyled components scrollBox" style={{height:  sidebarHeight+"px"}}>
                <li className=" sidebarMenuText" >
                  <a href="/dashboard" title="Dashboard">
                    <i className="fa fa-dashboard"></i>
                    <span className="iconTitle">Dashboard</span>
                  </a>
                </li>
                <li className="sidebarMenuText" onClick={this.eventclk1.bind(this)}>
                  <a href="#Corporate" data-toggle="collapse" aria-expanded="false" className="menuContent" title="Corporate Master">
                    <i className="fa fa-user" />
                    <span className="iconTitle">Corporate Master</span>
                    <i className="leftarrow rotate fa fa-angle-left  pull-right"  id="CorporateMaster"></i> 
                  </a>
                  <ul className="collapse   list-unstyled activeClass" id="Corporate">
                   
                    <li>
                      <a href="/corporate/basic-details" title="Add Corporate">{/*<Link to="/corporate/basic-details" title="Add Corporate" onClick={this.eventclk.bind(this)}>*/}
                       <i className="fa fa-circle-o" />

                       <span className="sidebarMenuSubText">Add Corporate</span>
                     </a>
                    </li>
                    <li>
                      <a href="/corporate/list" title="Corporate List">
                        <i className="fa fa-circle-o" />

                        <span className="sidebarMenuSubText">Corporate List</span>
                      </a>
                    </li>
                  </ul>
                </li> 
                <li className="sidebarMenuText"  onClick={this.eventclk1.bind(this)}>
                  <a href="#Vendor" data-toggle="collapse" className="menuContent" aria-expanded="false" title="Vendor Master">
                    <i className="fa fa-book" />
                      <span className="iconTitle">Vendor Master</span>
                    <i className="leftarrow rotate fa fa-angle-left  pull-right"  id="VendorMaster"></i>
                  </a>
                  <ul className="collapse   list-unstyled activeClass" id="Vendor">
                    <li>
                      <a href="/vendor/basic-details" title="Add Vendor">
                        <i className="fa fa-circle-o" /> 
                        <span className="sidebarMenuSubText">Add Vendor</span>
                      </a>
                    </li>
                    <li>
                      <a href="/vendor/list" title="Vendor List">
                        <i className="fa fa-circle-o" /> 
                        <span className="sidebarMenuSubText">Vendor List</span>
                      </a>
                    </li> 
                  </ul>
                </li>
                <li className="sidebarMenuText"  onClick={this.eventclk1.bind(this)}>
                  <a href="#Supplier" data-toggle="collapse" className="menuContent"  aria-expanded="false" title="Supplier Master">
                    <i className="fa fa-users" />
                     <span className="iconTitle"> Supplier Master </span>
                    <i className="leftarrow rotate fa fa-angle-left  pull-right" id="SupplierMaster"></i>
                  </a>
                  <ul className="collapse list-unstyled activeClass" id="Supplier">
                    <li>
                      <a href="/supplier" title="Add Supplier">
                        <i className="fa fa-circle-o" />
                        <span className="sidebarMenuSubText">Add Supplier </span>
                      </a>
                    </li>
                    <li>
                      <a href="/supplier/list" title="Supplier List">
                        <i className="fa fa-circle-o" />
                        <span className="sidebarMenuSubText">Supplier List</span>
                      </a>
                    </li>
                  </ul>
                </li>
                
                <li className="sidebarMenuText"  onClick={this.eventclk1.bind(this)}>
                  <a href="#Contract" data-toggle="collapse" className="menuContent"  aria-expanded="false" title=" Contract Management ">
                    <i className="fa fa-handshake-o" />
                     <span className="iconTitle"> Contract Management </span>
                    <i className="leftarrow rotate fa fa-angle-left  pull-right" id="ContractManagement"></i>
                  </a>
                  <ul className="collapse list-unstyled activeClass" id="Contract">
                    <li>
                      <a href="/contract-management" title="Make Contract">
                        <i className="fa fa-circle-o" />
                        <span className="sidebarMenuSubText">Make Contract </span>
                      </a>
                    </li>
                    <li>
                      <a href="/contract-list" title="Contract List">
                        <i className="fa fa-circle-o" />
                        <span className="sidebarMenuSubText">Contract List</span>
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="sidebarMenuText"  onClick={this.eventclk1.bind(this)}>
                  <a href="#EntityMappings" data-toggle="collapse" className="menuContent"  aria-expanded="false" title=" Contract Management ">
                    <i className="fa fa-handshake-o" />
                     <span className="iconTitle"> Entity Mapping </span>
                    <i className="leftarrow rotate fa fa-angle-left  pull-right" id="Entitys"></i>
                  </a>
                  <ul className="collapse list-unstyled activeClass" id="EntityMappings">
                    <li>
                      <a href="/entity-mapping" title="Map Corporate and Vendor">
                        <i className="fa fa-circle-o" />
                        <span className="sidebarMenuSubText">Map Corporate and Vendor</span>
                      </a>
                    </li>
                    <li>
                      <a href="/mapping-list" title="Mapped List">
                        <i className="fa fa-circle-o" />
                        <span className="sidebarMenuSubText">Mapped List</span>
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="sidebarMenuText"  onClick={this.eventclk1.bind(this)}>
                  <a href="#Vehicle" data-toggle="collapse" className="menuContent"  aria-expanded="false" title=" Vehicle Master ">
                    <i className="fa fa-car" />
                     <span className="iconTitle"> Vehicle Master </span>
                    <i className="leftarrow rotate fa fa-angle-left  pull-right"></i>
                  </a>
                  <ul className="collapse list-unstyled activeClass" id="Vehicle">
                    <li>
                      <a href="/vehicle-master" title="Add Vehicle">
                        <i className="fa fa-circle-o" />
                        <span className="sidebarMenuSubText">Add Vehicle </span>
                      </a>
                    </li>
                    <li>
                      <a href="/vehicle-list" title="Vehicle List">
                        <i className="fa fa-circle-o" />
                        <span className="sidebarMenuSubText">Vehicle List</span>
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="sidebarMenuText"  onClick={this.eventclk1.bind(this)}>
                  <a href="#Employee" data-toggle="collapse" className="menuContent"  aria-expanded="false" title="Employee Master ">
                    <i className="fa fa-user-circle" aria-hidden="true"></i>
                     <span className="iconTitle"> Employee Master </span>
                    <i className="leftarrow rotate fa fa-angle-left pull-right"></i>
                  </a>
                  <ul className="collapse list-unstyled activeClass" id="Employee">
                    <li>
                      <a href="/employee/master" title="Add Employee">
                        <i className="fa fa-circle-o" />
                        <span className="sidebarMenuSubText">Add Employee </span>
                      </a>
                    </li>
                    <li>
                      <a href="/employee/lists" title="Employee List">
                        <i className="fa fa-circle-o" />
                        <span className="sidebarMenuSubText">Employee List</span>
                      </a>
                    </li>
                    <li>
                      <a href="/employee/filewiselists" title="File List">
                        <i className="fa fa-circle-o" />
                        <span className="sidebarMenuSubText">Files List </span>
                      </a>
                    </li>
                  </ul>
                </li>

                <li className="sidebarMenuText"  onClick={this.eventclk1.bind(this)}>
                  <a href="#Guest" data-toggle="collapse" className="menuContent"  aria-expanded="false" title="Guest Master">
                    <i className="fa fa-street-view" aria-hidden="true"></i>
                    <span className="iconTitle"> Guest Master </span>
                    <i className="leftarrow rotate fa fa-angle-left  pull-right"></i>
                  </a>
                  <ul className="collapse list-unstyled activeClass" id="Guest">
                    <li>
                      <a href="/guest/master" title="Add Guest">
                        <i className="fa fa-circle-o" />
                        <span className="sidebarMenuSubText">Add Guest </span>
                      </a>
                    </li>
                    <li>
                      <a href="/guest/lists" title="Guest List">
                        <i className="fa fa-circle-o" />
                        <span className="sidebarMenuSubText">Guest List</span>
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="sidebarMenuText"  onClick={this.eventclk1.bind(this)}>
                  <a href="#Driver" data-toggle="collapse" className="menuContent"  aria-expanded="false" title="Driver Master">
                    <i className="fa fa-taxi" aria-hidden="true"></i>
                     <span className="iconTitle"> Driver Master </span>
                    <i className="leftarrow rotate fa fa-angle-left  pull-right"></i>
                  </a>
                  <ul className="collapse list-unstyled activeClass" id="Driver">
                    <li>
                      <a href="/driver/master" title="Add Driver">
                        <i className="fa fa-circle-o" />
                        <span className="sidebarMenuSubText">Add Driver </span>
                      </a>
                    </li>
                    <li>
                      <a href="/driver/lists" title="Driver List">
                        <i className="fa fa-circle-o" />
                        <span className="sidebarMenuSubText">Driver List</span>
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="sidebarMenuText"  onClick={this.eventclk1.bind(this)}>
                  <Link to="#Booking" data-toggle="collapse" className="menuContent"  aria-expanded="false" title="Driver Master">
                    <i className="fa fa-ticket" aria-hidden="true"></i>
                     <span className="iconTitle"> Booking Management </span>
                    <i className="leftarrow fa fa-angle-left rotate pull-right"></i>
                  </Link>
                  <ul className="collapse list-unstyled activeClass" id="Booking">
                    <li>
                      <Link to="/userCheck" title="Booking Master">
                        <i className="fa fa-circle-o" />
                        <span className="sidebarMenuSubText">Booking Master </span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/booking-details" title="Booking Details">
                        <i className="fa fa-circle-o" />
                        <span className="sidebarMenuSubText">Booking Details</span>
                      </Link>
                    </li>
                  </ul>
                </li>

              {/*
                <li className=" sidebarMenuText">
                  <a href="/payment-process" title="Payment Process">
                    <i className="fa fa-rupee" />
                    <span className="iconTitle">Payment Process</span>
                  </a>
                </li>*/}

                 <li className=" sidebarMenuText">
                  <a href="/package-master" title="Package Master">
                    <i className="fa fa-database" />
                    <span className="iconTitle">Package Master</span>
                  </a>
                </li>
               
                 <li className="sidebarMenuText"  onClick={this.eventclk1.bind(this)}>
                  <a href="#MasterData" data-toggle="collapse" className="menuContent" aria-expanded="false" title="Master Data">
                    <i className="fa fa-address-book" />
                      <span className="iconTitle">Master Data</span>
                    <i className="leftarrow rotate fa fa-angle-left  pull-right"></i>
                  </a>
                  <ul className="collapse list-unstyled activeClass" id="MasterData">
                  {
                    roles.indexOf('superAdmin') !== -1 ?

                    <li>
                      <a href="/umroleslist" title="Roles Master">
                        <i className="fa fa-circle-o" /> 
                        <span className="sidebarMenuSubText">Roles Master</span>
                      </a>
                    </li> : null
                  }
                    <li>
                      <a href="/location-type" title="Location Type">
                        <i className="fa fa-circle-o" /> 
                        <span className="sidebarMenuSubText">Location Type</span>
                      </a>
                    </li>
                    <li>
                      <a href="/category" title="Vehicle Category">
                        <i className="fa fa-circle-o" /> 
                        <span className="sidebarMenuSubText">Vehicle Category </span>
                      </a>
                    </li> 
                     <li>
                      <a href="/fuel-type" title="Fuel Type">
                        <i className="fa fa-circle-o" /> 
                        <span className="sidebarMenuSubText">Fuel Type </span>
                      </a>
                    </li>
                    <li>
                      <a href="/brand" title="Vehicle Brand">
                        <i className="fa fa-circle-o" /> 
                        <span className="sidebarMenuSubText">Vehicle Brand</span>
                      </a>
                    </li> 
                    <li>
                      <a href="/model" title="Vehicle Model">
                        <i className="fa fa-circle-o" /> 
                        <span className="sidebarMenuSubText">Vehicle Model</span>
                      </a>
                    </li> 
                    <li>
                      <a href="/designation" title="Designations">
                        <i className="fa fa-circle-o" /> 
                        <span className="sidebarMenuSubText">Designations</span>
                      </a>
                    </li>  
                    <li>
                      <a href="/department" title="Departments">
                        <i className="fa fa-circle-o" /> 
                        <span className="sidebarMenuSubText">Departments</span>
                      </a>
                    </li>
                    <li>
                      <a href="/package-type" title="Package Type">
                        <i className="fa fa-circle-o" /> 
                        <span className="sidebarMenuSubText">Package Type</span>
                      </a>
                    </li> 
                    <li>
                      <a href="/designation-mapping" title="Designation Mapping">
                        <i className="fa fa-circle-o" /> 
                        <span className="sidebarMenuSubText">Designation Mapping</span>
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
