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

//============ Entity Master ======================
import BasicInfo from '../Master/EntityMaster/Onboarding/basicInfo/BasicInfo.js';
import LocationDetails from '../Master/EntityMaster/Onboarding/locationDetails/LocationDetails.jsx';
import ContactDetails from '../Master/EntityMaster/Onboarding/contactDetails/ContactDetails.jsx';
import ListOfEntities from '../Master/EntityMaster/listOfEntities/components/ListOfEntities.jsx';
import LocationType from '../Master/LocationType/LocationType.jsx';
import SelectVendor from '../Master/EntityMaster/SelectVendor/SelectVendor.js';

// //============= Franchise Master ====================
// import FranchiseBasicInfo from '../../storeAdmin/FranchiseMaster/FranchiseBasicInfo.js';
// import FranchiseContactDetails from '../../storeAdmin/FranchiseMaster/FranchiseContactDetails.js';
// import FranchiseLocationDetails from '../../storeAdmin/FranchiseMaster/FranchiseLocationDetails.js';

// import ListOfEntities from '../Master/EntityMaster/listOfEntities/components/ListOfEntities.jsx';

// ============ Orgnizational Setting ===========================
import OrgnizationalBasicInfo from "../OrganizationalSettings/OrganizationalBasicInfo.js";
import OrganizationalContactDetails from "../OrganizationalSettings/OrganizationalContactDetails.js";
import OrganizationalLocationDetails from "../OrganizationalSettings/OrganizationalLocationDetails.js";

//=================== Tax Master =====================
import TaxName from '../../storeAdmin/TaxName/TaxName.js';
import TaxRate from '../../storeAdmin/TaxRate/TaxRate.js';

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
                {/*<Route path="/companysetting" component={OrganizationSetting} exact />/}

                { /* Entity Management */}
                <Route path="/:entity/basic-details" exact strict component={BasicInfo} />
                <Route path="/:entity/basic-details/:entityID" exact strict component={BasicInfo} />
                <Route path="/:entity/location-details/:entityID" exact strict component={LocationDetails} />
                <Route path="/:entity/location-details/:entityID/:locationID" exact strict component={LocationDetails} />
                <Route path="/:entity/contact-details/:entityID" exact strict component={ContactDetails} />
                <Route path="/:entity/contact-details/:entityID/:contactID" exact strict component={ContactDetails} />

                 { /* Franchise Master */}
               {/* <Route path="/franchise/basic-details" exact strict component={FranchiseBasicInfo} />
                <Route path="/franchise/basic-details/:entityID" exact strict component={FranchiseBasicInfo} />
                <Route path="/franchise/location-details" exact strict component={FranchiseLocationDetails} />
                <Route path="/franchise/location-details/:entityID" exact strict component={FranchiseLocationDetails} />
                <Route path="/franchise/location-details/:entityID/:locationID" exact strict component={FranchiseLocationDetails} />
                <Route path="/franchise/contact-details" exact strict component={FranchiseContactDetails} />
                <Route path="/franchise/contact-details/:entityID" exact strict component={FranchiseContactDetails} />
                <Route path="/franchise/contact-details/:entityID/:contactID" exact strict component={FranchiseContactDetails} />
                <Route path="/franchise/list" exact strict component={ListOfEntities} /> */}


                {/* Tax master */}
                <Route path="/taxname" component={TaxName} exact />
                <Route path="/taxname/:id" component={TaxName} exact />
                <Route path="/taxrate" component={TaxRate} exact />
                <Route path="/taxrate/:id" component={TaxRate} exact />

                {/* access-management */}
                <Route path="/access-management" exact strict component={AccessManagement} />
                               
                <Route path="/umlistofusers" component={UMListOfUsers} exact />
                <Route path="/umroleslist" component={UMRolesList}strict exact />
                <Route path="/umroleslist/:fieldID" exact strict component={UMRolesList} />
                <Route path="/edituserprofile/:id" component={EditUserProfile} exact />
                <Route path="/profile/:id" component={UserProfile} exact />
                <Route path="/ViewTemplates" component={ViewTemplates} exact />
                <Route path="/global-masters" component={GlobalMasters} exact />


                 { /* Orgnizational Setting */}
                <Route path="/org-settings/basic-details" exact strict component={OrgnizationalBasicInfo} />
                <Route path="/org-settings/basic-details/:entityID" exact strict component={OrgnizationalBasicInfo} />
                <Route path="/org-settings/location-details" exact strict component={OrganizationalLocationDetails} />
                <Route path="/org-settings/location-details/:entityID" exact strict component={OrganizationalLocationDetails} />
                {/*<Route path="/org-settings/location-details/:fieldID" exact strict component={OrganizationalLocationDetails} />*/}
                <Route path="/org-settings/location-details/:entityID/:locationID" exact strict component={OrganizationalLocationDetails} />
                {/*<Route path="/org-settings/location-details/:entityID/:locationID" exact strict component={OrganizationalLocationDetails} />*/}
               
                {/* access-management */}
               {/* <Route path="/access-management" exact strict component={AccessManagement} />*/}


                {/* <Route path="*" component={Notfound} /> */}

                {/* Broadcast-System /*}
                {/<Route path="/broadcast-system" exact strict component={BroadcastSystem} />*/}
                
            </Switch>
        );
    }
}

export default CoreLayout;