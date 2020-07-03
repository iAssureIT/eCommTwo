import React, { Component } 		from 'react';
import 'bootstrap/js/collapse.js';


import "../../../sites/currentSite/pages/ReturnPolicy.css";

export default class ReturnPolicy extends Component {
	constructor(props){
    super(props);
	    this.state = {
	    	
	    	
	    };
  	}  
  	  


  render() {
		return (
				<div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 backColorEF marginTop180 returnPolicyWrapper">
					<div className="row">						
						<div className=" col-lg-12 col-md-12 col-sm-12 col-xs-12  ">
							
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  mt20  ">
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  ">										
										<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 termsAndConditionsContainer backColorWhite ">
											<label className="">Return Policy</label><br/><br/>
											<p className="">
                                                Returns is a scheme provided by respective sellers directly under this policy in terms of which the option of exchange, replacement and/ or refund is offered by the respective sellers to you. All products listed under a particular category may not have the same returns policy. For all products, the policy on the product page shall prevail over the general returns policy. Do refer the respective item's applicable return policy on the product page for any exceptions to the table below.
                                                The return policy is divided into three parts; Do read all sections carefully to understand the conditions and cases under which returns will be accepted.</p>
											<ul>
				                              <li>You can cancel your order anytime up to next day 9 am before delivery by 
                                                calling our customer care executives on 8686342020 or 8686642020. We will 
                                                issue a credit note in favour of you. Your payment will be credited to your 
                                                account wallet at unimandai.
				                              </li>
				                              <li>You can use this credit for your next purchase. There is no expiry time 
                                                    to use this credit. We have no cash refund or online return policy.  
				                              </li>
				                              <li>Ensure proper and full address at the time of registering on website. It 
                                                    will help us to deliver you our products on time. Unimandai reserves the right 
                                                    to confirm and validate the information and other details provided by you at 
                                                    any point of time. If upon confirmation your details are found not to be true 
                                                    (wholly or partly), it has the right in its sole discretion to reject the registration 
                                                    and debar you from using the Services and / or other affiliated websites 
                                                    without prior intimation whatsoever. 
				                              </li>
				                              <li>
                                                    On registering on site, you authorize our staff to contact you on phone  
                                                    regarding delivery, transportation, promotion and feedback.  
				                              </li>				                              
				                              </ul>
											

										</div>
	
									</div>
							</div>
						</div>

					</div>
				</div>
		);
	}
}
