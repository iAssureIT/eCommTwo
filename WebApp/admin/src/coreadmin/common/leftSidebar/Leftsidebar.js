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


    var roles = localStorage.getItem("roles").split(',');
  
    return(
      <Route>
      <div>
        <aside className="leftsidebar">
          <div className="wrapper">
            <nav id="sidebar">
              <div className="sidebar-header textAlignCenter">
                <label  className="headerImage">Five Bees</label>
                <img className="sidebarLogoName strong" src="/images/iAssureIT_favicon_white.png"/>
              </div>
              <ul className="list-unstyled components scrollBox" style={{height:  sidebarHeight+"px"}}>
                <li className=" sidebarMenuText" >
                  <Link to="/dashboard" title="Dashboard">
                    <i className="fa fa-dashboard"></i>
                    <span className="iconTitle">Dashboard</span>
                  </Link>
                </li>
                <li className="sidebarMenuText"  onClick={this.eventclk1.bind(this)}>
                  <Link to="/All_Bookings" title="All Booking">
                    <i className="fa fa-ticket" aria-hidden="true"></i>
                     <span className="iconTitle">All Booking</span>
                  </Link>
                </li>
                <li className="sidebarMenuText"  onClick={this.eventclk1.bind(this)}>
                  <a href="/BillingManagement" title="Billing Management">
                    <i className="fa fa-money" aria-hidden="true"></i>
                     <span className="iconTitle">Billing Management</span>
                  </a>
                </li>
                 <li className="sidebarMenuText"  onClick={this.eventclk1.bind(this)}>
                  <a to="/coming_soon" title="Reporting System ">
                    <i className="fa fa-database" />
                     <span className="iconTitle">Reporting System</span>
                    <i className="leftarrow rotate fa fa-angle-left  pull-right" id="ReportingSystem"></i>
                  </a>
                  </li>
                  <li className="sidebarMenuText"  onClick={this.eventclk1.bind(this)}>
                  <Link to="#Contract" data-toggle="collapse" className="menuContent"  aria-expanded="false" title=" Contract Management ">
                    <i className="fa fa-file" />
                     <span className="iconTitle">Contract Management</span>
                    <i className="leftarrow rotate fa fa-angle-left  pull-right" id="ContractManagement"></i>
                  </Link>
                  <ul className="collapse list-unstyled activeClass" id="Contract">
                    <li>
                      <Link to="/contract-management" title="Make Contract">
                        <i className="fa fa-circle-o" />
                        <span className="sidebarMenuSubText">Make Contract </span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/contract-list" title="Contract List">
                        <i className="fa fa-circle-o" />
                        <span className="sidebarMenuSubText">Contract List</span>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="sidebarMenuText"  onClick={this.eventclk1.bind(this)}>
                  <Link to="#EntityMappings" data-toggle="collapse" className="menuContent"  aria-expanded="false" title="Vendor Mapping">
                    <i className="fa fa-link" />
                     <span className="iconTitle">Vendor Mapping</span>
                    <i className="leftarrow rotate fa fa-angle-left  pull-right" id="Entitys"></i>
                  </Link>
                  <ul className="collapse list-unstyled activeClass" id="EntityMappings">
                    <li>
                      <Link to="/entity-mapping" title="Map Corporate and Vendor">
                        <i className="fa fa-circle-o" />
                        <span className="sidebarMenuSubText">Map Corporate and Vendor</span>
                      </Link>
                    </li>
                    <li>
                      <Link  to="/mapping-list" title="Mapped List">
                        <i className="fa fa-circle-o" />
                        <span className="sidebarMenuSubText">Mapped List</span>
                      </Link>
                    </li>
                  </ul>
                </li>

                <li className="sidebarMenuText" onClick={this.eventclk1.bind(this)}>
                  <Link  to="#Corporate" data-toggle="collapse" aria-expanded="false" className="menuContent" title="Corporate Master">
                    <i className="fa fa-user" />
                    <span className="iconTitle">Corporate</span>
                    <i className="leftarrow rotate fa fa-angle-left  pull-right"  id="CorporateMaster"></i> 
                  </Link>
                  <ul className="collapse   list-unstyled activeClass" id="Corporate">
                    <li>
                      <Link to="/corporate/list" title="Corporate List">
                        <i className="fa fa-circle-o" />

                        <span className="sidebarMenuSubText">Corporate Master</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/employee/lists" title="Employee List">
                        <i className="fa fa-circle-o" />
                        <span className="sidebarMenuSubText">Employee Master</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/guest/lists" title="Guest List">
                        <i className="fa fa-circle-o" />
                        <span className="sidebarMenuSubText">Guest Master</span>
                      </Link>
                    </li>
                  </ul>
                </li> 
                <li className="sidebarMenuText"  onClick={this.eventclk1.bind(this)}>
                  <Link to="#Vendor" data-toggle="collapse" className="menuContent" aria-expanded="false" title="Vendor Master">
                    <i className="fa fa-book" />
                      <span className="iconTitle">Vendors</span>
                    <i className="leftarrow rotate fa fa-angle-left  pull-right"  id="VendorMaster"></i>
                  </Link>
                  <ul className="collapse   list-unstyled activeClass" id="Vendor">
                    <li>
                      <Link to="/vendor/list" title="Vendor List">
                        <i className="fa fa-circle-o" /> 
                        <span className="sidebarMenuSubText">Vendor Master</span>
                      </Link>
                    </li> 
                    <li>
                      <Link to="/supplier/list" title="Supplier List">
                        <i className="fa fa-circle-o" />
                        <span className="sidebarMenuSubText">Supplier Master</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/vehicle-list" title="Vehicle List">
                        <i className="fa fa-circle-o" />
                        <span className="sidebarMenuSubText">Vehicle Master</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/driver/lists" title="Driver List">
                        <i className="fa fa-circle-o" />
                        <span className="sidebarMenuSubText">Driver Master</span>
                      </Link>
                    </li>
                  </ul>
                </li>
                 <li className="sidebarMenuText"  onClick={this.eventclk1.bind(this)}>
                  <Link to="#MasterData" data-toggle="collapse" className="menuContent" aria-expanded="false" title="Master Data">
                    <i className="fa fa-address-book" />
                      <span className="iconTitle">Master Data</span>
                    <i className="leftarrow rotate fa fa-angle-left  pull-right"></i>
                  </Link>
                  <ul className="collapse list-unstyled activeClass" id="MasterData">
                  {
                    roles.indexOf('superAdmin') !== -1 ?

                    <li>
                      <Link to="/umroleslist" title="Roles Master">
                        <i className="fa fa-circle-o" /> 
                        <span className="sidebarMenuSubText">Roles Master</span>
                      </Link>
                    </li> : null
                  }
                    <li>
                      <Link to="/category" title="Vehicle Category">
                        <i className="fa fa-circle-o" /> 
                        <span className="sidebarMenuSubText">Vehicle Category </span>
                      </Link>
                    </li> 
                     <li>
                      <Link to="/fuel-type" title="Fuel Type">
                        <i className="fa fa-circle-o" /> 
                        <span className="sidebarMenuSubText">Fuel Type </span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/brand" title="Vehicle Brand">
                        <i className="fa fa-circle-o" /> 
                        <span className="sidebarMenuSubText">Vehicle Brand</span>
                      </Link>
                    </li> 
                    <li>
                      <Link to="/model" title="Vehicle Model">
                        <i className="fa fa-circle-o" /> 
                        <span className="sidebarMenuSubText">Vehicle Model</span>
                      </Link>
                    </li> 
                    <li>
                      <Link to="/package-type" title="Package Type">
                        <i className="fa fa-circle-o" /> 
                        <span className="sidebarMenuSubText">Package Type</span>
                      </Link>
                    </li>
                    <li className=" ">
                      <Link to="/package-master" title="Package Master">
                        <i className="fa fa-circle-o" />
                        <span className="iconTitle">Package Master</span>
                      </Link>
                    </li> 
                    <li>
                      <Link to="/designation-mapping" title="Designation Mapping">
                        <i className="fa fa-circle-o" /> 
                        <span className="sidebarMenuSubText">Designation Mapping</span>
                      </Link>
                    </li> 
                    <li>
                      <a href="/expenseType" title="Expense Type Master">
                        <i className="fa fa-circle-o" /> 
                        <span className="sidebarMenuSubText">Expense Type Master</span>
                      </a>
                    </li> 
                    
 
                  </ul>
                </li>
                <li className="sidebarMenuText"  onClick={this.eventclk1.bind(this)}>
                  <Link to="#BulkUpload" data-toggle="collapse" className="menuContent"  aria-expanded="false" title="Bulk Upload">
                    <i className="fa fa-upload" />
                     <span className="iconTitle">Bulk Upload</span>
                    <i className="leftarrow rotate fa fa-angle-left  pull-right" id="Entitys1"></i>
                  </Link>
                  <ul className="collapse list-unstyled activeClass" id="BulkUpload">
                   <li>
                      <Link to="/Departments" title="Map Corporate and Vendor">
                        <i className="fa fa-circle-o" />
                        <span className="sidebarMenuSubText">Department</span>
                      </Link>
                     </li>
                    <li>
                      <Link to="/Designations" title="Map Corporate and Vendor">
                        <i className="fa fa-circle-o" />
                        <span className="sidebarMenuSubText">Designations</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/vehiclebrand" title="Map Corporate and Vendor">
                        <i className="fa fa-circle-o" />
                        <span className="sidebarMenuSubText">Vehicle Brand</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/vehiclemodel" title="Map Corporate and Vendor">
                        <i className="fa fa-circle-o" />
                        <span className="sidebarMenuSubText">Vehicle Model</span>
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </aside>
      </div>
      </Route>
    );
  }
}
