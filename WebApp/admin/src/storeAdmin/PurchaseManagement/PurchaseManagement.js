import React from 'react';
import './PurchaseManagement.css';
import IAssureTable           from '../../coreadmin/IAssureTable/IAssureTable.jsx';
import swal from 'sweetalert';
import axios from 'axios';
import jQuery from 'jquery';
import $ from 'jquery';
import moment from 'moment';

export default class PurchaseManagement extends React.Component {

	constructor(props) {
		super(props);
		  this.state = {
			      	amount : '',
			      	purchaseDate : '',
			      	purchaseStaff : '',
			      	purchaseLocation : '',
			      	quantity : '',
			      	unitRate : '',
			      	Details:'',
			      	purchaseNumber:'',
			      	product : '',
			      	Units : 'Kg',
			      	serchByDate:moment(new Date()).format("YYYY-MM-DD"),
			      	"twoLevelHeader"    : {
						            apply  : false,
						           },
		             "tableHeading"     : {
						date            : 'Purchase Date',
						PurchaseNumber  : 'Purchase Number',
						Details         : 'Details',
						Supplier        : 'Supplier',
						PurchasedBy     : 'Purchased By',
						productName     : "Product Name",
						UnitRate        : 'Unit Rate',
						Quantity        : 'Quantity',
						TotalAmount     : 'Total Amount',
						actions        	: 'Action',
					},
					"tableObjects" 		: {
						deleteMethod              : 'delete',
		                apiLink                   : '/api/purchaseentry',
		                paginationApply           : false,
		                searchApply               : false,
		                editUrl                   : '/purchase-management'
					},
		            "startRange"        : 0,
		            "limitRange"        : 10, 
		            "editId"                    : this.props.match.params ? this.props.match.params.purchaseId : '',
		            blockActive			: "all",
		            "listofRoles"	    : "",
		            adminRolesListData  : [],
		            checkedUser  : [],
		            activeswal : false,
		            blockswal : false,
		            confirmDel : false,
					tableData : "",
					PoNumbersArray:[],
					selectedPurchaseNum :'Select Purchase Number',
					selectedProductName : 'Select Product',
					filterData : {},
					PurchaseNumberArray:[],
					totalPoAmount : 0,
					ItemCode   : ''
			      	
      };
	}
	

