import React,{Component}  from 'react';
import { render }         from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './Footer.css';

export default class Footer extends Component{
  
  constructor(props) {
   super(props);
    this.state = {}
  }
  componentDidMount(){
 
  }
  render(){
    return(
      <footer  className="main-footer col-lg-12 col-md-12 col-sm-12 col-xs-12  fontSize14">
        <div className="col-lg-5 col-md-5 col-sm-5 col-xs-12">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding"><b><span className="">Copyright © 2020</span> <a href="/" className="footerLeftCss">iAssureIT.</a></b><span className="footclr">&nbsp;&nbsp;All rights
            reserved.</span>
          </div>
        </div>
        <div className="col-lg-7 col-md-7 col-sm-7 col-xs-12">
          <p className="pull-right footerRightCss"><b>Version 1.5</b></p>
          <p className="footerRightCss1">Design & Developed by <a href="http://iassureit.com">iAssure International Technology Pvt Ltd</a>&nbsp;&nbsp;</p>
        </div>
      </footer>
    );
  }
}


