import React, { Component }       	from 'react';
import {Route, withRouter} 			from 'react-router-dom';
import swal                     	from 'sweetalert';
import axios 						from 'axios';
import $ 							from 'jquery';
import jQuery 						from 'jquery';
import 'jquery-validation';


class BillingInvoice extends Component {
	constructor(props){
		super(props);
		this.state = {
			data : [],
			notes:'',
			terms:''
		}
	}

	componentDidMount(){
		var id = this.props.match.params.id;
		axios.get('/api/bookingmaster/get/getSingleBookingListForGenerateBill/'+id)
		.then((response)=>{
			console.log('response: ',response.data)
		})
		.catch((err)=>{swal(err)})
	}
	handleChange(event) {
        const target = event.target;
        const name = target.name;

        this.setState({
            [name]: event.target.value
        });   
    }

	addNew(event){
		event.preventDefault();
		let { data } = this.state;
	    data.push(data.length); // data.length is one more than actual length since array starts from 0.
	    // Every time you call append row it adds new element to this array. 
	    // You can also add objects here and use that to create row if you want.
	    this.setState({data});
	}

	removeRow(event){
		event.preventDefault();
		var value = $(event.currentTarget).closest('tr')
		swal({
          title: "Are you sure you want to delete this row?",
          text: "Once deleted, you will not be able to recover this row!",
          buttons: true,
          dangerMode: true,
        })
        .then((success) => {
          if (success) {
            value.remove()
          } else {
	        }
	      });
		
	}

