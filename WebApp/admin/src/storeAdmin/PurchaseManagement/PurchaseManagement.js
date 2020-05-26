import React from 'react';
import './PurchaseManagement.css';
import IAssureTable           from '../../coreadmin/IAssureTable/IAssureTable.jsx';
import swal from 'sweetalert';
import axios from 'axios';
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
			      	product : '',
			      	Units : '',
			      	"twoLevelHeader"    : {
						            apply  : false,
						           },
		             "tableHeading"     : {
		                date            : 'Date',
		        		ProductCode     : "Product Code",
		        		ItemCode 		: "Item Code",
		        		productName     : "Product Name",
						OpeningStock    : 'Opening Stock',
		                StockAddedToday : 'Stock Added Today',
		                TotalStock      : 'Total Stock',
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
		            tableData : ""
			      	
      };
	}
	

	componentDidMount(){
		var editId = this.props.match.params.purchaseId;
        console.log('ven', editId);
		this.getData()

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
        // $("#taxMaster").validate().resetForm();
        axios.get('/api/purchaseentry/get/one/'+id)
        .then((response)=>{
            console.log('res', response);
            this.setState({
                "amount"         	: response.data.amount ,
		        "purchaseDate" 		: response.data.purchaseDate,
		      	"purchaseStaff" 	: response.data.purchaseStaff,
		      	"purchaseLocation"  : response.data.purchaseLocation,
		      	"quantity" 			: response.data.quantity,
		      	"productName" 		: response.data.product,
		      	"unit" 				: response.data.Units,
            });
            
        })
        .catch((error)=>{
            console.log('error', error);
        });
    }
	getData(startRange, limitRange){ 
	 axios
      .get('/api/purchaseentry/get/list')
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
						_id                  :a._id,
						date   				: a.purchaseDate ? moment(a.purchaseDate).format("DD-MMM-YYYY") : "",
						ProductCode 		: a.ProductCode ? a.ProductCode : "" ,
						ItemCode 			: a.ItemCode ? a.ItemCode : "" ,
						productName 		: a.productName,
						OpeningStock 		: a.OpeningStock ? a.OpeningStock : "" ,
						StockAddedToday 	: "",
						TotalStock 			: "" ,
						
					/*	purchaseStaff		:
						purchaseLocation 	:
						quantity 			:
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
    Submit(event){
    event.preventDefault();

    const formValues1 = {
        "amount"         	: this.state.amount ,
        "purchaseDate" 		: this.state.purchaseDate,
      	"purchaseStaff" 	: this.state.purchaseStaff,
      	"purchaseLocation"  : this.state.purchaseLocation,
      	"quantity" 			: this.state.quantity,
      	"productName" 		: this.state.product,
      	"unit" 				: this.state.Units,
       
      };
      console.log("formValues1",formValues1);
      axios
			.post('/api/purchaseentry/post',formValues1)
		  	.then(function (response) {
		    // handle success
		    	console.log("data in block========",response.data);
		    	swal("Thank you. Your Product addeed successfully.");
		    	 // window.location.reload();
		  	})
		  	.catch(function (error) {
		    // handle error
		    	console.log(error);
		  	});
		  	this.setState({
				 amount          : "",         	
		         purchaseDate    : "", 		
		      	 purchaseStaff   : "", 	
		      	 purchaseLocation: "",  
		      	 quantity        : "", 			
		      	 product         : "", 		
		      	 Units           : ""		
      	 })		
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
	      	"unit" 				: this.state.Units,
        }
        /*if($("#taxMaster").valid()){*/
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
			      	"productName" 		: "",
			      	"unit" 				: "",
                     editId             : ""
                })
            })
            .catch((error)=>{
                console.log('error', error);
            })
      /*  }*/
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
							<form className="col-lg-12 col-md-12 col-xs-12 col-sm-12 mtophr20">
								<div className="row">
									<div className="form-group col-lg-4 col-md-4 col-xs-12 col-sm-12">
										<label >Purchase Date</label>
										<input type="Date"  className="form-control"  value={ this.state.purchaseDate} name="purchaseDate" refs="purchaseDate" onChange={this.handleChange.bind(this)} id="purchaseDate"/>
									</div>
									<div className="form-group col-lg-4 col-md-4 col-xs-12 col-sm-12">
										<label >Purchase Staff</label>
										<input type="text" placeholder="Enter Purchase Staff"  className="form-control"  value={ this.state.purchaseStaff} name="purchaseStaff" refs="purchaseStaff" onChange={this.handleChange.bind(this)} id="purchaseStaff"/>
									</div>
									<div className="form-group col-lg-4 col-md-4 col-xs-12 col-sm-12">
										<label >Purchase Location</label>
										<input type="text" placeholder="Enter Purchase Location"  className="form-control"  value={ this.state.purchaseLocation} name="purchaseLocation" refs="purchaseLocation" onChange={this.handleChange.bind(this)} id="purchaseLocation"/>
									</div>
								</div>
								<div className="row">
									<div className="form-group col-lg-4 col-md-4 col-xs-12 col-sm-12">
										<label >Select Product</label>
										{/*<input type="text" className="form-control" id="email"/>*/}
										<input list="product" type="text" refs="product" className="form-control"    placeholder="Select Product" value={this.state.product}  onChange={this.handleChange.bind(this)}  onBlur={this.handleProduct.bind(this)} name="product" />
	    								{/*<input type="text" list="societyList" className="form-control" ref="society" value={this.state.societyName} onChange={this.handleChange.bind(this)} onBlur={this.handleSociety.bind(this)} name="societyName" placeholder="Enter Society" />*/}
										
										  <datalist id="product" name="product" >
										    <option value="Broccoli"/>
										    <option value="cauliflower"/>
										    <option value="spinach"/>
										    <option value="onion"/>
										    <option value="garlic"/>
										  </datalist>
									</div>
									<div className="form-group col-lg-4 col-md-4 col-xs-12 col-sm-12">
										<label >Quantity</label>
										<div className="">
											<input type="number" placeholder="Enter quantity " className="h34 col-lg-9 col-md-9 col-xs-8 col-sm-8" value={ this.state.quantity} name="quantity" refs="quantity" onChange={this.handleChange.bind(this)} id="quantity"/>
											<select id="Units"  name="Units" value={this.state.Units} refs="Units" onChange={this.handleChange.bind(this)}  className="col-lg-3 col-md-3 col-xs-4 col-sm-4 h34">
												<option selected={true} disabled={true}>-- Select --</option>
											  	<option value="Kg">Kg</option>
											  	<option value="Ltr">Ltr</option>
											  	<option value="gram">gram</option>
											  	<option value="Nos">Nos</option>
											</select>
										</div>
									</div>
									<div className="form-group col-lg-4 col-md-4 col-xs-12 col-sm-12">
										<label >Amount</label>
										<input type="number" placeholder="12345678" className="form-control" value={ this.state.amount} name="amount" refs="amount" onChange={this.handleChange.bind(this)} id="amount"/>
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
