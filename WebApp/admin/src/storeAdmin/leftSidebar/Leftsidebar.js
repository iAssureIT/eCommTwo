import React,{Component}                              from 'react';
import { render }                                     from 'react-dom';
import $                                              from "jquery";
import { BrowserRouter, Route, Switch,Link  } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css'; 
import './Leftsidebar.css';
import './dashboard.css';


export default class AdminDashboard extends Component{

  constructor(props){
    super(props);
    this.state = {
      menuValues : {
        vendorData             : false,
        supplierData           : false,
        corporateData          : false,
        contractmanagement     : false,
        masterData             : false
      }
    };
    this.closeIcon   = 'fa-angle-left';
    this.openIcon    = 'fa-angle-down';
    this.activeMenu = this.activeMenu.bind(this)
  }

  componentDidMount(){
    var preferencedata = (localStorage.getItem('preferencedata'));
      const websiteModel = localStorage.getItem("websiteModel");      
      const showLoginAs = localStorage.getItem("showLoginAs");      
    //console.log("preferencedata==>",preferencedata)
    //console.log("websiteModel==>",websiteModel)
    //console.log("showLoginAs==>",showLoginAs)
    this.setState({
      websiteModel: websiteModel
    },()=>{
      //console.log("websiteModel==>",this.state.websiteModel)
    })
    if (!$('body').hasClass('adminLte')) {
      var adminLte = document.createElement("script");
      adminLte.type="text/javascript";
      adminLte.src = "/js/adminLte.js";
      $("body").append(adminLte);
    }
      $("html,body").scrollTop(0);
      var getCurrentUrl = window.location.pathname;
      // console.log("getCurrentUrl",getCurrentUrl);

    $(".sidebar-menu .singleTreeview a").filter(function(a, b){
      if($(this).attr('href') === getCurrentUrl){
        // console.log("b",b);
        // console.log($(this).attr('href') === getCurrentUrl);
        $(b).addClass('active');
        // console.log(b);
      }
    })
     $(".sidebar-menu .treeview li a").filter(function(a, b){
      if($(this).attr('href') === getCurrentUrl){
        $(b).addClass('active');
        $($($(b).parent()).parent()).parent().addClass('menu-open');
        ($($(b).parent()).parent()).css("display", "block");
        // $($($($($($($(b).parent()).parent()).children('menu-open')).children("pull-right-container")).children("i"))).addClass("fa-angle-down");
      }
    })
  }
   
  componentWillUnmount(){
    
      $("script[src='/js/adminLte.js']").remove();
      $("link[href='/css/dashboard.css']").remove();
  }

  activeMenu(event){
    // console.log('event.currentTarget',event.currentTarget);
    event.preventDefault();
    var a =event.currentTarget
    var pathname = event.currentTarget.getAttribute("data-id"); 
    // console.log('pathname',pathname);
    window.location = pathname
    $(".sidebar-menu .treeview-menu li a").removeClass("active-submenu");
    $(event.currentTarget).addClass("active-submenu");
    // event.currentTarget.href = pathname;
    // var currentEvent =  event.currentTarget
    // var getCurrentUrl = window.location.pathname;
    // localStorage.setItem("getCurrentUrl", pathname);
    // localStorage.setItem("currentEvent",currentEvent);
    // console.log("getCurrentUrl",getCurrentUrl);
    // console.log("currentURL",localStorage.getItem("currentURL"));
  }

  openMenu = (key) => {
    let {menuValues} = this.state;
    Object.keys(menuValues).map((data) => {
      menuValues[data] = (data==key) ? !menuValues[key] :false;
    });
    this.setState({menuValues});
    $('.singleTreeview').removeClass('active')
  }

  eventclk1(event){
    $(event.currentTarget).children(".menuContent").children(".rotate").toggleClass("down");
    var currentEvent =  event.currentTarget
    var getCurrentUrl = window.location.pathname;
    // console.log("getCurrentUrl",getCurrentUrl);
    localStorage.setItem("currentURL",getCurrentUrl)
    localStorage.setItem("currentEvent",currentEvent)
    /*
    var x = document.getElementById(targetId);
    var targetId = $(event.currentTarget).children('.activeClass').attr("id");
    var getValue = x.getAttribute('aria-expanded');
    $('.activeClass').removeClass('in');
    $(event.currentTarget).children('.activeClass').addClass('in')
    */
  } 

