import React, { Component } from 'react';
import { connect }        from 'react-redux';
import { withRouter }       from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';


//================== Dashboard ===================
import Dashboard        from '../../storeAdmin/dashboard/Dashboard.js'

//==============User Management ==================
import UMListOfUsers    from '../userManagement/UM/UMListOfUsers.js';
import EditUserProfile  from '../userManagement/UM/EditUserProfile.js';
import UserProfile      from '../userManagement/UM/UserProfile.js';
import UMRolesList      from '../userManagement/Roles/Roles.js';
// import OrganizationSetting from '../companysetting/Components/OrganizationSetting.js';
import ViewTemplates    from '../NotificationManagement/ViewTemplates.jsx';
import GlobalMasters from '../companysetting/Components/GlobalMasters.js';

// import CenterwiseBarChart from '../dashboard/chart1/CenterwiseBarChart1.js'
// import SourcewiseBarChart from '../dashboard/chart1/SourcewiseBarChart1.js'
// import Chart1 from '../dashboard/chart1/chart1.js'
// import Chart from '../dashboard/chart1/chart.js'
// import CenterwiseBudget from '../dashboard/chart1/CenterwiseBudget.js'
// import monthwiseCharts from '../dashboard/chart1/monthwiseCharts.js'

// import Header from '../common/header/Header.js'
// import Footer from '../common/footer/Footer.js'
// import Dashboard from '../dashboard/Dashboard.js'
// import ComingSoon from '../dashboard/ComingSoon.js'
// import DashboardNew from '../dashboard/DashboardNew.js'
// import Leftsidebar from '../common/leftSidebar/Leftsidebar.js';
// import UMListOfUsers from '../userManagement/UM/UMListOfUsers.js';

//============ Entity Master ======================
import BasicInfo from '../Master/EntityMaster/Onboarding/basicInfo/BasicInfo.jsx';
import LocationDetails from '../Master/EntityMaster/Onboarding/locationDetails/LocationDetails.jsx';
import ContactDetails from '../Master/EntityMaster/Onboarding/contactDetails/ContactDetails.jsx';
import ListOfEntities from '../Master/EntityMaster/listOfEntities/components/ListOfEntities.jsx';
import ListOfVehicles from '../Master/VehicleMaster/listOfVehicles/components/ListOfVehicles.jsx';
import Category from '../Master/Category/Category.jsx';
import VehicleCategory from '../Master/VehicleCategory/VehicleCategory.js';
import LocationType from '../Master/LocationType/LocationType.jsx';
import SelectVendor from '../Master/EntityMaster/SelectVendor/SelectVendor.js';

//============= Corporate Master ====================
import CorporateBasicInfo from '../Master/CorporateMaster/CorporateBasicInfo.js';
import CorporateLocationDetails from '../Master/CorporateMaster/CorporateLocationDetails.js';
import CorporateContactDetails from '../Master/CorporateMaster/CorporateContactDetails.js';
// import ListOfEntities from '../Master/EntityMaster/listOfEntities/components/ListOfEntities.jsx';

//============= Vendor Master ====================
import VendorBasicInfo from '../Master/VendorMaster/VendorBasicInfo.js';
import VendorLocationDetails from '../Master/VendorMaster/VendorLocationDetails.js';
import VendorContactDetails from '../Master/VendorMaster/VendorContactDetails.js';

//============= Supplier Master ====================
import SupplierBasicInfo from '../Master/SupplierMaster/SupplierBasicInfo.js';
import SupplierLocationDetails from '../Master/SupplierMaster/SupplierLocationDetails.js';
import SupplierContactDetails from '../Master/SupplierMaster/SupplierContactDetails.js';

// ============ Payment Process =======================
import OrderPage from "../PaymentProcess/OrderPage.js";
import PlanPage from "../PaymentProcess/PlanPage.js";
import InvoicePage from "../PaymentProcess/InvoicePage.js";
import InvoicePageView from "../PaymentProcess/InvoicePageView.js";
import PaymentResponse from "../PaymentProcess/PaymentResponse.js";

// ============ Rate Master ===========================
import PackageMaster from "../PackageMaster/PackageMaster.js";

// ============ Orgnizational Setting ===========================
import OrgnizationalBasicInfo from "../OrganizationalSettings/OrganizationalBasicInfo.js";
import OrganizationalContactDetails from "../OrganizationalSettings/OrganizationalContactDetails.js";
import OrganizationalLocationDetails from "../OrganizationalSettings/OrganizationalLocationDetails.js";

