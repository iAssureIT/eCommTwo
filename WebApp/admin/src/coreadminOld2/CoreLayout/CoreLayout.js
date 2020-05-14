import React, { Component } from 'react';
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
import OrganizationSetting from '../companysetting/Components/OrganizationSetting.js';
import ViewTemplates    from '../NotificationManagement/ViewTemplates.jsx';

//============ Entity Master ======================
// import BasicInfo        from '../Master/EntityMaster/Onboarding/basicInfo/BasicInfo.jsx';
// import LocationDetails  from '../Master/EntityMaster/Onboarding/locationDetails/LocationDetails.jsx';
// import ContactDetails   from '../Master/EntityMaster/Onboarding/contactDetails/ContactDetails.jsx';
// import ListOfEntities   from '../Master/EntityMaster/listOfEntities/components/ListOfEntities.jsx';
// import ListOfVehicles   from '../Master/VehicleMaster/listOfVehicles/components/ListOfVehicles.jsx';
// import Category         from '../Master/Category/Category.jsx';
// import VehicleCategory  from '../Master/VehicleCategory/VehicleCategory.js';
// import LocationType     from '../Master/LocationType/LocationType.jsx';
// import SelectVendor     from '../Master/EntityMaster/SelectVendor/SelectVendor.js';

//============= Vendor Master =====================
// import VendorBasicInfo from '../Master/VendorMaster/VendorBasicInfo.js';
// import VendorLocationDetails from '../Master/VendorMaster/VendorLocationDetails.js';
// import VendorContactDetails from '../Master/VendorMaster/VendorContactDetails.js';

//=================== Tax Master =====================
import TaxName from '../../storeAdmin/TaxName/TaxName.js';
import TaxRate from '../../storeAdmin/TaxRate/TaxRate.js';

// ==================== access-management ====================
import AccessManagement from "../AccessManagement/AccessManagement.js"



class CoreLayout extends Component {
    render() {
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
                <Route path="/companysetting" component={OrganizationSetting} exact />

                {/* Tax master */}
                <Route path="/taxname" component={TaxName} exact />
                <Route path="/taxname/:id" component={TaxName} exact />
                <Route path="/taxrate" component={TaxRate} exact />
                <Route path="/taxrate/:id" component={TaxRate} exact />

                {/* access-management */}
                <Route path="/access-management" exact strict component={AccessManagement} />
            </Switch>
        );
    }
}


export default CoreLayout;