	componentDidMount(){
		this.getproducts();
		var serchByDate = moment(new Date()).format("YYYY-MM-DD");
		
		var editId = this.props.match.params.purchaseId;
        console.log('ven', editId);
		this.getData();
		this.getPurNumberList();

		$.validator.addMethod("noSpace", function(value, element) { 
			return value == '' || value.trim().length != 0;
		  }, "No space please and don't leave it empty");

		$.validator.addMethod("validDate", function(value, element) {
			return !isNaN((new Date(value)).getTime());
			//return this.optional(element) || moment(value,"MM/DD/YYYY").isValid();
		}, "Please enter a valid date in the format MM/DD/YYYY");

		jQuery.validator.setDefaults({
			debug: true,
			success: "valid"
		});
	  
		  $("#addNewPurchaseOrder").validate({
			rules: {
			  purchaseDate: {
				required: true,
				validDate:true
			  },
			  purchaseLocation: {
				required: true,
				noSpace: true
			  },
			  purchaseNumber: {
				required: true,	
				noSpace: true			
			  },
			  Details: {
				required: true,
				noSpace: true
			  },
			  purchaseStaff:{
				required: true,
				noSpace: true
			  },
			  product:{
				  required:true,
				  noSpace: true
			  },
			  unitRate:{
				  required:true,
				  noSpace: true
			  },
			  quantity:{
				  required:true,
				  noSpace: true
			  },
			  amount:{
				  required:true,
				  noSpace: true
			  }

			},
			errorPlacement: function (error, element) {
			  if (element.attr("name") === "purchaseDate") {
				error.insertAfter("#purchaseDate");
			  }
			  if (element.attr("name") === "purchaseLocation") {
				error.insertAfter("#purchaseLocation");
			  }
			  if (element.attr("name") === "purchaseNumber") {
				error.insertAfter("#purchaseNumber");
			  }
			  if (element.attr("name") === "Details") {
				error.insertAfter("#Details");
			  }
			  if (element.attr("name") === "purchaseStaff") {
				error.insertAfter("#purchaseStaff");
			  }
			  if (element.attr("name") === "product") {
				error.insertAfter("#product");
			  }
			  if (element.attr("name") === "unitRate") {
				error.insertAfter(".unitRateDiv");
			  }
			  if (element.attr("name") === "quantity") {
				error.insertAfter(".quantityDiv");
			  }
			  if (element.attr("name") === "amount") {
				error.insertAfter(".amountDiv");
			  }
			}
		  });

	}
	componentWillReceiveProps(nextProps) {
        var editId = nextProps.match.params.purchaseId;
        if(nextProps.match.params.purchaseId){
          this.setState({
            editId : editId
          })
          this.edit(editId);
        }
    }
	edit(id){
         $("#addNewPurchaseOrder").validate().resetForm();
        axios.get('/api/purchaseentry/get/one/'+id)
        .then((response)=>{
            console.log('res', response);
            this.setState({
                "amount"         	: response.data.amount ,
		        "purchaseDate" 		: moment(response.data.purchaseDate).format("YYYY-MM-DD"),
		      	"purchaseStaff" 	: response.data.purchaseStaff,
		      	"purchaseLocation"  : response.data.purchaseLocation,
		      	"quantity" 			: response.data.quantity,
		      	"unitRate" 	        : response.data.unitRate,
		      	"purchaseNumber"    : response.data.purchaseNumber,
		      	"Details" 			: response.data.Details,
		      	"product" 		    : response.data.productName,
		      	"Units" 			: response.data.unit,
			});
			console.log('res state', this.state.Units);
            
        })
        .catch((error)=>{
            console.log('error', error);
        });
    }
	getData(startRange, limitRange){ 
		var dateToSearch=this.state.serchByDate;
		console.log("dateToSearch", moment(dateToSearch).format("YYYY-MM-DD"));
		var filterData = this.state.filterData;
		if(this.state.selectedPurchaseNum != "Select Purchase Number"){
			filterData.purchaseNumber = this.state.selectedPurchaseNum;
		}

		if(this.state.selectedProductName != "Select Product"){
			filterData.productName = this.state.selectedProductName;
		}

		filterData.purchaseDate = moment(dateToSearch).format("YYYY-MM-DD");

		console.log("Selector Value = ",this.state.filterData);
		axios
		.post('/api/purchaseentry/post/datewisepurchase/',filterData)
		.then((response)=>{
			console.log("list===>",response.data);
			var  tableData = response.data ;
			console.log("Get tableData",tableData);
				var tableData = tableData.map((a, i) => {
						return {
							_id                  :a._id,
							date   				: a.purchaseDate ? moment(a.purchaseDate).format("DD-MMM-YYYY") : "",
							PurchaseNumber 		: a.purchaseNumber ? a.purchaseNumber : "" ,
							Details 			: a.Details ,
							Supplier            : a.purchaseLocation,
							PurchasedBy 		: a.purchaseStaff ? a.purchaseStaff : "" ,
							productName 		: a.productName,
							UnitRate 	        : a.unitRate ,
							Quantity 			: a.quantity + a.unit,
							TotalAmount         : a.amount,
							
						/*	purchaseStaff		:
							purchaseLocation 	:
							quantity 			:
							amount 				:
							Units 				:*/
						}
				});
				var PoNumbersArray = [];
				tableData.filter(function(item,index){
					var i = PoNumbersArray.findIndex(x => x.PurchaseNumber == item.PurchaseNumber);
					if(i <= -1){
						PoNumbersArray.push(item.PurchaseNumber);
					}
					return null;
				});

				let totalAmount = tableData.reduce(function(prev, current) {
					console.log("current supply",current);
						return prev + +current.TotalAmount
				}, 0);

				this.setState({ 
				   tableData 		: tableData,  
				   PoNumbersArray   : PoNumbersArray,
				   totalPoAmount      : totalAmount        
				}) 
			})
		.catch((error)=>{
			console.log("error = ", error);              
		}); 
		
    }
    getSearchText(searchText, startRange, limitRange){

	}
	getPurNumberList(){
		axios.get("/api/purchaseentry/get/PurchaseNumbers")
            .then((response) => {
				var PurchaseNumberArray = [];
                response.data.map((data, ind) => {
					console.log("console.log()",data);
                    PurchaseNumberArray.push(data)
                });
                this.setState({
                    PurchaseNumberArray: PurchaseNumberArray,
                    messageData: {}
                })
            })
            .catch((error) => {
                console.log('error', error);
            })
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
	}
	getRole(){
		
	}
	selectedRole(event){
		event.preventDefault();
					    
	}
	handleChangeDate(event){
      event.preventDefault();
      var dateVal = event.target.id;
	  const {name,value} = event.target;
      this.setState({ 
        [name]:value,
 
      },()=>{
		this.getData();

      });
    }