//=================== Tax Master =====================
import TaxName from '../../storeAdmin/TaxName/TaxName.js';
import TaxRate from '../../storeAdmin/TaxRate/TaxRate.js';
 
// ============= One Field Component ==================
// import FuleType from "../Master/FuleType/FuleType.js"
// import DriverMaster from "../Master/DriverMaster/DriverMaster.js"
// import EmployeeMaster from "../Master/EmployeeMaster/EmployeeMaster.js"
// import GuestMaster   from "../Master/GuestMaster/GuestMaster.js"
// import PersonMaster from "../Master/PersonMaster/PersonMaster.js"
// import PersonList from "../Master/PersonMaster/PersonList.js"
// import DepartmentBulkUpload from "../Master/Department/DepartmentBulkUpload.js"
// import DesignationBulkUpload from "../Master/Designation/DesignationBulkUpload.js"
// import DepartmentList    from "../Master/Department/DepartmentList.js"

// import filewisePersonList from "../Master/PersonMaster/FilewisePersonList.js"

// import DesignationMapping from "../Master/DesignationMapping/DesignationMapping.js"

// import Model from "../Master/Model/Model.js"
// import Brand from "../Master/Brand/Brand.js"
// import VehicleBrandBulkUpload from "../Master/Brand/VehicleBrandBulkUpload.js"
// import VehicleModelBulkUpload from "../Master/Model/VehicleModelBulkUpload.js"
// import Designation from "../Master/Designation/Designation.js"
// import Department from "../Master/Department/Department.js"
// import PackageType from "../Master/PackageType/PackageType.js"
// import Module from "../Master/Module/Module.js"
// import Facility from "../Master/Facility/Facility.js"
// import ExpenseTypeMaster from "../Master/ExpenseTypeMaster/ExpenseTypeMaster.js"



// // ============= Vehicle Master =======================
// import VehicleMaster from "../Master/VehicleMaster/VehicleMaster.js"

// // ============= Booking Master =======================
// import AllBookings from "../Master/BookingMaster/AllBookings.js"

// // ============= Billing Management =======================
// import BillingManagement from "../Master/BillingManagement/BillingManagement.js"
// import GenerateBill from "../Master/BillingManagement/GenerateBill.js"
// import BillingInvoice from "../Master/BillingManagement/BillingInvoice.js"
// import BillView from "../Master/BillingManagement/BillView.js"

// ========================== access-management ====================
import AccessManagement from "../AccessManagement/AccessManagement.js"

//=============== Not found ================
import Notfound from "../Notfound/Notfound.js"

//=============== Broadcast System ================
import BroadcastSystem from "../BroadcastSystem/BroadcastSystem.js";


