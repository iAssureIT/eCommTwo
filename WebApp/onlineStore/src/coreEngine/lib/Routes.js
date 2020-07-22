import React,{Component}                          from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/modal.js';
import 'bootstrap/js/collapse.js';
import 'bootstrap/js/tab.js';
import 'font-awesome/css/font-awesome.min.css';
import $ from 'jquery';

import '../../App.css';
//-----------Main Menu Rout.................//
import Header                   from '../common/Header/Header.js';
// import Header_Unimandai         from '../common/Header/Header_Unimandai.js';
import Footer                   from '../common/Footer/Footer.js'; 
import Footer_Unimandai         from '../common/Footer/Footer_Unimandai.js'; 
import HomePage                 from '../pages/HomePage/HomePage.js';
import Unimandai_Homepage       from '../pages/HomePage/Unimandai_Homepage.js';
import UnimandaiHeader          from '../common/Header/UnimandaiHeader.js';

//-----------Syatem Security Rout.................//

import Login                                     from '../systemSecurity/Login.js';
import ConfirmOtp                                from '../systemSecurity/ConfirmOtp.js'; 
// import ForgotPasswordOld                         from '../systemSecurity/ForgotPasswordOld.js';
import ForgotPassword                            from '../systemSecurity/ForgotPassword.js';
// import ResetPasswordOld                          from '../systemSecurity/ResetPasswordOld.js';
import ResetPassword                             from '../systemSecurity/ResetPassword.js';
import SignUp                                    from '../systemSecurity/SignUp.js';
import VerifyAccount                             from '../systemSecurity/VerifyAccount.js';
import Cart                                      from '../pages/Cart/Cart.js';
import Checkout                                  from '../pages/Checkout/Checkout.js';
import ViewOrder                                 from '../pages/MyOrders/ViewOrder.js'
import Edituser                                  from '../pages/Edituser/Edituser.js';
import MyOrders                                  from '../pages/MyOrders/MyOrders.js';
import MyOrders_Unimandai                        from '../pages/MyOrders/MyOrders_Unimandai.js';
import ShipmentTracking                          from '../pages/ShipmentTracking/ShipmentTracking.js';
import ProductDetailsEcommerce                   from '../pages/ProductDetailsEcommerce/ProductDetailsEcommerce.js';
import SearchProduct                             from '../pages/ProductCollage/SearchProductPage.js';
// import ProductCollage                            from '../pages/ProductCollage/ProductCollageOld.js';
import ProductCollage                            from '../pages/ProductCollage/ProductCollage.js';

import Payment                                   from '../pages/Payment/Payment.js';
import Wishlist                                  from '../pages/Wishlist/Wishlist.js';
import wishlist_unimandai                        from '../pages/Wishlist/wishlist_unimandai.js';
import Productreview                             from '../pages/Productreview/Productreview.js';
import Account                                   from '../pages/Account/Account.js';
import EditAccount                               from '../pages/EditAccount/EditAccount.js';
// import Address                                   from '../pages/Address/Address.js';
import AddressBook                               from '../pages/AddressBook/AddressBook.js';
import PrivacyPolicy                             from "../pages/PrivacyPolicy/PrivacyPolicy.js";
import Aboutuspage                               from "../pages/Aboutuspage/Aboutuspage.js";
import ReturnPolicy                              from '../pages/ReturnPolicy/ReturnPolicy.js';
import ContactPage                               from '../pages/ContactPage/ContactPage.js';
import TermsAndCondition                         from '../pages/TermsAndCondition/TermsAndCondition.js';
import LegalNotice                               from '../pages/LeagalNotice/LeagalNotice.js';
import SiteMap                                   from '../pages/SiteMap/SiteMap.js';

import MasterPage                from '../MasterPage/MasterPage.js';

/*unimandai static blocks*/

class Routes extends Component{
    constructor(props) {
       super(props);
        this.state = {
          loggedIn : false,
        }
      }
       