	handleChange(event){
      event.preventDefault();
      // const datatype = event.target.getAttribute('data-text');
	  const {name,value} = event.target;
	  var itemCode;

	  if(name == "product"){
		var productDatalist = $(".productDatalist").find("option[value='" + name + "']");
		$(".productDatalist option").filter(function(index,item){
			console.log("filter",$(item).data('itemcode'));
			if(item.value == event.target.value){
			itemCode =$(item).data('itemcode');
			}
		});

		this.setState({ 
		"ItemCode":itemCode,
		},()=>{
		});
     }
	
      this.setState({ 
        [name]:value,
	  },()=>{
		this.getData();
	   });
	}
	filterChange(event){
	  event.preventDefault();
      const {name,value} = event.target;

      this.setState({ 
        [name]:value,
	  },()=>{
		this.getData();
	   });
	}
    handleProduct(event){
    	var valproduct = event.currentTarget.value;
    	console.log("valproduct event",event);
		this.setState({product : valproduct});

    }
    handleProduct1(event){
    	var valpurchaseLocation = event.currentTarget.value;
    	console.log("valpurchaseLocation",valpurchaseLocation);
		this.setState({purchaseLocation : valpurchaseLocation});

    }
     getproducts(){
        axios.get('/api/products/get/list')
		.then((response) => {
            /*for(var i=0; i<response.data.length; i++){
            	var proname=response.data[i].productName;
            	// console.log("proname---",proname);
            	var ProductsNames=proname.Split('<')[0];
            	console.log("ProductsNames",ProductsNames);
            }*/
			this.setState({
				productArray: response.data
			})
		})
		.catch((error) => {
			
		})
    }
    Submit(event){
    event.preventDefault();
	var productDatalist = $(".productDatalist").find("option[value='" + this.state.product + "']");
    const formValues1 = {
        "amount"         	: this.state.amount ,
        "purchaseDate" 		: this.state.purchaseDate,
      	"purchaseStaff" 	: this.state.purchaseStaff,
      	"purchaseLocation"  : this.state.purchaseLocation,
      	"quantity" 			: this.state.quantity,
		"productName" 		: this.state.product,
		"ItemCode"          : this.state.ItemCode,
      	"unit" 				: this.state.Units,
      	"unitRate" 	        : this.state.unitRate,
		"purchaseNumber"    : this.state.purchaseNumber,
		"Details" 			: this.state.Details,
       
      };
	  console.log("formValues1",formValues1);
	  if ($('#addNewPurchaseOrder').valid()) {
		if((productDatalist != null && productDatalist.length > 0)) {
			 axios
			.post('/api/purchaseentry/post',formValues1)
			.then((response) => {
			// handle success
				console.log("data in block========",response.data);
				swal("Thank you. Your Product addeed successfully.");
				this.getData();
			})
			.catch(function (error) {
			// handle error
				console.log(error);
			});
			this.setState({
				amount          : "",     
				product         : "",    	
				quantity        : "", 			
				product         : "", 
				ItemCode        : "",		
				Units           : "",
				unitRate    : "",
			},()=>{
			});  
		}else{
			swal("Please select product from list.");
			this.setState({
				product:''
			})
		}
	  }
	}
	update(event){
        event.preventDefault();
        var formValues = {
             "amount"         	: this.state.amount ,
	        "purchaseDate" 		: this.state.purchaseDate,
	      	"purchaseStaff" 	: this.state.purchaseStaff,
	      	"purchaseLocation"  : this.state.purchaseLocation,
	      	"quantity" 			: this.state.quantity,
			"productName" 		: this.state.product,
			"ItemCode"          : this.state.ItemCode,
	      	"unit" 				: this.state.Units,
	      	"unitRate" 	        : this.state.unitRate,
			"purchaseNumber"    : this.state.purchaseNumber,
			"Details" 			: this.state.Details,
        }
		if($("#addNewPurchaseOrder").valid()){
            axios.patch('/api/purchaseentry/patch/'+this.state.editId,formValues)
            .then((response)=>{
                this.props.history.push('/purchase-management');
                swal(response.data.message);
                this.getData(this.state.startRange, this.state.limitRange);
                this.setState({
                    "amount"         	: "" ,
			        "purchaseDate" 		: "",
			      	"purchaseStaff" 	: "",
			      	"purchaseLocation"  : "",
			      	"quantity" 			: "",
					"product" 		    : "",
					"ItemCode"          : "",
			      	"unit" 				: "",
                    "unitRate"          : "",
				    "purchaseNumber"    : "",
					"Details" 		    :"",	
                    editId              : ""
                })
            })
            .catch((error)=>{
                console.log('error', error);
            })
       }
	}


