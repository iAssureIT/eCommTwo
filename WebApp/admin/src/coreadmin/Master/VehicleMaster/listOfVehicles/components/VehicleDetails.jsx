import React, { Component }   from 'react';
import $                      from 'jquery';
import axios                  from 'axios';
import moment 				  from 'moment';	
import {withRouter}  		  from 'react-router-dom';
import swal                   from 'sweetalert';
import _                      from 'underscore';
import OwlCarousel 		 	  from 'react-owl-carousel';

import 'bootstrap/js/tab.js';
import '../css/ListOfVehicles.css';
import '../css/ListOfEntityFilter.css';
import '../css/ListOfAllEntity.css';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';


class VendorsDetails extends Component {
	
	constructor(props) {
      super(props);
    
      this.state = {
      	id : '',
        loadMore: false,
        loadless: false,
        imgUrl:"/images/desire.jpg",
         responsive:{
		        0:{
		            items:1,
		            nav:true
		        },
		        600:{
		            items:3,
		            nav:false
		        },
		        1000:{
		            items:5,
		            nav:true,
		            loop:false
		        }
			}
      };
      // this.handleChange = this.handleChange.bind(this);
      this.isLoaded = false
    }
    componentWillReceiveProps(nextProps){
    	this.setState({
  			id : nextProps.id
  		},()=>{

  			axios.get("/api/vehiclemaster/get/one/"+this.state.id)
            .then((response)=>{
          	
              this.setState({
                  vehicleInfo : response.data
              },()=>{
              	
              	
              });
            })
            .catch((error)=>{
            })
  		})
    }
	componentDidMount(){
		
		this.setState({
  			id : this.props.id
  		},()=>{

  			axios.get("/api/entitymaster/get/one/"+this.state.id)
            .then((response)=>{
          	
              this.setState({
                  vehicleInfo : response.data
              },()=>{
              	
              });
            })
            .catch((error)=>{
            })
  		})
  	}
  	
  	
  	LocationEdit(event){
    	this.props.history.push("/"+this.state.entityType+'/location-details/'+event.currentTarget.getAttribute('data-entityID')+'/'+event.currentTarget.getAttribute('data-locationID'))
    	
    }
    
    contactEdit(event){
    	this.props.history.push("/"+this.state.entityType+'/contact-details/'+event.currentTarget.getAttribute('data-entityID')+'/'+event.currentTarget.getAttribute('data-locationID'))
    }

    showMore(event) { 
		$('.listProduct').addClass('showList');
		$('.listProduct').removeClass('hide');
		this.setState({
			'loadless':true,
		})
	}
	showLess(event) {
		$('.listProduct').addClass('hide');
		$('.listProduct').removeClass('showList');
		this.setState({
			'loadless':false,
		})
	}
	editBasicform(event){
    	this.props.history.push('/vehicle-master/'+event.currentTarget.getAttribute('data-id'))
    }
    deleteVehicle(event){
		event.preventDefault();
		console.log(event.currentTarget.getAttribute('data-id'))
		this.setState({deleteID: event.currentTarget.getAttribute('data-id')})
		$('#deleteVehicleModal').show();
    }
    confirmDelete(event){
    	event.preventDefault();
    	axios.delete("/api/vehiclemaster/delete/"+this.state.deleteID)
            .then((response)=>{
           		console.log(response.data.deleted) 
           		if (response.data.deleted) {
           			swal({
	                    text : "Vehicle is deleted successfully.",
	                  });
           		}	else{
           			swal({
	                    text : "Failed to delete.",
	                  });
           		}
              this.props.getVehicles();
              this.props.hideForm();
              $('#deleteVehicleModal').hide();   

            })
            .catch((error)=>{
            })
    }
    closeModal(event){
    	event.preventDefault();
    	$('#deleteVehicleModal').hide(); 
    }
    getImage(event)
    {
    	event.preventDefault();
		var v = event.currentTarget.getAttribute("src");
		var x = document.getElementById("abc")
		this.setState({
			imgUrl:v
		})
	}
		
