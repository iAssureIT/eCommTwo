import React from 'react';
import IAssureTable           from '../../coreadmin/IAssureTable/IAssureTable.jsx';
import './bill.css';
import swal from 'sweetalert';
import axios from 'axios';
import moment from 'moment';

export default class Bill extends React.Component {
	constructor(props) {
		super(props);
		  this.state = {
				serchByDate:moment(new Date()).format("YYYY-MM-DD"), 
				categoriesData: [], 
				SectionsData  : []    	
          };
	}
	
	componentDidMount(){
		this.getCategories();
		this.getSections();
		// this.getproducts();
		// var serchByDate = moment(new Date()).format("YYYY-MM-DD");
		// // console.log("today",today);
		// this.getFranchiseDetails();
		// var editId = this.props.match.params.purchaseId;

	}
	componentWillReceiveProps(nextProps) {
        // var editId = nextProps.match.params.purchaseId;
        // if(nextProps.match.params.purchaseId){
        //   this.setState({
        //     editId : editId
        //   })
        //   this.edit(editId);
        // }
	}

	getCategories(){
		axios.get("/api/category/get/list")
		.then((response)=>{
		  this.setState({
			CategoriesData : response.data
		  })
		})
		.catch((error)=>{
		  // console.log('error', error);
		})
	}

	getSections(){
		axios.get("/api/sections/get/get_megamenu_list")
        .then((response)=>{
            if(response.data){
              // console.log("section data===",response.data); 
              this.setState({ 
				SectionsData : response.data
              })
              // console.log("megamenu section Data: ",this.state.categoryData);
            }
            })
            .catch((error)=>{
                console.log('error', error);
        })
	}

// 	getFranchiseDetails(){
// 		var userDetails = JSON.parse(localStorage.getItem('userDetails'));
// 		axios.post('/api/entitymaster/get/one/comapanyDetail/',{"companyID":userDetails.companyID})
//         .then((response) => {
//           this.setState({
//             selectedFranchise: response.data._id,
//           },()=>{
// 			this.getCurrentStockReport();
// 			})
// 	      })
// 	      .catch((error) => {
// 			console.log("Error in franchiseDetail = ", error);
// 	      })
// 	}
	
// 	getTotalSTock(itemCode){
// 		axios.get('/api/purchaseEntry/get/RawMaterialCurrentStock/'+itemCode)
// 				.then(stockdata => {
// 					// console.log("stockdata",stockdata.data);
// 					 return stockdata.data;
// 				})
// 				.catch(error=>{
// 					console.log("error in getTotalOutward = ", error);
// 				});
// 	}
	
// 	getCurrentStockReport(){
// 		var reportFilterData = this.state.reportFilterData;
// 		reportFilterData.franchiseId = this.state.selectedFranchise;

// 		if(this.state.filterByProduct !== "Select Product"){
// 			reportFilterData.itemcode = this.state.filterByProduct;
// 		}else{
// 			delete reportFilterData["itemcode"];
// 		}
		
// 		if(this.state.selectedFranchise){
// 			axios
// 			.post('/api/finishedGoodsEntry/post/getProductCurrentStockReport/',reportFilterData)
// 			.then((response)=>{
// 				// console.log("response",response);
// 				var tableData = response.data.map((a, i) => {
// 						return {
// 							_id                  : a._id,
// 							productName 	     : a.productName  ? a.productName +' - '+ a.productCode +' - '+ a.itemCode: "" ,
// 							franchiseName          : a.franchiseName ? a.franchiseName :'',
// 							totalStock           : a.totalStock    ? a.totalStock +' '+ a.StockUnit : 0,
							
// 						}
						
// 				});

// 				// var data =  [...new Map(tableData.map(item => [item['itemCode'], item])).values()]
				
// 				this.setState({
// 					tableData : tableData,          
// 				},()=>{
// 					//console.log("tableData",tableData);
// 					this.getFranchiseList();
// 				})
// 			})
// 			.catch((error)=>{
// 				console.log("error = ", error);              
// 			}); 
// 		}
		
// 	}
//     getSearchText(searchText, startRange, limitRange){

//     }
//     setunCheckedUser(value){
// 		this.setState({
// 			unCheckedUser : value,
// 		})
// 	}
// 	selectedUser(checkedUsersList){
// 		this.setState({
// 			checkedUser : checkedUsersList,
// 		})
// 		// console.log("checkedUser",this.state.checkedUser)
// 	}
	
// 	selectedRole(event){
// 		event.preventDefault();
					    
// 	}

    
//      getproducts(){
//         axios.get('/api/products/get/list')
// 		.then((response) => {
//             // console.log('productArray---', response.data)
// 			this.setState({
// 				productArray: response.data
// 			})
// 		})
// 		.catch((error) => {
			
// 		})
// 	}
	

// 	/* Filters start*/
// 	filterChange(event){
// 		event.preventDefault();
// 		const {name,value} = event.target;
  
// 		this.setState({ 
// 		  [name]:value,
// 		},()=>{
// 		  this.getCurrentStockReport(value);
// 		 });
// 	  }
//    /* Filters end*/
	
// 	handleFromChange(event){
//         event.preventDefault();
//        const target = event.target;
//        const name = target.name;

//        this.setState({
//            [name] : event.target.value,
//        },()=>{
// 		   this.getCurrentStockReport();
// 	   });
//     }
//     handleToChange(event){
//         event.preventDefault();
//        const target = event.target;
//        const name = target.name;

//        this.setState({
//           [name] : event.target.value,
//        },()=>{
// 		  this.getCurrentStockReport();
// 	   });
//     }

//     getFranchiseList(){
// 		axios.get('/api/entitymaster/get/franchise/')
//         .then((response) => {
//           this.setState({
//             "franchiseList": response.data,
//           },()=>{
// 						// console.log("franchiseList = ",this.state.franchiseList);
// 					})
// 	      })
// 	      .catch((error) => {
// 					console.log("Error in franchiseList = ", error);
// 	      })
//     }
    
