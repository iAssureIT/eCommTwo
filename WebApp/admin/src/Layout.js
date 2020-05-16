import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';


import CoreLayout from './coreadmin/CoreLayout/CoreLayout.js';

// Section: 1 - SystemSecurity ******************************************************
import Login                from './coreadmin/systemSecurity/Login.js';
import ConfirmOtp           from './coreadmin/systemSecurity/ConfirmOtp.js';
import ForgotPassword       from './coreadmin/systemSecurity/ForgotPassword.js';
import ResetPassword        from './coreadmin/systemSecurity/ResetPassword.js';
import SignUp               from './coreadmin/systemSecurity/SignUp.js';

import Header               from './coreadmin/common/header/Header.js'; 
import Footer               from './coreadmin/common/footer/Footer.js';
import Leftsidebar          from './storeAdmin/leftSidebar/Leftsidebar.js';

//================== Dashboard ===================
import Dashboard            from './storeAdmin/dashboard/Dashboard.js'
//============== Product Management ==============//
import AddNewShopProduct    from './storeAdmin/product/addNewProduct/AddNewShopProduct/AddNewShopProduct.js';
import AddNewProductImages  from './storeAdmin/product/addNewProduct/AddNewProductImages/AddNewProductImages.js';
import CategoryManagement   from './storeAdmin/product/categoryManagement/component/CategoryManagement.js';
import SectionManagement    from './storeAdmin/product/sectionManagement/component/SectionManagement.js';

import AddNewBulkProduct    from './StoreManagement/product/productBulkUpload/component/ProductBulkUpload.js';
import TemplateManagement   from './StoreManagement/product/productBulkUpload/component/TemplateManagement.js';

import ProductList          from './StoreManagement/product/productList/component/ProductList.js';
import BulkProductImageUpload from './storeAdmin/bulkimageUpload/BulkProductImageUpload.js'
import FileWiseProductList  from './StoreManagement/product/fileproductList/component/fileproductList.js';

import AllOrdersList        from './StoreManagement/orders/component/AllOrders.js';
import NewOrdersList        from './StoreManagement/orders/component/NewOrdersList.js';
import VerifiedOrdersList   from './StoreManagement/orders/component/VerifiedOrdersList.js';
import PackedOrdersList     from './StoreManagement/orders/component/PackedOrdersList.js';
import InspectedOrdersList  from './StoreManagement/orders/component/InspectedOrdersList.js';
import ApprovedOrdersList   from './StoreManagement/orders/component/ApprovedOrdersList.js';
import DispatchedOrdersList from './StoreManagement/orders/component/DispatchedOrdersList.js';
import DeliveryInitiatedOrders from './StoreManagement/orders/component/DeliveryInitiatedOrders.js';
import DeliveredOrders      from './StoreManagement/orders/component/DeliveredOrders.js';
import ReturnProducts       from './StoreManagement/orders/component/ReturnProducts.js';

import BaList               from './storeAdmin/baManagement/listOfBAs/components/BusinessAssociateList.js';
import AddNewBA             from './storeAdmin/baManagement/BAOnboarding/basicInfo/basicInfo.js';
import ProductDetails       from './StoreManagement/product/ProductDetails/ProductDetails.js';
import viewOrder            from './StoreManagement/orders/component/viewOrder.js';

//================== Reports ===============//
import Reports              from './admin/Reports/Reports.js';
import CategoryWiseReports  from './admin/categoryWiseReports/Reports.js';
import Productreview        from './storeAdmin/Productreview/Productreview.js';

// import ImageUpload from '../../ImageUpload/ImageUpload.js';

//============ Vendor Management =============
import VendorOnboardingForm from './storeAdmin/vendorManagement/VendorOnboarding/VendorOnboardingForm/VendorOnboardingForm.jsx';
import BasicInfo            from './storeAdmin/vendorManagement/VendorOnboarding/basicInfo/BasicInfo.jsx';
import LocationDetails      from './storeAdmin/vendorManagement/VendorOnboarding/locationDetails/LocationDetails.jsx';
import ContactDetails       from './storeAdmin/vendorManagement/VendorOnboarding/contactDetails/ContactDetails.jsx';
import ListOfVendor         from './storeAdmin/vendorManagement/listOfVendors/components/ListOfVendor.jsx';
import VendorCategory       from './storeAdmin/vendorManagement/MasterData/VendorCategory/VendorCategory.jsx';
import VendorLocationType   from './storeAdmin/vendorManagement/MasterData/VendorLocationType/VendorLocationType.jsx';

