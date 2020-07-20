import React, { Component }   from 'react';
import $                      from 'jquery';
import axios                  from 'axios';
import {withRouter}  		  		from 'react-router-dom';
import swal                   from 'sweetalert';
import IAssureTable           from './IAssureTable.jsx';
import ReactToPdf             from 'react-to-pdf';
import jspdf                 from 'jspdf';
import _                      from 'underscore';
import 'bootstrap/js/tab.js';
import './CompanyProfile.css';

class CompanyProfile extends Component {
	
	constructor(props) {
      super(props);
      this.state = {
      	id : '',
        startRange :0,
        limitRange:10,
        tableHeading      : {
	        locationType     		: "Location Type",
	        addressLine1        : "Address",
	        GSTIN           		: "GSTIN",
	        PAN           			: "PAN",
	        Document      			: "Documents",
	    },
	    tableHeadingContact     : {
	        contactDetail     	: "Name Emp ID",
	        officelocation      : "Company Branch",
	        department          : "Department Designation",
	        email          			: "Email",
	        phone          			: "Phone",
	        role          			: "Role",
	        approvingauthority1  : "Approving Authority #1",
	        approvingauthority2  : "Approving Authority #2",
	        approvingauthority3  : "Approving Authority #3",
	        preApprovedAmount  	 : "preApproved Limits",
	    },
	    tableObjects      			: {
		    deleteMethod    			: 'delete',
		    apiLink         			: '/api/packagemaster/',
		    paginationApply 			: false,
		    searchApply     			: false,
		    editUrl         			: '/package-master'
		  },
      };
  }

	componentDidMount(){
		axios.get("/api/entitymaster/get/appCompany")
    .then((response) => {
    	console.log("/api/entitymaster/get/appCompany response.data = ",response.data);
    	if(response.data.length > 0){
        this.setState({
          entityList   : response.data,
          entityID     : response.data[0]._id
        },()=>{
       	axios.get("/api/entitymaster/get/one/"+this.state.entityID)
				.then((response) => {
					console.log(" /api/entitymaster/get/one/ response.data = ",response.data);
					this.setState({
						corporateInfo : response.data[0],
						locations 	  : response.data[0].locations,
						contacts 	  : response.data[0].contactData,
					},()=>{this.getContactsTable()})
			  })
			.catch((error) => {
				console.log("Error in /api/entitymaster/get/one/ = ", error);
			})									
        })	      		
    	}else{
        this.props.history.push('/appCompany/basic-details');
      }
    })
    .catch((error) => {
			console.log("Error in /api/entitymaster/get/appCompany = ", error);
    })
  }

	getContactsTable(){
    if(this.state.corporateInfo ){
			var contacts = this.state.corporateInfo.contactData;
			console.log('contacts=====>: ',contacts)
			if(contacts){
			 var tableData = contacts.map((a, i)=>{
	 			if(a.bookingApprovalRequired == "Yes"){
	 			this.getManagerData(a.approvingAuthorityId1,a.approvingAuthorityId2,a.approvingAuthorityId3);
	 			}
        return {
          _id             	: a._id,
          contactDetail     : "Name : "+"<a  title='View profile' target='_blank' href='/employee-profile/"+(a.personID)+"'>"+a.firstName + " " + a.lastName+"</a>"+ "</br> Emp Id : "+a.employeeID+"",
          officelocation    : a.branchName ? a.branchName : " - " ,
          department      	: a.departmentName ? a.departmentName +" / "+a.designationName:" - ",
          email     				: a.email ? a.email :" - ",
          phone     				: a.phone ? a.phone :" - ",
          role     					: a.role ? a.role :" - ",
          approvingauthority1: a.bookingApprovalRequired == "Yes" ? "EmpID : " + (a.manager1Details ? a.manager1Details.employeeId:" -NA-") +" <br/> Name : "+(a.manager1Details ? a.manager1Details.firstName + " " + a.manager1Details.lastName:"-NA-") + " <br/>Phone No. "+(a.manager1Details ? a.manager1Details.contactNo:" -NA- "): "- NA -",
          approvingauthority2: a.bookingApprovalRequired == "Yes" ? "EmpID : " + (a.manager2Details ? a.manager2Details.employeeId:" -NA-") +" <br/> Name : "+(a.manager2Details ? a.manager2Details.firstName + " " + a.manager2Details.lastName:"-NA-") + " <br/>Phone No. "+(a.manager2Details ? a.manager2Details.contactNo:" -NA- "): "- NA -",
          approvingauthority3: a.bookingApprovalRequired == "Yes" ? "EmpID : " + (a.manager3Details ? a.manager3Details.employeeId:" -NA-") +" <br/> Name : "+(a.manager3Details ? a.manager3Details.firstName + " " + a.manager3Details.lastName:"-NA-") + " <br/>Phone No. "+(a.manager3Details ? a.manager3Details.contactNo:" -NA- "): "- NA -",
          preApprovedAmount: a.bookingApprovalRequired == "Yes" ? "Amount : "+(a.preApprovedAmount  ? a.preApprovedAmount : " -NA- " )+ " <br/>Kilometer :  " +(a.preApprovedKilometer ? a.preApprovedKilometer:" -NA- ") + "<br/> Rides : " +(a.preApprovedRides? a.preApprovedRides:" -NA- ") :" - ",
        }
      })
      this.setState({
        tableDataContact: tableData
      })
      console.log(this.state.tableDataContact,tableData)
			}
		}
	}

