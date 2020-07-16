import React from 'react';
import IAssureTable           from '../../coreadmin/IAssureTable/IAssureTable.jsx';
import './bill.css';
import swal from 'sweetalert';
import axios from 'axios';
import moment from 'moment';
import jQuery, { isNumeric } from 'jquery';
import $ from 'jquery';
import { countBy } from 'underscore';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCartData } from '../../redux/actions/index';

export class Bill extends React.Component {
	constructor(props) {
		super(props);
		  this.state = {
				serchByDate:moment(new Date()).format("YYYY-MM-DD"), 
				categoriesData        : [], 
				SectionsData          : [],
				SectionCategoriesData : [],
				ProductList           : [],
				section_ID            : 0,
				searchText            : '',
				completeProductName   : '',
				franchiseLocation     : '',
				cartItems             : [],
				cartData              : [],
				totalAmt              : 0,
				billNumber            : 0,
				quantityAdded         : 0,
				discountPercentError  : '',
				quantity              : 0,
				discountPercent       : 0,
				discountedPrice       : 0,	
				rate   : 0,
				showDiscount :true
          };
	}
	
	componentDidMount(){
		this.props.fetchCartData();
		this.getCategories();
		this.getSections();
		this.getproducts();
		this.getFranchiseDetails();
		this.generateBillNumber();
		$('#sidebarCollapse').click();
		this.getCartData();

		$.validator.addMethod("regxPrice", function (value, element, regexpr) {
			return regexpr.test(value);
		  }, "Price should have positive decimal number followed by 1 or 2 digits");
		  $.validator.addMethod("regxavailableQuantity", function (value, element, regexpr) {
			return regexpr.test(value);
		  }, "Quantity should have positive decimal number followed by 1 or 2 digits");
		  $.validator.addMethod("regxDiscountPercent", function (value, element, regexpr) {
			return regexpr.test(value);
		  }, "Percent should have positive decimal number followed by 1 or 2 digits");
		 
		  jQuery.validator.setDefaults({
			debug: true,
			success: "valid",
		  });
	  
		  $("#addNewShopProduct").validate({
			ignore: [],         
			rules: {
			  originalPrice: {
				required: true,
				min :0,
				regxPrice: /^(?:[1-9]\d*|)?(?:\.\d{1,2})?$/,
			  },
			
			  discountPercent: {
				regxDiscountPercent: /^(?:[1-9]\d*|0)?(?:\.\d{1,2})?$/,
			  },
			  
			},
			errorPlacement: function (error, element) {
			  
			  if (element.attr("name") === "discountedPrice") {
				error.insertAfter("#discountedPrice");
			  }
			 
			  if (element.attr("name") === "originalPrice") {
				error.insertAfter(".originalPriceDiv");
			  }
		   }
		})
	}
	componentWillReceiveProps(nextProps) {
		//console.log("nextProps",nextProps.recentCartData);
		this.setState({
			cartData:nextProps.recentCartData,
			cartItems : nextProps.recentCartData.cartItems,
			cartQuantity : nextProps.recentCartData.cartQuantity,
			total : nextProps.recentCartData.total,
		},()=>{
			//console.log("state",this.state);
		})
	}
	getFranchiseDetails(){
		var userDetails = JSON.parse(localStorage.getItem('userDetails'));
		axios.post('/api/entitymaster/get/one/comapanyDetail/',{"companyID":userDetails.companyID})
        .then((response) => {
			var franchiseLocation = '';
			var gstNo = '';
			var city = '';
			var state = '';
			var country = '';
		
			if(response.data.locations){
				franchiseLocation = response.data.locations;
				gstNo = franchiseLocation[0].GSTIN;
				city = franchiseLocation[0].city;
				state = franchiseLocation[0].state;
				country = franchiseLocation[0].country;
			}
			this.setState({
				"franchise_id": response.data._id,
				"gstNo"       : gstNo,
				"franchiseLocation" : city +','+state+','+country,
				
			},()=>{
		   })
          
	      })
	      .catch((error) => {
			console.log("Error in franchiseDetail = ", error);
	      })
	}
	getCategories(){
		axios.get("/api/category/get/list")
		.then((response)=>{
		  this.setState({
			CategoriesData : response.data
		  })
		})
		.catch((error)=>{
		   console.log('error', error);
		})
	}

	getSections(){
		axios.get("/api/sections/get/get_megamenu_list")
        .then((response)=>{
            if(response.data){
              this.setState({ 
				SectionsData : response.data,
				section_ID : response.data[0]._id
              },()=>{
				this.getSectionCategories(this.state.section_ID)
				this.getProductListBySection(this.state.section_ID);
			  })
            }
            })
            .catch((error)=>{
                console.log('error', error);
        })
	}

