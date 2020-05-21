import React from 'react';
import IAssureTableUM 					 from '../../coreadmin/IAssureTableUM/IAssureTable.jsx';
import axios from 'axios';
import moment from 'moment';
import swal from 'sweetalert';
import './FranchiseShoppingList.css';

export default class FranchiseShoppingList extends React.Component {

	constructor(props) {
		super(props);
		  this.state = {
			      	tabledata : [
			      		{
			      			    ProductID        : '12',
				        		ItemCode 		: "1001",
				        		productName 	: "Mango",
								CurrentStock    : '20',
				                OrderedItems    : '',
			      		},
			      		{
			      			    ProductID        : '13',
				        		ItemCode 		: "1050",
				        		productName 	: "Potato",
								CurrentStock    : '25',
				                OrderedItems    : '',
			      		},


			      	],
			     
		                objects 		: [],
		            	Units 			: "",
		            	OrderedItems 	: ""
			      	
      };
	}

	componentDidMount(){

	}


    Submit(event){
    event.preventDefault();

    const formValues1 = {
        
       
      };
      // console.log("formValues1",formValues1);
      axios
			.post('/api/purchaseentry/post',formValues1)
		  	.then(function (response) {
		    // handle success
		    	// console.log("data in block========",response.data);
		    	swal("Thank you. Your Product addeed successfully.");
		    	 // window.location.reload();
		  	})
		  	.catch(function (error) {
		    // handle error
		    	console.log(error);
		  	});
		  	this.setState({
					
      	 })		
	}
	handleChange(event){
		const {value} = event.target;
		const name1 = event.target.name;
		const name2 = name1.split('-');
		const name = name2[0];

    	this.setState({
       		 [name]:value,
       		
			    
    	});

	}
	inputBox(event){
		event.preventDefault();
			var ConcatedId = event.target.id;
			let arrayofObjects= ConcatedId.split('-');
			console.log("arrayofObjects",arrayofObjects);
	        console.log("handleChange===>in Componant===>",this.state.OrderedItems);
			var objArray = [];
			var obj = {};
				obj["ProductID"] 	= arrayofObjects[0];
				obj["ItemCode"]     = arrayofObjects[1];
				obj["productName"]  = arrayofObjects[2];
				obj["CurrentStock"] = arrayofObjects[3];
				obj["OrderedItems"] = this.state.OrderedItems;
				obj["Units"] 		= this.state.Units;
				objArray.push(obj);
				objArray.push(obj);
				this.state.objects.push(obj);
			console.log("objArray",objArray);
			// this.setState({
	  		//      		objects : objArray    
	  		//   	});
    	console.log("objects",this.state.objects);
	}
	render() {
		return (
				<div  className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
					<div  className="col-lg-12 col-md-12 col-xs-12 col-sm-12 pmcontentWrap">
						<div className='col-lg-12 col-md-12 col-xs-12 col-sm-12 pmpageContent'>
							<div  className="col-lg-12 col-md-12 col-xs-12 col-sm-12 mtop20">
								<h1 className="text-center">Franchise Shopping List</h1>
							</div>
							<div className="col-lg-4 col-md-8 col-sm-12 col-xs-12 pull-right">
									    <label className="col-lg-3 col-md-2 col-sm-6 col-xs-6">Date : </label>
									    <div className="col-lg-4 col-md-4 col-sm-6 col-xs-6">
									      <input className=" " id="date12" type="date"/>
									    </div>
									</div>	
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mtop25">
								
								<div className="table-responsive">          
							    	<table className="table table-bordered table-striped table-hover">
									    <thead className="thead-dark text-center">
									      	<tr>
										        <th colSpan="2">ProductID</th>
										        <th colSpan="4">Item Code</th>
										        <th colSpan="2">Product Name</th>
										        <th colSpan="2">Current Stock</th>
										        <th colSpan="3">Ordered Items</th>
									      	</tr>
									    </thead>
									    <tbody>
									    {
									    	this.state.tabledata ? this.state.tabledata.map((result, index)=>{
												// console.log('result', result);
												return( 
												      <tr key={index}>
												        <td colSpan="2">{result.ProductID}</td>
												        <td colSpan="4">{result.ItemCode}</td>
												        <td colSpan="2">{result.productName}</td>
												        <td colSpan="2">{result.CurrentStock}</td>
												        <td colSpan="3">
												        	<div>
												        	<input type="number" className="col-lg-8 col-md-8 col-xs-8 col-sm-8 nobdrbtmbdr" name={"OrderedItems"+"-"+index} ref="OrderedItems" id={result.ProductID+"-"+result.ItemCode+"-"+result.productName+"-"+result.CurrentStock+"-"+index} value={this.state.OrderedItems} onChange={this.handleChange.bind(this)} onBlur={this.inputBox.bind(this)}/>
													        	<select id={"Units"+"-"+index} name={"Units"+"-"+index} value={this.state.Units} refs="Units" onChange={this.handleChange.bind(this)}  className="col-lg-4 col-md-4 col-xs-4 col-sm-4 nobdrbtmbdrdropdown">
																	<option selected={true}> Units</option>
																  	<option value="Kg">Kg</option>
																  	<option value="Ltr">Ltr</option>
																  	<option value="gram">gram</option>
																  	<option value="Nos">Nos</option>
																</select>
															</div>
															
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
								<div  className="col-lg-12 col-md-12 col-xs-12 col-sm-12 mtop20 Subbtnmtop20">
									<button className="btn btn-primary col-lg-3 col-md-3 col-xs-4 col-sm-4 pull-right" onClick={this.Submit.bind(this)}>Submit</button>
								</div>		
							</div>
						</div>
					</div>
				</div>
		);
	}
}
