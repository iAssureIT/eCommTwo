import React, { Component, Suspense } from 'react';

import {Route, withRouter} from 'react-router-dom';
import swal from 'sweetalert';

import axios        from 'axios';
import CircleBlockMenuBars from './circleblockmenubars.js';


// this._isMounted = false;
export default class ViewBlock_3 extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pageData 	 : {},
			Blocks 		 : [],
			blocks 		 : "",
			ListOfBlocks : "",
			ListOfpages  : ""
		}; 
	}

	getAllBlockList(){
		axios
        .get('/api/blocks/get/list')
        .then((response)=>{
						        console.log("AllBloks=",response.data);
						      	this.setState({
					      			ListOfBlocks:response.data.reverse()
					      		},()=>{
					      				console.log("======>",this.state.ListOfBlocks);
					      		});
					      	})
			  	.catch(function (error) {
			    // handle error
			    	console.log(error);
			  	});

			axios
				.get('/api/pages/get/list')
				.then((response)=>{
						        // console.log("AllBlogs=",response.data);
						      	this.setState({
					      			ListOfpages:response.data
					      		},()=>{
					      				// console.log("======>",this.state.ListOfBlocks);
					      		});
					      	})
			  	.catch(function (error) {
			    // handle error
			    	console.log(error);
			  	});

	}
	componentDidMount(){
	 // this._isMounted = true;
		var pageUrl = window.location.pathname;;
		// console.log("pageUrl = ",pageUrl);
		let a = pageUrl ? pageUrl.split('/') : "";
        // console.log("a==>",a[1]); 
        const urlParam =a[1];
        // console.log("urlParam  === ",urlParam);
        this.getAllBlockList();

	}
	
	deleteblock(event){
		event.preventDefault();
		var URL= event.target.id;
		var idArray =[];
		// console.log("ListOfpages", this.state.ListOfpages );

		let filteredBlocks = this.state.ListOfpages.filter( function (user) {
			return user.pageBlocks.filter((child)=>{
				if(URL === child.block_id){idArray.push(child._id)}
				return URL === child.block_id
			}).length !== 0
	       
	    });
	    //console.log('idArray',idArray);
	    console.log('filteredBlocks',filteredBlocks);
	    var titleArray = [];
	    filteredBlocks.map((data,index)=>{
	    	titleArray.push(data.pageTitle);
	    })
	    var urlArray = [];
	    filteredBlocks.map((data,index)=>{
	    	urlArray.push(data.pageURL);
	    })
	    var deleteValues ={
		      "pageBlocks_id":idArray[0]
				}

	    //console.log('titleArray',titleArray)
	    
	    if (filteredBlocks.length>0) {
	    	swal({
		          title: "You can not delete this block as it is present in following pages",
		          text: "* "+titleArray.join(', '),
		          icon: "warning",
		          buttons: true,
		          dangerMode: true,
		        })
	    		.then((success) => {

			            if (success) {
			            	axios
						    .patch('/api/pages/patch/blocks/remove/'+urlArray[0],deleteValues)
						    .then((response)=>{
						     	// this.getListOfPages();
						     	swal({
							          title: "Are you sure you want to delete this Block",
							          text: "..",
							          icon: "warning",
							          buttons: true,
							          dangerMode: true,
							        })
						    		.then((success) => {
										axios
										   .delete("/api/blocks/delete/"+URL)
										   .then((response)=>{
										    // this.getListOfPages();
										      swal("Your block is deleted");
        										this.getAllBlockList();
										      
										   })
										   .catch((error)=>{
										      console.log("error = ", error);              
										   });
										// swal("Your block is deleted from page ");
						    			});
						    		 
						       	 
						    })
						    .catch((error)=>{
						       console.log("error = ", error);              
						    });

			           
			           
			             
			            } else {
			            swal("Your Block is safe!");
			          }
			        });
	    	}
	    	else{
	    	swal({
		          title: "Are you sure you want to delete this Block is present in some pages?",
		          text: "Once deleted, you will not be able to recover this Block!",
		          buttons: true,
		          dangerMode: true,
		        })
	    	.then((success) => {

		            if (success) {
		            axios
					   .delete("/api/blocks/delete/"+URL)
					   .then((response)=>{
					    // this.getListOfPages();
					    this.getAllBlockList();
					      swal("Your block is deleted!");
					     
					   })
					   .catch((error)=>{
					      console.log("error = ", error);              
					   });
		           
		             
		            } else {
		            swal("Your Block is safe!");
		          }
		        });
		
	    	}

	}

	render() {
			var data= this.state.pageData;

			return (
				<div className="contentWrapper">
						<div className="">
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
								
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 bglightgclr">
									<CircleBlockMenuBars />
								</div>
								<div className=" txtCenter col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
									<div className="  col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
		                                <h2 className="text-center"> All Blocks</h2>
		                            </div>
		                        </div>
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
									{
										this.state.ListOfBlocks && this.state.ListOfBlocks.length> 0
										?
											this.state.ListOfBlocks.map((result, index)=>{
												var component = result.blockComponentName ? result.blockComponentName : "TitleDesc";
												const NewPageComponent = React.lazy(() => import('../blockTemplate/'+component+'/'+component+'.js'));
												var block_id=result._id;
												return(
													<Suspense fallback={<div>Loading...</div>} key={index}>
														<div className="">
															<i className="fa fa-trash deletIcon pull-right fsm15" id={block_id} onClick={this.deleteblock.bind(this)}></i>&nbsp;&nbsp;&nbsp;&nbsp;
														</div>
															<br/>
											    		<NewPageComponent block_id={block_id}/>
											    	</Suspense>
										    	)
											})
										:
										<img className="img-responsive middlPageImage" src="/images/loader.gif" alt="Bannerpng"/>
										
									}
								</div>
							</div>
						</div>
					</div>
			);
		}
	}
