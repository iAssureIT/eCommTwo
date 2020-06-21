import React from 'react';
import './PurchaseManagement.css';
import swal from 'sweetalert';
import axios from 'axios';
import jQuery from 'jquery';
import $ from 'jquery';
import moment from 'moment';
import IAssureTable           from '../../coreadmin/IAssureTable/IAssureTable.jsx';

export default class FinishedGoods extends React.Component {

	constructor(props) {
		super(props);
		  this.state = {
			      	Date                : '',
			      	ItemCode            : '',
			      	productName         : '',
			      	PackageWeight	    : '',
			      	Quantity            : '',
					Unit                : 'Kg',
					finishedGoodsUnit   : 'Kg',
					outwardUnit         : 'Kg',
					wtPerUnit           : 'Kg',
					scrapUnit           : 'Kg',
			      	"twoLevelHeader"    : {
						            apply  : false,
						           },
		             "tableHeading"     : {
		                Date            : "Date",
		        		productName     : "Product Name – Product Code - Item Code",
						InwardStock  	: "Inward",
						OutwardStock    : "Outward",
						Quantity        : "Quantity",
						Weight          : "Weight",
						Scrap           : "Scrap",
						actions        	: 'Action',
					},
					"tableObjects" 		: {
						deleteMethod              : 'delete',
		                apiLink                   : '/api/finishedGoodsEntry',
		                paginationApply           : false,
		                searchApply               : false,
		                editUrl                   : '/finished-goods'
					},
		            "startRange"        : 0,
		            "limitRange"        : 10, 
					"editId"                    : this.props.match.params ? this.props.match.params.finishedGoodId : '',
					"productArray"      : [],
					"itemCodeArray"     : [],
					"outwardFromRaw"    : '',
					"weight"            : '',
					"weightforFG"       :  0,
					"totalInward"       : 0,
					"totalOutward"      : 0,
					"currentStock"      : 0,
					"totalScrap"        : 0,
					"scrap"             : 0,
					"errorMsg"          : ''

      };
	}
    
