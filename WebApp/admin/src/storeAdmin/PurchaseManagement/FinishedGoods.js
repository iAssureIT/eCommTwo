import React from 'react';
import './PurchaseManagement.css';
import swal from 'sweetalert';
import axios from 'axios';
import jQuery from 'jquery';
import $ from 'jquery';
import moment from 'moment';
import IAssureTable           from '../../coreadmin/IAssureTable/IAssureTable.jsx';
import Loader from '../loader/Loader.js'; 
import BulkUpload   from "../bulkupload/BulkUpload.js";
export default class FinishedGoods extends React.Component {

	constructor(props) {
		super(props);
		  this.state = {
			      	Date                : '',
					ItemCode            : '',
					ProductCode         : '',
			      	productName         : '',
			      	PackagefgUnitQty	: '-- Select --',
			      	fgTotalQty          : '-- Select --',
					Unit                : '-- Select --',
					finishedGoodsUnit   : '-- Select --',
					OutwardUnit         : '-- Select --',
					fgUnitWt            : '-- Select --',
					scrapUnit           : '-- Select --',
			      	"twoLevelHeader"    : {
						            apply  : false,
						           },
		             "tableHeading"     : {
		                Date            : "Date",
		        		productName     : "Product Name – Product Code - Item Code",
						InwardStock  	: "Finished Goods",
						OutwardStock    : "Raw Material",
						Quantity        : "Quantity",
						Weight          : "Weight",
						Scrap           : "Scrap",
						actions        	: 'Action',
					},
					"tableObjects" 		: {
						deleteMethod    : 'delete',
		                apiLink         : '/api/finishedGoodsEntry',
		                paginationApply : false,
		                searchApply     : false,
		                editUrl         : '/finished-goods'
					},
					fileDetailUrl           : "/api/finishedGoodsEntry/get/filedetails/",
					goodRecordsTable      : [],
					failedRecordsTable    : [],
					goodRecordsHeading :{
						Date            : "Date",
						productName     : "Product Name – Product Code - Item Code",
						productCode     : "Product Code",
						itemCode        : "Item Code",
						InwardStock  	: "Finished Goods",
						InwardUnit      : "Inward Unit",
						OutwardStock    : "Raw Material",
						OutwardUnit     : "Raw Material Unit",
						Quantity        : "Quantity",
						Weight          : "Weight",
						UnitWt          : "Unit Weight",
						Scrap           : "Scrap",
						ScrapUnit       : "Scrap Unit"
					},
					failedtableHeading :{
						Date            : "Date",
						productName     : "Product Name – Product Code - Item Code",
						productCode     : "Product Code",
						itemCode        : "Item Code",
						InwardStock  	: "Finished Goods",
						InwardUnit      : "Inward Unit",
						OutwardStock    : "Raw Material",
						OutwardUnit     : "Raw Material Unit",
						Quantity        : "Quantity",
						Weight          : "Weight",
						UnitWt          : "Unit Weight",
						Scrap           : "Scrap",
						ScrapUnit       : "Scrap Unit",
						failedRemark    :  "Failed Data Remark",
					},
		            startRange          : 0,
		            limitRange          : 10, 
					editId              : this.props.match.params ? this.props.match.params.finishedGoodId : '',
					productArray        : [],
					itemCodeArray       : [],
					OutwardRawMaterial  : '',
					fgUnitQty           : '',
					fgUnitQtyforFG      : 0,
					totalInward         : 0,
					totalOutward        : 0,
					CurrentStock        : 0,
					totalscrapQty       : 0,
					scrapQty            : 0,
					errorMsg            : '',
					filterData          : {},
					filterByDate        : '',
					filterByProduct     : '',
					productId           : '',
					CurrentStockUnit    : '',
					unitOfMeasurementArray  : []	
	  };
	  this.uploadedData = this.uploadedData.bind(this);
	  this.getFileDetails = this.getFileDetails.bind(this);
	}
    
