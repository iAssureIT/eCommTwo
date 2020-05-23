import React from 'react';
import axios from 'axios';
import swal from 'sweetalert';

export default class FranchiseOrderSummary extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			date : "",
			franchiselist : ""
		}
	}

	componentDidMount(){
		this.getFranchiseShoppingList();
		// this.getCurrentStock();

		var date = new Date();
		var day = date.getDate();
		var month = date.getMonth() + 1;
		var year = date.getFullYear();
		if (month < 10) month = "0" + month;
		if (day < 10) day = "0" + day;
		var today = year + "-" + month + "-" + day;
		document.getElementById('theDate').value = today;
		this.setState({
			date : today,
		});
	}
	getFranchiseShoppingList(){
		var franchise_id = "5ec686a8a35f526967255a23";
		var orderDate = "2020-05-22";
		axios.get('/api/franchisepo/get/purchaseorderList'+"/"+franchise_id+"/"+orderDate)
            .then((franchiselist) => {
				// console.log("franchiselist prodlist",franchiselist.data);

                this.setState({
                    "franchiselist": franchiselist.data,
                },()=>{
					// console.log("franchiselist = ",this.state.franchiselist);
				})

            })
            .catch((error) => {
				console.log("error in getProductList = ", error);
              
            })
	}
	edit(event){
		event.preventDefault();
		var id = event.target.id;
		console.log("edit id",id);
		this.props.history.push("/franchise-shopping-list/"+id);

	}
	deletePO(event){
	event.preventDefault();
	var id= event.target.id;
	// console.log("id delet", URL);
	 swal({
          title: "Are you sure you want to delete this Order ?",
          text: "Once deleted, you will not be able to recover this Order!",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((success) => {
            if (success) {
            	axios
			    .delete("/api/franchisepo/delete/purchaseorder/"+id)
			    .then((response)=>{
			     	this.getFranchiseShoppingList();
			       swal("Your Page is deleted!");
			       // window.location.reload();
			    })
			    .catch((error)=>{
			       console.log("error = ", error);              
			    });
            
              
            } else {
            swal("Your page is safe!");
          }
        }); 
}	
	render() {
		
		return (
				<div  className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
					<div  className="col-lg-12 col-md-12 col-xs-12 col-sm-12 pmcontentWrap">
						<div className='col-lg-12 col-md-12 col-xs-12 col-sm-12 pmpageContent'>
							<div  className="col-lg-12 col-md-12 col-xs-12 col-sm-12 mtop20">
								<h1 className="text-center">Franchise Shopping Order Summary</h1>
							</div>
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mtopbotm15">
								<div className="col-lg-4 col-md-8 col-sm-12 col-xs-12 pull-right">
								    <label className=" ">Order Date :</label>
								    <div className="col-lg-8 col-md-9 col-sm-12 col-xs-12  pull-right nopadding">
								      <input className=" " id="theDate" type="date" value={this.state.date}/>
								    </div>
								</div>
							</div>
							<div>
								<table class="table table-bordered">
								    <thead>
								      <tr>
								        <th>Order Number</th>
								        <th>Total Items</th>
								        <th>Quantity</th>
								        <th>Action</th>
								      </tr>
								    </thead>
								    <tbody>
								    {
								    	Array.isArray(this.state.franchiselist) && this.state.franchiselist.length > 0
									    ? 
									    	this.state.franchiselist.map((result, index)=>{
													// console.log('result', result);
												return(
												      <tr  key={index}>
												        <td>{result.orderNo}</td>
												        <td>Doe</td>
												        <td>john@example.com</td>
												        <td>
												        	<span>
																<i className="fa fa-pencil" title="Edit" id={result._id} onClick={this.edit.bind(this)}></i>&nbsp; &nbsp;
													    		<i className="fa fa-trash redFont " id={result._id} onClick={this.deletePO.bind(this)}></i>
															</span>
												        </td>
												      </tr>
										        )
											})
											:
												null
								    }
								    </tbody>
								</table>
							</div>	
							
						</div>
					</div>
				</div>
		);
	}
}