      componentDidMount(){
        
        var user_ID = localStorage.getItem("user_ID");
        if (user_ID && user_ID !=='') {
            this.setState({
            loggedIn : true
            })
        }else{
            this.setState({
            loggedIn : false
            })
        }
      }
    render(){ 
    if(process.env.REACT_APP_PROJECT_NAME === '4_UniMandai'){  
        if(this.state.loggedIn ===true ){
            const WebLayout = () => (
              <div className="skin-blue fixed sidebar-mini">    
                <Route path="/" exact strict component={ Unimandai_Homepage } /> 
                <Route path="/login"                    exact strict component={ Unimandai_Homepage } />
                <Route path="/signup"                   exact strict component={ Unimandai_Homepage } />
                <Route path="/forgotpassword"           exact strict component={ Unimandai_Homepage } />
                <Route path="/resetpassword/:user_ID"   exact strict component={ Unimandai_Homepage } /> 
                <Route path="/verify-account"           exact strict component={ VerifyAccount } />
                <Route path="/confirm-otp/:user_ID"     exact strict component={ Unimandai_Homepage } /> 
                <Route path="/cart"                     exact strict component={ Cart } />
                <Route path="/checkout"                 exact strict component={ Checkout } />
                <Route path="/my-orders"                exact strict component={ MyOrders } />
                <Route path="/my-ordersUni"             exact strict component={ MyOrders_Unimandai } />
                <Route path="/view-order/:order_ID"     exact strict component={ ViewOrder } />
                <Route path="/shipment-tracking"        exact strict component={ ShipmentTracking } />
                <Route path="/productdetails/:productID"exact strict component={ ProductDetailsEcommerce } />
                <Route path="/productdetails/:productURL/:productID"             exact strict component={ ProductDetailsEcommerce } />
                <Route path="/searchProducts"           exact strict component={ SearchProduct } />
                <Route path="/section/:url/:sectionID"  exact strict component={ ProductCollage } />
                <Route path="/category/:url/:sectionID/:categoryID"            exact strict component={ ProductCollage } />
                <Route path="/subcategory/:sectionID/:categoryID/:subcategoryID"            exact strict component={ ProductCollage } />
                <Route path="/product-collage/:categoryID/:subcategoryID"   exact strict component={ ProductCollage } />
                
                <Route path="/masterpage/:pageurl"     exact strict  component={ MasterPage } /> 
                
                
                <Route path="/profile"              exact strict component={ Edituser } />
                <Route path="/payment/:order_ID"            exact strict component={ Payment } />
                <Route path="/wishlist"            exact strict component={ Wishlist } />
                <Route path="/wishlistuni"            exact strict component={ wishlist_unimandai } />
                <Route path="/productreview"            exact strict component={ Productreview } />
                <Route path="/account"            exact strict component={ Account } />
                <Route path="/edit"            exact strict component={ EditAccount } />
                <Route path="/address-book"            exact strict component={ AddressBook } />
                {/* <Route path="/address/:deliveryAddressID"            exact strict component={ Address } /> */}
                {/* <Route path="/address"            exact strict component={ Address } /> */}
                <Route path="/returnpolicy"            exact strict component={ ReturnPolicy } />
                <Route path="/privacypolicy"             exact strict component={PrivacyPolicy}  />
                <Route path="/about-us"             exact strict component={Aboutuspage}  />
                <Route path="/sitemap" exact strict component={SiteMap}  />
                <Route path="/contact-us" exact strict component={ContactPage}  />
                <Route path="/legal-notice" exact strict component={LegalNotice}  />            
              </div>
            );
            return (
            <div>
              <Router>
                <UnimandaiHeader />
                <Switch>
                    <Route path="/" component={ WebLayout } />
                    {/*<Route path="/masterpage/:pageurl"     exact strict  component={ MasterPage } /> */}

                </Switch>
                <Footer_Unimandai />
              </Router>
            </div>
            );
        }  
    else{
        const WebLayout = () => (
          <div className="skin-blue fixed sidebar-mini">    
            <Route path="/" exact strict component={ Unimandai_Homepage } /> 
            <Route path="/login"                    exact strict component={ Login } />
            <Route path="/signup"                   exact strict component={ SignUp } />
            <Route path="/forgotpassword"           exact strict component={ ForgotPassword } />
            <Route path="/resetpassword/:user_ID"   exact strict component={ ResetPassword } />
            <Route path="/verify-account"           exact strict component={ VerifyAccount } />
            <Route path="/confirm-otp/:user_ID"     exact strict component={ ConfirmOtp } />
            <Route path="/productdetails/:productID"exact strict component={ ProductDetailsEcommerce } />
            <Route path="/productdetails/:productURL/:productID"             exact strict component={ ProductDetailsEcommerce } />
            <Route path="/searchProducts"           exact strict component={ SearchProduct } />
            <Route path="/section/:url/:sectionID"  exact strict component={ ProductCollage } />
            <Route path="/category/:url/:sectionID/:categoryID"            exact strict component={ ProductCollage } />
            <Route path="/subcategory/:sectionID/:categoryID/:subcategoryID"        exact strict component={ ProductCollage } />
            <Route path="/product-collage/:categoryID/:subcategoryID"   exact strict component={ ProductCollage } />
            <Route path="/productreview"            exact strict component={ Productreview } />
            <Route path="/returnpolicy"            exact strict component={ ReturnPolicy } />
            <Route path="/privacypolicy"             exact strict component={PrivacyPolicy}  />
            <Route path="/about-us"             exact strict component={Aboutuspage}  />
            <Route path="/sitemap" exact strict component={SiteMap}  />
            {/* <Route path="/contact-us" exact strict component={Login}  /> */}
            <Route path="/cart"                     exact strict component={ Login } />
            <Route path="/checkout"                 exact strict component={ Login } />
            <Route path="/my-ordersUni"                exact strict component={ Login } />
            <Route path="/view-order/:order_ID"     exact strict component={ Login } />
            <Route path="/shipment-tracking"        exact strict component={ Login } />
            <Route path="/profile"              exact strict component={ Login } />
            <Route path="/payment/:order_ID"            exact strict component={ Login } />
            
            <Route path="/wishlistuni"            exact strict component={ Login } />
            <Route path="/account"            exact strict component={ Login } />
            <Route path="/edit"            exact strict component={ Login } />
            <Route path="/address-book"            exact strict component={ Login } />
            <Route path="/address/:deliveryAddressID"            exact strict component={ Login } />
            <Route path="/address"            exact strict component={ Login } />
            <Route path="/contact-us" exact strict component={ContactPage}  />
            <Route path="/terms-conditions" exact strict component={TermsAndCondition}  />
            <Route path="/legal-notice" exact strict component={LegalNotice}  /> 
            <Route path="/masterpage/:pageurl"     exact strict  component={ MasterPage } />            
            
          </div>
        );
        return (
        <div>
          <Router>
            <UnimandaiHeader />
            <Switch>
              <Route path="/" component={ WebLayout } />
            </Switch>
            <Footer_Unimandai />
          </Router>
        </div>
        );
    }
   }
   else{
   
       if(this.state.loggedIn ===true ){

        const WebLayout = () => (
          <div className="skin-blue fixed sidebar-mini">    
            <Route path="/" exact strict component={ HomePage } /> 
            <Route path="/login"                    exact strict component={ HomePage } />
            <Route path="/signup"                   exact strict component={ HomePage } />
            <Route path="/forgotpassword"           exact strict component={ HomePage } />
            <Route path="/resetpassword/:user_ID"   exact strict component={ HomePage } /> 
            <Route path="/verify-account"           exact strict component={ VerifyAccount } />
            <Route path="/confirm-otp/:user_ID"     exact strict component={ HomePage } /> 
            <Route path="/cart"                     exact strict component={ Cart } />
            <Route path="/checkout"                 exact strict component={ Checkout } />
            <Route path="/my-orders"                exact strict component={ MyOrders } />
            <Route path="/view-order/:order_ID"     exact strict component={ ViewOrder } />
            <Route path="/shipment-tracking"        exact strict component={ ShipmentTracking } />
            <Route path="/productdetails/:productID"             exact strict component={ ProductDetailsEcommerce } />
            <Route path="/productdetails/:productURL/:productID"             exact strict component={ ProductDetailsEcommerce } />
            <Route path="/searchProducts"           exact strict component={ SearchProduct } />
            <Route path="/section/:url/:sectionID"  exact strict component={ ProductCollage } />
            <Route path="/category/:url/:sectionID/:categoryID"            exact strict component={ ProductCollage } />
            <Route path="/subcategory/:sectionID/:categoryID/:subcategoryID"            exact strict component={ ProductCollage } />
            <Route path="/product-collage/:categoryID/:subcategoryID"   exact strict component={ ProductCollage } />
            
            <Route path="/profile"              exact strict component={ Edituser } />
            <Route path="/payment/:order_ID"            exact strict component={ Payment } />
            <Route path="/wishlist"            exact strict component={ Wishlist } />
            <Route path="/productreview"            exact strict component={ Productreview } />
            <Route path="/account"            exact strict component={ Account } />
            <Route path="/edit"            exact strict component={ EditAccount } />
            <Route path="/address-book"            exact strict component={ AddressBook } />
            {/* <Route path="/address/:deliveryAddressID"            exact strict component={ Address } /> */}
            {/* <Route path="/address"            exact strict component={ Address } /> */}
            <Route path="/returnpolicy"            exact strict component={ ReturnPolicy } />
            <Route path="/privacypolicy"             exact strict component={PrivacyPolicy}  />
            <Route path="/about-us"             exact strict component={Aboutuspage}  />
            <Route path="/sitemap" exact strict component={SiteMap}  />
            <Route path="/contact-us" exact strict component={ContactPage}  />
            <Route path="/terms-conditions" exact strict component={TermsAndCondition}  />
            <Route path="/legal-notice" exact strict component={LegalNotice}  />
          </div>
        );
        return (
        <div>
          <Router>
            <Header />
            <Switch>
              <Route path="/" component={ WebLayout } />
            </Switch>
            <Footer />
          </Router>
        </div>
        );
    }  
    else{
        //const weburls = new Array('cart','checkout','my-orders','view-order','shipment-tracking','profile',);
        const WebLayout = () => (
          <div className="skin-blue fixed sidebar-mini">    
            <Route path="/" exact strict component={ HomePage } /> 
            <Route path="/login"                    exact strict component={ Login } />
            <Route path="/signup"                   exact strict component={ SignUp } />
            <Route path="/forgotpassword"           exact strict component={ ForgotPassword } />
            <Route path="/resetpassword/:user_ID"   exact strict component={ ResetPassword } />
            <Route path="/verify-account"           exact strict component={ VerifyAccount } />
            <Route path="/confirm-otp/:user_ID"     exact strict component={ ConfirmOtp } />
            <Route path="/productdetails/:productID"exact strict component={ ProductDetailsEcommerce } />
            <Route path="/productdetails/:productURL/:productID"             exact strict component={ ProductDetailsEcommerce } />
            <Route path="/searchProducts"           exact strict component={ SearchProduct } />
            <Route path="/section/:url/:sectionID"  exact strict component={ ProductCollage } />
            <Route path="/category/:url/:sectionID/:categoryID"            exact strict component={ ProductCollage } />
            <Route path="/subcategory/:sectionID/:categoryID/:subcategoryID"            exact strict component={ ProductCollage } />
            <Route path="/product-collage/:categoryID/:subcategoryID"   exact strict component={ ProductCollage } />
            <Route path="/productreview"            exact strict component={ Productreview } />
            <Route path="/returnpolicy"            exact strict component={ ReturnPolicy } />
            <Route path="/privacypolicy"             exact strict component={PrivacyPolicy}  />
            <Route path="/about-us"             exact strict component={Aboutuspage}  />
            <Route path="/sitemap" exact strict component={SiteMap}  />
            <Route path="/contact-us" exact strict component={Login}  />
            <Route path="/cart"                     exact strict component={ Login } />
            <Route path="/checkout"                 exact strict component={ Login } />
            <Route path="/my-orders"                exact strict component={ Login } />
            <Route path="/view-order/:order_ID"     exact strict component={ Login } />
            <Route path="/shipment-tracking"        exact strict component={ Login } />
            <Route path="/profile"              exact strict component={ Login } />
            <Route path="/payment/:order_ID"            exact strict component={ Login } />
            
            <Route path="/wishlist"            exact strict component={ Login } />
            <Route path="/account"            exact strict component={ Login } />
            <Route path="/edit"            exact strict component={ Login } />
            <Route path="/address-book"            exact strict component={ Login } />
            <Route path="/address/:deliveryAddressID"            exact strict component={ Login } />
            <Route path="/address"            exact strict component={ Login } />
            <Route path="/terms-conditions" exact strict component={TermsAndCondition}  />
            <Route path="/legal-notice" exact strict component={LegalNotice}  />            
          </div>
        );
        return (
        <div>
          <Router>
            <Header />
            <Switch>
              <Route path="/" component={ WebLayout } />
            </Switch>
            <Footer />
          </Router>
        </div>
        );
      }
   
     }
    }
 }

export default Routes;