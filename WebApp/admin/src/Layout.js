import React, { Component }                       from 'react';
import { connect }                                from 'react-redux';
import { withRouter }                             from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

import CoreLayout from './coreadmin/CoreLayout/CoreLayout.js';

// Section: 1 - SystemSecurity ******************************************************
import Login                from './coreadmin/systemSecurity/Login.js';
import ConfirmOtp           from './coreadmin/systemSecurity/ConfirmOtp.js';
import ForgotPassword       from './coreadmin/systemSecurity/ForgotPassword.js';
import ResetPassword        from './coreadmin/systemSecurity/ResetPassword.js';
import ResetPwd             from './coreadmin/systemSecurity/ResetPwd.js';
import SignUp               from './coreadmin/systemSecurity/SignUp.js';

import Header               from './coreadmin/common/header/Header.js'; 
import Footer               from './coreadmin/common/footer/Footer.js';
import Leftsidebar          from './storeAdmin/leftSidebar/Leftsidebar.js';

//================== Dashboard ===================
import Dashboard            from './storeAdmin/dashboard/Dashboard.js'
//============== Product Management ==============//
import AddNewShopProduct    from './storeAdmin/product/addNewProduct/AddNewShopProduct/AddNewShopProduct.js';
import AddNewProductImages  from './storeAdmin/product/addNewProduct/AddNewProductImages/AddNewProductImages.js';
// import CategoryManagement   from './storeAdmin/product/categoryManagement/component/CategoryManagement.js';
// import SectionManagement    from './storeAdmin/product/sectionManagement/component/SectionManagement.js';

import AddNewBulkProduct    from './StoreManagement/product/productBulkUpload/component/ProductBulkUpload.js';
import UpdateBulkProduct    from './StoreManagement/product/productBulkUpload/component/productUpdateBulkUpload.js';
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

import DiscountManagement       from './storeAdmin/DiscountManagement/DiscountManagement.js';

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
// import VendorOnboardingForm from './storeAdmin/vendorManagement/VendorOnboarding/VendorOnboardingForm/VendorOnboardingForm.jsx';
// import BasicInfo            from './storeAdmin/vendorManagement/VendorOnboarding/basicInfo/BasicInfo.jsx';
// import LocationDetails      from './storeAdmin/vendorManagement/VendorOnboarding/locationDetails/LocationDetails.jsx';
// import ContactDetails       from './storeAdmin/vendorManagement/VendorOnboarding/contactDetails/ContactDetails.jsx';
// import ListOfVendor         from './storeAdmin/vendorManagement/listOfVendors/components/ListOfVendor.jsx';
// import VendorCategory       from './storeAdmin/vendorManagement/MasterData/VendorCategory/VendorCategory.jsx';
// import VendorLocationType   from './storeAdmin/vendorManagement/MasterData/VendorLocationType/VendorLocationType.jsx';

import VendorBasicInfo         from './storeAdmin/VendorMaster/VendorBasicInfo.js';
import VendorLocationDetails   from './storeAdmin/VendorMaster/VendorLocationDetails.js';
import VendorContactDetails    from './storeAdmin/VendorMaster/VendorContactDetails.js';
import VendorListOfEntities    from './storeAdmin/VendorMaster/VendorListOfEntities.js';

//============ Franchise Management =============
import FranchiseBasicInfo       from './storeAdmin/FranchiseMaster/FranchiseBasicInfo.js';
import FranchiseLocationDetails from './storeAdmin/FranchiseMaster/FranchiseLocationDetails.js';
import FranchiseContactDetails  from './storeAdmin/FranchiseMaster/FranchiseContactDetails.js';
import ListOfEntitiesPage           from './storeAdmin/FranchiseMaster/ListOfEntities.js';

//=============== Preferences =================
import WebsiteModel from './storeAdmin/preferences/WebsiteModel.js';

//=============== Allowable pincodes ===========
import AllowablePincodes from './storeAdmin/allowablePincodes/AllowablePincodes.js';

//=============== Purchase Management =================

import PurchaseManagement  from './storeAdmin/PurchaseManagement/PurchaseManagement.js';
import RawMaterialStockReport from './storeAdmin/PurchaseManagement/RawMaterialStockReport.js';
import FinishedGoods       from './storeAdmin/PurchaseManagement/FinishedGoods.js';
import FranchiseCurrentStock from './storeAdmin/PurchaseManagement/FranchiseCurrentStock.js';

//=============== Purchase Management =================

import Distribution       from './storeAdmin/DistributionManagement/DistributionManagement.js';
import FranchiseDeliveryChallan    from './storeAdmin/DistributionManagement/FranchiseDeliveryChallan.js';
import FranchiseDistribution    from './storeAdmin/DistributionManagement/FranchiseDistribution.js';
import DeliveryChallans    from './storeAdmin/DistributionManagement/DeliveryChallans.js';

import AdminShoppingList  from './storeAdmin/adminShoppingList/AdminShoppingList.js';


import FranchiseShoppingList from './storeAdmin/FranchiseShoppingList/FranchiseShoppingList.js';
import FranchiseOrderSummary from './storeAdmin/FranchiseShoppingList/FranchiseOrderSummary.js';
import OrderPurchaseView from './storeAdmin/FranchiseShoppingList/OrderPurchaseView.js';

