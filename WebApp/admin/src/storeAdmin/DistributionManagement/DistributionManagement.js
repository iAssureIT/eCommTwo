import React, { version } from 'react';
import './PurchaseManagement.css';
import swal from 'sweetalert';
import axios from 'axios';
import moment from 'moment';
import IAssureTable           from '../../coreadmin/IAssureTable/IAssureTable.jsx';
import $ from 'jquery';

export default class DistributionManagement extends React.Component {
	constructor(props) {
		super(props);
		  this.state = {
					currentDate           : '',
					selectedFranchise  : 'Select Franchise',
					DistributionData :[],
					FranchiseData :[],
					totalDemand:0,
					totalSupply:0,
					user_id:''

      };
	}
    
	componentDidMount(){
		var currentDate = moment().startOf('day').format("YYYY-MM-DD");
		document.getElementsByClassName('date').value = moment().startOf('day').format("YYYY-MM-DD") ;
		const userDetails = JSON.parse(localStorage.getItem("userDetails"));
		this.setState({
			currentDate:currentDate,
			user_id : userDetails.user_id,
		},()=>{
			this.getAllfrachiseData();
			console.log("currentDate",this.state.currentDate);
		 });
	}
	componentWillReceiveProps(nextProps) {
        // var editId = nextProps.match.params.finishedGoodId;
        // if(nextProps.match.params.finishedGoodId){
        //   this.setState({
        //     editId : editId
        //   })
        //   this.edit(editId);
        // }
	}

	getAllfrachiseData(){
		var dateOfOrder = moment(new Date(this.state.currentDate)).format("YYYY-MM-DD");
		 axios.get('/api/franchisepo/get/purchaseorderList/'+dateOfOrder)
          .then((franchisePurOrders) => {
					var FranchiseData = [];
					var DistributionData = [];
					var FranchiseOrderedData = []; 
					franchisePurOrders.data.filter(function(item,index){
						console.log("franchisePurOrders.data",item.franchiseData[0].companyName);

						var i = FranchiseData.findIndex(x => x.name == item.franchiseData[0].companyName);
						if(i <= -1){
							FranchiseData.push({franchiseId: item.franchise_id, franchiseName: item.franchiseData[0].companyName});
						}
						return null;
					});

					var franchisePurOrdersdata = franchisePurOrders.data;
					for (var i = 0; i < franchisePurOrdersdata.length; i++) {

						for (var j = 0; j < franchisePurOrdersdata[i].orderItems.length; j++) {
							franchisePurOrdersdata[i].orderItems[j].franchiseId = franchisePurOrdersdata[i].franchise_id;
							franchisePurOrdersdata[i].orderItems[j].supply = 0;
							DistributionData.push(franchisePurOrders.data[i].orderItems[j]);
						}
					}

					this.setState({
						"DistributionData" : DistributionData,
						"FranchiseData" : FranchiseData
					},()=>{
						this.getFooterTotal();
					 });
			})
			.catch(error=>{
				console.log("error in getCurrentStock = ", error);
			})
	}

	getFooterTotal(){
		var franchise = this.state.selectedFranchise;
		let demand = this.state.DistributionData.reduce((prev, current) => {
			if (current.franchiseId === franchise) {
			  return prev + +current.orderQty;
			}
			return prev;
		  }, 0); 

	    let supply = this.state.DistributionData.reduce(function(prev, current) {
			if (current.franchiseId === franchise) {
				return prev + +current.supply
			}
			return prev;
		}, 0); 
		
		this.setState({
			"totalDemand":demand,
			"totalSupply":supply
		});

	}
   