	componentDidMount(){
		var editId = this.props.match.params.purchaseId;
		this.getData();
		this.getproducts();
		$.validator.addMethod("validDate", function(value, element) {
			return !isNaN((new Date(value)).getTime());
			//return this.optional(element) || moment(value,"MM/DD/YYYY").isValid();
		}, "Please enter a valid date in the format MM/DD/YYYY");

		$.validator.addMethod("noSpace", function(value, element) { 
			return value == '' || value.trim().length != 0;
		}, "No space please and don't leave it empty");

		jQuery.validator.setDefaults({
			debug: true,
			success: "valid"
		});
	
		$("#finishedGoodsInwardForm").validate({
			rules: {
			  Date: {
				required: true,
			  },
			  productName: {
				required: true,
				noSpace:true
			  },
			  ItemCode: {
				required: true,	
				noSpace:true			
			  },
			  PackageWeight: {
				required: true,
				noSpace:true
			  },
			  Unit:{
				required: true,
				noSpace:true
			  },
			  Quantity:{
				required:true,
				noSpace:true
			  },
			  outwardFromRaw:{
				required:true,
				noSpace:true
			  },
			  weight:{
				required:true,
				noSpace:true
			  },
			  paidBy:{
				required:true ,
				noSpace:true
			  }
			},
			errorPlacement: function (error, element) {
			  if (element.attr("name") === "Date") {
				error.insertAfter("#Date");
			  }
			  if (element.attr("name") === "productName") {
				error.insertAfter("#productName");
			  }
			  if (element.attr("name") === "ItemCode") {
				error.insertAfter("#ItemCode");
			  }
			  if (element.attr("name") === "PackageWeight") {
				error.insertAfter("#Unit");
			  }
			  if (element.attr("name") === "Unit") {
				error.insertAfter("#Unit");
			  }
			  if (element.attr("name") === "Quantity") {
				error.insertAfter("#Quantity");
			  }
			  if (element.attr("name") === "outwardFromRaw") {
				error.insertAfter(".outwardRawMatDiv");
			  }
			  if (element.attr("name") === "weight") {
				error.insertAfter(".WeightPerUnitDiv");
			  }
			  if (element.attr("name") === "paidBy") {
				error.insertAfter("#paidBy");
			  }
			}
		});

	}
	componentWillReceiveProps(nextProps) {
        var editId = nextProps.match.params.finishedGoodId;
        if(nextProps.match.params.finishedGoodId){
          this.setState({
            editId : editId
          })
          this.edit(editId);
        }
    }
	edit(id){
		$("#finishedGoodsInwardForm").validate().resetForm();
		var itemCodeArray = [];
        axios.get('/api/finishedGoodsEntry/get/one/'+id)
        .then((response)=>{
            this.setState({
					"Date"         		: response.data.Date ,
			      	"ItemCode"     		: response.data.ItemCode,
			      	"productName"  		: response.data.productName,
			      	"PackageWeight"		: response.data.PackageWeight,
			      	"Quantity"     		: response.data.Quantity,
					"Unit"         		: response.data.Unit,
					"currentStock"      : response.data.CurrentStock,
					"outwardFromRaw"     : response.data.OutwardStock,
					"outwardUnit"       : response.data.OutwardUnit,
					"weight"            : response.data.Weight,
					"wtPerUnit"         : response.data.WeightPerUnit,
					"Quantity" 			: response.data.Quantity,
					"weightforFG"       : response.data.InwardStock,
					"finishedGoodsUnit" : response.data.InwardStock,
					"scrap"             : response.data.Scrap,
					"scrapUnit" 		: response.data.ScrapUnit,
					"paidBy"            : response.data.PaidBy
            });
            
        })
        .catch((error)=>{
            console.log('error', error);
        });
    }
	getData(startRange, limitRange){ 
	 axios
      .get('/api/finishedGoodsEntry/get/list')
      .then((response)=>{
        var  tableData = response.data ;
			var tableData = tableData.map((a, i) => {
					return {
 
						_id                  : a._id,
						Date   				 : a.Date ? moment(a.Date).format("DD-MMM-YYYY") : "",
						productName 	     : a.productName ? a.productName +' - '+ a.ProductCode +' - '+ a.ItemCode: "" ,
						InwardStock          : a.InwardStock ? a.InwardStock +' '+ a.InwardUnit : 0,
						OutwardStock         : a.OutwardStock ? a.OutwardStock +' '+ a.OutwardUnit : 0,
						Quantity             : a.Quantity ? a.Quantity : 0,
						Weight               : a.Weight ? a.Weight +' '+ a.WeightPerUnit : 0,
						Scrap                : a.Scrap ? a.Scrap +' '+ a.ScrapUnit : 0 
					}
				})
			this.setState({
             
              tableData 		: tableData,          
            })
            })
      .catch((error)=>{
         console.log("error = ", error);              
      }); 
		
    }
    getSearchText(searchText, startRange, limitRange){

    }
    setunCheckedUser(value){
		this.setState({
			unCheckedUser : value,
		})
	}
	selectedUser(checkedUsersList){
		this.setState({
			checkedUser : checkedUsersList,
		})
		console.log("checkedUser",this.state.checkedUser)
	}
	getRole(){
		
	}
	selectedRole(event){
		event.preventDefault();
					    
	}
	handleChange(event){
      event.preventDefault();
	  const {name,value} = event.target;
	  this.setState({ 
		[name]:value,
		weightforFG : this.state.Quantity * this.state.weight
      },()=>{
		  this.checkValidInward()
	  });
	  
	  //this.calculateTotalWeight();
	}

