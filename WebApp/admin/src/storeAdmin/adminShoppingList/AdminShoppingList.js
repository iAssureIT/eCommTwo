import React from 'react';
import IAssureTableUM from '../../coreadmin/IAssureTableUM/IAssureTable.jsx';
import axios from 'axios';
import moment from 'moment';
import swal from 'sweetalert';
import '../FranchiseShoppingList/FranchiseShoppingList.css';


export default class AdminShoppingList extends React.Component {

	constructor(props) {
		super(props);
	  	this.state = {
            objects 			: [],
            units 				: "",
		    productList 		: [],
            currentStock 		: [],	
         	prodStockOrder 		: [],	      
	        selectedSection 	: "",	
	        date 				: "",
	        editId 				: "",
	        user_ID 			: ""
   	};
	}

	componentDidMount(){
		this.getCurrentStock();

		var editid1 = window.location.pathname;
			// console.log("pageUrl = ",pageUrl);
		let editId = editid1 ? editid1.split('/')[2] : "";
	        // console.log("a==>",editId); 
	    const user_ID = localStorage.getItem("user_ID");
   			 // console.log("user_ID",user_ID);
		var today = moment(new Date()).format("YYYY-MM-DD");
		// console.log("today",today);
		this.setState({
				date : today,
				editId : editId,
				user_ID : user_ID,
			},()=>{
					console.log("editId = ",this.state.editId);
					this.getEditData();
				});

	}
	getEditData(){
		axios.get('/api/franchisepo/get/one/purchaseorder/'+this.state.editId)
            .then((editdatalist) => {
				console.log("prodlist prodlist",editdatalist.data);

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
	getCurrentStock(){
        axios.get('/api/products/get/list')
            .then(prodlist => {
			    // console.log("productListproductList=>",prodlist.data);

				this.setState({
                    "productList": prodlist.data,

					"currentStock" :  [
								         	{productCode : "FS101", itemCode: "1001", currentStock: 10, units: "Kg"},
								         	{productCode : "FS101", itemCode: "1002", currentStock: 20, units: "Kg"},
								         	{productCode : "FS101", itemCode: "1003", currentStock: 30, units: "Kg"},
								         	{productCode : "FS102", itemCode: "1500", currentStock: 40, units: "Kg"},
								         	{productCode : "FS103", itemCode: "2000", currentStock: 50, units: "Kg"},
								         	{productCode : "FS104", itemCode: "2010", currentStock: 60, units: "Kg"},
								         ],
				},()=>{
						var prodStockOrder = [];
						// console.log("productListproductList=>",this.state.productList);
						if(this.state.productList.length > 0){
							if(this.state.currentStock.length > 0){
								for (var i = 0; i < this.state.productList.length; i++) {
									var obj = {};
									obj.productCode 	= this.state.productList[i].productCode;
									obj.itemCode 		= this.state.productList[i].itemCode;
									obj.productName 	= this.state.productList[i].productName;									
									obj.currentStock 	= 10 + i;	
									obj.section 	= this.state.productList[i].section;	
									obj.orderQty = 0;
									obj.unit = "";

									prodStockOrder[i] = obj;
								}
								this.setState({
									prodStockOrder : prodStockOrder,
								},()=>{
									// console.log("prodStockOrder = ",this.state.prodStockOrder);
								})
							}
						}
					// console.log("currentStock = ",this.state.currentStock);
				})
			})
			.catch(error=>{
				console.log("error in getCurrentStock = ", error);
			})
	}

    Submit(event){
    	event.preventDefault();
    	var ProdArray = []
    	if (this.state.prodStockOrder) {
    		for (var i = 0; i < this.state.prodStockOrder.length; i++) {
    			if (this.state.prodStockOrder[i].orderQty > 0) {
    				var ProdArrayelement =this.state.prodStockOrder[i];
    				ProdArray.push(ProdArrayelement);
    				// console.log("ProdArray",ProdArray);
    			} 

    		}
    	}
    	// console.log("ProdArray2",ProdArray);

   	    const formValues1 = {
   	    	franchise_id              : "5ec686a8a35f526967255a23", 
	        companyID                 : "12345", 
	        // orderNo                   : "1000", 
	        orderDate                 : moment(new Date()).format("YYYY-MM-DD"), 
	        orderItems                : ProdArray,
	        createdBy                 : this.state.user_ID,
        };
        console.log("formValues1",formValues1);
        axios
			.post('/api/franchisepo/post',formValues1)
		  	.then(function (response) {
		    // handle success
		    	console.log("data in block========",response.data);
		    	swal("Thank you. Your Product addeed successfully.");
		    	 // window.location.reload();
		  	})
		  	.catch(function (error) {
		    // handle error
		    	console.log(error);
		  	});
		  	this.setState({
					
      	 })		
	}

	setOrderQty(event){
		event.preventDefault();
		var orderQty = event.target.value;
		var index  	 = event.target.name.split("-")[1];
		var prodStockOrder = this.state.prodStockOrder; 

		prodStockOrder[index].orderQty = orderQty;
		this.setState({prodStockOrder : prodStockOrder});
	}

	setUnit(event){
		event.preventDefault();
		var unit 	= event.target.value;
		var index  	= event.target.name.split("-")[1];
		var prodStockOrder = this.state.prodStockOrder; 

		prodStockOrder[index].unit = unit;
		this.setState({prodStockOrder : prodStockOrder});		
	}

	handleSelectChange(event){
		var selectedValue = event.target.value;
		this.setState({selectedSection : selectedValue});
	}

	render() {
		// console.log("productList render = ",this.state.productList);

		return (
				<div  className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
					<div  className="col-lg-12 col-md-12 col-xs-12 col-sm-12 pmcontentWrap">
						<div className='col-lg-12 col-md-12 col-xs-12 col-sm-12 pmpageContent'>
							<div  className="col-lg-12 col-md-12 col-xs-12 col-sm-12 mtop20">
								<h1 className="text-center">Admin Shopping List</h1>
							</div>
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mtopbotm15">
								<div className="col-lg-4 col-md-8 col-sm-12 col-xs-12 pull-right">
								    <label className=" ">Order Date :</label>
								    <div className="col-lg-8 col-md-9 col-sm-12 col-xs-12  pull-right nopadding">
								      <input className=" " id="theDate" type="date" value={this.state.date}/>
								    </div>
								</div>

							</div>
							<hr/>
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
								<div className="table-responsive">          
							    	<table className="table table-bordered table-striped table-hover">
									    <thead className="thead-dark text-center">
									      	<tr>
										        <th>ProductID</th>
										        <th>Item Code</th>
										        <th>Product Name</th>
										        <th>Current Stock</th>
										        <th>Total Ordered </th>
										        <th>Shopping Quantity </th>
										        <th>Franchise1 Order </th>
										        <th>Franchise2 Order </th>
										        <th>Franchise2 Order </th>
										        <th>Franchise2 Order </th>
									      	</tr>
									    </thead>
									    <tbody>
									    {
									    	Array.isArray(this.state.prodStockOrder) && this.state.prodStockOrder.length > 0
									    	? 
									    		this.state.prodStockOrder.map((result, index)=>{
													// console.log('result', result);
													return( 
													
														
														<tr key={index}>
												        	<td>{result.productCode}</td>
												        	<td>{result.itemCode}</td>
												        	<td>{result.productName}</td>
												        	<td>{result.currentStock}</td>
												        	<td>{result.currentStock}</td>

												        	<td>
													        	<div class="form-group">
								                           			<div className="input-group">
														        		<input type="number" className="form-control width90" 
														        				 name={"orderedItems"+"-"+index} 
														        				 id={result.productCode+"-"+result.itemCode} 
														        				 value={result.orderQty} 
														        				 onChange={this.setOrderQty.bind(this)}
														        		/>
														        		<div className="input-group-addon">
																		  	<select id={"Units"+"-"+index} name={"Units"+"-"+index} 
																		  			  value={result.unit} refs="Units" 
																		  			  onChange={this.setUnit.bind(this)}  
																		  			  className="input-group-addon width66h">
																				<option selected={true}> Units</option>
																			  	<option value="Kg"> Kg 		</option>
																			  	<option value="Gm"> Gm 		</option>
																			  	<option value="Ltr">Ltr 	</option>
																			  	<option value="Num">Number </option>
																			</select>
																	  	</div>
																	</div>
																</div>
													        </td>
													        <td>10</td>
												        	<td>10</td>
												        	<td>10</td>
												        	<td>10</td>													       
													    </tr>

													)
												})
												:
													null
									  		}
									    </tbody>
									</table>
							    </div>
								<div  className="col-lg-12 col-md-12 col-xs-12 col-sm-12 mtop20 Subbtnmtop20">
									
										<button className="btn btn-primary col-lg-3 col-md-3 col-xs-4 col-sm-4 pull-right" onClick={this.Submit.bind(this)}>Submit</button>
									
								</div>		
							</div>
						</div>
					</div>
				</div>
		);
	}
}