	render() {
		return (
			<div  className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
				<div  className="col-lg-12 col-md-12 col-xs-12 col-sm-12 pmcontentWrap">
					<div className='col-lg-12 col-md-12 col-xs-12 col-sm-12 pmpageContent'>
						<div className="box-header with-border col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-right">
							<div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-right">
                             {/* <h4 className="col-lg-2 col-md-2 col-xs-12 col-sm-12"> */}
								 <img className="col-lg-2 col-md-2 col-xs-12 col-sm-12 headerflow" src="../../images/iAssureIT_logo.png" style={{"width":"70px"}}></img>
							 {/* </h4> */}
                             <div className="col-lg-5 col-md-5 col-xs-12 col-sm-12 headerflow" style={{"display": "inline-flex"}}>            
                                 <input type="text" className="form-control col-lg-2 col-md-2" placeholder="Search and hit enter..."/>
                                 <button className="input-group button_search button"  type="button"><i className="fa fa-search"></i></button>
                             </div>
                             <div className="col-lg-5 col-md-5 col-xs-12 col-sm-12 headerflow" style={{"display": "inline-flex","float": "right"}}>            
                                 <input type="text" className="form-control col-lg-2 col-md-2" placeholder="Search and hit enter..."/>
                                 <button className="input-group button_add button button" type="button"><i className="fa fa-plus"></i></button>
                             </div>
			 			</div>
						</div>
						
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  mtop25">
						{/* <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"> style={{"backgroundColor":"#aaa"}}*/}
							<div className="col-lg-2 col-md-2 col-sm-12 col-xs-12 sectionDiv">
								<h4>Section</h4>
								<ul className="main-nav textAlignCenter" style={{"padding":"5px"}}>            
                                 {
                                   Array.isArray(this.state.SectionsData) && this.state.SectionsData.map((data,index)=>{
                                    return(
                                        <li key={index} className="top-level-link">
											<a href={"/section/"+data.sectionUrl+'/'+data._id}>
											<div class="box" style={{"height":"120px","backgroundImage": "url(" + "../images/fruits.jpg" + ")","background-size": "100% 100%"}}>
												<div class="content">{data.section}</div>
												<div class="folder"></div>
											</div>
											</a>
                                            {/* <a className="mega-menu" href={"/section/"+data.sectionUrl+'/'+data._id}><span>{data.section}</span></a> */}

                                        </li>
                                    );
                                   })
                                 }
                                </ul> 
							</div>
							<div className="col-lg-5 col-md-5 col-sm-12 col-xs-12" style={{"backgroundColor":"#bbb"}}>
							{/* <div class="container"> */}
								<ul class="nav nav-pills">
									<li class="active"><a href="#">Home</a></li>
									<li><a href="#">Menu 1</a></li>
									<li><a href="#">Menu 2</a></li>
									<li><a href="#">Menu 3</a></li>
								</ul>
							{/* </div> */}
							</div>
							<div className="col-lg-5 col-md-5 col-sm-12 col-xs-12" style={{"backgroundColor":"#aaa","float": "right"}}>
								<h2>Column 3</h2>
								<p>Some text..</p>
							</div> 
							</div>
						{/* </div> */}
					</div>
				</div>
			</div>

			// <div className="wrapper">
			// 		<div className="header">
			// 		    <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-right">
            //                 <h4 className="col-lg-2 col-md-2 col-xs-12 col-sm-12">Products</h4>
            //                 <div className="col-lg-5 col-md-5 col-xs-12 col-sm-12 headerflow" style={{"display": "inline-flex"}}>            
            //                     <input type="text" className="form-control col-lg-2 col-md-2" placeholder="Search and hit enter..."/>
            //                     <button className="input-group button_search" type="button"><i className="fa fa-search"></i></button>
            //                 </div>
            //                 <div className="col-lg-5 col-md-5 col-xs-12 col-sm-12 headerflow" style={{"display": "inline-flex"}}>            
            //                     <input type="text" className="form-control col-lg-2 col-md-2" placeholder="Search and hit enter..."/>
            //                     <button className="input-group button_search" type="button"><i className="fa fa-search"></i></button>
            //                 </div>
			// 			</div>
			// 		</div>
			// 		<div className="sidebar-1">
			// 		   <div className="sticky-spacer"></div>
			// 		<div className="sticky-content">Sidebar 1 Absolute position, Fixed width</div>
			// 		</div>
			// 		<div className="content">
			// 		<div className="sticky-spacer"></div>
			// 		<div className="sticky-content">
			// 			Scrollable content<br/><br/>
			// 			line 1<br/><br/>
			// 			line 2<br/><br/>
			// 			line 3<br/><br/>
			// 			line 4<br/><br/>
			// 			line 5<br/><br/>
			// 			line 6<br/><br/>
			// 			line 7<br/><br/>
			// 			line 8<br/><br/>
			// 			line 9<br/><br/>
			// 			line 10<br/><br/>
			// 			line 11<br/><br/>
			// 			line 12<br/><br/>
			// 			line 13<br/><br/>
			// 			line 14<br/><br/>
			// 			line 15<br/><br/>
			// 			line 16<br/><br/>
			// 			line 17<br/><br/>
			// 			line 18<br/><br/>
			// 			line 19<br/><br/>
			// 			line 20
			// 		</div>
			// 		</div>
			// 		<div className="sidebar-2">
			// 		<div className="sticky-spacer"></div>
			// 		<div className="sticky-content">
			// 			Sidebar 2 Absolute position, Fixed width<br/><br/>
			// 		line 1<br/><br/>
			// 		line 2<br/><br/>
			// 		line 3<br/><br/>
			// 		line 4<br/><br/>
			// 		line 5<br/><br/>
			// 		line 6<br/><br/>
			// 		line 7<br/><br/>
			// 		line 8<br/><br/>
			// 		line 9<br/><br/>
			// 		line 10
			// 		</div>
			// 		</div>
			// 		<div className="footer">Footer (Absolute)</div>
			// </div>
			// <div  className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
				
				/* <div  className="col-lg-12 col-md-12 col-xs-12 col-sm-12 pmcontentWrap">
					<div className='col-lg-12 col-md-12 col-xs-12 col-sm-12 pmpageContent'>
						{/* <div className="box-header with-border col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-right">
                            <h4 className="col-lg-2 col-md-2 col-xs-12 col-sm-12">Products</h4>
                            <div className="col-lg-5 col-md-5 col-xs-12 col-sm-12 headerflow" style={{"display": "inline-flex"}}>            
                                <input type="text" className="form-control col-lg-2 col-md-2" placeholder="Search and hit enter..."/>
                                <button className="input-group button_search" type="button"><i className="fa fa-search"></i></button>
                            </div>
                            <div className="col-lg-5 col-md-5 col-xs-12 col-sm-12 headerflow" style={{"display": "inline-flex"}}>            
                                <input type="text" className="form-control col-lg-2 col-md-2" placeholder="Search and hit enter..."/>
                                <button className="input-group button_search" type="button"><i className="fa fa-search"></i></button>
                            </div>
                        </div> */
						
						/* <div className="billsidenav">
							<a href="#about">About</a>
							<a href="#services">Services</a>
							<a href="#clients">Clients</a>
							<a href="#contact">Contact</a>
						</div>

						<div className="main">
							<h2>Sidebar</h2>
							<p>This sidebar is of full height (100%) and always shown.</p>
							<p>Scroll down the page to see the result.</p>
							<p>Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum definitiones no quo, maluisset concludaturque et eum, altera fabulas ut quo. Atqui causae gloriatur ius te, id agam omnis evertitur eum. Affert laboramus repudiandae nec et. Inciderint efficiantur his ad. Eum no molestiae voluptatibus.</p>
							<p>Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum definitiones no quo, maluisset concludaturque et eum, altera fabulas ut quo. Atqui causae gloriatur ius te, id agam omnis evertitur eum. Affert laboramus repudiandae nec et. Inciderint efficiantur his ad. Eum no molestiae voluptatibus.</p>
							<p>Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum definitiones no quo, maluisset concludaturque et eum, altera fabulas ut quo. Atqui causae gloriatur ius te, id agam omnis evertitur eum. Affert laboramus repudiandae nec et. Inciderint efficiantur his ad. Eum no molestiae voluptatibus.</p>
							<p>Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum definitiones no quo, maluisset concludaturque et eum, altera fabulas ut quo. Atqui causae gloriatur ius te, id agam omnis evertitur eum. Affert laboramus repudiandae nec et. Inciderint efficiantur his ad. Eum no molestiae voluptatibus.</p>
						</div> */

					/* </div> */
				/* </div> */
			//  </div>
		);
	}
}