//============ Franchise Management =============
import FranchiseBasicInfo       from './storeAdmin/FranchiseMaster/FranchiseBasicInfo.js';
import FranchiseLocationDetails from './storeAdmin/FranchiseMaster/FranchiseLocationDetails.js';
import FranchiseContactDetails  from './storeAdmin/FranchiseMaster/FranchiseContactDetails.js';
import ListOfEntities           from './coreadmin/Master/EntityMaster/listOfEntities/components/ListOfEntities.jsx';

//=============== Preferences =================
import WebsiteModel from './storeAdmin/preferences/WebsiteModel.js';


class Layout extends Component  {

    constructor(props) {
        super();
        this.state = {
            loggedIn: false,
        }
    }

    componentDidMount() {
        const token = localStorage.getItem("token");
        if (token !== null && token !== "undefined") {
            this.setState({
                loggedIn: true
            })
        } else { }

    }

    logout() {
        var token = localStorage.removeItem("token");
        if (token !== null && token !== "undefined") {
            this.setState({
                loggedIn: false
            })
        }
    }

    render() {
        if (this.state.loggedIn) {
            return (
            <Router>
                <div className="App container-fluid" >
                    <div className="row" >
                        <div id="headerid" className="headerbackgroundcolor" >
                            <div className="" >
                                <Header />
                            </div> 
                        </div>
                        <div id="dashbordid" className="col-lg-10 col-lg-offset-2 col-md-12 col-sm-12 col-xs-12 NOpadding" >
                            <div className="" >
                                <div className=" mainContentBottom NOpadding" >
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding mainContentBackground" >
                                        <CoreLayout />
                                        <Switch >
                                          {/* Dashboard route */}
                                          <Route path="/" component={Dashboard} exact />
                                          <Route path="/dashboard" component={Dashboard} exact />
                                        
                                          <Route path="/website-model" component={WebsiteModel} exact />                                          

                                          {/* Product Management */}
                                          <Route path="/product-details/:productID" exact strict component={ProductDetails} />
                                          <Route path="/add-product" exact strict component={AddNewShopProduct} />
                                          <Route path="/add-product/:productID" exact strict component={AddNewShopProduct} />
                                          <Route path="/add-product/image/:productID" exact strict component={AddNewProductImages} />
                                          <Route path="/category-management" exact strict component={CategoryManagement} />
                                          <Route path="/category-management/:categoryID" exact strict component={CategoryManagement} />
                                          <Route path="/section-management" exact strict component={SectionManagement} />
                                          <Route path="/section-management/:sectionID" exact strict component={SectionManagement} />
                                          <Route path="/product-upload" exact strict component={AddNewBulkProduct} />
                                          <Route path="/template-management" exact strict component={TemplateManagement} />
                                          <Route path="/template-management/:template_ID" exact strict component={TemplateManagement} />
                                          <Route path="/product-list" exact strict component={ProductList} />
                                          <Route path="/product-image-bulk-upload" exact strict component={BulkProductImageUpload} />
                                          <Route path="/file-wise-product-list" exact strict component={FileWiseProductList} />
                                          {/* <Route path="/image" exact strict component={ImageUpload} /> */}

                                          {/* Vendor Management */}
                                          <Route path="/vendor-onboarding" exact strict component={BasicInfo} />
                                          <Route path="/vendor-onboarding/:vendor_ID" exact strict component={BasicInfo} />
                                          <Route path="/location-details/:vendor_ID" exact strict component={LocationDetails} />
                                          <Route path="/location-details/:vendor_ID/:location_ID" exact strict component={LocationDetails} />
                                          <Route path="/contact-details/:vendor_ID" exact strict component={ContactDetails} />
                                          <Route path="/contact-details/:vendor_ID/:contactDetails_ID" exact strict component={ContactDetails} />
                                          <Route path="/vendor-list" exact strict component={ListOfVendor} />
                                          <Route path="/vendor-category" exact strict component={VendorCategory} />
                                          <Route path="/vendor-category/:vendorID" exact strict component={VendorCategory} />
                                          <Route path="/vendor-location-type" exact strict component={VendorLocationType} />
                                          <Route path="/vendor-location-type/:locationTypeID" exact strict component={VendorLocationType} />

                                          { /* Franchise Master */}
                                          <Route path="/franchise/basic-details"                          exact strict component={FranchiseBasicInfo} />
                                          <Route path="/franchise/basic-details/:entityID"                exact strict component={FranchiseBasicInfo} />
                                          <Route path="/franchise/location-details"                       exact strict component={FranchiseLocationDetails} />
                                          <Route path="/franchise/location-details/:entityID"             exact strict component={FranchiseLocationDetails} />
                                          <Route path="/franchise/location-details/:entityID/:locationID" exact strict component={FranchiseLocationDetails} />
                                          <Route path="/franchise/contact-details"                        exact strict component={FranchiseContactDetails} />
                                          <Route path="/franchise/contact-details/:entityID"              exact strict component={FranchiseContactDetails} />
                                          <Route path="/franchise/contact-details/:entityID/:contactID"   exact strict component={FranchiseContactDetails} />
                                          <Route path="/franchise/list"                                   exact strict component={ListOfEntities} />

                                          { /*Order List*/}
                                          <Route path="/allorders" exact strict component={AllOrdersList} />
                                          <Route path="/new-orders-list" exact strict component={NewOrdersList} />
                                          <Route path="/verified-orders-list" exact strict component={VerifiedOrdersList} />
                                          <Route path="/packed-orders-list" exact strict component={PackedOrdersList} />
                                          <Route path="/inspected-orders-list" exact strict component={InspectedOrdersList} />
                                          <Route path="/approved-orders-list" exact strict component={ApprovedOrdersList} />
                                          <Route path="/dispatched-orders-list" exact strict component={DispatchedOrdersList} />
                                          <Route path="/delivery-initiated-orders" exact strict component={DeliveryInitiatedOrders} />
                                          <Route path="/delivered-orders-list" exact strict component={DeliveredOrders} />
                                          <Route path="/returned-products" exact strict component={ReturnProducts} />

                                          <Route path="/viewOrder/:orderID" exact strict component={viewOrder} />

                                          { /*Ba List*/}
                                          <Route path="/ba-list" exact strict component={BaList} />

                                          <Route path="/editBA/:BaId" exact strict component={AddNewBA} />
                                          <Route path="/BA/locationDetails/:locationEdit/:BaId" exact strict component={AddNewBA} />
                                          <Route path="/BA/contactDetails/:contactEdit/:BaId" exact strict component={AddNewBA} />

                                          <Route path="/addNewBA" exact strict component={AddNewBA} />


                                          {/*Report*/}
                                          <Route path="/report" exact strict component={Reports} />

                                          <Route path="/category-wise-reports" exact strict component={CategoryWiseReports} />

                                          <Route path="/productreview" exact strict component={Productreview} />

                                        </Switch>
                                    </div>
                                </div>
                            </div>
                            <div className="footerCSS col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding" >
                                <Footer />
                            </div>
                        </div>
                        <div className="leftsidebarbackgroundcolor" >
                            <div className="row" >
                                <Leftsidebar />
                            </div>
                        </div>
                    </div>
                </div>
            </Router>
            );
        } else {
            return (
                <div>
                    <Router >
                        <Switch >
                            <Route path="/login" exact strict component={Login} />
                            {<Route path="/" exact strict component={Login} />}
                            <Route path="/signup" exact strict component={SignUp} />
                            <Route path="/forgotpassword" exact strict component={ForgotPassword} />
                            <Route path="/reset-pwd/:user_ID" exact strict component={ResetPassword} />
                            <Route path="/confirm-otp/:userID" exact strict component={ConfirmOtp} />
                        </Switch>
                    </Router>
                </div>
            );
        }
    }
}

 
export default Layout;