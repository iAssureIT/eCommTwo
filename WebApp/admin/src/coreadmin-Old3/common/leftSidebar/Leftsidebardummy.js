import React,{Component}                              from 'react';
import { render }                                     from 'react-dom';
import $                                              from "jquery";
import { BrowserRouter, Route, Switch,Link,location } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css'; 
import './Leftsidebar.css';

export default class Leftsidebar extends Component{

  constructor(props){
    super(props);
    this.state = {
      menuValues : {
        notificationManagement : false,
        RFSReports         : false,
        PRReports          : false,
        userManagement     : false,
        masterData         : false,
        RFSManagement      : false,
        PRManagement       : false,
        KnowledgeCenter    : false,
        supplierManagement : false,
        companySettings    : false
      }
    };
    this.closeIcon   = 'fa-angle-right';
    this.openIcon    = 'fa-angle-down';
  }

  componentDidMount(){
    if (!$('body').hasClass('adminLte')) {
      var adminLte = document.createElement("script");
      adminLte.type="text/javascript";
      adminLte.src = "/js/adminLte.js";
      $("body").append(adminLte);
    }
      $("html,body").scrollTop(0);
  }
   
  componentWillUnmount(){
      $("script[src='/js/adminLte.js']").remove();
      $("link[href='/css/dashboard.css']").remove();
  }

  activeMenu(event){
    event.preventDefault();
    $(".sidebar-menu .treeview-menu a").removeClass("active-submenu");
    $(event.currentTarget).addClass("active-submenu");
  }

  openMenu = (key) => {
    let {menuValues} = this.state;
    Object.keys(menuValues).map((data) => {
      menuValues[data] = (data==key) ? !menuValues[key] :false;
    });
    this.setState({menuValues});
    $('.singleTreeview').removeClass('active')
  }

  clickDashboard(event){
    $('.treeview').not(event.currentTarget).removeClass('menu-open')
    $('.treeview-menu').css({'display':'none'})
    $(event.currentTarget).addClass('active')
  }