	componentDidMount(){
		var editId = this.props.match.params.purchaseId;
		$.validator.addMethod("validDate", function(value, element) {
			return !isNaN((new Date(value)).getTime());
			//return this.optional(element) || moment(value,"MM/DD/YYYY").isValid();
		}, "Please enter a valid date in the format MM/DD/YYYY");

		$.validator.addMethod("noSpace", function(value, element) { 
			return value === '' || value.trim().length !== 0;
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
			  PackagefgUnitQty: {
				required: true,
				noSpace:true
			  },
			  Unit:{
				required: true,
				noSpace:true
			  },
			  fgTotalQty:{
				required:true,
				noSpace:true
			  },
			  OutwardRawMaterial:{
				required:true,
				noSpace:true
			  },
			  OutwardUnit:{
				required:true,
			  },
			  fgUnitQty:{
				required:true,
				noSpace:true
			  },
			  fgUnitWt:{
				required:true,
			  },
			  scrapUnit:{
				required:true,
			  },
			  finishedBy:{
				required:true,
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
			  if (element.attr("name") === "PackagefgUnitQty") {
				error.insertAfter("#Unit");
			  }
			  if (element.attr("name") === "Unit") {
				error.insertAfter("#Unit");
			  }
			  if (element.attr("name") === "fgTotalQty") {
				error.insertAfter("#fgTotalQty");
			  }
			  if (element.attr("name") === "OutwardRawMaterial" || element.attr("name") === "OutwardUnit") {
				error.insertAfter(".outwardRawMatDiv");
			  }
			  if (element.attr("name") === "fgUnitQty") {
				error.insertAfter(".fgUnitQtyPerUnitDiv");
			  }
			  if (element.attr("name") === "finishedBy") {
				error.insertAfter("#finishedBy");
			  }
			  
			  if (element.attr("name") === "scrapUnit") {
				error.insertAfter(".scrapMaterialDiv");
			  }
			  if (element.attr("name") === "fgUnitWt") {
				error.insertAfter(".WeightPerUnitDiv");
			  }
			  
			  
			}
		});

		this.setState({
			Date         : moment(new Date()).format("YYYY-MM-DD"),
			filterByDate : moment(new Date()).format("YYYY-MM-DD")
		},()=>{
			this.getData();
			this.getListProducts();
			this.getUom();
		});

	}
	componentWillReceiveProps(nextProps) {
        var editId = nextProps.match.params.finishedGoodId;
        if(nextProps.match.params.finishedGoodId){
          this.setState({
			editId : editId,
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
			      	"PackagefgUnitQty"	: response.data.PackagefgUnitQty,
			      	"fgTotalQty"     	: response.data.fgTotalQty,
					"Unit"         		: response.data.Unit,
					"CurrentStock"      : response.data.CurrentStock,
					"OutwardRawMaterial": response.data.OutwardStock,
					"OutwardUnit"       : response.data.OutwardUnit,
					"fgUnitQty"         : response.data.fgUnitQty,
					"fgUnitWt"          : response.data.fgUnitQtyPerUnit,
					"fgTotalQty" 	    : response.data.fgTotalQty,
					"fgUnitQtyforFG"    : response.data.fgInwardQty,
					"finishedGoodsUnit" : response.data.fgInwardQty,
					"scrapQty"          : response.data.scrapQty,
					"scrapUnit" 		: response.data.scrapUnit,
					"finishedBy"        : response.data.finishedBy
            });
            
        })
        .catch((error)=>{
            console.log('error', error);
        });
    }
	getData(startRange, limitRange){ 
		var filterData = this.state.filterData;
		if(this.state.filterByProduct !== "Select Product"){
			filterData.itemcode = this.state.filterByProduct;
		}
		filterData.date = this.state.filterByDate;
		axios
		.post('/api/finishedGoodsEntry/post/list/',filterData)
		.then((response)=>{
			var  tableData = response.data ;
				var tableData = tableData.map((a, i) => {
						return {
	
							_id                  : a._id,
							Date   				 : a.Date ? moment(a.Date).format("DD-MMM-YYYY") : "",
							productName 	     : a.productName ? a.productName +' - '+ a.ProductCode +' - '+ a.ItemCode: "" ,
							InwardStock          : a.fgInwardQty ? a.fgInwardQty +' '+ a.fgInwardUnit : 0,
							OutwardStock         : a.OutwardRawMaterial ? a.OutwardRawMaterial +' '+ a.OutwardUnit : 0,
							Quantity             : a.fgTotalQty ? a.fgTotalQty : 0,
							Weight               : a.fgUnitQty ? a.fgUnitQty +' '+ a.fgUnitWt : 0,
							Scrap                : a.scrapQty ? a.scrapQty +' '+ a.scrapUnit : 0 
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
	
	getListProducts(){
		axios.get("/api/finishedGoodsEntry/get/ProductList")
            .then((response) => {
				var ProductList = [];
				var PoNumbersArray = [];
				response.data.filter(function(item,index){
					var i = ProductList.findIndex(x => x.itemCode == item.ProductList[0].itemCode);
					if(i <= -1){
						ProductList.push(item.ProductList[0]);
					}
					return null;
				});	
				this.setState({
					 productArray: ProductList
				},() =>{
					// console.log("ProductList",ProductList);
				})
            })
            .catch((error) => {
                console.log('error', error);
            })
	}

	getUom(){
		axios.get("/api/unitofmeasurmentmaster/get/list")
		.then((response) => {
			var unitOfMeasurementArray = [];
			response.data.filter(function(item,index){
				var i = unitOfMeasurementArray.findIndex(x => x.department == item.department);
				if(i <= -1){
					unitOfMeasurementArray.push(item.department);
				}
				return null;
			});

			this.setState({
				 unitOfMeasurementArray : unitOfMeasurementArray
			},()=>{
				//  console.log("unitOfMeasurementArray",unitOfMeasurementArray);
			});
		})
		.catch((error) => {
			console.log('error', error);
		})
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
		// console.log("checkedUser",this.state.checkedUser)
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
      },()=>{
		this.weightConverter()
	  });

	  if(name == "fgUnitWt"){
		this.setState({ 
			fgUnitQtyforFG : this.state.fgTotalQty * this.state.fgUnitQty,
			finishedGoodsUnit : this.state.OutwardUnit
		  },()=>{
			//   console.log("finishedGoodsUnit",this.state.fgUnitWt);
			  this.weightConverter();
		  });
	  }
	   if(name == "OutwardUnit"){
		this.setState({ 
			scrapUnit : value,
			OutwardUnit : value,
			finishedGoodsUnit : value
		  },()=>{
			//   console.log("finishedGoodsUnit",this.state.fgUnitWt);
			  this.weightConverter()
		  });
	  }
	  this.checkValidInward();
	}

	onProductChange(event){
	  var itemCode;
	  var productCode;
	  var productId;
	  var TotalfgUnitQty;
	  const {name,value} = event.target;
	  this.setState({ 
		[name]:value,
		CurrentStock:0
      },()=>{
	  });
		var productDatalist = $(".productDatalist").find("option[value='" + name + "']");
		$(".productDatalist option").filter(function(index,item){
		  if(item.value == event.target.value){
			itemCode    =   $(item).data('itemcode');
			productCode =   $(item).data('productcode');
			productId   =   $(item).data('productId');
		  }
	  });

	  this.setState({ 
		"ItemCode"    : itemCode,
		"ProductCode" : productCode,
		"productId"   : productId
	  },()=>{
		  this.getCurrentStock();
	  });
	}

	onOutwardRawMaterialChange(event){
	  const {name,value} = event.target;
	  var CurrentStock = this.state.CurrentStock;
	  this.setState({ 
		[name]:value,
	  },()=>{
		this.weightConverter();
		this.checkValidInward();
	  });
	//   if(value <= CurrentStock){
	// 	this.setState({ 
	// 		[name]:value,
	// 	  },()=>{
	// 	  });
	//   }else{
	// 	// swal("Outward should be less than current stock.");
	// 	// this.setState({ 
	// 	// 	OutwardRawMaterial:0,
	// 	//   },()=>{
	// 	// });
	//   }
	  
	}

	getCurrentStock(){
		    axios.get('/api/purchaseEntry/get/RawMaterialCurrentStock/'+this.state.ItemCode)
		    .then(response => {
				// console.log("getCurrentStock",response.data);
				if(response.data){
					this.setState({
						CurrentStock     : response.data[0].totalStock ? response.data[0].totalStock : 0,
						CurrentStockUnit : response.data[0].StockUnit  ? response.data[0].StockUnit  : "", 
					},()=>{
						
					});
				}
				
			})
		    .catch(error=>{
			    console.log("error in getTotalOutward = ", error);
		    });
	}

	checkValidInward(){
		var TotalFcInward = Number(this.state.fgUnitQtyforFG) + Number(this.state.scrapQty);
		var TotalOutward  = this.state.OutwardRawMaterial;
		var OutwardError  = '';
		var CurrentStockUnit =  this.state.CurrentStockUnit;
		var OutwardUnit      =  this.state.OutwardUnit;
		var finishgoodUnitWt =  this.state.finishedGoodsUnit;
		var ScrapUnit        =  this.state.scrapUnit;

		if(CurrentStockUnit === OutwardUnit){
			OutwardError = this.state.CurrentStock >= this.state.OutwardRawMaterial ? "" : "You don't have enough stock to convert";
		}else{
			if(CurrentStockUnit === "Kg" && OutwardUnit === "Gm"){
				var OutwardRawInKg = this.state.OutwardRawMaterial / 1000;
				OutwardError =  this.state.CurrentStock >= OutwardRawInKg ? " " : "You don't have enough stock to convert";
			}

			if(CurrentStockUnit === "Gm" && OutwardUnit === "Kg"){
				var OutwardRawInGm = this.state.OutwardRawMaterial * 1000;
				OutwardError =  this.state.CurrentStock >= OutwardRawInGm ? " " : "You don't have enough stock to convert";
			}

			if(CurrentStockUnit === "Gm" && OutwardUnit === "Gm"){
				OutwardError =  this.state.CurrentStock >= this.state.OutwardRawMaterial ? " " : "You don't have enough stock to convert";
			}

			if(CurrentStockUnit === "Kg" && OutwardUnit === "Kg"){
				OutwardError =  this.state.CurrentStock >= this.state.OutwardRawMaterial ? " " : "You don't have enough stock to convert";
			}
		}

		if(Number(TotalFcInward) > Number(TotalOutward)){
			if(OutwardError !== ""){
				OutwardError += "\n"+"You can convert only selected Raw material stock quantity.";
			}else{
				OutwardError += "  You can convert only selected Raw material stock quantity.";
			}
		}else{
			 OutwardError = "";
		}
	
			this.setState({
				errorMsg : OutwardError ? OutwardError : "Valid",
			},()=>{
		 	});
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
			"Date" 		        : this.state.Date,
			"productId"         : this.state.productId,
			"productName" 	    : this.state.productName,
			"ItemCode" 	        : this.state.ItemCode,
			"ProductCode"       : this.state.ProductCode,
			"CurrentStock"      : this.state.CurrentStock,
			"OutwardRawMaterial": this.state.OutwardRawMaterial,
			"OutwardUnit"       : this.state.OutwardUnit,
			"fgUnitQty"         : this.state.fgUnitQty,
			"fgUnitWt"          : this.state.fgUnitWt,
			"fgTotalQty" 	    : this.state.fgTotalQty,
			"fgInwardQty"       : this.state.fgUnitQtyforFG,
			"fgInwardUnit"      : this.state.finishedGoodsUnit,
			"scrapQty"          : this.state.scrapQty,
			"scrapUnit" 		: this.state.scrapUnit,
			"finishedBy"        : this.state.finishedBy,
		};

	
	  if ($('#finishedGoodsInwardForm').valid()) {
		if(productDatalist !== null && productDatalist.length > 0){
			if(this.state.errorMsg !== "Valid"){
				// swal("if");
				swal(this.state.errorMsg);
			}else{

				axios
					.post('/api/finishedGoodsEntry/post',formValues1)
					.then((response)=>{
					// handle success
						swal("Thank you. Your Data addeed successfully.");
						this.getData();
					})
					.catch(function (error) {
					// handle error
						console.log(error);
					});
					this.setState({
						"Date" 		        : moment(new Date()).format("YYYY-MM-DD"),
						"ItemCode" 	        : '',
						"PackagefgUnitQty"  : '',
						"fgTotalQty" 	    : '',
						"productName" 	    : '',
						"Unit" 		     	: '',
						"fgUnitQty"         : '',
						"CurrentStock"      : 0,
						"OutwardRawMaterial": '',
						"fgUnitQtyforFG"    : 0,
						"scrapQty"          : 0,
						"finishedBy"        : '',
						"errorMsg"          : '',
						"PackagefgUnitQty"  : '-- Select --',
						"fgTotalQty" 	    : '-- Select --',
						"OutwardUnit" 		: '-- Select --',
						"fgUnitWt" 		    : '-- Select --',
						"finishedGoodsUnit" : '-- Select --',
						'scrapUnit'         : '-- Select --',
				})
				// swal("correct");
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
			 "CurrentStock"         : this.state.CurrentStock,
			 "OutwardStock"         : this.state.OutwardRawMaterial,
			 "OutwardUnit"          : this.state.OutwardUnit,
			 "fgUnitQty"            : this.state.fgUnitQty,
			 "fgUnitQtyPerUnit"     : this.state.fgUnitWt,
			 "fgTotalQty" 			: this.state.fgTotalQty,
			 "fgInwardQty"          : this.state.fgUnitQtyforFG,
			 "fgInwardUnit"         : this.state.finishedGoodsUnit,
			 "scrapQty"             : this.state.scrapQty,
			 "scrapUnit" 		    : this.state.scrapUnit,
			 "finishedBy"           : this.state.finishedBy,
        }
		if ($('#finishedGoodsInwardForm').valid()) {
			if(this.state.errorMsg === ""){
				axios.patch('/api/finishedGoodsEntry/update/'+this.state.editId,formValues)
				.then((response)=>{
					this.props.history.push('/finished-goods');
					// swal(response.data.message);
					this.getData(this.state.startRange, this.state.limitRange);
					this.setState({
						"date" 		        : '',
						"ItemCode" 	        : '',
						"PackagefgUnitQty"  : '-- Select --',
						"fgTotalQty" 	    : '-- Select --',
						"productName" 	    : '',
						"OutwardUnit" 		: '-- Select --',
						"fgUnitWt" 		    : '-- Select --',
						"finishedGoodsUnit" : '-- Select --',
						'scrapUnit'         : '-- Select --',
						"CurrentStock"      : 0,
						"OutwardRawMaterial": '',
						"fgUnitQtyforFG"    : 0,
						"scrapQty"          : 0,
						"finishedBy"        : '',
						"editId"            : '',
						
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

	/*bulk upload start*/
	uploadedData(data){
		this.getData(this.state.startRange,this.state.limitRange)
	}

	getFileDetails(fileName){
		axios
		.get(this.state.fileDetailUrl+fileName)
		.then((response)=> {
		 if (response) {
		  this.setState({
			  fileDetails:response.data,
			  failedRecordsCount : response.data.failedRecords.length,
			  goodDataCount : response.data.goodrecords.length
		  });
  
		  var tableData = response.data.goodrecords.map((a, i)=>{
			return{
				"Date"                : a.Date                ? moment(a.Date).format("YYYY-MM-DD") : '-',
				"productName"         : a.productName         ? a.productName        : '-',
				"productCode"         : a.ProductCode         ? a.ProductCode        : '-',
				"itemCode"            : a.ItemCode            ? a.ItemCode              : '-',
				"InwardStock"         : a.fgInwardQty         ? a.fgInwardQty        : '-',
				"InwardUnit"          : a.fgInwardUnit        ? a.fgInwardUnit       : '-',
				"OutwardStock"        : a.OutwardRawMaterial  ? a.OutwardRawMaterial : '-',
				"OutwardUnit"         : a.OutwardUnit         ? a.OutwardUnit        : '-',
				"Quantity"            : a.fgTotalQty          ? a.fgTotalQty         : '-',
				"Weight"              : a.fgUnitQty           ? a.fgUnitQty          : '-',
				"UnitWt"              : a.fgUnitWt            ? a.fgUnitWt           : '-',
				"Scrap"               : a.scrapQty            ? a.scrapQty           : '-',
				"ScrapUnit"           : a.scrapUnit           ? a.scrapUnit           : '-',
			}
		  })
  
		  var failedRecordsTable = response.data.failedRecords.map((a, i)=>{
		  return{
			  "Date"                : a.Date                ? moment(a.Date).format("YYYY-MM-DD") : '-',
			  "productName"         : a.productName         ? a.productName        : '-',
			  "productCode"         : a.ProductCode         ? a.ProductCode        : '-',
			  "itemCode"            : a.itemCode            ? a.itemCode              : '-',
			  "InwardStock"         : a.fgInwardQty         ? a.fgInwardQty        : '-',
			  "InwardUnit"          : a.fgInwardQty         ? a.fgInwardQty        : '-',
			  "OutwardStock"        : a.OutwardRawMaterial  ? a.OutwardRawMaterial : '-',
			  "OutwardUnit"         : a.OutwardUnit         ? a.OutwardUnit        : '-',
			  "Quantity"            : a.fgTotalQty          ? a.fgTotalQty         : '-',
			  "Weight"              : a.fgUnitQty           ? a.fgUnitQty          : '-',
			  "UnitWt"              : a.fgUnitWt            ? a.fgUnitWt           : '-',
			  "Scrap"               : a.scrapQty            ? a.scrapQty           : '-',
			  "ScrapUnit"           : a.scrapUnit           ? a.scrapUnit           : '-',
			  "failedRemark"        : a.remark              ? a.remark             : '-',
		  }
		  })
		  this.setState({
			  goodRecordsTable : tableData,
			  failedRecordsTable : failedRecordsTable
		  })
		}
		})
		.catch((error)=> { 
		  console.log('error', error);
		}) 
	} 

	/* Bulk upload end*/
	/* Filters start*/
	filterChange(event){
		event.preventDefault();
		const {name,value} = event.target;
  
		this.setState({ 
		  [name]:value,
		},()=>{
		  this.getData();
		 });
	  }
   /* Filters end*/
   /* Weight Convertor start*/
    weightConverter() {
	   // Gram to Kilograms
		if(this.state.OutwardUnit == 'Gm' && this.state.fgUnitWt == "Kg"){
			//convert fgunit to gram and calculate
			var FgUnitKg=this.state.fgUnitQty*1000;
			var fgTotalQtyToKg = this.state.fgUnitQtyforFG/1000;
			var Scrap = this.state.OutwardRawMaterial-(this.state.fgUnitQty * this.state.fgTotalQty * 1000);
			this.setState({
				fgUnitQtyforFG    : (this.state.fgUnitQty * this.state.fgTotalQty)*1000,
				scrapQty          : Scrap > 0 ? Scrap: 0,
				scrapUnit         : this.state.OutwardUnit,
			},() => {
				this.checkValidInward();
			})
			
		}else if(this.state.OutwardUnit == 'Gm' && this.state.fgUnitWt == "Gm"){
			var FgUnitGm=this.state.fgUnitQty/1000;
			var Scrap = this.state.OutwardRawMaterial - (this.state.fgUnitQty * this.state.fgTotalQty);
			this.setState({
				fgUnitQtyforFG    : this.state.fgUnitQty * this.state.fgTotalQty,
				scrapQty          : Scrap > 0 ? Scrap : 0
			},() => {
				this.checkValidInward();
			})
		}

		// Kilograms to Gram
		if(this.state.OutwardUnit == 'Kg' && this.state.fgUnitWt == "Gm"){
			//convert fgunit to kg and calculate
			var FgUnitKg=this.state.fgUnitQty*1000;
			var fgTotalQtyToKg = this.state.fgUnitQtyforFG/1000;
			var Scrap =  this.state.OutwardRawMaterial-(this.state.fgUnitQty * this.state.fgTotalQty/1000);
			this.setState({
				fgUnitQtyforFG    : (this.state.fgUnitQty * this.state.fgTotalQty)/1000,
				scrapQty          : Scrap > 0 ? Scrap : 0,
				scrapUnit         : this.state.OutwardUnit,
			},() => {
				this.checkValidInward();
			})
			
		}else if(this.state.OutwardUnit == 'Kg' && this.state.fgUnitWt == "Kg"){
			var Scrap = this.state.OutwardRawMaterial - (this.state.fgUnitQty * this.state.fgTotalQty);
			this.setState({
				fgUnitQtyforFG    : this.state.fgUnitQty * this.state.fgTotalQty,
				scrapQty          : Scrap > 0 ? Scrap : 0
			},() => {
				this.checkValidInward();
			})
		}

		if(this.state.OutwardUnit.toLowerCase()  != 'kg' || this.state.OutwardUnit.toLowerCase()  != 'gm'){
			var Scrap = Number(this.state.OutwardRawMaterial) - Number(this.state.fgUnitQtyforFG);
			this.setState({
				fgUnitQtyforFG    : this.state.fgUnitQty * this.state.fgTotalQty,
				scrapQty          : Scrap > 0 ? Scrap : 0
			},() => {
				this.checkValidInward();
			})
		}

    }
   /* Weight Convertor end*/
	render() {
		return (
			<div  className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
				<div  className="col-lg-12 col-md-12 col-xs-12 col-sm-12 pmcontentWrap">
					<div className='col-lg-12 col-md-12 col-xs-12 col-sm-12 pmpageContent'>
					    <div className="box-header with-border col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-right ">
                            <h4 className="col-lg-3 col-md-3 col-sm-12 col-xs-12" style={{"display":"inline","float":"left"}}>Finished Goods Entry</h4>
							<ul className="nav tabNav nav-pills col-lg-3 col-md-3 col-sm-12 col-xs-12" style={{"display":"inline","float":"right"}}>
                    		  <li className="active col-lg-5 col-md-5 col-xs-5 col-sm-5 NOpadding text-center"><a data-toggle="pill"  href="#manual">Manual</a></li>
                    		  <li className="col-lg-6 col-md-6 col-xs-6 col-sm-6 NOpadding  text-center"><a data-toggle="pill"  href="#bulk">Bulk Upload</a></li>
                  		   </ul>
                        </div>
						<div className="tab-content ">
							<div id="manual" className="col-lg-12 col-md-12 col-xs-12 col-sm-12 tab-pane fade in active">
								<form className="col-lg-12 col-md-12 col-xs-12 col-sm-12 mtophr20" id="finishedGoodsInwardForm">
									<div className="row">
										<div className="form-group col-lg-3 col-md-3 col-xs-12 col-sm-12">
											<label >Date <i className="redFont">*</i></label>
											<input type="Date"  className="form-control"  value={ this.state.Date} name="Date" refs="Date" onChange={this.handleChange.bind(this)} id="Date"/>
										</div>
										<div className="form-group col-lg-3 col-md-3 col-xs-12 col-sm-12">
											<label >Select Product <i className="redFont">*</i></label>
											<input list="productName" type="text" refs="productName" id="selectProductName" className="form-control"    placeholder="Enter Product Code or Name" value={this.state.productName}  onChange={this.onProductChange.bind(this)}  onBlur={this.handleProduct.bind(this)} name="productName" autocomplete="off"/>
											<datalist id="productName" name="productName" className="productDatalist" autocomplete="off">
											{
													this.state.productArray && this.state.productArray.length > 0 ?
														this.state.productArray.map((data, i)=>{
															return(
																<option value={data.productName} data-productcode={data.productCode} data-itemcode={data.itemCode} data-productId={data._id}>{data.productName} - {data.productCode} - {data.itemCode}</option>
															);
														})
													:
													<option value="" disabled>No Products</option>
											}
											</datalist>
										</div>
										<div className="form-group col-lg-3 col-md-3 col-xs-12 col-sm-12">
											<label>Current Stock</label>
											<div className="input-group inputBox-main  new_inputbx" >
											    <input type="text"  className="form-control"  value={ this.state.CurrentStock} name="CurrentStock" id="CurrentStock" readOnly/>
												<div className="input-group-addon">
												   {this.state.CurrentStockUnit}
												</div> 
											</div> 
										</div>
										<div className="form-group col-lg-3 col-md-4 col-xs-12 col-sm-12">
											<label >Outward From Raw Material <i className="redFont">*</i></label>
											<div className="outwardRawMatDiv">
												<input type="number" placeholder="Enter outward from raw material " className="h34 col-lg-8 col-md-9 col-xs-8 col-sm-8" value={ this.state.OutwardRawMaterial} name="OutwardRawMaterial" refs="outward" onChange={this.onOutwardRawMaterialChange.bind(this)} id="outward" min="1"/>
												<select id="OutwardUnit"  name="OutwardUnit" value={this.state.OutwardUnit} refs="OutwardUnit" onChange={this.handleChange.bind(this)}  className="col-lg-4 col-md-3 col-xs-4 col-sm-4 h34">
												    <option key={0} selected={true} disabled={true}>-- Select --</option>
													{
														this.state.unitOfMeasurementArray && this.state.unitOfMeasurementArray.length > 0 ?
															this.state.unitOfMeasurementArray.map((data, i)=>{
																return(
																	<option key={i+1} value={data}>{data}</option>
																);
															})
														:
														null
													}
												</select>
											</div>
										</div>
									</div>
									<div className="row mtop25">
										<div className="form-group col-lg-3 col-md-4 col-xs-12 col-sm-12">
											<label>Weight Per Finished Product Unit <i className="redFont">*</i></label>
											<div className="WeightPerUnitDiv">
												<input type="number" placeholder="Enter fgUnitQty" className="h34 col-lg-8 col-md-9 col-xs-8 col-sm-8" value={ this.state.fgUnitQty} name="fgUnitQty" refs="fgUnitQty" onChange={this.handleChange.bind(this)} id="fgUnitQty" onBlur={this.weightConverter.bind(this)} min="1"/>
												<select id="fgUnitWt"  name="fgUnitWt" value={this.state.fgUnitWt} refs="Unit" onChange={this.handleChange.bind(this)}  className="col-lg-4 col-md-3 col-xs-4 col-sm-4 h34" onBlur={this.weightConverter.bind(this)}>
												    <option key={0} selected={true} disabled={true}>-- Select --</option>
													{
														this.state.unitOfMeasurementArray && this.state.unitOfMeasurementArray.length > 0 ?
															this.state.unitOfMeasurementArray.map((data, i)=>{
																return(
																	<option key={i+1} value={data}>{data}</option>
																);
															})
														:
														null
													}
												</select>
											</div>
										</div>
										<div className="form-group col-lg-3 col-md-4 col-xs-12 col-sm-12">
											<label >Total Finished Quantity <i className="redFont">*</i></label>
											<input type="number" placeholder="" className="form-control" value={ this.state.fgTotalQty} name="fgTotalQty" refs="fgTotalQty" onChange={this.handleChange.bind(this)} id="fgTotalQty" onBlur={this.weightConverter.bind(this)} min="0.1"/>
										</div>
										<div className="form-group col-lg-3 col-md-4 col-xs-12 col-sm-12">
											<label>Total Weight For finished Goods</label>
											<div className="WtForFgDiv">
												<input type="number" placeholder="Enter Weight" className="h34 col-lg-8 col-md-9 col-xs-8 col-sm-8" value={ this.state.fgUnitQtyforFG} name="fgUnitQtyforFG" refs="wtforFG" onChange={this.handleChange.bind(this)} id="fgUnitQtyforFG" min="0" readOnly/>
												<select id="finishedGoodsUnit"  name="finishedGoodsUnit" value={this.state.finishedGoodsUnit} refs="finishedGoodsUnit" onChange={this.handleChange.bind(this)}  className="col-lg-4 col-md-3 col-xs-4 col-sm-4 h34" style={{"pointerEvents": "none"}}>
												    <option key={0} selected={true} disabled={true}>-- Select --</option>
													{
														this.state.unitOfMeasurementArray && this.state.unitOfMeasurementArray.length > 0 ?
															this.state.unitOfMeasurementArray.map((data, i)=>{
																return(
																	<option key={i+1} value={data}>{data}</option>
																);
															})
														:
														null
													}
												</select>
											</div>
										</div>
										<div className="form-group col-lg-3 col-md-4 col-xs-12 col-sm-12">
											<label>Scrap Material</label>
											<div className="scrapMaterialDiv">
												<input type="number" placeholder="Enter scrapQty" className="h34 col-lg-8 col-md-9 col-xs-8 col-sm-8" value={ this.state.scrapQty} name="scrapQty" refs="scrapQty" onChange={this.handleChange.bind(this)} id="scrapQty" min="0" onBlur={this.weightConverter.bind(this)} style={{"pointerEvents": "none"}}/>
												<select id="scrapUnit"  name="scrapUnit" value={this.state.scrapUnit} refs="scrapUnit" onChange={this.handleChange.bind(this)}  className="col-lg-4 col-md-3 col-xs-4 col-sm-4 h34" style={{"pointerEvents": "none"}}>
												    <option key={0} selected={true} disabled={true}>-- Select --</option>
													{
														this.state.unitOfMeasurementArray && this.state.unitOfMeasurementArray.length > 0 ?
															this.state.unitOfMeasurementArray.map((data, i)=>{
																return(
																	<option key={i+1} value={data}>{data}</option>
																);
															})
														:
														null
													}
												</select>
											</div>
										</div>
									</div>
									<div className="row mtop25">
										<div className="form-group col-lg-3 col-md-4 col-xs-12 col-sm-12">
											<label >Finished By <i className="redFont">*</i></label>
											<input type="text" placeholder="Enter staff" className="form-control" value={ this.state.finishedBy} name="finishedBy" refs="finishedBy" onChange={this.handleChange.bind(this)} id="finishedBy"/>
										</div>
									</div>
									<div  className="col-lg-12 col-md-12 col-xs-12 col-sm-12 mtop20">
										{this.state.editId ?
										<button onClick={this.update.bind(this)} className="btn btn-primary col-lg-3 col-md-3 col-xs-4 col-sm-4 pull-right">Update</button>
										:
										<button className="btn btn-primary col-lg-3 col-md-3 col-xs-4 col-sm-4 pull-right" onClick={this.Submit.bind(this)}>Submit</button>
									}
									</div>
								</form>
								<div className="mtop25">
									<div className="form-group col-lg-4 col-md-4 col-xs-12 col-sm-12">
										<label>Finished Date:</label>
										<input type="Date" placeholder="1234" className="col-lg-6 col-md-6 form-control" value={this.state.filterByDate} name="filterByDate" refs="filterByDate" onChange={this.filterChange.bind(this)} id="filterByDate"/>
									</div>
									<div className="form-group col-lg-4 col-md-4 col-xs-12 col-sm-12 mbt25">
										<label>Product Name:</label>
										<select className="form-control productFilter" aria-describedby="basic-addon1" name="filterByProduct" id="filterByProduct" ref="filterByProduct" value={this.state.filterByProduct} onChange={this.filterChange.bind(this)}>
										<option disabled="">Select Product</option>
										{
											this.state.productArray && this.state.productArray.length > 0 ?
												this.state.productArray.map((data, i)=>{
													return(
													<option key={i} value={data.itemCode}>{data.productName} - {data.productCode} - {data.itemCode}</option>
													);
												})
											:
											null
										}
										</select>
									</div>
								</div>
								<div className="mtop25">
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
							<div id="bulk" className="col-lg-12 col-md-12 col-xs-12 col-sm-12 tab-pane fade in">
								<div className="row outerForm">
									<BulkUpload 
										url="/api/finishedGoodsEntry/finishedGoodsBulkUpload" 
										// data={{"purchaseNumber" : this.state.purchaseNumber}} 
										uploadedData={this.uploadedData} 
										fileurl="https://iassureitlupin.s3.ap-south-1.amazonaws.com/bulkupload/Create+Family.xlsx"
										fileDetailUrl={this.state.fileDetailUrl}
										getFileDetails={this.getFileDetails}
										getData={this.getData.bind(this)}
										fileDetails={this.state.fileDetails}
										goodRecordsHeading ={this.state.goodRecordsHeading}
										failedtableHeading={this.state.failedtableHeading}
										failedRecordsTable ={this.state.failedRecordsTable}
										failedRecordsCount={this.state.failedRecordsCount}
										goodRecordsTable={this.state.goodRecordsTable}
										goodDataCount={this.state.goodDataCount}
									/>
								</div>
							</div>
						</div>
						<div  className="col-lg-12 col-md-12 col-xs-12 col-sm-12">

						</div>
						
					</div>
				</div>
			</div>
		);
	}
}
