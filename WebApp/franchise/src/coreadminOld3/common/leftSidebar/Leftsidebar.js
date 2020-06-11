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
                <img className="sidebarLogoName shortlogo strong" src="/images/logof.jpeg"/>
              </div>
              <ul className="list-unstyled components scrollBox" style={{height:  sidebarHeight+"px"}}>
                <li className=" sidebarMenuText" >
                  <a href="/dashboard" title="Dashboard">
                    <i className="fa fa-dashboard"></i>
                    <span className="iconTitle">Dashboard</span>
                  </a>
                </li>
                <li className="sidebarMenuText"  onClick={this.eventclk1.bind(this)}>
                  <a href="/All_Bookings" title="All Booking">
                    <i className="fa fa-ticket" aria-hidden="true"></i>
                     <span className="iconTitle">All Booking</span>
                  </a>
                </li>
                <li className="sidebarMenuText"  onClick={this.eventclk1.bind(this)}>
                  <a href="/BillingManagement" title="Billing Management">
                    <i className="fa fa-money" aria-hidden="true"></i>
                     <span className="iconTitle">Billing Management</span>
                  </a>
                </li>
                 <li className="sidebarMenuText"  onClick={this.eventclk1.bind(this)}>
                  <a href="/coming_soon" title="Reporting System ">
                    <i className="fa fa-database" />
                     <span className="iconTitle">Reporting System</span>
                    <i className="leftarrow rotate fa fa-angle-left  pull-right" id="ReportingSystem"></i>
                  </a>
                  </li>
                  <li className="sidebarMenuText"  onClick={this.eventclk1.bind(this)}>
                  <a href="#Contract" data-toggle="collapse" className="menuContent"  aria-expanded="false" title=" Contract Management ">
                    <i className="fa fa-file" />
                     <span className="iconTitle">Contract Management</span>
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
                  <a href="#EntityMappings" data-toggle="collapse" className="menuContent"  aria-expanded="false" title="Vendor Mapping">
                    <i className="fa fa-link" />
                     <span className="iconTitle">Vendor Mapping</span>
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
                      <a  href="/mapping-list" title="Mapped List">
                        <i className="fa fa-circle-o" />
                        <span className="sidebarMenuSubText">Mapped List</span>
                      </a>
                    </li>
                  </ul>
                </li>

                <li className="sidebarMenuText" onClick={this.eventclk1.bind(this)}>
                  <a  href="#Corporate" data-toggle="collapse" aria-expanded="false" className="menuContent" title="Corporate Master">
                    <i className="fa fa-user" />
                    <span className="iconTitle">Corporate</span>
                    <i className="leftarrow rotate fa fa-angle-left  pull-right"  id="CorporateMaster"></i> 
                  </a>
                  <ul className="collapse   list-unstyled activeClass" id="Corporate">
                    <li>
                      <a href="/corporate/list" title="Corporate List">
                        <i className="fa fa-circle-o" />

                        <span className="sidebarMenuSubText">Corporate Master</span>
                      </a>
                    </li>
                    <li>
                      <a href="/employee/lists" title="Employee List">
                        <i className="fa fa-circle-o" />
                        <span className="sidebarMenuSubText">Employee Master</span>
                      </a>
                    </li>
                    <li>
                      <a href="/guest/lists" title="Guest List">
                        <i className="fa fa-circle-o" />
                        <span className="sidebarMenuSubText">Guest Master</span>
                      </a>
                    </li>
                  </ul>
                </li> 
                <li className="sidebarMenuText"  onClick={this.eventclk1.bind(this)}>
                  <a href="#Vendor" data-toggle="collapse" className="menuContent" aria-expanded="false" title="Vendor Master">
                    <i className="fa fa-book" />
                      <span className="iconTitle">Vendors</span>
                    <i className="leftarrow rotate fa fa-angle-left  pull-right"  id="VendorMaster"></i>
                  </a>
                  <ul className="collapse   list-unstyled activeClass" id="Vendor">
                    <li>
                      <a href="/vendor/list" title="Vendor List">
                        <i className="fa fa-circle-o" /> 
                        <span className="sidebarMenuSubText">Vendor Master</span>
                      </a>
                    </li> 
                    <li>
                      <a href="/supplier/list" title="Supplier List">
                        <i className="fa fa-circle-o" />
                        <span className="sidebarMenuSubText">Supplier Master</span>
                      </a>
                    </li>
                    <li>
                      <a href="/vehicle-list" title="Vehicle List">
                        <i className="fa fa-circle-o" />
                        <span className="sidebarMenuSubText">Vehicle Master</span>
                      </a>
                    </li>
                    <li>
                      <a href="/driver/lists" title="Driver List">
                        <i className="fa fa-circle-o" />
                        <span className="sidebarMenuSubText">Driver Master</span>
                      </a>
                    </li>
                  </ul>
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
                      <a href="/purposeOfTravel" title="Purpose of Travel">
                        <i className="fa fa-circle-o" /> 
                        <span className="sidebarMenuSubText">Purpose of Travel </span>
                      </a>
                    </li>
                     
                     <li>
                      <a href="/documententitymaster" title="Documents Entity">
                        <i className="fa fa-circle-o" /> 
                        <span className="sidebarMenuSubText">Documents Entity </span>
                      </a>
                    </li>
                    
                     <li>
                      <a href="/documentlistmaster" title="Documents Required For">
                        <i className="fa fa-circle-o" /> 
                        <span className="sidebarMenuSubText">Documents List Master </span>
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
                      <a href="/package-type" title="Package Type">
                        <i className="fa fa-circle-o" /> 
                        <span className="sidebarMenuSubText">Package Type</span>
                      </a>
                    </li>
                    <li className=" ">
                      <a href="/package-master" title="Package Master">
                        <i className="fa fa-circle-o" />
                        <span className="iconTitle">Package Master</span>
                      </a>
                    </li> 
                    <li>
                      <a href="/designation-mapping" title="Designation Mapping">
                        <i className="fa fa-circle-o" /> 
                        <span className="sidebarMenuSubText">Designation Mapping</span>
                      </a>
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
                  <a href="#BulkUpload" data-toggle="collapse" className="menuContent"  aria-expanded="false" title="Bulk Upload">
                    <i className="fa fa-upload" />
                     <span className="iconTitle">Bulk Upload</span>
                    <i className="leftarrow rotate fa fa-angle-left  pull-right" id="Entitys1"></i>
                  </a>
                  <ul className="collapse list-unstyled activeClass" id="BulkUpload">
                   <li>
                      <a href="/Departments" title="Map Corporate and Vendor">
                        <i className="fa fa-circle-o" />
                        <span className="sidebarMenuSubText">Department</span>
                      </a>
                     </li>
                    <li>
                      <a href="/Designations" title="Map Corporate and Vendor">
                        <i className="fa fa-circle-o" />
                        <span className="sidebarMenuSubText">Designations</span>
                      </a>
                    </li>
                    <li>
                      <a href="/vehiclebrand" title="Map Corporate and Vendor">
                        <i className="fa fa-circle-o" />
                        <span className="sidebarMenuSubText">Vehicle Brand</span>
                      </a>
                    </li>
                    <li>
                      <a href="/vehiclemodel" title="Map Corporate and Vendor">
                        <i className="fa fa-circle-o" />
                        <span className="sidebarMenuSubText">Vehicle Model</span>
                      </a>
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