	saveBill(event){
		event.preventDefault();
		this.props.history.push('view-bill')
	}

  
	render() {
		const Row = ({ id }) => (
		  <tr>
			<td><input autoComplete="off" className="input form-control tdtextboxstyle" name="itemType" type="text"  id="itemType" required /></td>
			<td><textarea type="text" className="form-control tdtextboxstyle"/></td>
			<td><input autoComplete="off" className="input form-control tdtextboxstyle" name="quantity" type="number"  id="quantity" required /></td>
			<td><input autoComplete="off" className="input form-control tdtextboxstyle" name="unitCost" type="number"  id="unitCost" required /></td>
			<td></td>
			<td><i className="fa fa-remove deleteTableRow" aria-hidden="true" onClick={this.removeRow.bind(this)}></i></td>
		  </tr>
		);
		return (
         <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
         	 <section className="Content">
         	 	<div className="row">
         	 		<div className="col-md-12">
         	 			<div className="invoiceWrapper">
         	 				<div className="box-header with-border invoice-title">
			          			<h4 className="invoiceTitle">Invoice</h4>
			          		</div>
			          		<div className="box-body">
			          			<div className="col-lg-12">
			          			<div className="col-lg-6">
			          				<address>
				          				<strong>From Company Name</strong><br/>
				      						 <b>Address</b><br/>
				      						 PAN:HGJ123490 <br/>
				      						 GST: AUYYUI1234
				          				</address>
			          			</div>
			          			<div className="col-lg-6">
			          				<div className="logoInvoice pull-right">
							      		<img className="img-responsive logoimgheight img-rounded" src="/images/fivebeeslogo.png"/>
							      	</div>
			          			</div>
			          			</div>
			          			<div className="col-lg-12">
			          			<div className="col-lg-6">
			          				<address>
				          				<strong>To Company Name</strong><br/>
				      						 <b>Address</b><br/>
				      						 PAN: HJGJ2424 <br/>
				      						 GST: JYHGFTRYU23
				          				</address>
			          			</div>
			          			<div className="col-lg-6">
			          				<div className="pull-right">
			          				<span className="col-lg-12">Invoice# : 1234</span>
			          				<span className="col-lg-12">Date :20/04/2020</span>
			          				</div>
			          			</div>
			          			</div>
			          			<div className="col-lg-12">
			          				<button className="btn btn-primary pull-right btn-sm" onClick={this.addNew.bind(this)}>Add New Line</button>
			          				<div className="col-lg-12 marginStyle">
			          					<div className="table-responsive">
				          					<table className="table table-bordered">
				          						<thead>
				                            <tr>
		              							<td><strong>Item Type</strong></td>
		              							<td><strong>Description</strong></td>
		              							<td><strong>Quantity</strong></td>
		              							<td><strong>Unit Cost(Rs)</strong></td>
		              							<td><strong>Line Total(Rs)</strong></td>
		              							<td><strong>Action</strong></td>
				                            </tr>
				          						</thead>
				          						<tbody className="tableBody" id="tableBody">
				          							<tr>
				          							<td><input autoComplete="off" className="input form-control tdtextboxstyle" onChange={this.handleChange.bind(this)} name="itemType" type="text" value="Pune-Hinjewadi Trip" id="itemType" required /></td>
				          							<td><textarea type="text" className="form-control tdtextboxstyle"/>
				          								Trip ID# : 1234 <br/>
				          								Sedan car<br/>
				          								White Honda City <br/>
				          								MH-12-DE-1234<br/>
				          								Driver: ABC(ID:12)
				          							</td>
				          							<td><input autoComplete="off" className="input form-control tdtextboxstyle" name="quantity" type="number"  id="quantity" required />175KM</td>
				          							<td><input autoComplete="off" className="input form-control tdtextboxstyle" name="unitCost" type="number"  id="unitCost" required />10</td>
				          							<td>1650</td>
				          							<td><i className="fa fa-remove deleteTableRow" aria-hidden="true" onClick={this.removeRow.bind(this)}></i></td>
				          							</tr>
				          							{this.state.data && this.state.data.length > 0 ?
				          								this.state.data.map((index,id) => (
											            <Row key={index} id = {id} />
											        	))
											        	:
											        	null
											        }
											        <tr className="footerTR borderTop">
							                            <th className="" colSpan="4"> SUB TOTAL </th>
							                            <th className="" colSpan="2">  </th>
							                        </tr>
							                        <tr className="footerTR">
							                            <th className="bg-warning" colSpan="4"> DISCOUNT </th>
							                            <th className="bg-warning"> <input autoComplete="off" className="tdtextboxstyle" name="discount" type="number"  id="discount" /> </th>
							                            <th className="bg-warning"><i className="fa fa-remove deleteTableRow" aria-hidden="true" onClick={this.removeRow.bind(this)}></i>  </th>
							                        </tr>
							                        <tr className="footerTR">
							                            <th className="" colSpan="4"> CGST </th>
							                            <th className="" colSpan="2">  </th>
							                        </tr>
							                        <tr className="footerTR">
							                            <th className="" colSpan="4"> SGST </th>
							                            <th className="" colSpan="2">  </th>
							                        </tr>
							                        <tr className="footerTR">
							                            <th className="" colSpan="4"> Grand Total </th>
							                            <th className="" colSpan="2">  </th>
							                        </tr>
				          						</tbody>
				          					</table>
				          				</div>
				          				<div className="col-lg-12 col-md-12 nopadding">
				          					<div className="form-group valid_box col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding">
								                <div className="form-group">
								                  <label className="labelform" >Notes</label>
								                  <textarea onChange={this.handleChange} 
								                    type="text" name="notes" id="notes"
								                    placeholder="Please enter your notes if any"
								                    className="form-control" value={this.state.notes}></textarea>
								                  
								                </div>  
								              </div>
				          				</div>
				          				<div className="col-lg-12 col-md-12 nopadding">
				          					<div className="form-group valid_box col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding">
								                <div className="form-group">
								                  <label className="labelform" >Terms & Conditions</label>
								                  <textarea onChange={this.handleChange} 
								                    type="text" name="terms" id="terms"
								                    placeholder="Please enter Terms & Conditions if any"
								                    className="form-control" value={this.state.terms}></textarea>
								                  
								                </div>  
								              </div>
				          				</div>
			          				</div>
			          			</div>
			          			<div className="col-lg-12 col-md-12 reportWrapper">
			          				<button className="col-lg-2 pull-right btn btn-primary" onClick={this.saveBill.bind(this)}>Save Bill</button>
			          			</div>
			          		</div>
         	 			</div>
         	 		</div>
         	 	</div>
		    </section>
	     </div>
	    );
		
	} 

}

export default withRouter(BillingInvoice);