	render() {
		return (
			<div  className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
				<div  className="col-lg-12 col-md-12 col-xs-12 col-sm-12 pmcontentWrap">
					<div className='col-lg-12 col-md-12 col-xs-12 col-sm-12 pmpageContent'>
						<div className="box-header with-border col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-right">
                            <h4 className="">Purchase Entry</h4>
                        </div>
						<div  className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
							<form className="col-lg-12 col-md-12 col-xs-12 col-sm-12 mtophr20" id="addNewPurchaseOrder">
							 <div  className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
								<div className="row">
									<div className="form-group col-lg-3 col-md-3 col-xs-12 col-sm-12 mbt25">
										<label >Purchase Date <i className="redFont">*</i></label>
										<input type="Date"  className="form-control"  value={ this.state.purchaseDate} name="purchaseDate" refs="purchaseDate" onChange={this.handleChange.bind(this)} id="purchaseDate"/>
									</div>
									<div className="form-group col-lg-3 col-md-3 col-xs-12 col-sm-12 mbt25">
										<label >Supplier <i className="redFont">*</i></label>
										<input list="purchaseLocation" type="text" refs="purchaseLocation" className="form-control"    placeholder="Select Supplier" value={this.state.purchaseLocation}  onChange={this.handleChange.bind(this)}  onBlur={this.handleProduct1.bind(this)} name="purchaseLocation" />
	    								{/*<input type="text" list="societyList" className="form-control" ref="society" value={this.state.societyName} onChange={this.handleChange.bind(this)} onBlur={this.handleSociety.bind(this)} name="societyName" placeholder="Enter Society" />*/}
										
										  <datalist id="purchaseLocation" name="purchaseLocation" >
										    <option value="Open Market"/>
										    {/*<option value="cauliflower"/>
										    <option value="spinach"/>
										    <option value="onion"/>
										    <option value="garlic"/>*/}
										  </datalist>
									</div>
								  </div>
								 </div>	
								 <div  className="col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding mtop20"> 
									<div className="form-group col-lg-3 col-md-3 col-xs-12 col-sm-12 mbt25">
										<label >Purchase No <i className="redFont">*</i></label>
										<input type="text" placeholder="Enter Purchase No"  className="form-control"  value={ this.state.purchaseNumber} name="purchaseNumber" refs="purchaseNumber" onChange={this.handleChange.bind(this)} id="purchaseNumber"/>
									</div>
									<div className="form-group col-lg-6 col-md-6 col-xs-12 col-sm-12 mbt25">
										<label >Details <i className="redFont">*</i></label>
										<input type="text" placeholder="Enter Purchase Details"  className="form-control"  value={ this.state.Details} name="Details" refs="Details" onChange={this.handleChange.bind(this)} id="Details"/>
									</div>
									<div className="form-group col-lg-3 col-md-3 col-xs-12 col-sm-12 mbt25">
										<label >Purchased By(Staff Name) <i className="redFont">*</i></label>
										<input type="text" placeholder="Enter Purchase Staff"  className="form-control"  value={ this.state.purchaseStaff} name="purchaseStaff" refs="purchaseStaff" onChange={this.handleChange.bind(this)} id="purchaseStaff"/>
									</div>
								 </div>
								 
						         <div  className="col-lg-12 col-md-12 col-xs-12 col-sm-12  NOpadding">
{/*
                                       <div className="form-margin col-lg-6 col-md-6 col-sm-12 col-xs-12" >
                                                    <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12">Vendor <sup className="astrick">*</sup></label>
                                                    <select id="vendor" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.vendor} ref="vendor" name="vendor" onChange={this.handleChange.bind(this)}>
                                                        <option>--Select Vendor--</option>
                                                        {
                                                            this.state.productArray && this.state.productArray.length > 0 ?
                                                                this.state.productArray.map((data, i)=>{
                                                                    return(
                                                                        <option key={i} value={data._id}>{data.productName}</option>
                                                                    );
                                                                })
                                                            :
                                                            null
                                                        }
                                                    </select>
                                                </div>
*/}
										
										<div className="form-group col-lg-3 col-md-3 col-xs-12 col-sm-12 mbt25 ">
											<label >Select Product <i className="redFont">*</i></label>
											{/*<input type="text" className="form-control" id="email"/>*/}
											<input list="product" type="text" refs="product" className="form-control"    placeholder="Select Product" value={this.state.product}  onChange={this.handleChange.bind(this)}  onBlur={this.handleProduct.bind(this)} name="product" />
		    								{/*<input type="text" list="societyList" className="form-control" ref="society" value={this.state.societyName} onChange={this.handleChange.bind(this)} onBlur={this.handleSociety.bind(this)} name="societyName" placeholder="Enter Society" />*/}
											
											  <datalist id="product" name="product" className="productDatalist">
											    {
                                                    this.state.productArray && this.state.productArray.length > 0 ?
                                                        this.state.productArray.map((data, i)=>{
															console.log("data",data);
                                                            return(
                                                                <option value={data.productName} data-itemCode={data.itemCode}>{data.productName} - {data.productCode} - {data.itemCode}</option>
                                                            );
                                                        })
                                                    :
                                                    null
                                                }
											  </datalist>
										</div>
										 <div className="formht col-lg-3 col-md-3 col-sm-12 col-xs-12">
					                       <div className="">
					                        <label className="control-label statelabel locationlabel" >Unit Rate <i className="redFont">*</i></label>
					                          <div className="input-group inputBox-main  new_inputbx unitRateDiv" >
						                           <div className="input-group-addon inputIcon">
						                           <i class="fa fa-rupee"></i>
						                         </div> 
						                         <input type="number" placeholder="1234" className="form-control new_inputbx1" value={ this.state.unitRate} name="unitRate" refs="unitRate" onChange={this.handleChange.bind(this)} id="unitRate" min="1"/>
					                         </div>     
					                      </div>  
                   					     </div>
									{/*<div className="form-group col-lg-3 col-md-3 col-xs-12 col-sm-12 mbt25">
										<label >Unit Rate</label>
										<input type="number" placeholder="1234" className="form-control" value={ this.state.unitRate} name="unitRate" refs="unitRate" onChange={this.handleChange.bind(this)} id="unitRate"/>
									</div>*/}
									<div className="form-group col-lg-3 col-md-3 col-xs-12 col-sm-12 mbt25">
										<label >Quantity <i className="redFont">*</i></label>
										<div className="quantityDiv">
											<input type="number" placeholder="Enter quantity " className="h34 col-lg-8 col-md-8 col-xs-8 col-sm-8" value={ this.state.quantity} name="quantity" refs="quantity" onChange={this.handleChange.bind(this)} id="quantity" min="1"/>
											<select id="Units"  name="Units" value={this.state.Units} refs="Units" onChange={this.handleChange.bind(this)}  className="col-lg-4 col-md-4 col-xs-4 col-sm-4 h34">
												<option selected={true} disabled={true}>-- Select --</option>
											  	<option value="Kg">Kg</option>
											  	<option value="Ltr">Ltr</option>
											  	<option value="gram">gram</option>
											  	<option value="Nos">Nos</option>
											</select>
										</div>
									</div>
									 <div className="formht col-lg-3 col-md-3 col-sm-12 col-xs-12">
				                       <div className="">
				                        <label className="control-label statelabel locationlabel" >Amount <i className="redFont">*</i></label>
				                          <div className="input-group inputBox-main  new_inputbx amountDiv" >
					                           <div className="input-group-addon inputIcon">
					                           <i class="fa fa-rupee"></i>
					                         </div> 
					                         <input type="number" placeholder="12345678" className="form-control new_inputbx1" value={ this.state.amount} name="amount" refs="amount" onChange={this.handleChange.bind(this)} id="amount" min="1"/>
				                         </div>     
				                       </div>  
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
						  <div className="form-group col-lg-4 col-md-4 col-xs-12 col-sm-12">
							<label>Purchase Date:</label>
							{/* <div className="form-group"> */}
							 <input type="Date" placeholder="1234" className="col-lg-6 col-md-6 form-control" value={this.state.serchByDate} name="serchByDate" refs="serchByDate" onChange={this.handleChangeDate.bind(this)} id="serchByDate"/>
                            {/* </div> */}
						  </div>
						  <div className="form-group col-lg-4 col-md-4 col-xs-12 col-sm-12 mbt25">
							<label>Purchase Number:</label>
							<select className="form-control allPoNumbers" aria-describedby="basic-addon1" name="selectedPurchaseNum" id="selectedPoNum" ref="selectedPoNum" value={this.state.selectedPurchaseNum} onChange={this.filterChange.bind(this)}>
							   <option disabled="">Select Purchase Number</option>
								{
									this.state.PurchaseNumberArray && this.state.PurchaseNumberArray.length > 0 ?
										this.state.PurchaseNumberArray.map((data, i)=>{
											return(
												<option>{data}</option>
											);
										})
									:
									null
								}
							</select>
						  </div>
						  <div className="form-group col-lg-4 col-md-4 col-xs-12 col-sm-12 mbt25">
							<label>Product Name:</label>
							<select className="form-control allProducts" aria-describedby="basic-addon1" name="selectedProductName" id="SelectProduct" ref="SelectProduct" value={this.state.selectedProductName} onChange={this.filterChange.bind(this)}>
							<option disabled="">Select Product</option>
							{
								this.state.productArray && this.state.productArray.length > 0 ?
									this.state.productArray.map((data, i)=>{
										return(
											<option>{data.productName}</option>
										);
									})
								:
								null
                            }
							</select>
						  </div>
						</div>
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
								<IAssureTable
									tableHeading={this.state.tableHeading}
                                    twoLevelHeader={this.state.twoLevelHeader} 
                                    dataCount={this.state.dataCount}
                                    tableData={this.state.tableData}
                                    getData={this.getData.bind(this)}
                                    tableObjects={this.state.tableObjects}
								/>
						</div>
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mtop25" style={{textAlignLast: "end"}}>
								<div className="form-group col-lg-8 col-md-8 col-xs-12 col-sm-12">
									<label>Total</label>
								</div>
								<div className="form-group col-lg-4 col-md-4 col-xs-12 col-sm-12">
									<label>{this.state.totalPoAmount}</label>
								</div>
						</div>		
					</div>
				</div>
			</div>
		);
	}
}