	getSectionCategories(sectionId){
		$('.sectiontitle').removeClass('active');
		$('#'+sectionId).find('.sectiontitle').addClass('active');
		this.setState({
			section_ID : sectionId
		},()=>{
			this.getProductListBySection(sectionId)
		})
		axios.get("/api/category/get/list/"+sectionId)
        .then((response)=>{
            if(response.data){
               console.log("section SectionCategoriesData===",response.data); 
              this.setState({ 
				SectionCategoriesData : response.data
              })
              // console.log("megamenu section Data: ",this.state.categoryData);
            }
            })
            .catch((error)=>{
                console.log('error', error);
        })
	}

	getProductListByCategory(categoryId){
		axios.get("/api/products/get/listbycategory/"+categoryId)
        .then((response)=>{
            if(response.data){
               console.log("product list by category===",response.data); 
              this.setState({ 
				ProductList : response.data
              })
              // console.log("megamenu section Data: ",this.state.categoryData);
            }
            })
            .catch((error)=>{
                console.log('error', error);
        })
	}

	getProductListBySection(sectionId){
		axios.get("/api/products/get/list/"+sectionId)
        .then((response)=>{
            if(response.data){
               console.log("product list by section ===",response.data); 
              this.setState({ 
				ProductList : response.data
              })
              // console.log("megamenu section Data: ",this.state.categoryData);
            }
            })
            .catch((error)=>{
                console.log('error', error);
        })
	}

