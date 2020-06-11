import React from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import moment from 'moment';

export default class FranchiseOrderSummary extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			date : "",
			franchiselist : "",
			status : "",
			prodStockOrder : "",
			viewDataID : "",
			user_ID : localStorage.getItem("user_ID")
		}
	}

	componentDidMount(){
		// this.getFranchiseShoppingList();
		// this.getCurrentStock();
		// var today = moment(new Date()).format("YYYY-MM-DD");
		// this.setState({
		// 	date : today,
		// });
		 const user_ID = localStorage.getItem("user_ID");
   			 console.log("user_ID in FranchiseOrderSummary",user_ID);
	}
	handleChange(event){
		event.preventDefault();
		this.setState({
			[event.target.name] : event.target.value,
			},()=>{
				this.getFranchiseShoppingList();
				// console.log("date",this.state.date);
			});

	}
	getFranchiseShoppingList(){
		var franchise_id = "5ec686a8a35f526967255a23";
		var orderDate = moment(this.state.date).format("YYYY-MM-DD");
			console.log("orderDate",orderDate);

		axios.get('/api/franchisepo/get/purchaseorderList'+"/"+franchise_id+"/"+orderDate)
            .then((franchiselist) => {
				console.log("franchiselist prodlist",franchiselist.data);

                this.setState({
                    "franchiselist": franchiselist.data,
                },()=>{
					console.log("franchiselist = ",this.state.franchiselist);
					// console.log("addition of element",this.state.franchiselist.orderItems.map((result, index)=>{return( result.orderQty);}) )
					// var orderItems = this.state.franchiselist.orderItems;
					/*for (var i = 0; i < this.state.franchiselist.length; i++) {
						console.log("this.state.franchiselist[i] ",this.state.franchiselist[i]);
						
						for (var j = 0; j < this.state.franchiselist[i].orderItems.length; j++) {
							console.log("orderItems=-=->",this.state.franchiselist[i].orderItems[j].orderQty); 
						}
					}*/
				})

            })
            .catch((error) => {
				console.log("error in getProductList = ", error);
              
            })
	}
	ToatalQty(event){
		var id = event.target.id;
		console.log("edit id",id);

	}
	updatestatus(event){
		var id = event.target.id;
		console.log("updatestatus id",id);
		var data  = event.target.getAttribute('data-product');
		var product = data.split("-");
		console.log("product",product);
		var formValues ={
							purchaseorder_id : id,
				            item : {
				        			productID:product[0],
				        			itemCode:product[1],
				        			productName:product[2],
				        			orderedQty:product[3], 
				        			units:product[4], 
				        			suppliedQty: 0, 
				        			status:"Approve"},
				            user_id :this.state.user_ID,
				        }
		console.log("formValues",formValues);
         axios
			.patch('/api/franchisepo/patch/acceptitem',formValues)
		  	.then( (response)=> {
		    // handle success
		
		    	if (response) {
		    	
		    		
		    		this.getStatusViewData(id);
		    	}
 			})
		  	.catch(function (error) {
		    // handle error
		    	console.log(error);
		  	});

	}
	updatedStatusChange(event){
		var id = event.target.id;
		console.log("updatestatus id",id);
		var data  = event.target.getAttribute('data-product');
		var product = data.split("-");
		console.log("product",product);
		var formValues ={
							purchaseorder_id : id,
				            item : {
				        			productID:product[0],
				        			itemCode:product[1],
				        			productName:product[2],
				        			orderedQty:product[3], 
				        			units:product[4], 
				        			suppliedQty: 0, 
				        			status:""},
				            user_id :this.state.user_ID,
				        }
		console.log("formValues",formValues);
         axios
			.patch('/api/franchisepo/patch/acceptitem',formValues)
		  	.then( (response)=> {
		    // handle succes
			    if (response) {

			    	// this.ToatalQty();
			    	this.getStatusViewData(id);
			    }

		  	})
		  	.catch(function (error) {
		    // handle error
		    	console.log(error);
		  	});

	}
	edit(event){
		event.preventDefault();
		var id = event.target.id;
		// console.log("edit id",id);
		this.props.history.push("/franchise-shopping-list/"+id);

	}
	getViewData(event){
		event.preventDefault();
		var id = event.target.id;
		console.log("edit id",id);
		axios
			.get('/api/franchisepo/get/one/purchaseorder/'+id)
            .then((editdatalist) => {
				// console.log("prodlist prodlist",editdatalist.data);

                this.setState({
                	"viewDataID": id,
                    "prodStockOrder": editdatalist.data.orderItems,
                },()=>{
					// console.log("prodStockOrder = ",this.state.prodStockOrder);
				})

            })
            .catch((error) => {
				console.log("error in getEditData = ", error);
              
            })

	}
	getStatusViewData(id){
		console.log("iiiiiiiiidddddddddd",id);
		axios
			.get('/api/franchisepo/get/one/purchaseorder/'+id)
            .then((editdatalist) => {
				// console.log("prodlist prodlist",editdatalist.data);

                this.setState({
                
                    "prodStockOrder": editdatalist.data.orderItems,
                },()=>{
					// console.log("prodStockOrder = ",this.state.prodStockOrder);
				})

            })
            .catch((error) => {
				console.log("error in getEditData = ", error);
              
            })

	}
	deletePO(event){
		event.preventDefault();
		var id= event.target.id;
		// console.log("id delet", URL);
	 	swal({
          title: "Are you sure you want to delete this Order ?",
          text: "Once deleted, you will not be able to recover this Order!",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((success) => {
            if (success) {
            	axios
			    .delete("/api/franchisepo/delete/purchaseorder/"+id)
			    .then((response)=>{
			     	this.getFranchiseShoppingList();
			       swal("Your Order is deleted!");
			       // window.location.reload();
			    })
			    .catch((error)=>{
			       console.log("error = ", error);              
			    });   
            } else {
            swal("Your Order is safe!");
          }
        }); 
    }	
	render() {
		
		return (
				<div  className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
					<div  className="col-lg-12 col-md-12 col-xs-12 col-sm-12 pmcontentWrap">
						<div className='col-lg-12 col-md-12 col-xs-12 col-sm-12 pmpageContent'>
							<div  className="col-lg-12 col-md-12 col-xs-12 col-sm-12 mtop20">
								<h1 className="text-center">Franchise Shopping Order Summary</h1>
							</div>
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mtopbotm15">
								<div className="col-lg-4 col-md-8 col-sm-12 col-xs-12 pull-right">
								    <label className=" ">Order Date :</label>
								    <div className="col-lg-8 col-md-9 col-sm-12 col-xs-12  pull-right nopadding">
								      <input className=" " id="date" type="date" name="date" refs="date" value={this.state.date} onChange={this.handleChange.bind(this)}/>
								    </div>
								</div>
							</div>
							<div>
							
								<table className="table table-bordered">
								    <thead className="thead-dark">
								      <tr>
								        <th>Order Number</th>
								        <th>Total Items</th>
								        <th>Quantity</th>
								        <th>Action</th>
								      </tr>
								    </thead>
								    <tbody>
								    {
								    	Array.isArray(this.state.franchiselist) && this.state.franchiselist.length > 0
									    ? 
									    	this.state.franchiselist.map((result, index)=>{
													// console.log('result', result);
												return(
												      <tr  key={index}>
												        <td>{result.orderNo}</td>
												        <td>{result.orderItems.length}</td>
												        <td>
												        	{ 
																// console.log("addition of element",this.state.franchiselist.orderItems.map((result, index)=>{return( result.orderQty);}) )
												        		// console.log("addition of element",result.orderItems.map((result, index)=>{return( result.orderQty.reduce((prev, next) => prev + next))}))
												        		<div>
												        		
						

												        		</div>
												        	}
												        </td>
												        <td>
												        	<span>
																<i className="fa fa-pencil" title="Edit" id={result._id} onClick={this.edit.bind(this)}></i>&nbsp; &nbsp;
													    		<i className="fa fa-trash redFont " id={result._id} onClick={this.deletePO.bind(this)}></i>&nbsp; &nbsp;
													    		<i className="fa fa-eye" id={result._id} onClick={this.getViewData.bind(this)}></i>
															</span>
												        </td>
												      </tr>
										        )
											})
											:
												null
								    }
								    </tbody>
								</table>
								
							</div>
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
								<div className="table-responsive"> 
								{
							    	Array.isArray(this.state.prodStockOrder) && this.state.prodStockOrder.length > 0
							    	?         
							    	<table className="table table-bordered table-striped table-hover">
									    <thead className="thead-dark text-center">
									      	<tr>
										        <th>ProductID</th>
										        <th>Item Code</th>
										        <th>Product Name</th>
										        <th>Current Stock</th>
										        <th>Ordered Items</th>
										        <th>Received Items</th>
										        <th>Approve Quantity</th>
										        <th>Total Stock</th>
										      
									      	</tr>
									    </thead>
									    <tbody>
									     {
									    		this.state.prodStockOrder.map((result, index)=>{
													// console.log('result', result);
													return( 
													
													      <tr key={index}>
													        	<td>{result.productCode}</td>
													        	<td>{result.itemCode}</td>
													        	<td>{result.productName}</td>
													        	<td>{result.currentStock}</td>
													        	<td>
													        		{result.orderQty}
													        	</td>	
													        	<td>
													        		xxx
													        	</td>		
													        	<td>
													        		{
													        			result.status == "Approve"
													        			? 
													        			<div>
														        			<img src="/images/approved.png" height="50" alt=""/>&nbsp;&nbsp;&nbsp;&nbsp;
														    				<i className="fa fa-times redFont " 
														    				data-product={
															        			result.productCode+"-"+result.itemCode
															        			+"-"+result.productName+"-"+result.orderQty
															        			+"-"+result.units+"-"+result.suppliedQty+"-"+result.status}
															        			 id={this.state.viewDataID} onClick={this.updatedStatusChange.bind(this)}></i>&nbsp; &nbsp;
															        	</div>
													        		 	:
													        			<button className="btn btn-primary" 
														        			data-product={
														        			result.productCode+"-"+result.itemCode
														        			+"-"+result.productName+"-"+result.orderQty
														        			+"-"+result.units+"-"+result.suppliedQty+"-"+result.status}
														        			 id={this.state.viewDataID} onClick={this.updatestatus.bind(this)}>Approve</button>
													        		}
													        	</td>		
													        	<td>
													        		xxx
													        	</td>													       
													      </tr>
														
													)
												})
											}
									    </tbody>
									</table>
									:
										null
						  		}
							    </div>
										
							</div>	
							
						</div>
					</div>
				</div>
		);
	}
}