import MasterData            from "./storeAdmin/MasterData/MasterData.js";

/*===================== CMS ========================*/

import CmsLayout from './CMS/CmsLayout.js';


/*========================================*/




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
        var pageUrl = window.location.pathname;
        let a = pageUrl ? pageUrl.split('/') : "";
    if (this.state.loggedIn) {
        if(a[1] == "cms"){
                return(
                  
                    <CmsLayout /> 
                   
                );
        } else{

            return (
                <Router>
                    <div className="hold-transition skin-blue fixed sidebar-mini">
                        <div className="content-wrapper">
                            <div className="wrapper">
                                <Header />
                                <Leftsidebar/>
                                <div className="row">
                                    <div className="container-fluid main-container">
                                        <div className="row">
                                            <div className="dashboardWrapper">
                                                <div className="backColor col-lg-12 col-md-12 col-sm-12 col-xs-12" >
                                                    <CoreLayout />
                                                      <Switch >
                                                        {/* Dashboard route */}
                                                        <Route path="/"                                                 exact strict component={Dashboard}/>
                                                        <Route path="/dashboard"                                        exact strict component={Dashboard} />
                                                      
                                                        <Route path="/preferences"                                      exact strict component={WebsiteModel} />
                                                        <Route path="/franchise-allowable-pincode"                      exact strict component={AllowablePincodes} />

                                                        {/* Product Management */}
                                                        <Route path="/product-details/:productID"                       exact strict component={ProductDetails} />
                                                        <Route path="/add-product"                                      exact strict component={AddNewShopProduct} />
                                                        <Route path="/add-product/:productID"                           exact strict component={AddNewShopProduct} />
                                                        <Route path="/add-product/image/:productID"                     exact strict component={AddNewProductImages} />
                                                        {/*<Route path="/category-management"                              exact strict component={CategoryManagement} />
                                                        <Route path="/category-management/:categoryID"                  exact strict component={CategoryManagement} />
                                                        <Route path="/section-management"                               exact strict component={SectionManagement} />
                                                        <Route path="/section-management/:sectionID"                    exact strict component={SectionManagement} />*/}
                                                        <Route path="/product-upload"                                   exact strict component={AddNewBulkProduct} />
                                                        <Route path="/update_product-upload"                            exact strict component={UpdateBulkProduct} />
                                                        <Route path="/template-management"                              exact strict component={TemplateManagement} />
                                                        
                                                        <Route path="/template-management"                              exact strict component={TemplateManagement} />
                                                        <Route path="/template-management/:template_ID"                 exact strict component={TemplateManagement} />
                                                        <Route path="/product-list"                                     exact strict component={ProductList} />
                                                        <Route path="/product-image-bulk-upload"                        exact strict component={BulkProductImageUpload} />
                                                        <Route path="/file-wise-product-list"                           exact strict component={FileWiseProductList} />
                                                        {/* <Route path="/image" exact strict component={ImageUpload} /> */}

                                                        {/* Vendor Management */}
                                                        <Route path="/vendor/basic-details"                             exact strict component={VendorBasicInfo} />
                                                        <Route path="/vendor/basic-details/:entityID"                   exact strict component={VendorBasicInfo} />
                                                        <Route path="/vendor/location-details/:entityID"                exact strict component={VendorLocationDetails} />
                                                        <Route path="/vendor/location-details/:entityID/:locationID"    exact strict component={VendorLocationDetails} />
                                                        <Route path="/vendor/contact-details/:entityID"                 exact strict component={VendorContactDetails} />
                                                        <Route path="/vendor/contact-details/:entityID/:contactID"      exact strict component={VendorContactDetails} />
                                                        <Route path="/vendor/list"                                      exact strict component={VendorListOfEntities} />
                                                        {/*<Route path="/vendor-category" exact strict component={VendorCategory} />
                                                        <Route path="/vendor-category/:vendorID" exact strict component={VendorCategory} />
                                                        <Route path="/vendor-location-type" exact strict component={VendorLocationType} />
                                                        <Route path="/vendor-location-type/:locationTypeID" exact strict component={VendorLocationType} />*/}

                                                        { /* Franchise Master */}
                                                        <Route path="/franchise/basic-details"                          exact strict component={FranchiseBasicInfo} />
                                                        <Route path="/franchise/basic-details/:entityID"                exact strict component={FranchiseBasicInfo} />
                                                        <Route path="/franchise/location-details/:entityID"             exact strict component={FranchiseLocationDetails} />
                                                        <Route path="/franchise/location-details/:entityID/:locationID" exact strict component={FranchiseLocationDetails} />
                                                        <Route path="/franchise/contact-details/:entityID"              exact strict component={FranchiseContactDetails} />
                                                        <Route path="/franchise/contact-details/:entityID/:contactID"   exact strict component={FranchiseContactDetails} />
                                                        <Route path="/franchise/list"                                   exact strict component={ListOfEntitiesPage} />                          

                                                        <Route path="/franchise-shopping-list"                          exact strict component={FranchiseShoppingList} />
                                                        <Route path="/franchise-shopping-list/:editId"                  exact strict component={FranchiseShoppingList} />
                                                                        
                                                        <Route path="/franchise-order-summary"                          exact strict component={FranchiseOrderSummary} />

                                                        <Route path="/franchise-order-view/:orderId"                    exact strict component={OrderPurchaseView} />

                                                        { /*Order List*/}
                                                        <Route path="/allorders"                                        exact strict component={AllOrdersList} />
                                                        <Route path="/new-orders-list"                                  exact strict component={NewOrdersList} />
                                                        <Route path="/verified-orders-list"                             exact strict component={VerifiedOrdersList} />
                                                        <Route path="/packed-orders-list"                               exact strict component={PackedOrdersList} />
                                                        <Route path="/inspected-orders-list"                            exact strict component={InspectedOrdersList} />
                                                        <Route path="/approved-orders-list"                             exact strict component={ApprovedOrdersList} />
                                                        <Route path="/dispatched-orders-list"                           exact strict component={DispatchedOrdersList} />
                                                        <Route path="/delivery-initiated-orders"                        exact strict component={DeliveryInitiatedOrders} />
                                                        <Route path="/delivered-orders-list"                            exact strict component={DeliveredOrders} />
                                                        <Route path="/returned-products"                                exact strict component={ReturnProducts} />

                                                        <Route path="/viewOrder/:orderID"                               exact strict component={viewOrder} />

                                                        { /*Ba List*/}
                                                        <Route path="/ba-list"                                          exact strict component={BaList} />
                                                        <Route path="/editBA/:BaId"                                     exact strict component={AddNewBA} />
                                                        <Route path="/BA/locationDetails/:locationEdit/:BaId"           exact strict component={AddNewBA} />
                                                        <Route path="/BA/contactDetails/:contactEdit/:BaId"             exact strict component={AddNewBA} />
                                                        <Route path="/addNewBA"                                         exact strict component={AddNewBA} />


                                                        {/*Report*/}
                                                        <Route path="/report"                                           exact strict component={Reports} />

                                                        <Route path="/category-wise-reports"                            exact strict component={CategoryWiseReports} />

                                                        <Route path="/productreview"                                    exact strict component={Productreview} />

                                                        {/*CMS*/}
                                                        
                                                        {/*purchase-management*/}
                                                        <Route path="/purchase-management"                              exact strict component={ PurchaseManagement } />
                                                        <Route path="/raw-material-stock-report"                        exact strict component={ RawMaterialStockReport } />
                                                        <Route path="/purchase-management/:purchaseId"                  exact strict component = { PurchaseManagement }  />
                                                        <Route path="/finished-goods"                                   exact strict component={FinishedGoods} />
                                                        <Route path="/franchise-product-stock"                          exact strict component={FranchiseCurrentStock} />
                                                        <Route path="/finished-goods/:finishedGoodId"                   exact strict component={FinishedGoods} />
                                                        <Route path="/distribution"                                     exact strict component={ Distribution } />
                                                        <Route path="/distribution/:purchaseId"                         exact strict component = { Distribution }  />
                                                        <Route path="/franchise_delivery_challan/:distributionId"       exact strict component = { FranchiseDeliveryChallan }  />
                                                        <Route path="/franchise_distribution/:orderId"                  exact strict component = { FranchiseDistribution }  />
                                                        <Route path="/delivery_challan/:purchaseId"                     exact strict component = { DeliveryChallans }  />

                                                        <Route path="/discount-management"                     exact strict component = { DiscountManagement }  />
                                                        <Route path="/discount-management/:editId"                     exact strict component = { DiscountManagement }  />

                                                        
                                                        {/* Admin shopping List AdminShoppingList*/}
                                                        <Route path="/admin-shopping-list"                              exact strict component={AdminShoppingList} />

                                                        {/* Master Data */}
                                                        <Route path="/project-master-data"          render={(props)=><MasterData {...props}/> } exact />
                                                        <Route path="/project-master-data/:editId"  render={(props)=><MasterData {...props}/> } exact />
                                                        <Route path="/project-master-data/oneField/:oneFieldEditId" render={(props)=><MasterData {...props}/> } exact />
                                                        <Route path="/reset-password" exact strict component={ResetPwd} />
                                                        
                                                        {/* discount-management */}
                                                        
                                                      </Switch>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Footer />
                    </div>
                </Router>
            );
        }
    } else {
            return (
                <div>
                    <Router >
                        <Switch >
                            <Route path="/" exact strict component={Login} />
                            <Route path="/login" exact strict component={Login} />
                            <Route path="/signup" exact strict component={SignUp} />
                            <Route path="/forgotpassword" exact strict component={ForgotPassword} />
                            <Route path="/reset-pwd/:user_ID" exact strict component={ResetPassword} />
                            {/* <Route path="/reset-password" exact strict component={ResetPwd} /> */}
                            <Route path="/confirm-otp/:userID" exact strict component={ConfirmOtp} />
                        </Switch>
                    </Router>
                </div>
            );
        }
    }
}

 
export default Layout;