	handleChange(event){
	  event.preventDefault();
	  var franchise = this.state.selectedFranchise;
	  var date = this.state.currentDate;
	  var supplyValue = event.target.value;
	  var index  	 = event.target.name.split("-")[1];
	  var DistributionData = this.state.DistributionData; 
	
		  if(DistributionData[index].currentStock < supplyValue){
			DistributionData[index].supply = DistributionData[index].currentStock;
		  }else{
			DistributionData[index].supply = supplyValue;
		  }
	
	  this.setState({"DistributionData" : DistributionData});
	  let supply = DistributionData.reduce(function(prev, current) {
		if (current.franchiseId === franchise) {
			return prev + +current.supply
		}
		return prev;
	  }, 0); 
	
	  this.setState({
		"totalSupply":supply
	  },()=>{
		this.getFooterTotal();
	 });
	  
    }

  
    Submit(event){
        event.preventDefault();
        var orderArray = [];
    	for (var i = 0; i < this.state.DistributionData.length; i++) {
			var obj = {};
			if(this.state.DistributionData[i].supply){
				obj.productCode 	= this.state.DistributionData[i].productCode;
				obj.itemCode 		= this.state.DistributionData[i].itemCode;
				obj.productName 	= this.state.DistributionData[i].productName;
				obj.currentStock 	= this.state.DistributionData[i].currentStock;
				obj.orderQty 		= this.state.DistributionData[i].orderQty;
				obj.suppliedQty 	= this.state.DistributionData[i].supply;
				orderArray.push(obj);
			}
    		
    	}
    	var formValues = {
			distributionDate 	: this.state.currentDate,
			deliveryChallanNo   : "DC"+Math.floor(100000 + Math.random() * 900000),
			franchiseId         : this.state.selectedFranchise,
			createdBy 	        : this.state.user_id,
			totalDemand         : this.state.totalDemand,
			totalSupply         : this.state.totalSupply,
    		orderItems	        : orderArray,
    		
    	};
        axios
			.post('/api/franchisegoods/post',formValues)
		  	.then(function (response) {
		    // handle success
				console.log("data in block========",response.data);
				var franchiseGoodsId = response.data.franchiseGoodsId;
				window.location.href = "/franchise_delivery_challan/"+response.data.franchiseGoodsId; 
		    	swal("Thank you. Your Data addeed successfully.");
		    	 // window.location.reload();
		  	})
		  	.catch(function (error) {
		    // handle error
		    	console.log(error);
		  	});
		  	this.setState({
				 "date" 		        : '',
      	         "ItemCode" 	        : '',
      			 "PackageWeight"        : '',
      			 "Quantity" 			: '',
      			 "productName" 	        : '',
      			 "Unit" 		     	: '',
      	 })	
	}

    previousDate(event){
        event.preventDefault();
		var selectedDate1 = $(".date").val();
        this.setState({currentDate: moment(selectedDate1).subtract(1, "days").format("YYYY-MM-DD")}, () => {
            this.getFooterTotal();
		});
		this.getAllfrachiseData();
      }
    nextDate(event){
        event.preventDefault();
        var selectedDate1 = $(".date").val();
        this.setState({currentDate: moment(selectedDate1).add(1, "days").format("YYYY-MM-DD")}, () => {
            this.getFooterTotal();
		});
		this.getAllfrachiseData();
	}
	  
	handleSelectChange(event){
		var selectedValue = event.target.value;
		this.setState(
			{"selectedFranchise" : event.target.value},
		()=>{
			this.getFooterTotal();
		});
		
	}
	 
	 onReset(event){
		event.preventDefault();
		var DistributionData = this.state.DistributionData; 
		DistributionData.map((result, index)=>{
			DistributionData[index].supply = 0;
		});
		
		this.setState({"DistributionData" : DistributionData});
		let supply = this.state.DistributionData.reduce(function(prev, current) {
			return 0;
		  }, 0); 
		
		this.setState({
			"totalSupply":supply
		},()=>{
		 });
	 }

	 autoDistribute(event){
		event.preventDefault();
		var DistributionData = this.state.DistributionData; 
		var franchise = this.state.selectedFranchise;
		var date = this.state.currentDate;

		DistributionData.map((result, index)=>{
			if(result.currentStock >= result.orderQty){
				DistributionData[index].supply = result.orderQty;
			}else{
				DistributionData[index].supply = result.currentStock;
			}
			
		});

		let supply = DistributionData.reduce(function(prev, current) {
			if (current.franchiseId === franchise) {
				return prev + +current.supply
			}
			return prev;
		}, 0); 
		this.setState({
			"totalSupply":supply,
			"DistributionData" : DistributionData
		},()=>{
			this.getFooterTotal();
		 });

	 }

	 onChageDate(e){
		this.setState({
			currentDate : e.target.value
		},()=>{
			this.getAllfrachiseData();
		 });
	 }


