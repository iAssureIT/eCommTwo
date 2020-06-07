import React from 'react';
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
					selectedFranchise  : 'Franchise1',
					DistributionData :[],
					totalDemand:0,
					totalSupply:0,
					

      };
	}
    
	componentDidMount(){
		var currentDate = moment().startOf('day').format("YYYY-MM-DD");
		document.getElementsByClassName('date').value = moment().startOf('day').format("DD/MM/YYYY") ;
		this.setState({ currentDate:currentDate });
		this.getData(currentDate,this.state.selectedFranchise);
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

	getData(date,franchise){
		var data = [
			{franchiseId:1,franchiseName:'Franchise1',date:'2020-06-07',productCode : "FS101", itemCode: "1001",name:"Potato", totalStock: 1000, demand: "100",supply:''},
			{franchiseId:2,franchiseName:'Franchise2',date:'2020-06-07',productCode : "FS101", itemCode: "1002",name:"Tomato",totalStock: 1500,  demand: "100",supply:''},
			{franchiseId:1,franchiseName:'Franchise1',date:'2020-06-07',productCode : "FS101", itemCode: "1003",name:"Bringal", totalStock: 30,  demand: "100",supply:''},
			{franchiseId:1,franchiseName:'Franchise1',date:'2020-06-08',productCode : "FS102", itemCode: "1500",name:"Onion", totalStock: 400, demand: "100",supply:''},
			{franchiseId:3,franchiseName:'Franchise3',date:'2020-06-08',productCode : "FS102", itemCode: "1500",name:"Onion", totalStock: 400, demand: "100",supply:''},
			{franchiseId:4,franchiseName:'Franchise4',date:'2020-06-07',productCode : "FS102", itemCode: "1500",name:"Potato", totalStock: 5000, demand: "100",supply:''},

		];
		this.setState({
			DistributionData:data
		});
		
		
		let demand = data.reduce((prev, current) => {
			if (current.franchiseName === franchise &&  date == current.date ) {
			  return prev + +current.demand;
			}
			return prev;
		  }, 0); 

	    let supply = data.reduce(function(prev, current) {
			if (current.franchiseName === franchise && date == current.date) {
				return prev + +current.supply
			}
			return prev;
		}, 0); 
		
		this.setState({
			totalDemand:demand,
			totalSupply:supply
		});
		
	//  axios
    //   .get('/api/finishedGoodsEntry/get/list')
    //   .then((response)=>{
    //     console.log("list===>",response.data);
    //     /*this.setState({
          
    //       tableData : response.data,
    //     });*/
    //     var  tableData = response.data ;
    //     console.log("tableData",tableData);
 
	// 	/*return{  tableData: {
	// 					fullName        : 'Date',
	// 	        		city       		: "Product Code",
	// 	        		company 		: "Item Code",
	// 	        		role 			: "Product Name",
	// 					email        	: 'Opening Stock',
						
	// 	                status        	: 'Stock Added Today',
	// 	                TotalStock      : 'Total Stock', 
	// 	                }  
	// 		}*/
	// 		var tableData = tableData.map((a, i) => {
	// 				return {
 
	// 					_id                  : a._id,
	// 					Date   				 : a.Date ? moment(a.Date).format("DD-MMM-YYYY") : "",
	// 					productName 	     : a.productName ? a.productName : "" ,
	// 					ItemCode 		     : a.ItemCode ? a.ItemCode : "" ,
	// 					PackageWeight 		 : a.PackageWeight,
	// 					Quantity 		     : a.Quantity ? a.Quantity : "" ,
	// 					Unit 	             : a.Unit,
	// 					// TotalStock 			: "" ,
						
	// 				/*	purchaseStaff		:
	// 					purchaseLocation 	:
	// 					Quantity 			:
	// 					amount 				:
	// 					Units 				:*/
	// 				}
	// 			})
	// 		this.setState({
             
    //           tableData 		: tableData,          
    //         })
    //         })
    //   .catch((error)=>{
    //      console.log("error = ", error);              
    //   }); 
		
    }
   
	handleChange(event){
	  event.preventDefault();
	  var franchise = this.state.selectedFranchise;
	  var date = this.state.currentDate;
	  var supplyValue = event.target.value;
	  var index  	 = event.target.name.split("-")[1];
	  var DistributionData = this.state.DistributionData; 
	  DistributionData[index].supply = supplyValue;
	  this.setState({DistributionData : DistributionData});
	  let supply = DistributionData.reduce(function(prev, current) {
		if (current.franchiseName === franchise && date == current.date) {
			return prev + +current.supply
		}
		return prev;
	  }, 0); 
	
	  this.setState({
		totalSupply:supply
	  });
	//   this.getData(this.state.currentDate,this.state.selectedFranchise);
	  
    }

  
    Submit(event){
    /*event.preventDefault();

    const formValues1 = {
        // "amount"         	: this.state.amount ,
        "Date" 		        : this.state.Date,
      	"ItemCode" 	        : this.state.ItemCode,
      	"PackageWeight"     : this.state.PackageWeight,
      	"Quantity" 			: this.state.Quantity,
      	"productName" 	    : this.state.productName,
      	"Unit" 		     	: this.state.Unit,
       
      };
      console.log("formValues1",formValues1);
      axios
			.post('/api/finishedGoodsEntry/post',formValues1)
		  	.then(function (response) {
		    // handle success
		    	console.log("data in block========",response.data);
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
      	 })	*/
	}

    previousDate(event){
        event.preventDefault();
    
        var selectedDate1 = $(".date").val();
    
        this.setState({currentDate: moment(selectedDate1).subtract(1, "days").format("YYYY-MM-DD")}, () => {
            this.getData(this.state.currentDate,this.state.selectedFranchise);
        }) 
      }
      nextDate(event){
        event.preventDefault();
    
        var selectedDate1 = $(".date").val();
    
        this.setState({currentDate: moment(selectedDate1).add(1, "days").format("YYYY-MM-DD")}, () => {
            this.getData(this.state.currentDate,this.state.selectedFranchise);
        }) 
	  }
	  
	  handleSelectChange(event){
		var selectedValue = event.target.value;
		this.setState({selectedFranchise : selectedValue});
		this.getData(this.state.currentDate,selectedValue);

	 }
	 
	 onReset(event){
		event.preventDefault();
		var DistributionData = this.state.DistributionData; 
		DistributionData.map((result, index)=>{
			DistributionData[index].supply = 0;
		});
		
		this.setState({DistributionData : DistributionData});
		let supply = this.state.DistributionData.reduce(function(prev, current) {
			return 0;
		  }, 0); 
		
		this.setState({
			totalSupply:supply
		});
	 }

	 autoDistribute(event){
		event.preventDefault();
		var DistributionData = this.state.DistributionData; 
		var franchise = this.state.selectedFranchise;
		var date = this.state.currentDate;

		DistributionData.map((result, index)=>{
			if(result.totalStock >= result.demand){
				DistributionData[index].supply = result.demand;
			}else{
				DistributionData[index].supply = result.totalStock;
			}

			
		});

		let supply = DistributionData.reduce(function(prev, current) {
			if (current.franchiseName === franchise && date == current.date) {
				return prev + +current.supply
			}
			return prev;
		}, 0); 
		
		this.setState({
			totalSupply:supply
		});

		this.setState({DistributionData : DistributionData});
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
									<div className="form-group col-lg-3 col-md-3 col-xs-12 col-sm-12"> 
										<label>Select Franchise : </label>
										<select defaultValue={this.state.selectedFranchise} className="col-lg-12 col-md-9 col-sm-12 col-xs-12 pull-right form-control" onChange={this.handleSelectChange.bind(this)}>
											<option> Franchise1 </option>
											<option> Franchise2 </option>
											<option> Franchise3 </option>
											<option> Franchise4 </option>
										</select>
								    </div>
									<div className="form-group col-lg-3 col-md-3 col-xs-12 col-sm-12">
                                        <label >Date</label>
                                        <div class="input-group">
                                            <span onClick={this.previousDate.bind(this)} class="commonReportArrowPoiner input-group-addon" id="basic-addon1">
                                                <i class="fa fa-chevron-circle-left" aria-hidden="true"></i>
                                            </span>
                                            <input name="date" type="date" class="date form-control" defaultValue={this.state.currentDate}/>
                                            <span onClick={this.nextDate.bind(this)} class="commonReportArrowPoiner input-group-addon" id="basic-addon1">
                                                   <i class="fa fa-chevron-circle-right" aria-hidden="true"></i>
                                            </span>
                                        </div>
									</div>
									<div className="form-group col-lg-3 col-md-3 col-xs-12 col-sm-12">
										<input type="reset" value="Reset" className="btn btn-default mt pull-right" onClick={this.onReset.bind(this)}/>
									</div>
								</div>
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt">
									<div className="table-responsive">          
										<table className="table table-bordered table-striped table-hover">
											<thead className="thead-light text-center bg-primary">
												<tr>
													<th rowspan="2">Product Name 
														<br/> 
														<small style={{fontWeight:'normal'}}>  Product Code </small>
														<br/> 
														<small style={{fontWeight:'normal'}}>  Item Code</small>
													</th>
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
														this.state.selectedFranchise && this.state.currentDate ?
															result.franchiseName === this.state.selectedFranchise  ? 
															    result.date == this.state.currentDate  ? 
																<tr key={index}>
																	<td>{result.productCode} - {result.itemCode} - {result.name}</td>
																	<td style={{fontWeight:'bold'}}>{result.totalStock} </td>
																	<td style={{fontWeight:'bold'}}>{result.demand} </td>
																	<td><input type="number"  name={"supply"+"-"+index} id={result.productCode+"-"+result.itemCode} className="form-control width90" value={result.supply} onChange={this.handleChange.bind(this)} min="0"/></td>															
																</tr>
																: null
															:
																null
														:
														<tr key={index}>
															<td>{result.productCode} - {result.itemCode} - {result.name}</td>
															<td style={{fontWeight:'bold'}}>{result.totalStock} </td>
															<td style={{fontWeight:'bold'}}>{result.demand} </td>
															<td><input type="number" name={"supply"+"-"+index} id={result.productCode+"-"+result.itemCode} className="form-control width90" value={result.supply} onChange={this.handleChange.bind(this)} min="0"/></td>													
														</tr>
														)
												})
											:
												null
											  
	                                        }
											</tbody>
											<tfoot style={{fontWeight:'bold'}}>
												<tr>
													<td colspan="2">Total</td>
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