	printTicket(event){
	  var printContents = document.getElementById('pdfWrap').innerHTML;
	  var originalContents = document.body.innerHTML;
	  document.body.innerHTML = printContents;
	  window.print();
	  document.body.innerHTML = originalContents;
	}
	getManagerData(managerID1,managerID2,managerID3){
		console.log("managerID1",managerID1);
    axios.get("/api/personmaster/get/User/"+managerID1)
    .then((response) => {
    	var emp_id = response.data.data[0]._id
    	axios.get("/api/personmaster/get/one/" + emp_id)
			.then((response) => {
				console.log("man1",response)
				this.setState({
					managerId1 : response.data._id,
          manager1ID: response.data.employeeId,
          manager1contactNo: response.data.contactNo,
          manager1Name : response.data.firstName +' '+response.data.lastName,
          manager1dept : response.data.department ? response.data.department[0].department : "",
          manager1desig : response.data.designation ? response.data.designation[0].designation:"",
				});
			})
			.catch((error) => {
				console.log("error /api/personmaster/get/one/ =>",error)
			})
    })
    .catch((error) => {
      console.log('error: ',error)
    })
    axios.get("/api/personmaster/get/User/"+managerID2)
    .then((response) => {
    	var emp_id = response.data.data[0]._id
    	axios.get("/api/personmaster/get/one/" + emp_id)
			.then((response) => {
				console.log("man1",response)
				this.setState({
					managerId2 : response.data._id,
          manager2ID: response.data.employeeId,
          manager2contactNo: response.data.contactNo,
          manager2Name : response.data.firstName +' '+response.data.lastName,
          manager2dept : response.data.department ? response.data.department[0].department : "",
          manager2desig : response.data.designation ? response.data.designation[0].designation:"",
				});
			})
			.catch((error) => {
				console.log("error /api/personmaster/get/one/ =>",error)
			})
    })
    .catch((error) => {
      console.log('error: ',error)
    })
    axios.get("/api/personmaster/get/User/"+managerID3)
    .then((response) => {
    	var emp_id = response.data.data[0]._id
    	axios.get("/api/personmaster/get/one/" + emp_id)
			.then((response) => {
				console.log("man1",response)
				this.setState({
					managerId3 : response.data._id,
          manager3ID: response.data.employeeId,
          manager3contactNo: response.data.contactNo,
          manager3Name : response.data.firstName +' '+response.data.lastName,
          manager3dept : response.data.department ? response.data.department[0].department : "",
          manager3desig : response.data.designation ? response.data.designation[0].designation:"",
				});
			})
			.catch((error) => {
				console.log("error /api/personmaster/get/one/ =>",error)
			})
    })
    .catch((error) => {
      console.log('error: ',error)
    })

 	}
  getLocationsTable() {
    if(this.state.corporateInfo){
		var location = this.state.corporateInfo.locations;
		if(location){
		 var tableData = location.map((a, i)=>{
        return {
          _id             	: a._id,
          locationType     	: a.locationType,
          addressLine1      : a.addressLine2+ " " + a.addressLine1 ,
          GSTIN      				: a.GSTIN ? a.GSTIN :" - ",
          PAN     					: a.PAN ? a.PAN :" - ",
          Document          : a.GSTDocument.length>0 || a.PANDocument.length>0 ? a.GSTDocument.map((image,i)=>{return '<img src='+image+' class=" imgtabCP logoStyle" /> &nbsp;&nbsp;&nbsp;&nbsp;'}) + "" +a.PANDocument.map((image,i)=>{return '<img src='+image+' class=" imgtabCP logoStyle" />'}) :" No Image Found ",
        }
      })
      this.setState({
        tableData: tableData
      })
      console.log(this.state.tableData)
			}
		}
	}