	onProductChange(event){
	  var itemCode;
	  var productCode;
	  var TotalWeight;
	  const {name,value} = event.target;
	  this.setState({ 
		[name]:value,
		currentStock:0
      },()=>{
	  });
		var productDatalist = $(".productDatalist").find("option[value='" + name + "']");
		$(".productDatalist option").filter(function(index,item){
		  if(item.value == event.target.value){
			itemCode =$(item).data('itemcode');
			productCode =$(item).data('productcode');
		  }
	  });

	  this.setState({ 
		"ItemCode":itemCode,
		"ProductCode":productCode 
	  },()=>{
		  this.getTotalInward();
		  this.getTotalOutward();
	  });
	}

	onOutwardRawMaterialChange(event){
	  const {name,value} = event.target;
	  var currentStock = this.state.currentStock;
	  if(value <= currentStock){
		this.setState({ 
			[name]:value,
		  },()=>{
		  });
	  }else{
		swal("Outward should be less than current stock.");
		this.setState({ 
			outwardFromRaw:0,
		  },()=>{
		});
	  }
	  
	}

	
	getTotalInward(){
		axios.get('/api/purchaseentry/get/TotalInward/'+this.state.ItemCode)
		    .then(response => {
				this.setState({
					totalInward : response.data.TotalInward ? response.data.TotalInward : 0
				},()=>{
					this.getCurrentStock();
				});
			})
		   .catch(error=>{
			    console.log("error in getTotalInward = ", error);
		   });
	}

	getTotalOutward(){
		axios.get('/api/finishedGoodsEntry/get/TotalOutward/'+this.state.ItemCode)
		    .then(response => {
				this.setState({
					totalOutward : response.data.TotalOutward ? response.data.TotalOutward : 0,
					totalScrap   : response.data.TotalScrap  ? response.data.TotalScrap  : 0
				},()=>{
					this.getCurrentStock();
				});
			})
		    .catch(error=>{
			    console.log("error in getTotalOutward = ", error);
		    });
	}

	getCurrentStock(){
		var scrapStock = this.state.totalScrap;
		var currentStock = this.state.totalInward - this.state.totalOutward;
		this.setState({
			currentStock:currentStock - this.state.totalScrap
		});
	}
	
	calculateTotalWeight(event){
		var weightforFG;
		const {name,value} = event.target;
		this.setState({ 
			[name]:value,
			finishedGoodsUnit : this.state.wtPerUnit,
		  },()=>{
			weightforFG = this.state.Quantity * this.state.weight;
	     });

		this.setState(() => {
			const val = this.state.Quantity * this.state.weight
			return {
				weightforFG: val,
				finishedGoodsUnit: this.state.wtPerUnit
			}
		},()=>{
	    });
		
	}

	checkValidInward(){
		var TotalFcInward = Number(this.state.Quantity * this.state.weight) + Number(this.state.scrap);
		var TotalOutward = this.state.outwardFromRaw;
		if(Number(TotalFcInward) > Number(TotalOutward)){
			this.setState({
				errorMsg : "Total Quantity and scrap material should be equal to or less than outward raw material"
			},()=>{
	
			});
		}else{
			this.setState({
				errorMsg : ""
			},()=>{
	
			});
		}
	}
    handleProduct(event){
    	var valproduct = event.currentTarget.value;
		this.setState({product : valproduct});

    }

