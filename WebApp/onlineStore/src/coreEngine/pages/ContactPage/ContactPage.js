import React, { Component } from 'react';
import jQuery from "jquery";
import axios                    from 'axios';
import Message from '../../blocks/Message/Message.js';
import $ from "jquery";
import Loader from "../../common/loader/Loader.js";

import BannerContactUs from '../ContactUs/BannerContactUs/BannerContactUs.js';
import CUform from '../ContactUs/CUform/CUform.js';
import ContactShopList from '../ContactUs/ContactShopList/ContactShopList.js';
import CUMap from '../ContactUs/CUMap/CUMap.js';

import "../../../sites/currentSite/pages/ContactPage.css";

class ContactPage extends Component{
    constructor(props) {
        super(props);
        this.state={
            message:"",
            companyInfo : []
        }
    }

    render(){
        return(          
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <Message messageData={this.state.messageData} />
              <BannerContactUs/>
              <CUform/>
              <ContactShopList/>
              <CUMap/>
            </div>             
          
        )
    }
}
export default ContactPage;