	render() {
		return (
			<div  className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
				<div  className="col-lg-12 col-md-12 col-xs-12 col-sm-12 pmcontentWrap">
					<div className='col-lg-12 col-md-12 col-xs-12 col-sm-12 pmpageContent'>
						<div className="box-header with-border col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-right">
                            <h4 className="">Distribution Management</h4>
                        </div>
                        <div  className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
							<form className="col-lg-12 col-md-12 col-xs-12 col-sm-12 mtophr20">
								<div className="row">
									<div className="form-group col-lg-3 col-md-3 col-xs-12 col-sm-12">
                                        <button className="btn btn-primary autoDistributebtn mt" onClick={this.autoDistribute.bind(this)}>Auto Distribute</button>
									</div>
									<div className="form-group col-lg-4 col-md-3 col-xs-12 col-sm-12">
                                        <label >Ordered Date</label>
                                        <div class="input-group">
                                            <span onClick={this.previousDate.bind(this)} class="commonReportArrowPoiner input-group-addon" id="basic-addon1">
                                                <i class="fa fa-chevron-circle-left" aria-hidden="true"></i>
                                            </span>
                                            <input name="date" type="date" class="date form-control" defaultValue={this.state.currentDate}  onChange={this.onChageDate.bind(this)}/>
                                            <span onClick={this.nextDate.bind(this)} class="commonReportArrowPoiner input-group-addon" id="basic-addon1">
                                                   <i class="fa fa-chevron-circle-right" aria-hidden="true"></i>
                                            </span>
                                        </div>
									</div>
									<div className="form-group col-lg-3 col-md-3 col-xs-12 col-sm-12"> 
										<label>Select Franchise : </label>
										<select value={this.state.selectedFranchise} className="col-lg-12 col-md-9 col-sm-12 col-xs-12 pull-right form-control" onChange={this.handleSelectChange.bind(this)}>
										    <option defaultValue="">Select Franchise</option>
											{
											Array.isArray(this.state.FranchiseData) && this.state.FranchiseData.length > 0
									    	? 
									    		this.state.FranchiseData.map((result, index)=>{
													return(  <option value={result.franchiseId}> {result.franchiseName} </option> );
												})
											: <option disabled>{"No franchise"}</option>
											}
										</select>
								    </div>
									<div className="form-group col-lg-2 col-md-3 col-xs-12 col-sm-12">
										<input type="reset" value="Reset" className="btn btn-default mt pull-right" onClick={this.onReset.bind(this)}/>
									</div>
								</div>
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt">
									<div className="table-responsive">          
										<table className="table table-bordered table-striped table-hover">
											<thead className="thead-light text-center bg-primary">
												<tr>
													<th rowspan="2">Product Name </th>
													<th rowspan="2">Product Code </th>
													<th rowspan="2">Item Code </th>
													<th rowspan="2">Total Stock</th>
													<th colspan="2">{this.state.selectedFranchise}</th>
												</tr>
												<tr>
													<th>Demand </th>
													<th>Supply</th>
												</tr>
											</thead>
											<tbody>
											{
									    	Array.isArray(this.state.DistributionData) && this.state.DistributionData.length > 0
									    	? 
									    		this.state.DistributionData.map((result, index)=>{
													return( 
													    result.franchiseId === this.state.selectedFranchise  ? 
																<tr key={index}>
																	<td>{result.productCode}</td>
																	<td>{result.itemCode}</td>
																	<td>{result.productName}</td>
																	<td style={{fontWeight:'bold'}}>{result.currentStock} </td>
																	<td style={{fontWeight:'bold'}}>{result.orderQty} </td>
																	<td><input type="number"  name={"supply"+"-"+index} id={result.productCode+"-"+result.itemCode} className="form-control width90" value={result.supply} onChange={this.handleChange.bind(this)} min="0"/></td>															
																</tr>
															:
																null
													
														)
												})
											:
												null
											  
	                                        }
											</tbody>
											<tfoot style={{fontWeight:'bold'}}>
												<tr>
													<td colspan="4">Total</td>
													<td>
                                                      {this.state.totalDemand}
													</td>
													<td>{this.state.totalSupply}</td>
												</tr>
											</tfoot>
										</table>
									</div>
									<div className="col-lg-12col-md-12 col-sm-12 cool-xs-12">
                                       <button className="btn btn-primary col-lg-4 col-md-4 col-xs-4 col-sm-4 pull-right" onClick={this.Submit.bind(this)}>Submit</button>
                           </div> 
								</div>
                            </form>
                        </div>
			
                       
					</div>
				</div>
			</div>
		);
	}
}