  clickDashboard(event){
    $('.treeview').not(event.currentTarget).removeClass('menu-open')
    $('.treeview-menu').css({'display':'none'})
    $(event.currentTarget).addClass('active')
  }

  render(){
    let {dashboard,vendorData,supplierData,corporateData,contractmanagement,masterData} = this.state.menuValues;

    return(
      <aside className="main-sidebar control-sidebar sidebarWrapper scrollBox">
        <section className="sidebar noPadLR sidebar-menu-wrapper">
          <ul className="sidebar-menu" data-widget="tree">

            <li className="singleTreeview" onClick={this.clickDashboard.bind(this)}>
              <a href="/dashboard"  title="Dashboard" onClick={()=>this.openMenu("dashboard")}>
                <i className="fa fa-dashboard" aria-hidden="true"></i>
                <span className="sidebarMenuTitle">Dashboard</span>
              </a>
            </li>

            <li className="treeview" >
              <a href="JavaScript:void(0);" onClick={()=>this.openMenu("contractmanagement")} title="Contract Management">
                <i className="fa fa-file" aria-hidden="true"></i>
                <span className="smsidenames sidebarMenuTitle">Product Management</span>
                <span className="pull-right-container">
                  <i className={"fa pull-right menu-icon-toggle "+(contractmanagement?this.openIcon:this.closeIcon)} />
                </span>
              </a>
              <ul className="treeview-menu" >                    
                <li className="noPadLR"> 
                  <a href="/add-product" data-id="/add-product" onClick={this.activeMenu.bind(this)} title="Add New Product">
                    <i className="fa fa-circle-o dashr" />Add New Product
                  </a> 
                </li>  
                <li className="noPadLR"> 
                  <a href="/product-list" data-id="/product-list" title="Product List" onClick={this.activeMenu.bind(this)}>
                    <i className="fa fa-circle-o dashr" />Product List
                  </a> 
                </li>  
                <li className="noPadLR"> 
                  <a href="/product-upload" data-id="/product-upload" title="Product Bulk Upload" onClick={this.activeMenu.bind(this)}>
                    <i className="fa fa-circle-o dashr" />Bulk Insert
                  </a> 
                </li>  
                <li className="noPadLR"> 
                  <a href="/update_product-upload" data-id="/update_product-upload" title="Update Product Bulk Upload" onClick={this.activeMenu.bind(this)}>
                    <i className="fa fa-circle-o dashr" />Bulk Update
                  </a> 
                </li>  
                <li className="noPadLR"> 
                  <a href="/product-image-bulk-upload" data-id="/product-image-bulk-upload" title="Product Bulk Upload" onClick={this.activeMenu.bind(this)}>
                    <i className="fa fa-circle-o dashr" />Image Bulk Insert
                  </a> 
                </li>  
                <li className="noPadLR"> 
                  <a href="/file-wise-product-list" data-id="/file-wise-product-list" title="Product Bulk Upload" onClick={this.activeMenu.bind(this)}>
                    <i className="fa fa-circle-o dashr" />File Wise Product List
                  </a> 
                </li>  
              
              </ul>
            </li>




            <li className="treeview" >
              <a href="JavaScript:void(0);" onClick={()=>this.openMenu("contractmanagement")} title="Contract Management">
                <i className="fa fa-file" aria-hidden="true"></i>
                <span className="smsidenames sidebarMenuTitle">Order Management</span>
                <span className="pull-right-container">
                  <i className={"fa pull-right menu-icon-toggle "+(contractmanagement?this.openIcon:this.closeIcon)} />
                </span>
              </a>
              <ul className="treeview-menu" >                    
                <li className="noPadLR"> 
                  <a href="/allorders" data-id="/allorders" onClick={this.activeMenu.bind(this)} title="All Orders">
                    <i className="fa fa-circle-o dashr" />All Orders
                  </a> 
                </li>  
                <li className="noPadLR"> 
                  <a href="/new-orders-list" data-id="/new-orders-list" title="New Order List" onClick={this.activeMenu.bind(this)}>
                    <i className="fa fa-circle-o dashr" />New Order List
                  </a> 
                </li>  
                <li className="noPadLR"> 
                  <a href="/verified-orders-list" data-id="/verified-orders-list" title="Verified Order List" onClick={this.activeMenu.bind(this)}>
                    <i className="fa fa-circle-o dashr" />Verified Order List
                  </a> 
                </li>  
                <li className="noPadLR"> 
                  <a href="/packed-orders-list" data-id="/packed-orders-list" title="Packed Order List" onClick={this.activeMenu.bind(this)}>
                    <i className="fa fa-circle-o dashr" />Packed Order List
                  </a> 
                </li>  
                <li className="noPadLR"> 
                  <a href="/inspected-orders-list" data-id="/inspected-orders-list" title="Inspected Order List" onClick={this.activeMenu.bind(this)}>
                    <i className="fa fa-circle-o dashr" />Inspected Order List
                  </a> 
                </li>  
                <li className="noPadLR"> 
                  <a href="/approved-orders-list" data-id="/approved-orders-list" title="Approved Order List" onClick={this.activeMenu.bind(this)}>
                    <i className="fa fa-circle-o dashr" />Approved Order List
                  </a> 
                </li>  

                <li className="noPadLR"> 
                  <a href="/dispatched-orders-list" data-id="/dispatched-orders-list" title="Dispatched Order List" onClick={this.activeMenu.bind(this)}>
                    <i className="fa fa-circle-o dashr" />Dispatched Order List
                  </a> 
                </li>  

                <li className="noPadLR"> 
                  <a href="/delivery-initiated-orders" data-id="/delivery-initiated-orders" title="Delivered Initiated Order List" onClick={this.activeMenu.bind(this)}>
                    <i className="fa fa-circle-o dashr" />Delivered Initiated Orders
                  </a> 
                </li>  

                <li className="noPadLR"> 
                  <a href="/delivered-orders-list" data-id="/delivered-orders-list" title="Delivered Order List" onClick={this.activeMenu.bind(this)}>
                    <i className="fa fa-circle-o dashr" />Delivered Order List
                  </a> 
                </li>  

              </ul>
            </li>




            <li className="treeview" >
              <a href="JavaScript:void(0);" onClick={()=>this.openMenu("corporateData")} title="Corporate Master">
                <i className="fa fa-users" aria-hidden="true"></i>
                <span className="smsidenames sidebarMenuTitle">Inventory Management </span>
                <span className="pull-right-container">
                  <i className={"fa pull-right menu-icon-toggle "+(corporateData?this.openIcon:this.closeIcon)} />
                </span>
              </a>
              <ul className="treeview-menu" >                    
                <li className="noPadLR"> 
                  <a href="/purchase-management" data-id="/purchase-management" title="Raw Material Inward" onClick={this.activeMenu.bind(this)}>
                    <i className="fa fa-circle-o dashr" />Raw Material
                  </a> 
                </li>  
                <li className="noPadLR"> 
                  <a href="/finished-goods" data-id="/finished-goods" title="Finished Goods Inward" onClick={this.activeMenu.bind(this)}>
                    <i className="fa fa-circle-o dashr" />Finished Goods
                  </a> 
                </li>  
                <li className="noPadLR"> 
                  <a href="/franchise-shopping-list" data-id="/franchise-shopping-list" title="Franchise Purchase Order" onClick={this.activeMenu.bind(this)}>
                    <i className="fa fa-circle-o dashr" />Franchise Purchase Order
                  </a> 
                </li>  
                <li className="noPadLR"> 
                  <a href="/admin-shopping-list" data-id="/admin-shopping-list" title="Consolidate Purchase Orders" onClick={this.activeMenu.bind(this)}>
                    <i className="fa fa-circle-o dashr" />Consolidate Purchase Orders
                  </a> 
                </li>  
                <li className="noPadLR"> 
                  <a href="/franchise-order-summary" data-id="/franchise-order-summary" title="Franchise Order Summary" onClick={this.activeMenu.bind(this)}>
                    <i className="fa fa-circle-o dashr" />Franchise Order Summary
                  </a> 
                </li>  
                <li className="noPadLR">
                  <a href="/franchise-product-stock" data-id="/franchise-product-stock" title="Franchise Order Summary" onClick={this.activeMenu.bind(this)}>
                    <i className="fa fa-circle-o dashr" aria-hidden="true"></i>
                    <span className="sidebarMenuTitle">Franchise Product Stock</span>
                  </a>
                </li>
                <li className="noPadLR"> 
                  <a href="/franchise-allowable-pincode" data-id="/franchise-allowable-pincode" title="Finished Goods Inward" onClick={this.activeMenu.bind(this)}>
                    <i className="fa fa-circle-o dashr" />Allowable Pincode
                  </a> 
                </li>  
              </ul>
            </li>
            <li className="treeview" >
              <a href="JavaScript:void(0);" onClick={()=>this.openMenu("vendorData")} title="Vendor Master">
                <i className="fa fa-book" aria-hidden="true"></i>
                <span className="smsidenames sidebarMenuTitle">Reports</span>
                <span className="pull-right-container">
                  <i className={"fa pull-right menu-icon-toggle "+(vendorData?this.openIcon:this.closeIcon)} />
                </span>
              </a>
              <ul className="treeview-menu" >                    
                <li className="noPadLR"> 
                  <a href="/report" data-id="/report" title="Sales Report" onClick={this.activeMenu.bind(this)}>
                    <i className="fa fa-circle-o dashr" />Sales Report
                  </a> 
                </li>  
                <li className="noPadLR"> 
                  <a href="/raw-material-stock-report" data-id="/raw-material-stock-report" title="Raw Material Stock Report" onClick={this.activeMenu.bind(this)}>
                    <i className="fa fa-circle-o dashr" />Raw Material Stock Report
                  </a> 
                </li>  
                {/* <li className="noPadLR" > 
                  <a href="/ba-list" data-id="/ba-list" title="Category Wise Sales Report" onClick={this.activeMenu.bind(this)}>
                    <i className="fa fa-circle-o dashr" />Category Wise Sales Report
                  </a> 
                </li>     */}
              </ul>
            </li>


          {
            this.state.websiteModel === "MarketPlace" ?
              <li className="treeview" >
                <a href="JavaScript:void(0);" onClick={()=>this.openMenu("vendorData")} title="Vendor Master">
                  <i className="fa fa-book" aria-hidden="true"></i>
                  <span className="smsidenames sidebarMenuTitle">Business Associates</span>
                  <span className="pull-right-container">
                    <i className={"fa pull-right menu-icon-toggle "+(vendorData?this.openIcon:this.closeIcon)} />
                  </span>
                </a>
                <ul className="treeview-menu" >                    
                  <li className="noPadLR"> 
                    <a href="/addNewBA" data-id="/addNewBA" title="Add Business Associate" onClick={this.activeMenu.bind(this)}>
                      <i className="fa fa-circle-o dashr" />Add Business Associate
                    </a> 
                  </li>  
                  <li className="noPadLR"> 
                    <a href="/ba-list" data-id="/ba-list" title="Business Associates List" onClick={this.activeMenu.bind(this)}>
                      <i className="fa fa-circle-o dashr" />Business Associates List
                    </a> 
                  </li>    
                </ul>
              </li>
            :
            null
          }
          {
            this.state.websiteModel === "MarketPlace" ?
              <li className="singleTreeview" onClick={this.clickDashboard.bind(this)}>
                <a href="/vendor/list" title="Vendor Master" onClick={()=>this.openMenu("dashboard")}>
                  <i className="fa fa-money" aria-hidden="true"></i>
                  <span className="sidebarMenuTitle">Vendor Master</span>
                </a>
              </li>
            :
            null
          }

            <li className="singleTreeview" onClick={this.clickDashboard.bind(this)}>
              <a href="/project-master-data" title="Master Data" onClick={()=>this.openMenu("dashboard")}>
                <i className="fa fa-th-large" aria-hidden="true"></i>
                <span className="sidebarMenuTitle">Master Data</span>
              </a>
            </li>
         

            <li className="singleTreeview" onClick={this.clickDashboard.bind(this)}>
              <a href="/franchise/list" title="Franchise Master" onClick={()=>this.openMenu("dashboard")}>
                <i className="fa fa-money" aria-hidden="true"></i>
                <span className="sidebarMenuTitle">Franchise Master</span>
              </a>
            </li>
            <li className="singleTreeview" onClick={this.clickDashboard.bind(this)}>
              <a href="/discount-management" title="Discount Management" onClick={()=>this.openMenu("dashboard")}>
                <i className="fa fa-th-large" aria-hidden="true"></i>
                <span className="sidebarMenuTitle">Discount Management</span>
              </a>
            </li>


            <li className="singleTreeview" onClick={this.clickDashboard.bind(this)}>
              <a href="/cms/dashboard" title="cms" onClick={()=>this.openMenu("dashboard")}>
                <i className="fa fa-object-group" aria-hidden="true"></i>
                <span className="sidebarMenuTitle">CMS</span>
              </a>
            </li>
            
          </ul>
        </section>
      </aside>
    );
  }
}