	editBasicform(event){
    this.props.history.push("/"+this.state.corporateInfo.entityType+'/basic-details/'+event.currentTarget.getAttribute('data-id'))
  }
  download(event) {
      event.preventDefault();
      $('#headerid').hide();
      $('#editPen').hide();
      $('#statusDiv').hide();
      $('#btnDiv').hide();
      $('#sidebar').toggleClass('active');
      $('#headerid').toggleClass('headereffect');
      $('#dashbordid').toggleClass('dashboardeffect')
      $('#sidebar').hide();
      $('#widgets').hide();
      $('#printButton').hide();
      $('.button2').hide();
      $('.main-footer').hide();
      $(".box-header").hide();
      window.print();
      $('#headerid').show();
      $('#sidebar').toggleClass('active')
      $('#headerid').toggleClass('headereffect');
      $('#dashbordid').toggleClass('dashboardeffect')
      $('#sidebar').show();
      $('#widgets').show();
      $('#printButton').show();
      $('.button2').show();
      $('#editPen').show();
      $('#statusDiv').show();
      $('.main-footer').show();
      $(".box-header").show();
  }
 
	render() {
		const ref = React.createRef();
    return (	
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">	
				
		    {
        	this.state.corporateInfo 
        	?
    				<div className="pageContent col-lg-12 col-md-12 col-sm-12 col-xs-12"> 
					    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 boxshadeOP" id="pdfWrap" iref={ref}> 	
							<div className="col-lg-12 col-md-1 col-sm-12 col-xs-12 noPadding">
										<h4>Basic Info</h4>
									</div>
					    	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadding borderAll">
									
						    	{/* <div  className="col-lg-12 col-md-12 col-sm-12 col-xs-12 blueBack "> */}
						    		<div className="col-lg-12 col-md-10 col-sm-10 col-xs-10 ">
							    		<div className="col-lg-2 col-md-4 col-sm-4 col-xs-4 companyLogoImage noPadding">
											<img src={this.state.corporateInfo.companyLogo && this.state.corporateInfo.companyLogo.length > 0?this.state.corporateInfo.companyLogo[0]:"/images/noImagePreview.png"} className=""></img>
							    		</div>
						    		</div>
						    		{/* <div id="statusDiv" className="col-lg-1 col-md-4 col-sm-4 col-xs-4 noPadding pull-right marginTop12 textAlignCenter">{this.state.corporateInfo.profileStatus == "New"?<span className="newProfile" title="New Company Profile">New </span>:<span className="approvedProfile" title="Company Profile Approved">Approved </span>}</div> */}
						    	{/* </div> */}
						    	<div className="col-lg-10 col-lg-offset-2 col-md-10 col-sm-10 col-sm-offset-4 col-xs-10 pdleft50">
						    		<div className="col-lg-10 col-md-4 col-sm-4 col-xs-4 orgHead noPadding">
						    			<label>{this.state.corporateInfo.companyName}</label>&nbsp;&nbsp;<span>( Company ID: <b>{this.state.corporateInfo.companyID}</b> )</span>
						    		</div>
						    		<div className="col-lg-1 col-md-2 col-sm-2 col-xs-2 editOption pull-right noPadding">
							    		<div id={this.state.corporateInfo._id} className="customBtnCP col-lg-5"  title="Edit profile" data-index data-id={this.state.corporateInfo._id} onClick={this.editBasicform.bind(this)}>	
										    	<i className="fa fa-pencil " id="editPen" aria-hidden="true" ></i>
										  </div>
									    <div className="customBtnCP col-lg-5">
	                        <i id="printButton" onClick={this.download.bind(this)} className="fa fa-download"></i>
	                    </div>
						    		</div>
						    		<div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 noPadding">
						    			<ul className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadding listLI">
												<li><i className="fa fa-envelope changeColor " aria-hidden="true"></i>&nbsp;&nbsp;{this.state.corporateInfo.companyEmail}</li>
												<li><i className="fa fa-phone changeColor" aria-hidden="true"></i>&nbsp;&nbsp;{this.state.corporateInfo.companyPhone}</li>
												<li><i className="fa fa-globe changeColor " aria-hidden="true"></i>&nbsp;&nbsp;{this.state.corporateInfo.website ? this.state.corporateInfo.website :" -NA- "}</li>
											</ul>
						    		</div>
						    		<div className="col-lg-4 col-md-6 col-sm-6 col-xs-6 noPadding">
						    			<ul className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left listLI">
												<li>CIN&nbsp; : <b>{this.state.corporateInfo.CIN? this.state.corporateInfo.CIN :" -NA- "}</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.state.corporateInfo.COI && this.state.corporateInfo.COI.length > 0 ? <a target="_blank" className="col-lg-1 col-sm-2 pull-right"><img src={this.state.corporateInfo.COI[0]}  className="coiImage "></img></a>:""}</li>
												{/*<li>CIN&nbsp; : <b>{this.state.corporateInfo.CIN? this.state.corporateInfo.CIN :" -NA- "}</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.state.corporateInfo.COI && this.state.corporateInfo.COI.length > 0 ? <a target="_blank" className="col-lg-1 col-sm-2 pull-right" title="Click to view COI document" href={this.state.corporateInfo.COI[0]}><img src={this.state.corporateInfo.COI[0]}  className="coiImage "></img></a>:""}</li>*/}
												<li>&nbsp;</li>
												<li>TAN&nbsp; : <b>{this.state.corporateInfo.TAN ? this.state.corporateInfo.TAN : " -NA- "}</b></li>
											</ul>
						    		</div>				   
						    	</div>				   
						    </div>				   
			        	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 singleClientDetails noPadding" data-child={this.state.corporateInfo._id} id={this.state.corporateInfo._id}>
									<div className="col-lg-1 col-lg-offset-11 noPadding">
						    	</div>
								</div>
			        	{/* {
			        	this.state.locations && this.state.locations.length>0 &&
			        	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadding">
				        	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 OrgListTitle noPadding">
										<label>Company Locations</label>
									</div>
									<IAssureTable
                      tableHeading={this.state.tableHeading}
                      tableData={this.state.tableData}
                      tableObjects={this.state.tableObjects}
                      getData={this.getLocationsTable.bind(this)}
                    />
			        	</div>
								} */}
								{
			      this.state.locations && this.state.locations.length>0 &&
			        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 singleClientDetails noPadding">
								<div className="col-lg-12 col-md-1 col-sm-12 col-xs-12 noPadding">
									<h4>Locations</h4>
								</div>
								<div className="col-lg-12 col-md-1 col-sm-12 col-xs-12 noPadding">
			        	{
									this.state.locations.map((locationArr,index)=>{
										return(
											<div className="col-lg-12 col-md-12 col-sm-12 col-sm-12 noPadding borderAllED" key={index}>
												<div  className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadding">
													<ul className="col-lg-6 col-md-6 col-sm-12 col-xs-12 locationUL ">
						        				<li><i class="fa fa-map-marker" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;<b> {locationArr.locationType}</b></li>
						        				<i className="textAlignLeft noPadding changeColor col-lg-1 width18px" aria-hidden="true"></i> <li className="col-lg-12 noPadding">#{(locationArr.addressLine2 ? locationArr.addressLine2 +" , "  : "")+locationArr.addressLine1 }.</li>
						        				{ locationArr.GSTIN ?
															<li title="GSTIN Number" className="col-lg-12 noPadding"><i className="fa fa-credit-card" aria-hidden="true"></i>&nbsp; <b>GSTIN </b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {locationArr.GSTIN}</li>
															// <li><i class="fa fa-credit-card" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;<b> {locationArr.locationType}</b></li>
						        					:null
						        				}
						        				{ locationArr.PAN?
						        					<li title="PAN Number"  className="col-lg-12 noPadding"><i className="fa fa-id-card" aria-hidden="true"></i>&nbsp; <b>PAN Card</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {locationArr.PAN}</li>
						        					:null
						        				}
								        	</ul>
								        	<div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 noPadding">
								        	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 addGap"></div>
							        		{
							        			locationArr.GSTDocument.length>0 ?
							        				locationArr.GSTDocument.map((doc,ind)=>{
							        					return (
							        						<div key={ind} className=" col-lg-2 col-md-3 col-sm-12 col-xs-12 NOpadding-left pull-right">
																		<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding margin-bottom9" id="hide">
																	  {
	                                  (doc ? doc.split('.').pop() : "") === "pdf" || (doc ? doc.split('.').pop() : "") === "PDF" ?
	                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" id="LogoImageUpOne">
	                          						<a href={doc} target="_blank" className="imageOuterContainerED" title="Click to view"><img src="/images/pdf.png" className="img-responsive logoStyle" /></a>
	                                    </div>
	                                  :
	                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 " id="LogoImageUpOne">
																				<a href={doc} target="_blank"  className="imageOuterContainerED" title="Click to view"><img src={doc} className="img-responsive logoStyle" /></a>
																		  </div>
			                              }
																		</div>
																	</div>
							        					);
							        				})
						        				:
						        				null
						        			}
						        			</div>
						        			<div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 noPadding">
													{
														locationArr.PANDocument.length>0?
									        		locationArr.PANDocument.map((doc,ind)=>{
						        					return (
						        						<div key={ind} className=" col-lg-2 col-md-3 col-sm-12 col-xs-12 NOpadding-left pull-right">
																	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding margin-bottom9" id="hide">
																	{
		                              (doc ? doc.split('.').pop() : "") === "pdf" || (doc ? doc.split('.').pop() : "") === "PDF" ?
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 " id="LogoImageUpOne">
                          						<a href={doc} target="_blank" className="imageOuterContainerED" title="Click to view"><img src="/images/pdf.png" className="img-responsive logoStyle" /></a>
                                    </div>
                                    :
                                  	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 " id="LogoImageUpOne">
																	 		<a href={doc} target="_blank" className="imageOuterContainerED" title="Click to view"><img src={doc} className="img-responsive logoStyle" /></a>
																 		</div>}
																	</div>
																</div>
						        					);
									        		})
									        	:
									        	null
								          }
									        </div>	
												</div>
											</div>
										);
									})										
								}
								</div>
			      	</div>
			      }
			        	{
				        	this.state.contacts && this.state.contacts.length>0 &&
				        	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadding">
				        		<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 OrgListTitle noPadding">
											<label>Contact Person Details</label>
										</div>
				        		<IAssureTable
                        tableHeading={this.state.tableHeadingContact}
                        tableData={this.state.tableDataContact}
                        tableObjects={this.state.tableObjects}
                        getData={this.getContactsTable.bind(this)}
                      />
				        	</div>
			          }						        
		          </div>
	          </div>
	        :
            <div className="loadingImg">
            	<img src="/images/loader.gif"/>
            </div>
	      }
			</div>	            
	  );
	} 
}
export default withRouter(CompanyProfile); 