    handleItemCode(event){
    	var valproduct = event.currentTarget.value;
		this.setState({ItemCode : valproduct});

    }
    Submit(event){
		event.preventDefault();
		this.checkValidInward();
		var productDatalist = $(".productDatalist").find("option[value='" + this.state.productName + "']");	
		const formValues1 = {
			// "amount"         	: this.state.amount ,
			"Date" 		        : this.state.Date,
			"productName" 	    : this.state.productName,
			"ItemCode" 	        : this.state.ItemCode,
			"ProductCode"       : this.state.ProductCode,
			"CurrentStock"      : this.state.currentStock,
			"OutwardStock"      : this.state.outwardFromRaw,
			"OutwardUnit"       : this.state.outwardUnit,
			"Weight"            : this.state.weight,
			"WeightPerUnit"     : this.state.wtPerUnit,
			"Quantity" 			: this.state.Quantity,
			"InwardStock"       : this.state.weightforFG,
			"InwardUnit"        : this.state.finishedGoodsUnit,
			"Scrap"             : this.state.scrap,
			"ScrapUnit" 		: this.state.scrapUnit,
			"PaidBy"            : this.state.paidBy
		  
		};
		

	  if ($('#finishedGoodsInwardForm').valid()) {
		if(productDatalist != null && productDatalist.length > 0){
			if(this.state.errorMsg === ""){
				axios
					.post('/api/finishedGoodsEntry/post',formValues1)
					.then((response)=>{
					// handle success
						console.log("data in block========",response.data);
						swal("Thank you. Your Data addeed successfully.");
						//window.location.reload();
						this.getData();
					})
					.catch(function (error) {
					// handle error
						console.log(error);
					});
					this.setState({
						"Date" 		        : '',
						"ItemCode" 	        : '',
						"PackageWeight"     : '',
						"Quantity" 			: '',
						"productName" 	    : '',
						"Unit" 		     	: 'Kg',
						"weight"            : '',
						"currentStock"      : 0,
						"outwardFromRaw"    : '',
						"weightforFG"       : 0,
						"scrap"             : 0,
						"paidBy"            : '',
						"errorMsg"          : ''
				})
			}else{
				swal(this.state.errorMsg);
			}
		}else{
			swal("Please select product and item code from list.");
			this.setState({
				ItemCode:'',
				productName:''
			})
		}
	 }
	}
	update(event){
		event.preventDefault();
		this.checkValidInward();
        var formValues = {
			 "Date" 		        : this.state.Date,
			 "productName" 	        : this.state.productName,
			 "ItemCode" 	        : this.state.ItemCode,
			 "ProductCode"          : this.state.ProductCode,
			 "CurrentStock"         : this.state.currentStock,
			 "OutwardStock"         : this.state.outwardFromRaw,
			 "OutwardUnit"          : this.state.outwardUnit,
			 "Weight"               : this.state.weight,
			 "WeightPerUnit"        : this.state.wtPerUnit,
			 "Quantity" 			: this.state.Quantity,
			 "InwardStock"          : this.state.weightforFG,
			 "InwardUnit"           : this.state.finishedGoodsUnit,
			 "Scrap"                : this.state.scrap,
			 "ScrapUnit" 		    : this.state.scrapUnit,
			 "PaidBy"               : this.state.paidBy
        }
		if ($('#finishedGoodsInwardForm').valid()) {
			if(this.state.errorMsg === ""){
				axios.patch('/api/finishedGoodsEntry/update/'+this.state.editId,formValues)
				.then((response)=>{
					this.props.history.push('/finished-goods');
					swal(response.data.message);
					this.getData(this.state.startRange, this.state.limitRange);
					this.setState({
						"date" 		        : '',
						"ItemCode" 	        : '',
						"PackageWeight"     : '',
						"Quantity" 			: '',
						"productName" 	    : '',
						"outwardUnit" 		: 'Kg',
						"wtPerUnit" 		: 'Kg',
						"finishedGoodsUnit" : 'Kg',
						'scrapUnit'         : 'Kg',
						"currentStock"      : 0,
						"outwardFromRaw"    : '',
						"weightforFG"       : 0,
						"scrap"             : 0,
						"paidBy"            : '',
						"editId"            : ''
						
					})
				})
				.catch((error)=>{
					console.log('error', error);
				})
			}else{
				swal(this.state.errorMsg);
			}
       }
	}
	
	getproducts(){
        axios.get('/api/products/get/list')
		.then((response) => {
			this.setState({
				productArray: response.data
			})
		})
		.catch((error) => {
			
		})
    }