	render() {

       	return (	
       			this.state.vehicleInfo ? 
		        <div>
		            <div className="row">	
		            {console.log(this.state.vehicleInfo)}                   					  
					        <div id="supplierprofile" className="col-lg-12 col-md-12 col-sm-12 col-xs-12 boxshade">					   
					        	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 singleClientDetails" data-child={this.state.vehicleInfo._id} id={this.state.vehicleInfo._id}>
									
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 contentOfList textAlignCenter">
										<h5 className="titleprofile">{this.state.vehicleInfo.brand} {this.state.vehicleInfo.model} </h5>
										<h5 className="titleprofile"></h5>
										<div className="dots dropdown1 col-lg-12 col-md-6 col-sm-6 col-xs-6">
											<i className="fa fa-ellipsis-h dropbtn1 dropbtn2 buttonDrop3" aria-hidden="true"></i>
						        			<div className="dropdown-content1 dropdown2-content2">
												<ul className="pdcls ulbtm">
													<li id={this.state.vehicleInfo._id} className="styleContactActbtn" data-index data-id={this.state.vehicleInfo._id} onClick={this.editBasicform.bind(this)}>	
												    	<a><i className="fa fa-pencil penmrleft" aria-hidden="true" ></i>&nbsp;&nbsp;<span className="mrflfedit">Edit</span></a>
												    </li>
												    <li id className="styleContactActbtn" data-id={this.state.vehicleInfo._id} onClick={this.deleteVehicle.bind(this)} >
												    	<a><i className="fa fa-trash-o" aria-hidden="true" ></i>&nbsp;Delete</a>
												    </li>
											    </ul>
											</div>
										</div>
										<div className="col-lg-12 col-md-12 col-sm-9 col-xs-9">
											<OwlCarousel
											    className="owl-theme customnNavButtonEcommerceND col-md-12 col-lg-12 col-sm-12 col-xs-12 boxShadow"
											    	loop
												    margin 			=  {20}
												    items  			=  {1}
												    nav    			=  {0}
												    dots   			=  {0}
												    responsiveClass =  {true}
												    autoplay        =  {true}
													>
												   {   
												   	this.state.vehicleInfo.vehicleImage
									                    ?
									                      this.state.vehicleInfo.vehicleImage.map((data, index) => {
									                        return (
									                           <div className="item customItem" key={index}>
									                          	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 imgContainerBlog ">
																	<div className="row">
																		<img src={data} id="abc"/>
																	</div>
																</div>
									                          </div>
									                        );
									                      })
									                      :
									                      null
									                }
												
											</OwlCarousel>

											<div className="col-lg-12 col-md-12 col-sm-9 col-xs-9">
											{
											 	this.state.vehicleInfo
									             ?
							                      this.state.vehicleInfo.vehicleImage.slice(0,4).map((data, index) => {
							                        return (

							                          <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 miniDiv" key={index} >
							                          
														<img src={data} onClick={this.getImage.bind(this)} id="abc"/>
													</div>
							                        );
							                      })
							                      :
							                      null
									         }
											</div>
										</div>
										<div className="col-lg-12 col-md-12 col-sm-9 col-xs-9 ">
											<div className="col-lg-4 col-md-12 col-sm-12 col-xs-12 mt20 noPadding">
												<label>Capacity</label> <br/>
												{this.state.vehicleInfo.capacity+" Seats"}
											</div>
											<div className="col-lg-4 col-md-12 col-sm-12 col-xs-12 mt20 noPadding">
													<label>Fuel Type</label> <br/>
												{this.state.vehicleInfo.fuelType}
											</div>
											<div className="col-lg-4 col-md-12 col-sm-12 col-xs-12 mt20 noPadding">
													<label>Vehicle Number</label> <br/>
												{this.state.vehicleInfo.vehicleNumber}
											</div>
											
										</div>
										<div className="col-lg-12 col-md-12 col-sm-9 col-xs-9 ">
											<div className="col-lg-4 col-md-12 col-sm-12 col-xs-12 mt20 noPadding">
													<label>Ownership</label> <br/>
												{this.state.vehicleInfo.ownership}
											</div>
											<div className="col-lg-4 col-md-12 col-sm-12 col-xs-12 mt20 noPadding">
												<label>Vehicle Drive Type</label> <br/>
												{this.state.vehicleInfo.vehicleDriveType}
											</div>
											<div className="col-lg-4 col-md-12 col-sm-12 col-xs-12 mt20 noPadding">
													<label>Permit Type</label> <br/>
												{this.state.vehicleInfo.permitType}
											</div>
											
										</div>
										
										<div className="col-lg-12 col-md-12 col-sm-9 col-xs-9 mt20 documentUplaod">
											<div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
												<label>Insurance Valid Upto</label> <br/>
												{moment(this.state.vehicleInfo.insuranceDate).format("DD-MM-YYYY")}
											</div>
											<div className="col-lg-8 col-md-4 col-sm-4 col-xs-4 documents">
												<label>Documents</label> <br/>
												{   
													this.state.vehicleInfo.FitnessDoc && this.state.vehicleInfo.FitnessDoc.length>0 ?
													this.state.vehicleInfo.insuranceDoc.map((data,index)=>{
														return(

															<a href={data} target="_blank"  download className="col-lg-4 pdfContainer noPadding">

							                                  {
							                                    (data.split('.').pop() ==="pdf" ||data.split('.').pop() === "PDF") ? 
								                                    <img className="fileExt" src="/images/pdfImg.png"/> 
							                                    :
							                                    ""
							                                  }
							                                  {
							                                    (data.split('.').pop() ==="png" || data.split('.').pop() === "jpeg" || data.split('.').pop() === "jpg" ||data.split('.').pop() ==="png"|| data.split('.').pop() ==="JPEG" || data.split('.').pop() === "PNG") ? 
							                                    	<img className="fileExt" src={data}/> 
							                                    : 
													             <img className="fileExt" src="/images/Dummyimg1.jpg"/>
							                                  }
                                 
															<h6>{data.split('/')[4]}</h6>
															</a>
														);

													}) 
													:
													null
												}
												
											</div>
										</div>
										<div className="col-lg-12 col-md-12 col-sm-9 col-xs-9 mt20 documentUplaod">
											<div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
												<label>Registration Date </label> <br/>
												{moment(this.state.vehicleInfo.registrationDate).format("DD-MM-YYYY")}
											</div>
											<div className="col-lg-8 col-md-4 col-sm-4 col-xs-4 documents">
												<label>Documents</label> <br/>
												{
													this.state.vehicleInfo.RCDoc && this.state.vehicleInfo.RCDoc.length>0 ?
													this.state.vehicleInfo.RCDoc.map((data,index)=>{
														return(

															<a href={data} target="_blank" download className="col-lg-4 pdfContainer noPadding">

							                                  {
							                                    (data.split('.').pop() ==="pdf" ||data.split('.').pop() === "PDF") ? 
								                                    <img className="fileExt" src="/images/pdfImg.png"/> 
							                                    :
							                                    ""
							                                  }
							                                  {
							                                    (data.split('.').pop() ==="png" || data.split('.').pop() === "jpeg" || data.split('.').pop() === "jpg" ||data.split('.').pop() ==="png"|| data.split('.').pop() ==="JPEG" || data.split('.').pop() === "PNG") ? 
							                                    	<img className="fileExt" src={data}/> 
							                                    : ""
							                                  }
                                 
															<h6>{data.split('/')[4]}</h6>
															</a>
														);

													}) 
													:
							                        <img className="fileExt" src="/images/Dummyimg1.jpg"/>
												}
											</div>
										</div>
										<div className="col-lg-12 col-md-12 col-sm-9 col-xs-9 mt20 documentUplaod">
											<div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
												<label>Permit valid upto</label> <br/>
												{moment(this.state.vehicleInfo.permitValidUpto).format("DD-MM-YYYY")}
											</div>
											{
												this.state.vehicleInfo.permitDoc.length > 0?
													<div className="col-lg-8 col-md-4 col-sm-4 col-xs-4 documents">
														<label>Documents</label> <br/>
														{
															this.state.vehicleInfo.permitDoc.map((data,index)=>{
																return(

																	<a href={data} target="_blank"  download className="col-lg-4 pdfContainer noPadding">

									                                  {
									                                    (data.split('.').pop() ==="pdf" ||data.split('.').pop() === "PDF") ? 
										                                    <img className="fileExt" src="/images/pdfImg.png"/> 
									                                    :
									                                    ""
									                                  }
									                                  {
									                                    (data.split('.').pop() ==="png" || data.split('.').pop() === "jpeg" || data.split('.').pop() === "jpg" ||data.split('.').pop() ==="png"|| data.split('.').pop() ==="JPEG" || data.split('.').pop() === "PNG") ? 
									                                    	<img className="fileExt" src={data}/> 
									                                    : ""
									                                  }
		                                 
																	<h6>{data.split('/')[4]}</h6>
																	</a>
																);

															}) 
														}
													</div>
												:
												 <img className="fileExt" src="/images/Dummyimg1.jpg"/>

											}
										</div>
										<div className="col-lg-12 col-md-12 col-sm-9 col-xs-9 mt20 documentUplaod">
											<div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
												<label>Authorized valid upto</label> <br/>
												{moment(this.state.vehicleInfo.authorizationUpto).format("DD-MM-YYYY")}
											</div>
											<div className="col-lg-8 col-md-4 col-sm-4 col-xs-4 documents">
												<label>Documents</label> <br/>
												{
													this.state.vehicleInfo.authorizationDoc && this.state.vehicleInfo.authorizationDoc.length>0 ?
													this.state.vehicleInfo.authorizationDoc.map((data,index)=>{
														return(

															<a href={data}  target="_blank" download className="col-lg-4 pdfContainer noPadding">

							                                  {
							                                    (data.split('.').pop() ==="pdf" ||data.split('.').pop() === "PDF") ? 
								                                    <img className="fileExt" src="/images/pdfImg.png"/> 
							                                    :
							                                    ""
							                                  }
							                                  {
							                                    (data.split('.').pop() ==="png" || data.split('.').pop() === "jpeg" || data.split('.').pop() === "jpg" ||data.split('.').pop() ==="png"|| data.split('.').pop() ==="JPEG" || data.split('.').pop() === "PNG") ? 
							                                    	<img className="fileExt" src={data}/> 
							                                    :"" 
							                                  }
                                 
															<h6>{data.split('/')[4]}</h6>
															</a>
														);

													}) 
													:
							                         <img className="fileExt" src="/images/Dummyimg1.jpg"/>

												}
											</div>
										</div>
										<div className="col-lg-12 col-md-12 col-sm-9 col-xs-9 mt20 documentUplaod">
											<div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
												<label>PUC valid upto</label> <br/>
												{moment(this.state.vehicleInfo.PUCUpto).format("DD-MM-YYYY")}
											</div>
											<div className="col-lg-8 col-md-4 col-sm-4 col-xs-4 documents">
												<label>Documents</label> <br/>
												{ 
													this.state.vehicleInfo.PUCDoc && this.state.vehicleInfo.PUCDoc.length>0 ?
													this.state.vehicleInfo.PUCDoc.map((data,index)=>{
														return(

															<a href={data} target="_blank" download className="col-lg-4 pdfContainer noPadding">

							                                  {
							                                    (data.split('.').pop() ==="pdf" ||data.split('.').pop() === "PDF") ? 
								                                    <img className="fileExt" src="/images/pdfImg.png"/> 
							                                    :
							                                    ""
							                                  }
							                                  {
							                                    (data.split('.').pop() ==="png" || data.split('.').pop() === "jpeg" || data.split('.').pop() === "jpg" ||data.split('.').pop() ==="png"|| data.split('.').pop() ==="JPEG" || data.split('.').pop() === "PNG") ? 
							                                    	<img className="fileExt" src={data}/> 
							                                    :""
							                                  }
                                 
															<h6>{data.split('/')[4]}</h6>
															</a>
														);

													}) 
													:
							                        <img className="fileExt" src="/images/Dummyimg1.jpg"/>

												}
											</div>
										</div>
										<div className="col-lg-12 col-md-12 col-sm-9 col-xs-9 mt20 documentUplaod">
											{
											this.state.vehicleInfo.FitnessDoc ?
											<div>
												<div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
													<label>Fitness valid upto</label> <br/>
													{moment(this.state.vehicleInfo.FitnessUpto).format("DD-MM-YYYY")}
												</div>
												<div className="col-lg-8 col-md-4 col-sm-4 col-xs-4 documents">
													<label>Documents</label> <br/>
													{
														this.state.vehicleInfo.FitnessDoc && this.state.vehicleInfo.FitnessDoc.length>0 ?
														this.state.vehicleInfo.FitnessDoc.map((data,index)=>{
															return(

																<a href={data} target="_blank" download className="col-lg-4 pdfContainer noPadding">

								                                  {
								                                    (data.split('.').pop() ==="pdf" ||data.split('.').pop() === "PDF") ? 
									                                    <img className="fileExt" src="/images/pdfImg.png"/> 
								                                    :
								                                    ""
								                                  }
								                                  {
								                                    (data.split('.').pop() ==="png" || data.split('.').pop() === "jpeg" || data.split('.').pop() === "jpg" ||data.split('.').pop() ==="png"|| data.split('.').pop() ==="JPEG" || data.split('.').pop() === "PNG") ? 
								                                    	<img className="fileExt" src={data}/> 
								                                    :""
								                                  }
	                                 
																<h6>{data.split('/')[4]}</h6>
																</a>
															);

														}) 
													  :
                                                        <img className="fileExt" src="/images/Dummyimg1.jpg"/>
													}
												</div>
											</div>

											:
											null
										    }
										</div>
									</div>
								</div>
					        	<br/>
					        </div>
	                  	  </div>

	                  	<div className="modal" id="deleteVehicleModal" role="dialog">
				          <div className="adminModal adminModal-dialog col-lg-12 col-md-12 col-sm-12 col-xs-12">
				            <div className="modal-content adminModal-content col-lg-4 col-lg-offset-4 col-md-6 col-md-offset-3 col-sm-10 col-sm-offset-1 col-xs-12 noPadding">
				              <div className="modal-header adminModal-header col-lg-12 col-md-12 col-sm-12 col-xs-12">
				                <div className="adminCloseCircleDiv pull-right  col-lg-1 col-lg-offset-11 col-md-1 col-md-offset-11 col-sm-1 col-sm-offset-11 col-xs-12 NOpadding-left NOpadding-right">
				                	<button type="button" className="adminCloseButton" data-dismiss="modal" onClick={this.closeModal.bind(this)}>&times;</button>
				                </div>
				              </div>
				              <div className="modal-body adminModal-body col-lg-12 col-md-12 col-sm-12 col-xs-12">
				              	<h4 className="blackLightFont textAlignCenter examDeleteFont col-lg-12 col-md-12 col-sm-12 col-xs-12">Are you sure, do you want to delete?</h4>
				              </div>
				              <div className="modal-footer adminModal-footer col-lg-12 col-md-12 col-sm-12 col-xs-12">
				                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                	<button type="button" className="btn adminCancel-btn col-lg-7 col-lg-offset-1 col-md-4 col-md-offset-1 col-sm-8 col-sm-offset-1 col-xs-10 col-xs-offset-1" data-dismiss="modal" onClick={this.closeModal.bind(this)}>CANCEL</button>
                                </div>
				                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
				                  	<button type="button" className="btn examDelete-btn col-lg-7 col-lg-offset-5 col-md-7 col-md-offset-5 col-sm-8 col-sm-offset-3 col-xs-10 col-xs-offset-1" data-dismiss="modal" onClick={this.confirmDelete.bind(this)} >DELETE</button>
				                </div>
				              </div>
				            </div>
				          </div>
				        </div>  

	            </div>
	            : null
	    );
	} 
}
export default withRouter(VendorsDetails); 
