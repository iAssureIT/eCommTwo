import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

//==== Dashboard ====
import CenterwiseBarChart from '../dashboard/chart1/CenterwiseBarChart1.js'
import SourcewiseBarChart from '../dashboard/chart1/SourcewiseBarChart1.js'
import Chart1 from '../dashboard/chart1/chart1.js'
import Chart from '../dashboard/chart1/chart.js'
import CenterwiseBudget from '../dashboard/chart1/CenterwiseBudget.js'
import monthwiseCharts from '../dashboard/chart1/monthwiseCharts.js'

//==== Common ====
import Header from '../common/header/Header.js'
import Footer from '../common/footer/Footer.js'
import Dashboard from '../dashboard/Dashboard.js'
import DashboardNew from '../dashboard/DashboardNew.js'
// import Leftsidebar from '../common/leftSidebar/Leftsidebar.js';
// import Leftsidebar from '../../storeAdmin/leftSidebar/Leftsidebar.js;'
import UMListOfUsers from '../userManagement/UM/UMListOfUsers.js';

import EditUserProfile  from '../userManagement/UM/EditUserProfile.js';
import UserProfile      from '../userManagement/UM/UserProfile.js';
import UMRolesList      from '../userManagement/Roles/Roles.js';
import OrganizationSetting from '../companysetting/Components/OrganizationSetting.js';
import ViewTemplates    from '../NotificationManagement/ViewTemplates.jsx';

//============ Entity Master ======================
import BasicInfo        from '../Master/EntityMaster/Onboarding/basicInfo/BasicInfo.jsx';
import LocationDetails  from '../Master/EntityMaster/Onboarding/locationDetails/LocationDetails.jsx';
import ContactDetails   from '../Master/EntityMaster/Onboarding/contactDetails/ContactDetails.jsx';
import ListOfEntities   from '../Master/EntityMaster/listOfEntities/components/ListOfEntities.jsx';
import ListOfVehicles   from '../Master/VehicleMaster/listOfVehicles/components/ListOfVehicles.jsx';
import Category         from '../Master/Category/Category.jsx';
import VehicleCategory  from '../Master/VehicleCategory/VehicleCategory.js';
import LocationType     from '../Master/LocationType/LocationType.jsx';
import SelectVendor     from '../Master/EntityMaster/SelectVendor/SelectVendor.js';

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

// ============= One Field Component ==================
import FuleType from "../Master/FuleType/FuleType.js"
import PersonMaster from "../Master/PersonMaster/PersonMaster.js"
import PersonList from "../Master/PersonMaster/PersonList.js"

import filewisePersonList from "../Master/PersonMaster/FilewisePersonList.js"

import DesignationMapping from "../Master/DesignationMapping/DesignationMapping.js"
import Model from "../Master/Model/Model.js"
import Brand from "../Master/Brand/Brand.js"
import Designation from "../Master/Designation/Designation.js"
import Department from "../Master/Department/Department.js"
import PackageType from "../Master/PackageType/PackageType.js"
import Module from "../Master/Module/Module.js"
import Facility from "../Master/Facility/Facility.js"

// ============= Vehicle Master =======================
import VehicleMaster from "../Master/VehicleMaster/VehicleMaster.js"
import BookingMaster from "../Master/BookingMaster/BookingMaster.js"
import BookingDetails from "../Master/BookingMaster/BookingDetails.js"
import BookingConfirmation from "../Master/BookingMaster/BookingConfirmation.js"

// ========================== access-management ====================
import AccessManagement from "../AccessManagement/AccessManagement.js"