	render() {
		return (
			<div  className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
				<div  className="col-lg-12 col-md-12 col-xs-12 col-sm-12 pmcontentWrap">
					<div className='col-lg-12 col-md-12 col-xs-12 col-sm-12 pmpageContent'>
						<div className="box-header with-border col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-right">
                            <h4 className="">Finished Goods Entry</h4>
                        </div>
						<div  className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
							<form className="col-lg-12 col-md-12 col-xs-12 col-sm-12 mtophr20" id="finishedGoodsInwardForm">
								<div className="row">
									<div className="form-group col-lg-3 col-md-3 col-xs-12 col-sm-12">
										<label >Date <i className="redFont">*</i></label>
										<input type="Date"  className="form-control"  value={ this.state.Date} name="Date" refs="Date" onChange={this.handleChange.bind(this)} id="Date"/>
									</div>
									<div className="form-group col-lg-3 col-md-3 col-xs-12 col-sm-12">
										<label >Select Product <i className="redFont">*</i></label>
										{/*<input type="text" className="form-control" id="email"/>*/}
										<input list="productName" type="text" refs="productName" id="selectProductName" className="form-control"    placeholder="Enter Product Code or Name" value={this.state.productName}  onChange={this.onProductChange.bind(this)}  onBlur={this.handleProduct.bind(this)} name="productName" />
	    								{/*<input type="text" list="societyList" className="form-control" ref="society" value={this.state.societyName} onChange={this.handleChange.bind(this)} onBlur={this.handleSociety.bind(this)} name="societyName" placeholder="Enter Society" />*/}
										  <datalist id="productName" name="productName" className="productDatalist">
										  {
												this.state.productArray && this.state.productArray.length > 0 ?
													this.state.productArray.map((data, i)=>{
														return(
															<option value={data.productName} data-productCode={data.productCode} data-itemCode={data.itemCode}>{data.productName} - {data.productCode} - {data.itemCode}</option>
														);
													})
												:
												null
                                          }
										  </datalist>
									</div>
									<div className="form-group col-lg-3 col-md-3 col-xs-12 col-sm-12">
									    <label>Current Stock</label>
										<input type="text"  className="form-control"  value={ this.state.currentStock} name="currentStock" id="currentStock" readOnly/>
									</div>
								</div>
								<div className="row mtop25">
								<div className="form-group col-lg-3 col-md-4 col-xs-12 col-sm-12">
										<label >Outward From Raw Material <i className="redFont">*</i></label>
										<div className="outwardRawMatDiv">
											<input type="number" placeholder="Enter outward from raw material " className="h34 col-lg-8 col-md-9 col-xs-8 col-sm-8" value={ this.state.outwardFromRaw} name="outwardFromRaw" refs="outward" onChange={this.onOutwardRawMaterialChange.bind(this)} id="outward" min="1"/>
											<select id="outwardUnit"  name="outwardUnit" value={this.state.outwardUnit} refs="outwardUnit" onChange={this.handleChange.bind(this)}  className="col-lg-4 col-md-3 col-xs-4 col-sm-4 h34">
											  	<option selected={true} disabled={true}>-- Select --</option>
											  	<option value="Kg">Kg</option>
											  	<option value="Ltr">Ltr</option>
											  	<option value="gram">gram</option>
											  	<option value="Nos">Nos</option>
											</select>
										</div>
									</div>
									<div className="form-group col-lg-3 col-md-4 col-xs-12 col-sm-12">
										<label>Weight Per Unit <i className="redFont">*</i></label>
										<div className="WeightPerUnitDiv">
											<input type="number" placeholder="Enter Weight" className="h34 col-lg-8 col-md-9 col-xs-8 col-sm-8" value={ this.state.weight} name="weight" refs="weight" onChange={this.handleChange.bind(this)} id="weight" onBlur={this.calculateTotalWeight.bind(this)} min="1"/>
											<select id="wtPerUnit"  name="wtPerUnit" value={this.state.wtPerUnit} refs="Unit" onChange={this.handleChange.bind(this)}  className="col-lg-4 col-md-3 col-xs-4 col-sm-4 h34" onBlur={this.calculateTotalWeight.bind(this)}>
											  	<option selected={true} disabled={true}>-- Select --</option>
											  	<option value="Kg">Kg</option>
											  	<option value="Ltr">Ltr</option>
											  	<option value="gram">gram</option>
											  	<option value="Nos">Nos</option>
											</select>
										</div>
									</div>
									<div className="form-group col-lg-3 col-md-4 col-xs-12 col-sm-12">
										<label >Total Quantity <i className="redFont">*</i></label>
										<input type="number" placeholder="12345678" className="form-control" value={ this.state.Quantity} name="Quantity" refs="Quantity" onChange={this.handleChange.bind(this)} id="Quantity" onBlur={this.calculateTotalWeight.bind(this)} min="1"/>
									</div>
									<div className="form-group col-lg-3 col-md-4 col-xs-12 col-sm-12">
										<label>Total Weight For finished Goods</label>
										<div className="WtForFgDiv">
											<input type="number" placeholder="Enter Weight" className="h34 col-lg-8 col-md-9 col-xs-8 col-sm-8" value={ this.state.weightforFG} name="weightforFG" refs="wtforFG" onChange={this.handleChange.bind(this)} id="weightforFG" min="1" readOnly/>
											<select id="finishedGoodsUnit"  name="finishedGoodsUnit" value={this.state.finishedGoodsUnit} refs="finishedGoodsUnit" onChange={this.handleChange.bind(this)}  className="col-lg-4 col-md-3 col-xs-4 col-sm-4 h34" style={{"pointerEvents": "none"}}>
											  	<option selected={true} disabled={true}>-- Select --</option>
											  	<option value="Kg">Kg</option>
											  	<option value="Ltr">Ltr</option>
											  	<option value="gram">gram</option>
											  	<option value="Nos">Nos</option>
											</select>
										</div>
									</div>
								</div>
								<div className="row mtop25">
								   <div className="form-group col-lg-3 col-md-4 col-xs-12 col-sm-12">
										<label>Scrap material</label>
										<div className="scrapMaterialDiv">
											<input type="number" placeholder="Enter Scrap" className="h34 col-lg-8 col-md-9 col-xs-8 col-sm-8" value={ this.state.scrap} name="scrap" refs="scrap" onChange={this.handleChange.bind(this)} id="scrap" min="0" onBlur={this.calculateTotalWeight.bind(this)}/>
											<select id="scrapUnit"  name="scrapUnit" value={this.state.scrapUnit} refs="scrapUnit" onChange={this.handleChange.bind(this)}  className="col-lg-4 col-md-3 col-xs-4 col-sm-4 h34">
											  	<option selected={true} disabled={true}>-- Select --</option>
											  	<option value="Kg">Kg</option>
											  	<option value="Ltr">Ltr</option>
											  	<option value="gram">gram</option>
											  	<option value="Nos">Nos</option>
											</select>
										</div>
									</div>
								    <div className="form-group col-lg-3 col-md-4 col-xs-12 col-sm-12">
										<label >Entered By <i className="redFont">*</i></label>
										<input type="text" placeholder="Enter staff" className="form-control" value={ this.state.paidBy} name="paidBy" refs="paidBy" onChange={this.handleChange.bind(this)} id="paidBy"/>
									</div>
								</div>
								<div  className="col-lg-12 col-md-12 col-xs-12 col-sm-12 mtop20 Subbtnmtop20">
									{this.state.editId ?
                                    <button onClick={this.update.bind(this)} className="btn btn-primary col-lg-3 col-md-3 col-xs-4 col-sm-4 pull-right">Update</button>
                                    :
                                    <button className="btn btn-primary col-lg-3 col-md-3 col-xs-4 col-sm-4 pull-right" onClick={this.Submit.bind(this)}>Submit</button>
                                   }
								</div>
							</form>
						</div>
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mtop25">
								<IAssureTable
									tableHeading={this.state.tableHeading}
                                    twoLevelHeader={this.state.twoLevelHeader} 
                                    dataCount={this.state.dataCount}
                                    tableData={this.state.tableData}
                                    getData={this.getData.bind(this)}
                                    tableObjects={this.state.tableObjects}
								/>			
							</div>
					</div>
				</div>
			</div>
		);
	}
}
