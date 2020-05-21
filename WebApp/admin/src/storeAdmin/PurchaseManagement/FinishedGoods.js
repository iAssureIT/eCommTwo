import React from 'react';
import './PurchaseManagement.css';

import IAssureTableUM 					 from '../../coreadmin/IAssureTableUM/IAssureTable.jsx';


export default class FinishedGoods extends React.Component {

	constructor(props) {
		super(props);
		  this.state = {
			      	amount : '',
			      	date : '',
			      	packageWeight : '',
			      	ItemCode : '',
			      	quantity : '',
			      	product : '',
			      	Units : '',
			      	"twoLevelHeader"    : {
						            apply  : false,
						           },
		             "tableHeading"     : {
		                fullName        : 'Date',
		        		
		        		company 		: "Item Code",
		        		role 			: "Product Name",
						email        	: 'Opening Stock',
						
		                status        	: 'Stock Added Today',
		                TotalStock        	: 'Total Stock',
						// actions        	: 'Action',
					},
					"tableObjects" 		: {
						paginationArray : true
					},
		            "startRange"        : 0,
		            "limitRange"        : 10, 
		            blockActive			: "all",
		            "listofRoles"	    : "",
		            adminRolesListData  : [],
		            checkedUser  : [],
		            activeswal : false,
		            blockswal : false,
		            confirmDel : false,
			      	
      };
	}
		componentDidMount(){


	}
	getData(startRange, limitRange){ 
		var tableData ;
		return{  tableData: {
						fullName        : 'Date',
		        		city       		: "Product Code",
		        		company 		: "Item Code",
		        		role 			: "Product Name",
						email        	: 'Opening Stock',
						
		                status        	: 'Stock Added Today',
		                TotalStock      : 'Total Stock', 
		                }  
			}
			this.setState({
             
              tableData 		: tableData,          
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
		console.log("checkedUser",this.state.checkedUser)
	}
	getRole(){
		
	}
	selectedRole(event){
		event.preventDefault();
					    
	}
	handleChange(event){
      event.preventDefault();

      // const datatype = event.target.getAttribute('data-text');
      const {name,value} = event.target;

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

    const formValues1 = {
        // "amount"         	: this.state.amount ,
        "date" 		: this.state.date,
      	"ItemCode" 	: this.state.ItemCode,
      	"packageWeight"  : this.state.packageWeight,
      	"quantity" 			: this.state.quantity,
      	"product" 			: this.state.product,
      	"Units" 			: this.state.Units,
       
      };
      console.log("formValues1",formValues1);
	}

	render() {
		return (
			<div  className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
				<div  className="col-lg-12 col-md-12 col-xs-12 col-sm-12 pmcontentWrap">
					<div className='col-lg-12 col-md-12 col-xs-12 col-sm-12 pmpageContent'>
						<div  className="col-lg-12 col-md-12 col-xs-12 col-sm-12 mtop20">
							<h1 className="text-center">Finished Goods Management</h1>
						</div>
						<div  className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
							<form className="col-lg-12 col-md-12 col-xs-12 col-sm-12 mtophr20">
								<div className="row">
									<div className="form-group col-lg-3 col-md-3 col-xs-12 col-sm-12">
										<label >Date</label>
										<input type="Date"  className="form-control"  value={ this.state.date} name="date" refs="date" onChange={this.handleChange.bind(this)} id="date"/>
									</div>
									
								</div>
								<div className="row">
									<div className="form-group col-lg-3 col-md-4 col-xs-12 col-sm-12">
										<label >Select Product</label>
										{/*<input type="text" className="form-control" id="email"/>*/}
										<input list="product" type="text" refs="product" className="form-control"    placeholder="Enter Product Code or Name" value={this.state.product}  onChange={this.handleChange.bind(this)}  onBlur={this.handleProduct.bind(this)} name="product" />
	    								{/*<input type="text" list="societyList" className="form-control" ref="society" value={this.state.societyName} onChange={this.handleChange.bind(this)} onBlur={this.handleSociety.bind(this)} name="societyName" placeholder="Enter Society" />*/}
										
										  <datalist id="product" name="product" >
										    <option value="Broccoli"/>
										    <option value="cauliflower"/>
										    <option value="spinach"/>
										    <option value="onion"/>
										    <option value="garlic"/>
										  </datalist>
									</div>
									<div className="form-group col-lg-3 col-md-4 col-xs-12 col-sm-12">
										<label >Select Item Code</label>
										{/*<input type="text" className="form-control" id="email"/>*/}
										<input list="ItemCode" type="text" refs="ItemCode" className="form-control"    placeholder="Enter Item Code" value={this.state.ItemCode}  onChange={this.handleChange.bind(this)}  onBlur={this.handleItemCode.bind(this)} name="ItemCode" />
	    								{/*<input type="text" list="societyList" className="form-control" ref="society" value={this.state.societyName} onChange={this.handleChange.bind(this)} onBlur={this.handleSociety.bind(this)} name="societyName" placeholder="Enter Society" />*/}
										
										  <datalist id="ItemCode" name="ItemCode" >
										    <option value="Product-01"/>
										    <option value="Product-02"/>
										    <option value="Product-03"/>
										    <option value="Product-04"/>
										    <option value="Product-05"/>
										  </datalist>
									</div>
									<div className="form-group col-lg-3 col-md-4 col-xs-12 col-sm-12">
										<label >Package Weight</label>
										<div className="">
											<input type="number" placeholder="Enter quantity " className="h34 col-lg-8 col-md-9 col-xs-8 col-sm-8" value={ this.state.packageWeight} name="packageWeight" refs="packageWeight" onChange={this.handleChange.bind(this)} id="packageWeight"/>
											<select id="Units"  name="Units" value={this.state.Units} refs="Units" onChange={this.handleChange.bind(this)}  className="col-lg-4 col-md-3 col-xs-4 col-sm-4 h34">
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
										<input type="number" placeholder="12345678" className="form-control" value={ this.state.quantity} name="quantity" refs="quantity" onChange={this.handleChange.bind(this)} id="quantity"/>
									</div>
								</div>
								<div  className="col-lg-12 col-md-12 col-xs-12 col-sm-12 mtop20 Subbtnmtop20">
									<button className="btn btn-primary col-lg-3 col-md-3 col-xs-4 col-sm-4 pull-right" onClick={this.Submit.bind(this)}>Submit</button>
								</div>
							</form>
						</div>
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mtop25">
								<IAssureTableUM
									completeDataCount={this.state.completeDataCount}
									twoLevelHeader={this.state.twoLevelHeader} 
									getData={this.getData.bind(this)} 
									tableHeading={this.state.tableHeading} 
									tableData={this.state.tableData} 
									Actioncol="Actioncol" 
									tableObjects={this.state.tableObjects}
									getSearchText={this.getSearchText.bind(this)}
									selectedUser={this.selectedUser.bind(this)} 
									setunCheckedUser={this.setunCheckedUser.bind(this)} 
									unCheckedUser={this.state.unCheckedUser}
            						UsersTable = {true}
								/>			
							</div>
					</div>
				</div>
			</div>
		);
	}
}
