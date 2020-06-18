import React from 'react';
import './PurchaseManagement.css';
import IAssureTable           from '../../coreadmin/IAssureTable/IAssureTable.jsx';
import swal from 'sweetalert';
import axios from 'axios';
import moment from 'moment';

export default class RawMaterialStockReport extends React.Component {

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
			      	Units : '',
			      	serchByDate:moment(new Date()).format("YYYY-MM-DD"),
			      	"twoLevelHeader"    : {
						            apply  : false,
						           },
		             "tableHeading"     : {
						Date            : 'Date',
						ItemCode 		: "Item Code",
		        		ProductCode     : "Product Code",
		        		ProductName     : "Product Name",
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
		this.getproducts();
		var serchByDate = moment(new Date()).format("YYYY-MM-DD");
		// console.log("today",today);

		var editId = this.props.match.params.purchaseId;
        console.log('ven', editId);
        this.getData();

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
		      	"unitRate" 	        : response.data.unitRate,
		      	"purchaseNumber"    : response.data.purchaseNumber,
		      	"Details" 			: response.data.Details,
		      	"productName" 		: response.data.product,
		      	"unit" 				: response.data.Units,
            });
            
        })
        .catch((error)=>{
            console.log('error', error);
        });
    }
	getData(startRange, limitRange){ 
	var dateToSearch=this.state.serchByDate;
	var filterData = {};
	filterData.purchaseDate = moment(dateToSearch).format("YYYY-MM-DD");
	// axios
	// .post('/api/purchaseentry/post/datewisepurchase/',filterData)
	// .then((response)=>{
	// 	console.log("list===>",response.data);
	// 	var  tableData = response.data ;
	// 		var tableData = tableData.map((a, i) => {
	// 				return {
	// 					_id                  :a._id,
	// 					Date   				: a.purchaseDate ? moment(a.purchaseDate).format("DD-MMM-YYYY") : "",
	// 					ItemCode 		    : a.itemCode ? a.itemCode : "" ,
	// 					ProductCode 		: a.productCode ,
	// 					ProductName 		: a.productName,
	// 					OpeningStock        : a.openingStock ? a.openingStock : "",
	// 					StockAddedToday     : a.quantity ? a.quantity : "",
	// 					TotalStock 	        : a.quantity ? a.quantity : "",
	// 				}
	// 		});
	
	// 		let totalAmount = tableData.reduce(function(prev, current) {
	// 			console.log("current supply",current);
	// 				// return prev + +current.TotalAmount
	// 		}, 0);

	// 		this.setState({ 
	// 		   tableData 		: tableData,  
	// 		}) 
	// 	})
	// .catch((error)=>{
	// 	console.log("error = ", error);              
	// }); 

	axios
	.get('/api/purchaseentry/get/get_report/',filterData)
    .then((response)=>{
		console.log("res",response)
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
	handleChangeDate(event){
      event.preventDefault();
      var dateVal = event.target.id;
      // console.log("datVal",dateVal);
      // const datatype = event.target.getAttribute('data-text');
      const {name,value} = event.target;

      this.setState({ 
        [name]:value,
 
      },()=>{
      	console.log("date",this.state.serchByDate);
		this.getData();

      } );
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
    handleProduct1(event){
    	var valpurchaseLocation = event.currentTarget.value;
    	console.log("valpurchaseLocation",valpurchaseLocation);
		this.setState({purchaseLocation : valpurchaseLocation});

    }
     getproducts(){
        axios.get('/api/products/get/list')
		.then((response) => {
            console.log('productArray---', response.data)
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

    const formValues1 = {
        "amount"         	: this.state.amount ,
        "purchaseDate" 		: this.state.purchaseDate,
      	"purchaseStaff" 	: this.state.purchaseStaff,
      	"purchaseLocation"  : this.state.purchaseLocation,
      	"quantity" 			: this.state.quantity,
      	"productName" 		: this.state.product,
      	"unit" 				: this.state.Units,
      	"unitRate" 	    : this.state.unitRate,
		"purchaseNumber"    : this.state.purchaseNumber,
		"Details" 			: this.state.Details,
       
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
		      	 Units           : "",
		      	 unitRate    : "",
			     purchaseNumber  : "",
				 Details 		 :"",	
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
	      	"unitRate" 	        : this.state.unitRate,
			"purchaseNumber"    : this.state.purchaseNumber,
			"Details" 			: this.state.Details,
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
                    "unitRate"      : "",
				     "purchaseNumber"   : "",
					 "Details" 		    :"",	
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
                            <h4 className="">Raw Material Stock Report</h4>
                        </div>
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mtop25">
						  <div className="form-group col-lg-6 col-md-6 col-xs-12 col-sm-12 mbt25">
							<div className="col-lg-4 col-md-4"><label>Search By Date:</label></div>
							<div className="col-lg- col-md-6">
							 <input type="Date" placeholder="1234" className="col-lg-6 col-md-6 form-control" value={this.state.serchByDate} name="serchByDate" refs="serchByDate" onChange={this.handleChangeDate.bind(this)} id="serchByDate"/>
                            </div>
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
					</div>
				</div>
			</div>
		);
	}
}
