import React from 'react';
import IAssureTableUM from '../../coreadmin/IAssureTableUM/IAssureTable.jsx';
import axios from 'axios';
import moment from 'moment';
import swal from 'sweetalert';
import './FranchiseShoppingList.css';

export default class FranchiseShoppingList extends React.Component {

	constructor(props) {
		super(props);
	  	this.state = {
         objects 			: [],
         units 			: "",
			productList 	: [],
         currentStock 	: [],	
         prodStockOrder : [],	      
         selectedSection : ""	
   	};
	}

	componentDidMount(){
		this.getProductList();
		this.getCurrentStock();
	}

	getProductList(){
		axios.get('/api/products/get/list')
			.then(prodlist => {
				this.setState({
					"productList" : prodlist.data,
				},()=>{
					// console.log("productList = ",this.state.productList);
				})
			})
			.catch(error=>{
				console.log("error in getProductList = ", error);
			})
	}

	getCurrentStock(){
		axios.get('/api/products/get/list')
			.then(prodlist => {
				this.setState({
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

						if(this.state.productList.length > 0){
							if(this.state.currentStock.length > 0){
								for (var i = 0; i < this.state.productList.length; i++) {
									var obj = {};
									obj.productCode 	= this.state.productList[i].productCode;
									obj.itemCode 		= this.state.productList[i].itemCode;
									obj.productName 	= this.state.productList[i].productName;									
									obj.currentStock 	= 10 + i;	
									obj.orderQty = 0;
									obj.unit = "";

									prodStockOrder[i] = obj;
								}
								this.setState({
									prodStockOrder : prodStockOrder,
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
   	 const formValues1 = {
      };
      // console.log("formValues1",formValues1);
      axios
			.post('/api/purchaseentry/post',formValues1)
		  	.then(function (response) {
		    // handle success
		    	// console.log("data in block========",response.data);
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
		return (
				<div  className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
					<div  className="col-lg-12 col-md-12 col-xs-12 col-sm-12 pmcontentWrap">
						<div className='col-lg-12 col-md-12 col-xs-12 col-sm-12 pmpageContent'>
							<div  className="col-lg-12 col-md-12 col-xs-12 col-sm-12 mtop20">
								<h1 className="text-center">Franchise Shopping List</h1>
							</div>
							<div className="col-lg-4 col-md-8 col-sm-12 col-xs-12 pull-right">
							    <label className="col-lg-3 col-md-2 col-sm-6 col-xs-6">Order Date : </label>
							    <div className="col-lg-4 col-md-4 col-sm-6 col-xs-6">
							      <input className=" " id="date12" type="date" value={new Date()}/>
							    </div>
							</div>	
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mtop25">
								<div className="col-lg-3 col-md-3 col-sm-3 col-xs-3"> 
									<label>Select Section</label>
									<select defaultValue="Vegetables" onChange={this.handleSelectChange.bind(this)}>
										<option> All Sections </option>
										<option> Fruits </option>
										<option> Vegetables </option>
										<option> Frozen Items </option>
									</select>
								</div>
							</div>
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
								<div className="table-responsive">          
							    	<table className="table table-bordered table-striped table-hover">
									    <thead className="thead-dark text-center">
									      	<tr>
										        <th>ProductID</th>
										        <th>Item Code</th>
										        <th>Product Name</th>
										        <th>Current Stock</th>
										        <th>Ordered Items</th>
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
												        	<td>
												        	<div class="form-group">
							                           <div className="input-group">
													        		<input type="number" className="form-control" 
													        				 name={"orderedItems"+"-"+index} 
													        				 id={result.productCode+"-"+result.itemCode} 
													        				 value={result.orderQty} 
													        				 onChange={this.setOrderQty.bind(this)}
													        		/>
													        		<div className="input-group-addon">
																	  	<select id={"Units"+"-"+index} name={"Units"+"-"+index} 
																	  			  value={result.unit} refs="Units" 
																	  			  onChange={this.setUnit.bind(this)}  
																	  			  className="input-group-addon">
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