  render(){
    let {dashboard,notificationManagement,RFSReports,PRReports,supplierManagement,userManagement,masterData,RFSManagement,PRManagement,companySettings,KnowledgeCenter} = this.state.menuValues;

    return(
         <aside className="main-sidebar control-sidebar sidebarWrapper">
        <section className="sidebar noPadLR sidebar-menu-wrapper">
          <ul className="sidebar-menu" data-widget="tree">
            {/*<li className="header">MAIN NAVIGATION</li>*/}
                <li className="singleTreeview" onClick={this.clickDashboard.bind(this)}>
                  <a href="/admindashboard" onClick={()=>this.openMenu("dashboard")}>
                    <i className="fa fa-th-large" aria-hidden="true"></i>
                    <span className="sidebarMenuTitle">Admin Dashboard</span>
                  </a>
                </li>
                <li className="treeview">
                  <a href="JavaScript:void(0);" onClick={()=>this.openMenu("masterData")}>
                    <i className="fa fa-database" aria-hidden="true"></i>
                    <span className="smsidenames sidebarMenuTitle">Master Data</span>
                    <span className="pull-right-container">
                      <i className={"fa pull-right menu-icon-toggle "+(masterData?this.openIcon:this.closeIcon)} />
                    </span>
                  </a>
                  <ul className="treeview-menu" >                    
                    <li className="noPadLR"> 
                      <a href="/ManageLocations" onClick={this.activeMenu.bind(this)}>
                        <i className="fa fa-circle-o dashr" />Manage Locations
                      </a> 
                      <a href="/masterData/Department Name" onClick={this.activeMenu.bind(this)}>
                        <i className="fa fa-circle-o dashr" />Department Name Master
                      </a> 
                      <a href="/masterData/Document Type" onClick={this.activeMenu.bind(this)}>
                        <i className="fa fa-circle-o dashr" />Document Type Group
                      </a> 
                      <a href="/admin/documentNameMaster" onClick={this.activeMenu.bind(this)}>
                       <i className="fa fa-circle-o dashr" />Document Name Master
                      </a> 
                      <a href="/admin/budgetMaster" onClick={this.activeMenu.bind(this)}>
                      <i className="fa fa-circle-o dashr" />Budget Master
                      </a> 
                       <a href="/admin/currencyRates" onClick={this.activeMenu.bind(this)}>
                      <i className="fa fa-circle-o dashr" />Currency Master
                      </a> 
                      <a href="/admin/ExchangeRate" onClick={this.activeMenu.bind(this)}>
                      <i className="fa fa-circle-o dashr" />Monthly Exchange Rate
                      </a> 
                      <a href="/masterData/Cost Center" onClick={this.activeMenu.bind(this)}>
                      <i className="fa fa-circle-o dashr" />Cost Center Group
                      </a> 
                      <a href="/Cost Center Master" onClick={this.activeMenu.bind(this)}>
                      <i className="fa fa-circle-o dashr" />Cost Center Master
                      </a> 
                      <a href="/masterData/Designation" onClick={this.activeMenu.bind(this)}>
                      <i className="fa fa-circle-o dashr" />Designation Master
                      </a>
                      <a href="/masterData/Material Category" onClick={this.activeMenu.bind(this)}>
                      <i className="fa fa-circle-o dashr" />Material Category Master
                      </a>   
                      <a href="/masterData/Supplier Category" onClick={this.activeMenu.bind(this)}>
                      <i className="fa fa-circle-o dashr" />Supplier Category Master
                      </a> 
                      <a href="/masterData/Supplier Location Type" onClick={this.activeMenu.bind(this)}>
                      <i className="fa fa-circle-o dashr" />Supplier Location Type Master
                      </a> 
                      <a href="/masterData/Incoterms" onClick={this.activeMenu.bind(this)}>
                      <i className="fa fa-circle-o dashr" />Supplier Incoterms
                      </a> 
                      <a href="/masterData/PR Type" onClick={this.activeMenu.bind(this)}>
                      <i className="fa fa-circle-o dashr" />PR Type Master
                      </a> 
                      <a href="/masterData/Unit" onClick={this.activeMenu.bind(this)}>
                      <i className="fa fa-circle-o dashr" />Unit Master
                      </a>                 
                    </li>  
                  </ul>
                </li>
              <li className="treeview" data-name="KnowledgeCenter">
                  <a href="JavaScript:void(0);" onClick={()=>this.openMenu("KnowledgeCenter")}>
                    <i className="fa fa-info" aria-hidden="true"></i>
                    <span className="smsidenames sidebarMenuTitle">Knowledge Center</span>
                    <span className="pull-right-container">
                      <i className={"fa pull-right menu-icon-toggle "+(KnowledgeCenter?this.openIcon:this.closeIcon)} />
                    </span>
                  </a>
                  <ul className="treeview-menu">
                    <li className="noPadLR">
                      <a href="/ListOfDocuments" onClick={this.activeMenu.bind(this)}>
                       <i className="fa fa-circle-o dashr" />View Documents
                      </a> 
                    </li>
                                   
                </ul>
              </li>
              <li className="treeview" data-name="supplierManagement">
                  <a href="JavaScript:void(0);" onClick={()=>this.openMenu("supplierManagement")}>
                    <i className="fa fa-industry" aria-hidden="true"></i>
                    <span className="smsidenames sidebarMenuTitle">Supplier Management</span>
                    <span className="pull-right-container">
                      <i className={"fa pull-right menu-icon-toggle "+(supplierManagement?this.openIcon:this.closeIcon)} />
                    </span>
                  </a>
                  <ul className="treeview-menu">
                    <li className="noPadLR">
                      <a href="/SupplierOnboardingForm" onClick={this.activeMenu.bind(this)}>
                       <i className="fa fa-circle-o dashr" />Supplier Onboarding Form
                      </a> 
                      <a href="/ListOfSupplier" onClick={this.activeMenu.bind(this)}>
                       <i className="fa fa-circle-o dashr" />List of Suppliers
                      </a> 
                    </li>
                                   
                </ul>
              </li>
              <li className="treeview" data-name="RFSManagement">
                  <a href="JavaScript:void(0);" onClick={()=>this.openMenu("RFSManagement")}>
                    <i className="fa fa-cubes" aria-hidden="true"></i>
                    <span className="smsidenames sidebarMenuTitle">RFS Management</span>
                    <span className="pull-right-container">
                      <i className={"fa pull-right menu-icon-toggle "+(RFSManagement?this.openIcon:this.closeIcon)} />
                    </span>
                  </a>
                  <ul className="treeview-menu">
                    <li className="noPadLR">
                      <a href="/CreateRequestSourcing" onClick={this.activeMenu.bind(this)}>
                       <i className="fa fa-circle-o dashr" />RFS Entry
                      </a> 
                      <a href="/showAllRFSLists" onClick={this.activeMenu.bind(this)}>
                       <i className="fa fa-circle-o dashr" />My RFS List
                      </a>
                      <a href="/allRFS" onClick={this.activeMenu.bind(this)}>
                       <i className="fa fa-circle-o dashr" />All RFS List
                      </a>
                      <a href="/adminHoldRFS" onClick={this.activeMenu.bind(this)}>
                       <i className="fa fa-circle-o dashr" />On Hold RFS
                      </a>
                      <a href="/allAllocationRFSLists" onClick={this.activeMenu.bind(this)}>
                       <i className="fa fa-circle-o dashr" />Allocate RFS
                      </a>
                      <a href="/AdminShowAllocatedRFS" onClick={this.activeMenu.bind(this)}>
                       <i className="fa fa-circle-o dashr" />Allocated RFS
                      </a> 
                      <a href="/AdminViewAllQC" onClick={this.activeMenu.bind(this)}>
                       <i className="fa fa-circle-o dashr" />Allocate QR
                      </a>
                      <a href="/AdminQCAllocationViewList" onClick={this.activeMenu.bind(this)}>
                       <i className="fa fa-circle-o dashr" />Allocated QR
                      </a>
                      <a href="/AllRFSForShortlisting" onClick={this.activeMenu.bind(this)}>
                       <i className="fa fa-circle-o dashr" />Shortlist RFS
                      </a> 
                      <a href="/AdminViewAllPORFS" onClick={this.activeMenu.bind(this)}>
                       <i className="fa fa-circle-o dashr" />Raise PO
                      </a>
                      <a href="/AdminViewPORaisedRFS" onClick={this.activeMenu.bind(this)}>
                       <i className="fa fa-circle-o dashr" />Add Material Delivery
                      </a>
                      <a href="/AdminAllMaterialDeliveryQCList" onClick={this.activeMenu.bind(this)}>
                       <i className="fa fa-circle-o dashr" />Material QR
                      </a>
                      <a href="/AdminApproveIndentorList" onClick={this.activeMenu.bind(this)}>
                       <i className="fa fa-circle-o dashr" />Approve RFS
                      </a> 
                    </li>
                                   
                </ul>
              </li>
              <li className="treeview" data-name="PRManagement">
                  <a href="JavaScript:void(0);" onClick={()=>this.openMenu("PRManagement")}>
                    <i className="fa fa-cubes" aria-hidden="true"></i>
                    <span className="smsidenames sidebarMenuTitle">PR Management</span>
                    <span className="pull-right-container">
                      <i className={"fa pull-right menu-icon-toggle "+(PRManagement?this.openIcon:this.closeIcon)} />
                    </span>
                  </a>
                  <ul className="treeview-menu">
                    <li className="noPadLR">
                      <a href="/CreatePR" onClick={this.activeMenu.bind(this)}>
                       <i className="fa fa-circle-o dashr" />PR Entry
                      </a> 
                      <a href="/allPRLists" onClick={this.activeMenu.bind(this)}>
                       <i className="fa fa-circle-o dashr" />My PR List
                      </a>
                      <a href="/allPR" onClick={this.activeMenu.bind(this)}>
                       <i className="fa fa-circle-o dashr" />All PR List
                      </a>
                      <a href="/adminHoldPR" onClick={this.activeMenu.bind(this)}>
                       <i className="fa fa-circle-o dashr" />On Hold PR
                      </a>
                      <a href="/allAllocationPRLists" onClick={this.activeMenu.bind(this)}>
                       <i className="fa fa-circle-o dashr" />Allocate PR
                      </a>
                      <a href="/AdminShowAllocatedPR" onClick={this.activeMenu.bind(this)}>
                       <i className="fa fa-circle-o dashr" />Allocated PR
                      </a> 
                      <a href="/AdminViewAllPOPR" onClick={this.activeMenu.bind(this)}>
                       <i className="fa fa-circle-o dashr" />Shortlist PR
                      </a> 
                      <a href="/AdminViewPORaisedPR" onClick={this.activeMenu.bind(this)}>
                       <i className="fa fa-circle-o dashr" />Add Material Delivery
                      </a>
                      <a href="/AdminAllPRMaterialDeliveryQCList" onClick={this.activeMenu.bind(this)}>
                       <i className="fa fa-circle-o dashr" />Material QR
                      </a> 
                      <a href="/AdminPRApproveIndentorList" onClick={this.activeMenu.bind(this)}>
                       <i className="fa fa-circle-o dashr" />Approve PR
                      </a> 
                    </li>
                                   
                </ul>
              </li>
              <li className="treeview" data-name="RFSReports">
                  <a href="JavaScript:void(0);" onClick={()=>this.openMenu("RFSReports")}>
                    <i className="fa fa-file" aria-hidden="true"></i>
                    <span className="smsidenames sidebarMenuTitle">RFS Reports</span>
                    <span className="pull-right-container">
                      <i className={"fa pull-right menu-icon-toggle "+(RFSReports?this.openIcon:this.closeIcon)} />
                    </span>
                  </a>
                  <ul className="treeview-menu">
                    <li className="noPadLR">
                      <a href="/StatuswiseRFSList" onClick={this.activeMenu.bind(this)}>
                       <i className="fa fa-circle-o dashr" />Statuswise RFS List
                      </a> 
                     
                      <a href="/BuyerwiseRFSList" onClick={this.activeMenu.bind(this)}>
                        <i className="fa fa-circle-o dashr" />Buyerwise RFS List
                      </a>
                      <a href="/Datewisereport" onClick={this.activeMenu.bind(this)}>
                        <i className="fa fa-circle-o dashr" />Periodwise Reports
                      </a>
                    
                      <a href="/CostCenterwiseRFSList" onClick={this.activeMenu.bind(this)}>
                        <i className="fa fa-circle-o dashr" />Cost Center wise RFS List
                      </a>
                    </li>
                                   
                </ul>
              </li>
              <li className="treeview" data-name="PRReports">
                  <a href="JavaScript:void(0);" onClick={()=>this.openMenu("PRReports")}>
                    <i className="fa fa-file" aria-hidden="true"></i>
                    <span className="smsidenames sidebarMenuTitle">PR Reports</span>
                    <span className="pull-right-container">
                      <i className={"fa pull-right menu-icon-toggle "+(PRReports?this.openIcon:this.closeIcon)} />
                    </span>
                  </a>
                  <ul className="treeview-menu">
                    <li className="noPadLR">
                      <a href="/BuyerwisePRList" onClick={this.activeMenu.bind(this)}>
                       <i className="fa fa-circle-o dashr" />Buyerwise PR List
                      </a> 
                     
                      <a href="/DatewisereportPR" onClick={this.activeMenu.bind(this)}>
                        <i className="fa fa-circle-o dashr" />Periodwise Reports
                      </a>
                      <a href="/DepartmentWise" onClick={this.activeMenu.bind(this)}>
                        <i className="fa fa-circle-o dashr" />Department wise PR List
                      </a>
                      <a href="/QuotationSummary" onClick={this.activeMenu.bind(this)}>
                        <i className="fa fa-circle-o dashr" />Quotation Summary
                      </a>
                      <a href="/MaterialCategoryWise" onClick={this.activeMenu.bind(this)}>
                        <i className="fa fa-circle-o dashr" />Material Category wise PR List
                      </a>
                      <a href="/CostCenterSubGroupWise" onClick={this.activeMenu.bind(this)}>
                        <i className="fa fa-circle-o dashr" />Cost Center Subgroup wise PR List
                      </a>
                      <a href="/PRStatusWise" onClick={this.activeMenu.bind(this)}>
                        <i className="fa fa-circle-o dashr" />PR Status wise List
                      </a>
                      <a href="/PerformancePAWise" onClick={this.activeMenu.bind(this)}>
                        <i className="fa fa-circle-o dashr" />Performance - Promise/Actual List
                      </a>
                      <a href="/PerformanceLTWise" onClick={this.activeMenu.bind(this)}>
                        <i className="fa fa-circle-o dashr" />Performance - Lead Time List
                      </a>
                      <a href="/PerformanceSEWise" onClick={this.activeMenu.bind(this)}>
                        <i className="fa fa-circle-o dashr" />Performance - Shortage/Excess List
                      </a>
                      {/*<a href="/PRStatusReport" onClick={this.activeMenu.bind(this)}>
                        <i className="fa fa-circle-o dashr" />PR Status Report
                      </a>*/}
                    </li>
                                   
                </ul>
              </li>

               <li className="singleTreeview" onClick={this.clickDashboard.bind(this)}>
                  <a href="/UMListOfUsers" onClick={()=>this.openMenu("userManagement")}>
                    <i className="fa fa-users" aria-hidden="true"></i>
                    <span className="sidebarMenuTitle">User Management</span>
                  </a>
              </li>
              <li className="treeview" data-name="notificationManagement">
                  <a href="JavaScript:void(0);" onClick={()=>this.openMenu("notificationManagement")}>
                    <i className="fa fa-bell" aria-hidden="true"></i>
                    <span className="smsidenames sidebarMenuTitle">Notification Management</span>
                    <span className="pull-right-container">
                      <i className={"fa pull-right menu-icon-toggle "+(notificationManagement?this.openIcon:this.closeIcon)} />
                    </span>
                  </a>
                  <ul className="treeview-menu">
                    <li className="noPadLR">
                      <a href="/admin/viewAllTemplates" onClick={this.activeMenu.bind(this)}>
                       <i className="fa fa-circle-o dashr" />View All Templates
                      </a> 
                    </li>
                </ul>
              </li>
              <li className="singleTreeview" onClick={this.clickDashboard.bind(this)}>
                  <a href="/companyinfo" onClick={()=>this.openMenu("companySettings")}>
                    <i className="fa fa-gear" aria-hidden="true"></i>
                    <span className="sidebarMenuTitle">Company Settings</span>
                  </a>
              </li>

          </ul>
        </section>
      </aside>
    );
  }
}