	getProductBySearch(event){
		event.preventDefault();
		const {name,value} = event.target;
		this.setState({
			[name] : value
		})
		axios.get("api/products/get/search/"+value)
        .then((response)=>{
            if(response.data){
               console.log("product list by search ===",response.data); 
              this.setState({ 
				ProductList : response.data
              })
              // console.log("megamenu section Data: ",this.state.categoryData);
            }
            })
            .catch((error)=>{
                console.log('error', error);
        })
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

	generateBillNumber(){
		axios.get("/api/carts/get/generateBillNumber/")
          .then((response)=>{ 
				this.setState({
					"billNumber" : response.data
				})
		  })
		  .catch((error) => {
			
		  })
	}
	
	onSearchItemCode(event){
		event.preventDefault();
		const {name,value} = event.target;
		var itemCode    = '';
		var unit        = '';
		var productCode = '';
		var productName = '';
		var completeProductName = '';
		var id  = 0;        
		var productDatalist = $(".productDatalist").find("option[value='" + name + "']");
		$(".productDatalist option").filter(function(index,item){
			if(item.value == event.target.value){
				var obj = {};
				itemCode     = $(item).data('itemcode');
				productCode  = $(item).data('productcode');
				unit         = $(item).data('unit');
				productName  = $(item).data('productname');
				id           = $(item).data('id');
				obj.itemCode = itemCode;
				obj.productCode = productCode;
				obj.productName = productName;
				completeProductName = productName + " - " +productCode+" - "+itemCode;
				// this.addtocart(productCode,id)
			}
		});
		console.log("productName",productName);
		if(productName){
			this.setState({ 
				"ItemCode"         : itemCode,
				"ProductCode"      : productCode,
				"Units"            : unit,
				"unitOfMeasurement": unit,
				"product"          : productName,
				"completeProductName" : completeProductName,
			 },()=>{
				 console.log(this.state.completeProductName);
			 });
		}else{
			this.setState({ 
				[name]:value,
			  },()=>{
			   });
		}

		this.addtocart(productCode,id,unit)
	}

	getCartData(){
        const userid = localStorage.getItem('user_ID');
        axios.get("/api/carts/get/cartproductlist/"+userid)
          .then((response)=>{ 
			console.log('cartData', response.data);
			var totalAmt = 0;
			if(response.data){
				totalAmt = response.data.reduce(function(prev,current){
					return prev+current.subTotal
				});
			}
			
			this.setState({
				totalAmt : totalAmt
			})
	
            this.setState({
                cartData : response.data
            })
          })
          .catch((error)=>{
            console.log('error', error);
          })
	}
	
	editCart(id){
		console.log("editCart",id);
		var showDiscount = false;
		this.props.recentCartData[0].cartItems.map((data,index)=>{
			console.log("data",data.productDetail._id);
			if(data._id == id){
				if(data.rate == 0){
					showDiscount = true;
				}
				this.setState({
					product_ID : data.productDetail._id,
					quantity : data.quantity,
					discountPercent :data.discountPercent,
					discountedPrice : data.discountedPrice,	
					rate   : data.rate,
					showDiscount : showDiscount
				})
			}
			
		});
	}
	discountedPrice(event) {
		event.preventDefault();
		this.setState({
		  [event.target.name]: event.target.value
		})
		// console.log('discountPercent', event.target.value);
		if (event.target.value > 100) {
		  this.setState({
			discountPercentError: "Discount Percent should be less than 100."
		  })
		} else if (event.target.value < 0) {
		  this.setState({
			discountPercentError: "Discount Percent should be greater than 0.",
			discountedPrice: 0
		  })
		} else {
		  this.setState({
			discountPercentError: ""
		  })
		}
		var originalPrice = parseFloat(this.refs.originalPrice.value).toFixed(2);
	
		if (originalPrice !== "NaN") {
		  var discountedPrice = parseFloat(originalPrice) - parseFloat((originalPrice * event.target.value) / 100).toFixed(2);
		  this.setState({
			discountedPrice: discountedPrice < 0 ? 0 : parseFloat(discountedPrice).toFixed(2)
		  })
		}
	  }
	  discountPercent(event) {
		event.preventDefault();
		this.setState({
		  [event.target.name]: event.target.value
		})
	
		var originalPrice = parseFloat(this.refs.originalPrice.value).toFixed(2);
		if (originalPrice !== "NaN") {
		  var discountPercent = parseFloat(((originalPrice - event.target.value) / originalPrice) * 100).toFixed(2);
		  this.setState({
			discountPercent: parseFloat(discountPercent).toFixed(2)
		  })
		}
	  }

	  percentAndPrice(event) {
		event.preventDefault();
		this.setState({
		  [event.target.name]: event.target.value,
	
		});
		if (event.target.value !== 0) {
		  this.setState({
			showDiscount: false
		  })
		} else {
		  this.setState({
			showDiscount: true,
			discountPercent: "",
			discountedPrice: "",
		  })
		}
		var discountPercent = parseFloat(this.refs.discountPercent.value);
		var discountedPrice = parseFloat(this.refs.discountedPrice.value);
		console.log("discountPercent",discountPercent);
		console.log("discountedPrice",discountedPrice);
		if (discountPercent) {
		  this.setState({
			discountedPrice: parseFloat(event.target.value) - parseFloat((event.target.value * discountPercent) / 100).toFixed(2)
		  });
		}
		if (discountedPrice) {
		  this.setState({
			discountPercent: parseFloat((event.target.value - discountedPrice / event.target.value) * 100).toFixed(2)
		  });
		}
	  }

	addtocart(productCode,id,unit,rate,discountPercent,discountedPrice) {
		console.log("addtocart");
		var productCode = productCode;
		const userid = localStorage.getItem('user_ID');
		var clr = '';
		if (userid) {
		  var id = id;
		  const userid = localStorage.getItem('user_ID');
		  var availableQuantity = 999999;
		  var recentCartData = this.props.recentCartData.length > 0 ? this.props.recentCartData[0].cartItems : [];
		  var productCartData = recentCartData.filter((a) => a.product_ID === id);
		  var quantityAdded = productCartData.length > 0 ? productCartData[0].quantity : 0;
		  var productRate = rate;
		  var discountPercent = discountPercent;
		  var discountedPrice = discountedPrice;

		  if(productCartData.length > 0){
			  productRate = productCartData[0].rate ? productCartData[0].rate : rate;
			  discountPercent = productCartData[0].discount ? productCartData[0].discount : discountPercent;
			  discountedPrice = productCartData[0].discountedPrice ? productCartData[0].discountedPrice : discountedPrice;
		  }
		  const formValues = {
			"user_ID"     : userid,
			"product_ID"  : id,
			"quantity"    : 1,
			"totalWeight" : 1,
			"rate"        : productRate,
			"discount"    :	discountPercent,
			"discountedPrice" : discountedPrice
		  }
		  // this.getProductData(productCode, clr);
		  axios.get("/api/products/get/productcode/" + productCode)
			.then((response) => {
			  console.log('getProductData', response.data);
			  let mymap = new Map();
			  var colorFilter = response.data.filter(x => {
				return x.color === clr && x.availableQuantity > 0
			  });
			  var unique = colorFilter.filter(el => {
				const val = mymap.get(el.size);
				if (val) {
				  if (el._id < val) {
					mymap.delete(el.size);
					mymap.set(el.size, el._id);
					return true;
				  } else {
					return false;
				  }
				}
				mymap.set(el.size, el._id);
				return true;
			  });
			  this.setState({
				['relatedProductArray' + id]: unique
			  })
			  // console.log('unique', unique);
			  if (unique.length > 0) {
				if (unique.length === 1) {
				  if (unique[0].size) {
					this.setState({
					  ['sizeCollage' + id]: true
					})
				  } else {
					this.addCart(formValues, quantityAdded, availableQuantity);
				  }
				} else if (unique.length > 1) {
				  this.setState({
					['sizeCollage' + id]: true
				  })
				} else {
				  this.addCart(formValues, quantityAdded, availableQuantity);
				}
			  } else {
				this.addCart(formValues, quantityAdded, availableQuantity);
			  }
			})
			.catch((error) => {
			  console.log('error', error);
			})
		} else {
		  this.setState({
			messageData: {
			  "type": "outpage",
			  "icon": "fa fa-exclamation-circle",
			  // "message": "Need To Sign In, Please <a href='/login'>Sign In</a> First.",
			  "message" : "Need To Sign In, Please <a data-toggle=modal data-target=#loginFormModal>Sign In</a> First.",
	
			  "class": "danger",
			  "autoDismiss": true
			}
		  })
		  setTimeout(() => {
			this.setState({
			  messageData: {},
			})
		  }, 3000);
		}
	  }


	  addCart(formValues, quantityAdded, availableQuantity) {
		if (quantityAdded >= availableQuantity) {
		  this.setState({
			messageData: {
			  "type": "outpage",
			  "icon": "fa fa-check-circle",
			  "message": "Last " + availableQuantity + " items taken by you",
			  "class": "success",
			  "autoDismiss": true
			}
		  })
		  setTimeout(() => {
			this.setState({
			  messageData: {},
			})
		  }, 3000);
		} else {
		  axios.post('/api/carts/post', formValues)
			.then((response) => {
			  this.props.fetchCartData();
			  this.setState({
				messageData: {
				  "type": "outpage",
				  "icon": "fa fa-check-circle",
				  "message": "&nbsp; " + response.data.message,
				  "class": "success",
				  "autoDismiss": true
				}
			  })
			  setTimeout(() => {
				this.setState({
				  messageData: {},
				})
			  }, 3000);
			//   this.props.changeCartCount(response.data.cartCount);
	
			})
			.catch((error) => {
			  console.log('error', error);
			})
		}
	  }

	Removefromcart(event){
        event.preventDefault();
        const userid = localStorage.getItem('user_ID');
        const cartitemid = event.target.getAttribute('id');
        const formValues = { 
            "user_ID"    : userid,
            "cartItem_ID" : cartitemid,
        }
        axios.patch("/api/carts/remove" ,formValues)
        .then((response)=>{
            this.setState({
                messageData : {
                  "type" : "outpage",
                  "icon" : "fa fa-check-circle",
                  "message" : response.data.message,
                  "class": "success",
                  "autoDismiss" : true
                }
            })
            setTimeout(() => {
                this.setState({
                    messageData   : {},
                })
            }, 3000);
            this.props.fetchCartData();
        })
        .catch((error)=>{
        console.log('error', error);
        })
	}
	
	

    proceedToCheckout(event){
		event.preventDefault();
		console.log("proceedToCheckout","proceedToCheckout");
		const userid = localStorage.getItem('user_ID');
        event.preventDefault();
        var soldProducts = this.props.recentCartData[0].cartItems.filter((a, i)=>{
            return a.productDetail.availableQuantity <= 0;
		})
		console.log("soldProducts",soldProducts);
        // if(soldProducts.length > 0){
        //     this.setState({
        //         messageData : {
        //           "type" : "outpage",
        //           "icon" : "fa fa-exclamation-circle",
        //           "message" : "&nbsp; Please remove sold out products from cart to proceed to checkout.",
        //           "class": "warning",
        //           "autoDismiss" : true
        //         }
        //       })
        //       setTimeout(() => {
        //           this.setState({
        //               messageData   : {},
        //           })
        //       }, 6000);
        // }else{
			var cartItems = this.props.recentCartData[0].cartItems.map((a, i) => {
				return {
					"product_ID": a.productDetail._id,
					"productName": a.productDetail.productName,
					"discountPercent": a.productDetail.discountPercent,
					"discountedPrice": a.productDetail.discountedPrice,
					"originalPrice": a.productDetail.originalPrice,
					"color": a.productDetail.color,
					"size": a.productDetail.size,
					"currency": a.productDetail.currency,
					"quantity": a.quantity,
					"subTotal": a.subTotal,
					"saving": a.saving,
					"productImage": a.productDetail.productImage,
					"section_ID": a.productDetail.section_ID,
					"section": a.productDetail.section,
					"category_ID": a.productDetail.category_ID,
					"category": a.productDetail.category,
					"subCategory_ID": a.productDetail.subCategory_ID,
					"subCategory": a.productDetail.subCategory,
					"vendor_ID": a.productDetail.vendor_ID
				}
			})
			var orderData = {
				franchise_id : this.state.franchise_id,
				user_ID: localStorage.getItem('user_ID'),
				cartItems: cartItems,
				shippingtime: this.state.shippingtiming,
				total: this.props.recentCartData[0].total,
				cartTotal: this.props.recentCartData[0].cartTotal,
				discount: this.props.recentCartData[0].discount,
				cartQuantity: this.props.recentCartData[0].cartQuantity,
				deliveryAddress: this.props.recentCartData[0].deliveryAddress,
				paymentMethod: this.props.recentCartData[0].paymentMethod
			}
			// console.log("Order Data:--->",orderData);
			axios.post('/api/orders/post', orderData)
				.then((result) => {
					this.props.fetchCartData();
					this.setState({
						messageData: {
							"type": "outpage",
							"icon": "fa fa-check-circle",
							"message": "Order Placed Successfully ",
							"class": "success",
							"autoDismiss": true
						}
					})
					setTimeout(() => {
						this.setState({
							messageData: {},
						})
					}, 3000);
					// this.props.history.push('/payment/' + result.data.order_ID);
				})
				.catch((error) => {
					console.log("return to checkout");
					console.log(error);
				})
			
            this.props.history.push('/checkout');
        // }
	}


	UpdateCartData(event){
		event.preventDefault();
		const userid = localStorage.getItem('user_ID');
		const formValues = {
			"user_ID"     	  : userid,
			"product_ID" 	  : this.state.product_ID,
			"quantity"        : this.state.quantity,
			"discountedPrice" : this.state.discountedPrice,
			"discountPercent" : this.state.discountPercent,
			"rate"            : this.state.rate

		}
		if($('#productsEditForm').valid()){
			if(this.state.discountPercentError == ''){
				axios.patch("/api/carts/updateCart" ,formValues)
				.then((response)=>{
					swal("Product updated successfully.")
						this.props.fetchCartData();
				})
				.catch((error)=>{
						console.log('error', error);
				})
	         }

				 $('.close').click();
			}
		
	}

	onChangeEditVal(event){
		event.preventDefault();
		const {name,value} = event.target;
		this.setState({
			[name] : value 
		})
	}

	render() {
		const cartItems = this.props.recentCartData;
		let total    = 0
		 if(this.props.recentCartData.length > 0){
			total = this.props.recentCartData[0].cartItems.reduce((prev,next) => prev + next.subTotal,0);
			console.log("totalAmt",total);
		 }else{
			total = 0;
		 }
		
		return (
			<div  className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
				<div  className="col-lg-12 col-md-12 col-xs-12 col-sm-12 pmcontentWrap">
					<div className='col-lg-12 col-md-12 col-xs-12 col-sm-12 pmpageContent'>
						{/* <div className="box-header with-border col-lg-12 col-md-12 col-xs-12 col-sm-12">
							<div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-right">
								 <img className="col-lg-2 col-md-2 col-xs-12 col-sm-12 headerflow logoDiv" src="../../images/iAssureIT_logo.png" style={{"width":"70px"}}></img>
                             <div className="col-lg-5 col-md-5 col-xs-12 col-sm-12 headerflow" style={{"display": "inline-flex"}}>            
                                 <input type="text" name="searchText" value={this.state.searchText} className="form-control col-lg-2 col-md-2" placeholder="Search and hit enter..." onChange={this.getProductBySearch.bind(this)}/>
                                 <button className="input-group button_search button"  type="button"><i className="fa fa-search"></i></button>
                             </div>
                             <div className="col-lg-5 col-md-5 col-xs-12 col-sm-12 headerflow" style={{"display": "inline-flex","float": "right"}}>            
								 <input list="product" type="text" refs="product" className="form-control" placeholder="Item Code..." value={this.state.completeProductName}  onChange={this.onSearchItemCode.bind(this)} name="completeProductName" autocomplete="off"/> 
									<datalist id="product" name="product" className="productDatalist">
										{
											this.state.productArray && this.state.productArray.length > 0 ?
												this.state.productArray.map((data, i)=>{
													return(
														<option key={i} value={data.productName} data-id={data._id} data-itemcode={data.itemCode} data-productcode={data.productCode} data-unit={data.unit} data-productname={data.productName}>{data.productName} - {data.productCode} - {data.itemCode}</option>
													);
												})
											:
											<option>No products available</option>
										}
									</datalist>
                                 <button className="input-group button_add button button" type="button"><i className="fa fa-plus"></i></button>
                             </div>
			 			</div>
						</div> */}
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{"marginTop": "25px"}}>
							<div className="col-lg-2 col-md-2 col-sm-12 col-xs-12 topLogoDiv">
							<img className="" src="../../images/logoUnimandai.png"/>

							   {/* <img className="col-lg-2 col-md-2 col-xs-12 col-sm-12 headerflow logoDiv" src="../../images/iAssureIT_logo.png" style={{"width":"70px"}}></img> */}
							</div>
							<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
							     <input type="text" name="searchText" value={this.state.searchText} className="form-control col-lg-2 col-md-2" placeholder="Search and hit enter..." onChange={this.getProductBySearch.bind(this)}/>
                                 <button className="input-group button_search button"  type="button"><i className="fa fa-search"></i></button>
							</div>
							<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 itemCodeDiv">
							    <input list="product" type="text" refs="product" className="form-control" placeholder="Item Code..." value={this.state.completeProductName}  onChange={this.onSearchItemCode.bind(this)} name="completeProductName" autocomplete="off"/> 
								<datalist id="product" name="product" className="productDatalist">
										{
											this.state.productArray && this.state.productArray.length > 0 ?
												this.state.productArray.map((data, i)=>{
													return(
														<option key={i} value={data.productName} data-id={data._id} data-itemcode={data.itemCode} data-productcode={data.productCode} data-unit={data.unit} data-productname={data.productName}>{data.productName} - {data.productCode} - {data.itemCode}</option>
													);
												})
											:
											<option>No products available</option>
										}
								</datalist>
                                <button className="input-group button_add button button" type="button"><i className="fa fa-plus"></i></button>
							</div>
						</div>
						
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
							<div className="col-lg-2 col-md-2 col-sm-12 col-xs-12 sectionDiv">
								<h4>Section</h4>
								<ul className="main-nav textAlignCenter">            
                                 {
                                   Array.isArray(this.state.SectionsData) && this.state.SectionsData.map((data,index)=>{
                                    return(
                                        <li key={index} className="section top-level-link">
											<div class="box" onClick={this.getSectionCategories.bind(this,data._id)} style={{"backgroundImage": "url(" + "../images/fruits.jpg" + ")","background-size": "100% 100%"}}>
												<div class="content" id={data._id} style={{"color":"white"}}>
													<h6 class="sectiontitle">{data.section}</h6>
												</div>
												<div class="folder"></div>
											</div>
                                        </li>
                                    );
                                   })
                                 }
                                </ul> 
							</div>
							<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 productDiv">
							    <ul class="nav nav-pills">
									<li class="active"><a data-toggle="pill" href="#all" onClick={this.getProductListBySection.bind(this,this.state.section_ID)}>All</a></li>
									{
									Array.isArray(this.state.SectionCategoriesData) && this.state.SectionCategoriesData.map((data,index)=>{
										return(
											<li><a data-toggle="pill" href={data.category} onClick={this.getProductListByCategory.bind(this,data._id)}>{data.category}</a></li>
										)
									})
									}
								</ul>
								<div className="row ListProduct">
								{
								   Array.isArray(this.state.ProductList) > 0 ?
                                   Array.isArray(this.state.ProductList) && this.state.ProductList.map((data,index)=>{
									   //console.log("datadata",data._id);
									let imageUrl = data.productImage[0] ? data.productImage[0] : '../../images/notavailable.jpg';
                                    return(
										<div class="col-lg-3 col-md-3 col-sm-6 col-xs-12 cardBorder" onClick={this.addtocart.bind(this,data.productCode,data._id,data.unit,data.originalPrice,data.discountPercent,data.discountedPrice)}>
											<div class="">
												<div class="card">
													<div class="item-top">
														<div class="productImg">
															<a class="product photo product-item-photo collage" tabindex="-1">
																<img src={imageUrl} alt="ProductImg"/>
															</a>
														</div>
														<div class="productDetails">
															<div class="innerDiv">
															<div class="product-item-link" title="Alphanso Mango">{data.productName}</div>
																<div class="col-lg-12 col-md-12 NOpadding"><span class="price"><i class="fa fa-inr"></i>&nbsp;{data.originalPrice} per {data.unit}</span>
																</div>
															<div>
															</div>
															<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
																<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
																</div>
															</div>
														</div>
														</div>
													</div>
												</div>
											</div>
										</div>
											
									)
								   })
								   : <p>No Products in this category</p>
								}
								</div>
								
							{/* </div> */}
							</div>
							<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 billDiv">
							    <div className="row billLogoDiv">
									<img className="logoImg" src="../../images/logoUnimandai.png"/>
									<div className="address">{this.state.franchiseLocation}</div>
								</div>
								<div className="row">
								   <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 billNumber">Bill No: <span class="barcode">{this.state.billNumber}</span></div>
								   <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 billNumber pullright"><span class="barcode">{this.state.billNumber}</span></div>
								</div>
								<div className="row">
								   <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 pullleft"><small class="">Date: {moment(new Date()).format("DD MMM YYYY")}</small></div>
								   <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 pullright"><small class="">Time: {moment(new Date()).format(" hh:mm a")}</small></div>
								</div>
								<div className="row">
								   <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 pullleft"><small class="">POS: abc</small></div>
								   <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 pullright"><small class="">GSTIN: {this.state.gstNo}</small></div>
								</div>
								<div className="row" style={{"padding": "15px"}}> 
									<form className="productsEditForm" id="productsEditForm">
									<div className="table-responsive">
										<table class="table table-borderless">
											<thead>
												<tr>
												<th scope="col">ITEM</th>
												<th scope="col">QTY</th>
												<th scope="col">UNIT RATE</th>
												{/* <th scope="col">CGST AMT</th>
												<th scope="col">RATE CGST</th> */}
												<th scope="col">DISCOUNT</th>
												<th scope="col">DIS PRICE</th>
												<th scope="col">AMT</th>
												<th scope="col"></th>
												</tr>
											</thead>
											<tbody>
											{       
												this.props.recentCartData.length > 0 &&  this.props.recentCartData[0].cartItems.length > 0?                                      
												Array.isArray(this.props.recentCartData) && this.props.recentCartData[0].cartItems.map((data,index)=>{
													console.log("recentCartData",data,index);
													data.subTotal = data.discountedPrice * data.quantity;
													return(
														<tr>
															<td>{data.productDetail.productName}</td>
															<td> 
																{/* <span className="minusQuantity fa fa-minus" id={data.productDetail._id} size={data.productDetail.size} unit={data.productDetail.unit} dataquntity={this.state.quantityAdded !== 0 ? this.state.quantityAdded : data.quantity} onClick={this.cartquantitydecrease.bind(this)}></span>&nbsp;
																<span className="inputQuantity">{this.state['quantityAdded|'+data._id] ? this.state['quantityAdded|'+data._id] : data.quantity}</span>&nbsp;
																<span className="plusQuantity fa fa-plus" size={data.productDetail.size} unit={data.productDetail.unit} productid={data.product_ID} id={data.productDetail._id} dataquntity={this.state.quantityAdded !== 0 ? this.state.quantityAdded : data.quantity} availableQuantity={data.productDetail.availableQuantity}  onClick={this.cartquantityincrease.bind(this)}></span><br/> */}
													              <small>{data.quantity} {data.productDetail.unit}</small>
															</td>
															<td><i className="fa fa-inr"></i>{data.rate}</td>
															<td><i class="fa fa-percent"></i>{data.discountPercent}</td>
															<td><i className="fa fa-inr"></i>{data.discountedPrice}</td>
															<td><i className="fa fa-inr"></i>{data.subTotal}</td>
															<td> 
																<span className="fa fa-trash trashIcon" id={data._id} onClick={this.Removefromcart.bind(this)}><a href="/" style={{color:"#337ab7"}} > </a></span>
																<span className="fa fa-pencil" data-toggle="modal" onClick={this.editCart.bind(this,data._id)} data-target={"#editPoItem"+ data._id} id={data._id}></span>
																{/* <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
																Launch demo modal
																</button> */}

																<div class="modal fade" id={"editPoItem"+ data._id} tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
																<div class="modal-dialog modal-dialog-centered" role="document">
																	<div class="modal-content">
																	<div class="modal-header">
																	    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
																			<span aria-hidden="true">&times;</span>
																		</button>
																		<h3 class="modal-title" id="exampleModalLongTitle">Edit Purchase Item</h3>
																	</div>
																	<div class="modal-body">
																		<h4>{data.productDetail.productName} <small>(Product Code :{data.productDetail.productCode} , Item Code :{data.productDetail.itemCode})</small></h4>
																		<div class="row">
																			<div className="col-lg-3 col-md-3 col-sm-6 col-xs-6 ">
																				<label className="control-label statelabel locationlabel" >Quantity <i className="redFont">*</i></label>
																				<div className="input-group inputBox-main  new_inputbx quantityDiv" >
																					<div className="input-group-addon inputIcon">
																					    <small>{data.productDetail.unit}</small>
																					</div> 
																					{/* onChangeCartQuantity */}
																					<input type="number" placeholder="" className="form-control new_inputbx1" value={this.state.quantity} prevValue={data.quantity} name="quantity" refs="quantity" onChange={this.onChangeEditVal.bind(this)} id="quantity" min="1" size={data.productDetail.size} unit={data.productDetail.unit} productid={data.product_ID} id={data.productDetail._id} dataquntity={this.state.quantityAdded !== 0 ? this.state.quantityAdded : data.quantity} availableQuantity={data.productDetail.availableQuantity} required/>
																				</div>     
																			</div>  
																			<div className="col-lg-3 col-md-3 col-sm-6 col-xs-6 ">
																				<label className="control-label statelabel locationlabel" >Rate <i className="redFont">*</i></label>
																				<div className="input-group inputBox-main  new_inputbx originalPriceDiv" >
																					<div className="input-group-addon inputIcon">
																					<i className="fa fa-rupee"></i>
																					</div> 
																					{/* onChangeRate */}
																					<input type="number" placeholder="" className="form-control new_inputbx1" value={this.state.rate} name="rate" refs="rate" onChange={this.discountedPrice.bind(this)} productid={data.product_ID} id="rate" min="1" ref="originalPrice" discountPercent={data.discountPercent} discountedPrice={data.discountedPrice} required/>
																				</div>     
																			</div>  
																			<div className="col-lg-3 col-md-3 col-sm-6 col-xs-6 ">
																				<label className="control-label statelabel locationlabel" >Discount <i className="redFont">*</i></label>
																				<div className="input-group inputBox-main  new_inputbx amountDiv" >
																					{/* onChangeDiscountedPrice */}
																					<input max={100} disabled={this.state.showDiscount} value={this.state.discountPercent} onChange={this.discountedPrice.bind(this)} placeholder="Discount Percent" id="discountPercent" name="discountPercent" type="number" className="form-control  availableQuantityNew" aria-describedby="basic-addon1" ref="discountPercent" />

																					{/* <input type="number" placeholder="" className="form-control new_inputbx1" disabled={this.state.showDiscount} value={this.state.discountPercent} productid={data.product_ID} originalPrice={data.rate} name="discountPercent" refs="discountPercent" onChange={this.discountedPrice.bind(this)}  id="discountPercent" min="0" required/> */}
																					<div className="input-group-addon inputIcon discountInput">
																						<i className="fa fa-percent"></i>
																					</div> 
																				</div>     
																			</div>  
																			<div className="col-lg-3 col-md-3 col-sm-6 col-xs-6 ">
																				<label className="control-label statelabel locationlabel" >Discount Rate <i className="redFont">*</i></label>
																				<div className="input-group inputBox-main  new_inputbx amountDiv" >
																					<div className="input-group-addon inputIcon">
																					<i className="fa fa-rupee"></i>
																					</div> 
																					{/* onChangeDiscountPercent */}
																					{/* <input type="number" placeholder="" className="form-control new_inputbx1" disabled={this.state.showDiscount} value={this.state.discountedPrice} productid={data.product_ID} originalPrice={this.state.rate}name="discountedPrice" refs="discountedPrice"  id="discountedPrice" onChange={this.discountPercent.bind(this)} max={this.state.rate} min="1" required/> */}
																					<input max={this.state.rate} disabled={this.state.showDiscount} onChange={this.discountPercent.bind(this)} value={this.state.discountedPrice} id="discountedPrice" name="discountedPrice" type="number" className="form-control  selectdropdown" placeholder="Discounted Price" aria-describedby="basic-addon1" ref="discountedPrice"  max={this.state.rate} min="1"/>

																				</div>     
																			</div>  
																		</div>
																	</div>
																	<div class="modal-footer">
																		<button type="button" class="btn btn-primary" onClick={this.UpdateCartData.bind(this)}>Submit</button>
																	</div>
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
											<tfoot>
												<tr>
													{this.props.recentCartData.length > 0 ?
														<td colspan="4">Items/Qty {this.props.recentCartData[0].cartItems.length}</td>
														:
														<td colspan="4">Items/Qty 0</td>
													}

													<td colspan="2">Total: <i className="fa fa-inr"></i> {total}</td>
												</tr>
												<tr>
												<td colspan="4"></td>
												<td className="totalNetAmount" colspan="2">Net: <i className="fa fa-inr"></i> {total}</td>
												</tr>
											</tfoot>
											</table>
										</div>
										<div className="row" style={{"padding": "13px"}}>
											<ul className="declaration"><b>Declaration</b>
												<li>  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</li>
											</ul>
											<h5 style={{textAlign:'center',fontSize:"medium",fontWeight: 600}}>!!! Thank You !!! Visit Again !!!</h5>
										</div>
										<button class="col-md-12 col-lg-12 col-xs-12 col-sm-12 btn checkoutBtn" onClick={this.proceedToCheckout.bind(this)}>Checkout</button>
										{/* <div className="row" style={{"padding": "13px"}}>
											<button className="btn actionBtn">Edit</button>
											<button className="btn actionBtn">Delete</button>
										</div> */}
									</form>
								</div>
		
							</div> 
							</div>
						 {/* </div> */}
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	//console.log("mapStateToProps",state);
	return {
	  recentCartData :  state.recentCartData
	}
  }
  const mapDispachToProps = (dispatch) => {
	return  bindActionCreators({ fetchCartData: getCartData }, dispatch)
  }
  export default connect(mapStateToProps, mapDispachToProps)(Bill);