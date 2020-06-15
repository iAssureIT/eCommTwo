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
			      	
			      	
			      	Date         : '',
			      	ItemCode       : '',
			      	productName  : '',
			      	PackageWeight: '',
			      	Quantity     : '',
			      	Unit         : 'Kg',
			      	"twoLevelHeader"    : {
						            apply  : false,
						           },
		             "tableHeading"     : {
		                Date            : "Date",
		        		productName     : "Product Code – Item Code-Product Name",
		        		ItemCode 	    : "ItemCode",
		        		PackageWeight  	: "Package Weight",
		        		Quantity        : "Quantity",
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
					"itemCodeArray"     : []
      };
	}
    
	componentDidMount(){
		var editId = this.props.match.params.purchaseId;
        console.log('ven', editId);
		this.getData();
		this.getproducts();
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
			  },
			  ItemCode: {
				required: true,				
			  },
			  PackageWeight: {
				required: true,
			  },
			  Unit:{
				required: true,
			  },
			  Quantity:{
				required:true
			  },
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
			console.log('res', response);
			this.state.productArray.filter(function(item,index){
				if(item.productName == response.data.productName){
				  itemCodeArray.push(item.itemCode);
				}
			});
            this.setState({
					"Date"         : response.data.Date ,
					"itemCodeArray": itemCodeArray,
			      	"ItemCode"     : response.data.ItemCode,
			      	"productName"  : response.data.productName,
			      	"PackageWeight": response.data.PackageWeight,
			      	"Quantity"     : response.data.Quantity,
					"Unit"         : response.data.Unit,
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
        console.log("list===>",response.data);
        /*this.setState({
          
          tableData : response.data,
        });*/
        var  tableData = response.data ;
        console.log("tableData",tableData);
 
		/*return{  tableData: {
						fullName        : 'Date',
		        		city       		: "Product Code",
		        		company 		: "Item Code",
		        		role 			: "Product Name",
						email        	: 'Opening Stock',
						
		                status        	: 'Stock Added Today',
		                TotalStock      : 'Total Stock', 
		                }  
			}*/
			var tableData = tableData.map((a, i) => {
					return {
 
						_id                  : a._id,
						Date   				 : a.Date ? moment(a.Date).format("DD-MMM-YYYY") : "",
						productName 	     : a.productName ? a.productName : "" ,
						ItemCode 		     : a.ItemCode ? a.ItemCode : "" ,
						PackageWeight 		 : a.PackageWeight + a.Unit, 
						Quantity 		     : a.Quantity ? a.Quantity : "" ,
						Unit 	             : a.Unit,
						// TotalStock 			: "" ,
						
					/*	purchaseStaff		:
						purchaseLocation 	:
						Quantity 			:
						amount 				:
						Units 				:*/
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
	  var itemCodeArray = [];
      // const datatype = event.target.getAttribute('data-text');
	  const {name,value} = event.target;
	  if(name == "productName"){
		  this.state.productArray.filter(function(item,index){
			  if(item.productName == value){
				itemCodeArray.push(item.itemCode);
			  }
		  });
		  this.setState({
			itemCodeArray : itemCodeArray,
			ItemCode:''
		  })
	  }

      this.setState({ 
        [name]:value,
      } );
    }

    handleProduct(event){
    	var valproduct = event.currentTarget.value;
    	console.log("valproduct",valproduct);
		this.setState({product : valproduct});

    }

    handleItemCode(event){
    	var valproduct = event.currentTarget.value;
    	console.log("valproduct",valproduct);
		this.setState({ItemCode : valproduct});

    }
    Submit(event){
		event.preventDefault();

		var productDatalist = $(".productDatalist").find("option[value='" + this.state.productName + "']");
		var itemcodeDatalist = $(".datalistItemCode").find("option[value='" + this.state.ItemCode + "']");
	
		const formValues1 = {
			// "amount"         	: this.state.amount ,
			"Date" 		        : this.state.Date,
			"ItemCode" 	        : this.state.ItemCode,
			"PackageWeight"     : this.state.PackageWeight,
			"Quantity" 			: this.state.Quantity,
			"productName" 	    : this.state.productName,
			"Unit" 		     	: this.state.Unit,
		
		};

	  if ($('#finishedGoodsInwardForm').valid()) {
		if((productDatalist != null && productDatalist.length > 0) && (itemcodeDatalist != null && itemcodeDatalist.length > 0 )){
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
					"date" 		        : '',
					"ItemCode" 	        : '',
					"PackageWeight"        : '',
					"Quantity" 			: '',
					"productName" 	        : '',
					"Unit" 		     	: 'Kg',
			})
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
        var formValues = {
           "Date" 		        : this.state.Date,
      	   "ItemCode" 	        : this.state.ItemCode,
      	   "PackageWeight"      : this.state.PackageWeight,
      	   "Quantity" 			: this.state.Quantity,
      	   "productName" 	    : this.state.productName,
      	   "Unit" 		     	: this.state.Unit,
        }
		if ($('#finishedGoodsInwardForm').valid()) {
            axios.patch('/api/finishedGoodsEntry/update/'+this.state.editId,formValues)
			.then((response)=>{
                this.props.history.push('/finished-goods');
                swal(response.data.message);
                this.getData(this.state.startRange, this.state.limitRange);
                this.setState({
                    "date" 		            : '',
	      	         "ItemCode" 	        : '',
	      			 "PackageWeight"        : '',
	      			 "Quantity" 			: '',
	      			 "productName" 	        : '',
					 "Unit" 		     	: 'Kg',
					 "editId"               : ''
					
                })
            })
            .catch((error)=>{
                console.log('error', error);
            })
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
										<label >Date</label>
										<input type="Date"  className="form-control"  value={ this.state.Date} name="Date" refs="Date" onChange={this.handleChange.bind(this)} id="Date"/>
									</div>
									
								</div>
								<div className="row">
									<div className="form-group col-lg-3 col-md-4 col-xs-12 col-sm-12">
										<label >Select Product</label>
										{/*<input type="text" className="form-control" id="email"/>*/}
										<input list="productName" type="text" refs="productName" id="selectProductName" className="form-control"    placeholder="Enter Product Code or Name" value={this.state.productName}  onChange={this.handleChange.bind(this)}  onBlur={this.handleProduct.bind(this)} name="productName" />
	    								{/*<input type="text" list="societyList" className="form-control" ref="society" value={this.state.societyName} onChange={this.handleChange.bind(this)} onBlur={this.handleSociety.bind(this)} name="societyName" placeholder="Enter Society" />*/}

										  <datalist id="productName" name="productName" class="productDatalist">
										  {
												this.state.productArray && this.state.productArray.length > 0 ?
													this.state.productArray.map((data, i)=>{
														return(
															<option value={data.productName}>{data.productName}</option>
														);
													})
												:
												null
                                          }
										  </datalist>
									</div>
									<div className="form-group col-lg-3 col-md-4 col-xs-12 col-sm-12">
										<label >Select Item Code</label>
										{/*<input type="text" className="form-control" id="email"/>*/}
										<input list="ItemCode" type="text" refs="ItemCode" className="form-control"    placeholder="Enter Item Code" value={this.state.ItemCode}  onChange={this.handleChange.bind(this)}  onBlur={this.handleItemCode.bind(this)} name="ItemCode"  id="selectItemCode"/>
	    								{/*<input type="text" list="societyList" className="form-control" ref="society" value={this.state.societyName} onChange={this.handleChange.bind(this)} onBlur={this.handleSociety.bind(this)} name="societyName" placeholder="Enter Society" />*/}
										
										  <datalist id="ItemCode" name="ItemCode" class="datalistItemCode">
										  {
												this.state.itemCodeArray && this.state.itemCodeArray.length > 0 ?
													this.state.itemCodeArray.map((data, i)=>{
														return(
															<option value={data}>{data}</option>
														);
													})
												:
												null
                                           }
										  </datalist>
									</div>
									<div className="form-group col-lg-3 col-md-4 col-xs-12 col-sm-12">
										<label >Package Weight</label>
										<div className="PackageWeightDiv">
											<input type="number" placeholder="Enter Quantity " className="h34 col-lg-8 col-md-9 col-xs-8 col-sm-8" value={ this.state.PackageWeight} name="PackageWeight" refs="PackageWeight" onChange={this.handleChange.bind(this)} id="PackageWeight"/>
											<select id="Unit"  name="Unit" value={this.state.Unit} refs="Unit" onChange={this.handleChange.bind(this)}  className="col-lg-4 col-md-3 col-xs-4 col-sm-4 h34">
											  	<option selected={true} disabled={true}>-- Select --</option>
											  	<option value="Kg">Kg</option>
											  	<option value="Ltr">Ltr</option>
											  	<option value="gram">gram</option>
											  	<option value="Nos">Nos</option>
											</select>
										</div>
									</div>
									<div className="form-group col-lg-3 col-md-4 col-xs-12 col-sm-12">
										<label >Quantity</label>
										<input type="number" placeholder="12345678" className="form-control" value={ this.state.Quantity} name="Quantity" refs="Quantity" onChange={this.handleChange.bind(this)} id="Quantity"/>
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