class CoreLayout extends Component {
    render() {
        return (
            <Switch >
                <Route path="/CenterwiseBarChart" component={CenterwiseBarChart} exact />
                <Route path="/SourcewiseBarChart" component={SourcewiseBarChart} exact />
                <Route path="/Chart" component={Chart} exact />
                <Route path="/monthwiseCharts" component={monthwiseCharts} exact />
                <Route path="/CenterwiseBudget" component={CenterwiseBudget} exact />
                <Route path="/Chart1" component={Chart1} exact />
                <Route path="/" component={Dashboard} exact />
                <Route path="/DashboardNew" component={DashboardNew} exact />
                <Route path="/dashboard" component={Dashboard} exact />
                <Route path="/umlistofusers" component={UMListOfUsers} exact />
                <Route path="/umroleslist" component={UMRolesList} exact />
                <Route path="/umroleslist/:fieldID" exact strict component={UMRolesList} />
                <Route path="/edituserprofile/:id" component={EditUserProfile} exact />
                <Route path="/profile/:id" component={UserProfile} exact />
                <Route path="/ViewTemplates" component={ViewTemplates} exact />
                <Route path="/companysetting" component={OrganizationSetting} exact />

                { /* Entity Management */}
                {/* <Route path="/:entity/basic-details" exact strict component={BasicInfo} />
                <Route path="/:entity/basic-details/:entityID" exact strict component={BasicInfo} />
                <Route path="/:entity/location-details/:entityID" exact strict component={LocationDetails} />
                <Route path="/:entity/location-details/:entityID/:locationID" exact strict component={LocationDetails} />
                <Route path="/:entity/contact-details/:entityID" exact strict component={ContactDetails} />
                <Route path="/:entity/contact-details/:entityID/:contactID" exact strict component={ContactDetails} />*/}

                <Route path="/:entity/list" exact strict component={ListOfEntities} /> 
                <Route path="/:entity/category" exact strict component={Category} />
                <Route path="/:entity/category/:entityID" exact strict component={Category} />
                <Route path="/:entity/location-type" exact strict component={LocationType} />
                <Route path="/:entity/location-type/:locationTypeID" exact strict component={LocationType} />
                <Route path="/supplier" exact strict component={SelectVendor} />
                <Route path="/category" exact strict component={Category} />
                <Route path="/category/:fieldID" exact strict component={Category} />
                <Route path="/vehicleCategory" exact strict component={VehicleCategory} />
                <Route path="/vehicleCategory/:fieldID" exact strict component={VehicleCategory} />
                <Route path="/location-type" exact strict component={LocationType} />
                <Route path="/location-type/:fieldID" exact strict component={LocationType} />
                <Route path="/package-type" exact strict component={PackageType} />

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
                <Route path="/vendor/basic-details" exact strict component={VendorBasicInfo} />
                <Route path="/vendor/basic-details/:entityID" exact strict component={VendorBasicInfo} />
                <Route path="/vendor/location-details/:entityID" exact strict component={VendorLocationDetails} />
                <Route path="/vendor/location-details/:entityID/:locationID" exact strict component={VendorLocationDetails} />
                <Route path="/vendor/contact-details/:entityID" exact strict component={VendorContactDetails} />
                <Route path="/vendor/contact-details/:entityID/:contactID" exact strict component={VendorContactDetails} />
                {/* <Route path="/vendor/list" exact strict component={ListOfEntities} /> */}

                { /* Supplier Master */}
                <Route path="/supplier/basic-details" exact strict component={SupplierBasicInfo} />
                <Route path="/supplier/basic-details/:entityID" exact strict component={SupplierBasicInfo} />
                <Route path="/supplier/location-details/:entityID" exact strict component={SupplierLocationDetails} />
                <Route path="/supplier/location-details/:entityID/:locationID" exact strict component={SupplierLocationDetails} />
                <Route path="/supplier/contact-details/:entityID" exact strict component={SupplierContactDetails} />
                <Route path="/supplier/contact-details/:entityID/:contactID" exact strict component={SupplierContactDetails} />
                {/*  <Route path="/supplier/list" exact strict component={ListOfEntities} /> */}

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
                <Route path="/facility/:fieldID" exact strict component={Facility} />

                { /* Payment Process */}

                <Route path="/InvoicePage/:order_id" exact strict component={InvoicePage} />
                <Route path="/payment-process" exact strict component={PlanPage} />
                <Route path="/MyOrders" exact strict component={OrderPage} />
                <Route path="/invoicePageView/:order_Id" exact strict component={InvoicePageView} />
                <Route path="/payment-response/:orderId" exact strict component={PaymentResponse} />

                { /* Payment Process */}

                <Route path="/package-master" exact strict component={PackageMaster} />
                <Route path="/package-master/:packageID" exact strict component={PackageMaster} />


                { /* Payment Process */}

                <Route path="/fuel-type" exact strict component={FuleType} />
                <Route path="/fuel-type/:fieldID" exact strict component={FuleType} />
                <Route path="/brand" exact strict component={Brand} />
                <Route path="/brand/:fieldID" exact strict component={Brand} />
                <Route path="/designation" exact strict component={Designation} />
                <Route path="/designation/:fieldID" exact strict component={Designation} />
                <Route path="/Department" exact strict component={Department} />
                <Route path="/Department/:fieldID" exact strict component={Department} />

                <Route path="/model/:fieldID" exact strict component={Model} />
                <Route path="/model" exact strict component={Model} />

                <Route path="/:type/master/:fieldID" exact strict component={PersonMaster} />
                <Route path="/:type/master" exact strict component={PersonMaster} />
                <Route path="/:type/lists" component={PersonList} />

                <Route path="/:type/filewiselists" component={filewisePersonList} />

                <Route path="/userCheck" component={BookingConfirmation} />
                <Route path="/booking/:userID" component={BookingMaster} />
                <Route path="/booking-details" component={BookingDetails} />
                <Route path="/:entity/master/:fieldID" exact strict component={PersonMaster} />
                <Route path="/:entity/master" exact strict component={PersonMaster} />
                <Route path="/:entity/lists" component={PersonList} />

                { /* Vendor Management */}

                <Route path="/vendor/basic-details" exact strict component={BasicInfo} />
                <Route path="/vendor/basic-details/:vendor_ID" exact strict component={BasicInfo} />
                <Route path="/vendor/location-details/:vendor_ID" exact strict component={LocationDetails} />
                <Route path="/vendor/location-details/:vendor_ID/:location_ID" exact strict component={LocationDetails} />
                <Route path="/vendor/contact-details/:vendor_ID" exact strict component={ContactDetails} />
                <Route path="/vendor/contact-details/:vendor_ID/:contactDetails_ID" exact strict component={ContactDetails} />

                <Route path="/vendor/list" exact strict component={ListOfEntities} />
                <Route path="/vendor/category" exact strict component={Category} />

                <Route path="/vendor/category/:vendorID" exact strict component={Category} />
                <Route path="/vendor/location-type" exact strict component={LocationType} />
                <Route path="/vendor/location-type/:locationTypeID" exact strict component={LocationType} />
                {/* Vehicle Master */}

                <Route path="/designation-mapping" exact strict component={DesignationMapping} />
                {/* Vehicle Master */}
                <Route path="/vehicle-master" exact strict component={VehicleMaster} />
                <Route path="/vehicle-master/:vehicleID" exact strict component={VehicleMaster} />
                <Route path="/vehicle-list" exact strict component={ListOfVehicles} />

                {/* access-management */}
                <Route path="/access-management" exact strict component={AccessManagement} />
            </Switch>
        );
    }
}


export default CoreLayout;