class CoreLayout extends Component {
    render() {
        {console.log("userDetails in corporate layout==>",this.props.userDetails)}
        return (
            <Switch >
                {/* Dashboard route */}
                <Route path="/" component={Dashboard} exact />
                <Route path="/dashboard" component={Dashboard} exact />

                {/* Rightsidebar Routes */}
                <Route path="/umlistofusers" component={UMListOfUsers} exact />
                <Route path="/umroleslist" component={UMRolesList} exact />
                <Route path="/umroleslist/:fieldID" exact strict component={UMRolesList} />
                <Route path="/edituserprofile/:id" component={EditUserProfile} exact />
                <Route path="/profile/:id" component={UserProfile} exact />
                <Route path="/ViewTemplates" component={ViewTemplates} exact />
                {/*<Route path="/companysetting" component={OrganizationSetting} exact />*/}

                {/* Tax master */}
                <Route path="/taxname" component={TaxName} exact />
                <Route path="/taxname/:id" component={TaxName} exact />
                <Route path="/taxrate" component={TaxRate} exact />
                <Route path="/taxrate/:id" component={TaxRate} exact />

                {/* access-management */}
                <Route path="/access-management" exact strict component={AccessManagement} />
               
                {/*<Route path="/CenterwiseBarChart" component={CenterwiseBarChart} exact />
                <Route path="/SourcewiseBarChart" component={SourcewiseBarChart} exact />
                <Route path="/Chart" component={Chart} exact />
                <Route path="/monthwiseCharts" component={monthwiseCharts} exact />
                <Route path="/CenterwiseBudget" component={CenterwiseBudget} exact />
                <Route path="/Chart1" component={Chart1} exact />
                <Route path="/" component={Dashboard} exact />
                <Route path="/DashboardNew" component={DashboardNew} exact />
                <Route path="/dashboard" component={Dashboard} exact />
                <Route path="/coming_soon" component={ComingSoon} exact />*/}
                
                <Route path="/umlistofusers" component={UMListOfUsers} exact />
                <Route path="/umroleslist" component={UMRolesList}strict exact />
                <Route path="/umroleslist/:fieldID" exact strict component={UMRolesList} />
                <Route path="/edituserprofile/:id" component={EditUserProfile} exact />
                <Route path="/profile/:id" component={UserProfile} exact />
                <Route path="/ViewTemplates" component={ViewTemplates} exact />
                <Route path="/global-masters" component={GlobalMasters} exact />

*/}
                { /* Entity Management */}
                {/* <Route path="/:entity/basic-details" exact strict component={BasicInfo} />
                <Route path="/:entity/basic-details/:entityID" exact strict component={BasicInfo} />
                <Route path="/:entity/location-details/:entityID" exact strict component={LocationDetails} />
                <Route path="/:entity/location-details/:entityID/:locationID" exact strict component={LocationDetails} />
                <Route path="/:entity/contact-details/:entityID" exact strict component={ContactDetails} />
                <Route path="/:entity/contact-details/:entityID/:contactID" exact strict component={ContactDetails} />*/}

                {/*<Route path="/:entity/list" exact strict component={ListOfEntities} />
                <Route path="/:entity/category" exact strict component={Category} />
                <Route path="/:entity/category/:entityID" exact strict component={Category} />
                <Route path="/:entity/location-type" exact strict component={LocationType} />
                <Route path="/:entity/location-type/:locationTypeID" exact strict component={LocationType} />
                <Route path="/category" exact strict component={Category} />
                <Route path="/category/:fieldID" exact strict component={Category} />
                <Route path="/vehicleCategory" exact strict component={VehicleCategory} />
                <Route path="/vehicleCategory/:fieldID" exact strict component={VehicleCategory} />
                <Route path="/location-type" exact strict component={LocationType} />
                <Route path="/location-type/:fieldID" exact strict component={LocationType} />
                <Route path="/package-type" exact strict component={PackageType} />*/}

                { /* Driver Master */}
                {/*<Route path="/driver/master/:fieldID" exact strict component={DriverMaster} />
                <Route path="/driver/lists" exact strict component={PersonList} />
                <Route path="/driver/master" exact strict component={DriverMaster} />*/}


                { /* Employee Master */}
                {/*<Route path="/employee/master/:fieldID" exact strict component={EmployeeMaster} />
                <Route path="/employee/master" exact strict component={EmployeeMaster} />
                <Route path="/employee/lists" exact strict component={PersonList} />*/}
               
                { /* Guest Master */}

                {/*<Route path="/guest/master" exact strict component={GuestMaster} />
                <Route path="/guest/master/:fieldID" exact strict component={GuestMaster} />
                <Route path="/guest/lists" exact strict component={PersonList} />*/}


                { /* Corporate Master */}
                <Route path="/corporate/basic-details" exact strict component={CorporateBasicInfo} />
                <Route path="/corporate/basic-details/:entityID" exact strict component={CorporateBasicInfo} />
                <Route path="/corporate/location-details" exact strict component={CorporateLocationDetails} />
                <Route path="/corporate/location-details/:entityID" exact strict component={CorporateLocationDetails} />
                <Route path="/corporate/location-details/:entityID/:locationID" exact strict component={CorporateLocationDetails} />
                <Route path="/corporate/contact-details" exact strict component={CorporateContactDetails} />
                <Route path="/corporate/contact-details/:entityID" exact strict component={CorporateContactDetails} />
                <Route path="/corporate/contact-details/:entityID/:contactID" exact strict component={CorporateContactDetails} />
                <Route path="/corporate/list" exact strict component={ListOfEntities} />

                { /* Vendor Master */}
                {/*<Route path="/vendor/basic-details" exact strict component={VendorBasicInfo} />
                <Route path="/vendor/basic-details/:entityID" exact strict component={VendorBasicInfo} />
                <Route path="/vendor/location-details/:entityID" exact strict component={VendorLocationDetails} />
                <Route path="/vendor/location-details" exact strict component={VendorLocationDetails} />
                <Route path="/vendor/location-details/:entityID/:locationID" exact strict component={VendorLocationDetails} />
                <Route path="/vendor/contact-details/:entityID" exact strict component={VendorContactDetails} />
                <Route path="/vendor/contact-details" exact strict component={VendorContactDetails} />
                <Route path="/vendor/contact-details/:entityID/:contactID" exact strict component={VendorContactDetails} />*/}

                {/* <Route path="/vendor/list" exact strict component={ListOfEntities} /> */}

                { /* Supplier Master */}
                {/*<Route path="/supplier" exact strict component={SelectVendor} />
                <Route path="/supplier/basic-details" exact strict component={SupplierBasicInfo} />
                <Route path="/supplier/basic-details/:entityID" exact strict component={SupplierBasicInfo} />
                <Route path="/supplier/location-details/:entityID" exact strict component={SupplierLocationDetails} />
                <Route path="/supplier/location-details" exact strict component={SupplierLocationDetails} />
                <Route path="/supplier/location-details/:entityID/:locationID" exact strict component={SupplierLocationDetails} />
                <Route path="/supplier/contact-details/:entityID" exact strict component={SupplierContactDetails} />
                <Route path="/supplier/contact-details" exact strict component={SupplierContactDetails} />
                <Route path="/supplier/contact-details/:entityID/:contactID" exact strict component={SupplierContactDetails} />*/}
                {/*  <Route path="/supplier/list" exact strict component={ListOfEntities} /> */}

                 { /* Orgnizational Setting */}
                <Route path="/org-settings/basic-details" exact strict component={OrgnizationalBasicInfo} />
                <Route path="/org-settings/basic-details/:entityID" exact strict component={OrgnizationalBasicInfo} />
                <Route path="/org-settings/location-details" exact strict component={OrganizationalLocationDetails} />
                <Route path="/org-settings/location-details/:entityID" exact strict component={OrganizationalLocationDetails} />
                {/*<Route path="/org-settings/location-details/:fieldID" exact strict component={OrganizationalLocationDetails} />*/}
                <Route path="/org-settings/location-details/:entityID/:locationID" exact strict component={OrganizationalLocationDetails} />
                {/*<Route path="/org-settings/location-details/:entityID/:locationID" exact strict component={OrganizationalLocationDetails} />*/}
               
                { /* Orgnizational Setting */}

               {/* <Route path="/org-settings/contact-details" exact strict component={OrganizationalContactDetails} />
                <Route path="/org-settings/contact-details/:entityID" exact strict component={OrganizationalContactDetails} />
                <Route path="/org-settings/contact-details/:entityID/:contactID" exact strict component={OrganizationalContactDetails} />
                <Route path="/org-settings/list" exact strict component={ListOfEntities} />

                <Route path="/category" exact strict component={Category} />
                <Route path="/category/:entityID" exact strict component={Category} />
                <Route path="/location-type" exact strict component={LocationType} />
                <Route path="/location-type/:locationTypeID" exact strict component={LocationType} />
                <Route path="/supplier" exact strict component={SelectVendor} />
                <Route path="/category" exact strict component={Category} />
                <Route path="/category/:fieldID" exact strict component={Category} />
                <Route path="/vehicleCategory" exact strict component={VehicleCategory} />
                <Route path="/vehicleCategory/:fieldID" exact strict component={VehicleCategory} />
                <Route path="/location-type" exact strict component={LocationType} />
                <Route path="/location-type/:fieldID" exact strict component={LocationType} />
                <Route path="/package-type" exact strict component={PackageType} />

                <Route path="/package-type/:fieldID" exact strict component={PackageType} />
                <Route path="/module" exact strict component={Module} />
                <Route path="/module/:fieldID" exact strict component={Module} />

                <Route path="/facility" exact strict component={Facility} />
                <Route path="/facility/:fieldID" exact strict component={Facility} />*/}

                { /* Payment Process */}
                {/*<Route path="/InvoicePage/:order_id" exact strict component={InvoicePage} />
                <Route path="/payment-process" exact strict component={PlanPage} />
                <Route path="/MyOrders" exact strict component={OrderPage} />
                <Route path="/invoicePageView/:order_Id" exact strict component={InvoicePageView} />
                <Route path="/payment-response/:orderId" exact strict component={PaymentResponse} />*/}

                { /* Payment Process */}

                {/*<Route path="/package-master" exact strict component={PackageMaster} />
                <Route path="/package-master/:packageID" exact strict component={PackageMaster} />*/}


                { /* Payment Process */}

                {/*<Route path="/fuel-type" exact strict component={FuleType} />
                <Route path="/fuel-type/:fieldID" exact strict component={FuleType} />
                <Route path="/brand" exact strict component={Brand} />
                <Route path="/vehiclebrand" exact strict component={VehicleBrandBulkUpload} />
                <Route path="/vehiclemodel" exact strict component={VehicleModelBulkUpload} />
                <Route path="/brand/:fieldID" exact strict component={Brand} />
                <Route path="/designation" exact strict component={Designation} />
                <Route path="/designation/:fieldID" exact strict component={Designation} />
                <Route path="/Department" exact strict component={Department} />
                <Route path="/Department/:fieldID" exact strict component={Department} />

                <Route path="/model/:fieldID" exact strict component={Model} />
                <Route path="/model" exact strict component={Model} />
                <Route path="/driver/lists" component={PersonList} />
*/}
                {/*<Route path="/:type/master/:field_id" exact strict component={DepartmentMaster} />
                <Route path="/:type/master" exact strict component={DepartmentMaster} />*/}
                {/*<Route path="/Departments" exact strict component={DepartmentBulkUpload} />
                <Route path="/Designations" exact strict component={DesignationBulkUpload} />

                <Route path="/:type/master/:fieldID" exact strict component={PersonMaster} />
                <Route path="/:type/master" exact strict component={PersonMaster} />

                <Route path="/:type/lists" component={PersonList} />
                <Route path="/:type/list1" component={DepartmentList} />
                <Route path="/:type/filewiselists" component={filewisePersonList} />

                <Route path="/:entity/master/:fieldID" exact strict component={PersonMaster} />
                <Route path="/:entity/master" exact strict component={PersonMaster} />
                <Route path="/:entity/lists" component={PersonList} />
                <Route path="/Departments" exact strict component={DepartmentBulkUpload} />
                <Route path="/Designations" exact strict component={DesignationBulkUpload} />*/}
                
                { /* Billing Management */}
                {/*<Route path="/BillingManagement" exact strict component={BillingManagement} />
                <Route path="/GenerateBill" exact strict component={GenerateBill} />
                <Route path="/create-invoice/:id" exact strict component={BillingInvoice} />
                <Route path="/view-bill" exact strict component={BillView} />*/}

                { /* Booking Master */}
               {/* <Route path="/All_Bookings" exact strict component={AllBookings} />
                <Route path="/:entity/master/:fieldID" exact strict component={DepartmentBulkUpload} />
                <Route path="/:entity/master" exact strict component={DepartmentBulkUpload} />
                <Route path="/:entity/lists" component={DepartmentList} />
*/}

                
                { /* ExpenseType Master */}
                {/*<Route path="/expenseType" exact strict component={ExpenseTypeMaster} />

                <Route path="/:entity/master/:fieldID" exact strict component={DepartmentBulkUpload} />
                <Route path="/:entity/master" exact strict component={DepartmentBulkUpload} />
                <Route path="/:entity/lists" component={DepartmentList} />*/}



                { /* Vendor Management */}

               {/* <Route path="/vendor/basic-details" exact strict component={BasicInfo} />
                <Route path="/vendor/basic-details/:vendor_ID" exact strict component={BasicInfo} />
                <Route path="/vendor/location-details/:vendor_ID" exact strict component={LocationDetails} />
                <Route path="/vendor/location-details/:vendor_ID/:location_ID" exact strict component={LocationDetails} />
                <Route path="/vendor/contact-details/:vendor_ID" exact strict component={ContactDetails} />
                <Route path="/vendor/contact-details/:vendor_ID/:contactDetails_ID" exact strict component={ContactDetails} />

                <Route path="/vendor/list" exact strict component={ListOfEntities} />
                <Route path="/vendor/category" exact strict component={Category} />

                <Route path="/vendor/category/:vendorID" exact strict component={Category} />
                <Route path="/vendor/location-type" exact strict component={LocationType} />
                <Route path="/vendor/location-type/:locationTypeID" exact strict component={LocationType} />*/}
                {/* Vehicle Master */}

                {/*<Route path="/designation-mapping" exact strict component={DesignationMapping} />*/}
                {/* Vehicle Master */}
              { /* <Route path="/vehicle-master" exact strict component={VehicleMaster} />
                <Route path="/vehicle-master/:vehicleID" exact strict component={VehicleMaster} />
                <Route path="/vehicle-list" exact strict component={ListOfVehicles} />*/}

                {/* access-management */}
               {/* <Route path="/access-management" exact strict component={AccessManagement} />*/}


                {/* <Route path="*" component={Notfound} /> */}

                {/* Broadcast-System /*}
                {/*<Route path="/broadcast-system" exact strict component={BroadcastSystem} />*/}
                
            </Switch>
        );
    }
}

// const mapStateToProps = (state)=>{
//     console.log(" state on Dashboard corporate==> ",state)
//     return {
//       userDetails   : state.userDetails,
//     }
//   };
  
  
//   const mapDispatchToProps = (dispatch)=>{
//     return {
//     }
//   };
  
  
// export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CoreLayout));
export default CoreLayout;

