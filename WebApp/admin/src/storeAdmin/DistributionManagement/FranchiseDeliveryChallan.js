import React, { version } from 'react';
import './PurchaseManagement.css';
import swal from 'sweetalert';
import axios from 'axios';
import moment from 'moment';
import IAssureTable           from '../../coreadmin/IAssureTable/IAssureTable.jsx';
import $ from 'jquery';

export default class DistributionManagement extends React.Component {
	constructor(props) {
		super(props);
		  this.state = {
					currentDate       : '',
                    FranchiseId       : '',
                    DeliveryChallanNo : '',
					DistributionDate  :'',
					FranchiseData     : [],
					totalDemand       : 0,
                    totalSupply       : 0,
                    totalRemain       : 0,
					user_id           :''

      };
    }
    
    componentDidMount(){
        console.log('orderID',this.props.match.params.distributionId);
        var distributionId = this.props.match.params.distributionId;
		this.getFranchiseChallan(distributionId);
    }
    
    getFranchiseChallan(distributionId){
        axios.get('/api/franchisegoods/get/franchiseDeliveryChallan/'+distributionId)
        .then((franchiseData) => {
                  var FranchiseData = [];
                  var DistributionData = [];
                  var FranchiseOrderedData = []; 
                  if(franchiseData){
                    console.log("franchiseData",franchiseData);
                    let remain = franchiseData.data.orderItems.reduce(function(prev, current) {
                        return prev + +current.remainQty
                    }, 0); 

                    this.setState({
                        "FranchiseData"     : franchiseData.data.orderItems,
                        "DeliveryChallanNo" : franchiseData.data.deliveryChallanNo,
                        "DistributionDate"  : franchiseData.data.distributionDate,
                        "FranchiseId"       : franchiseData.data.franchiseId,
                        "totalDemand"       : franchiseData.data.totalDemand,
                        "totalSupply"       : franchiseData.data.totalSupply,
                        "totalRemain"       : remain,
                        
                    },()=>{

                    });
                  }

                
          })
          .catch(error=>{
              console.log("error in franchise Challan = ", error);
          })
    }

	render() {
		return (
			<div  className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
				<div  className="col-lg-12 col-md-12 col-xs-12 col-sm-12 pmcontentWrap">
					<div className='col-lg-12 col-md-12 col-xs-12 col-sm-12 pmpageContent'>
						<div className="box-header with-border col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-right">
                            <h4 className="" style={{"display": "inline-block","float": "left"}}>Franchise Delivery Challan</h4>
                            <a href="/distribution" className="backtoMyOrders" style={{"display": "inline-block","float": "right"}}><i class="fa fa-chevron-circle-left"></i> Back to Distribution</a>
                        </div>
                        <div  className="col-lg-12 col-md-12 col-xs-12 col-sm-12 outerbox">
                            <div className=" col-lg-4 col-md-4 col-xs-12 col-sm-12">
                               <strong class="box-title"><span>Delivery Challan No</span></strong>
                               <div className="box-content">{this.state.DeliveryChallanNo}</div>
                            </div>
                            <div className=" col-lg-4 col-md-4 col-xs-12 col-sm-12">
                               <strong class="box-title"><span>Distribution Date</span></strong>
                               <div className="box-content">{this.state.DistributionDate}</div>
                            </div>
                            <div className=" col-lg-4 col-md-4 col-xs-12 col-sm-12">
                               <strong class="box-title"><span>Franchise</span></strong>
                               <div className="box-content">{this.state.FranchiseId}</div>
                            </div>
                        </div>
                        <div  className="col-lg-12 col-md-12 col-xs-12 col-sm-12 outerbox">
                            <div className="table-responsive">          
								<table className="table table-bordered table-striped table-hover">
									<thead className="thead-light text-center bg-primary">
                                        <tr>
                                            <th rowSpan="2">Product Name </th>
                                            <th rowSpan="2">Product Code </th>
                                            <th rowSpan="2">Item Code </th>
                                            {/* <th rowspan="2">Total Stock</th> */}
                                            <th>Demand </th>
                                            <th>Supply</th>
                                            <th>Remain</th>
                                        </tr>
                                       
									</thead>
								    <tbody>
                                    {
                                        Array.isArray(this.state.FranchiseData) && this.state.FranchiseData.length > 0
                                        ? 
                                            this.state.FranchiseData.map((result, index)=>{
                                                // console.log("result",result);
                                                return(
                                                    <tr key={index}>
														<td>{result.productName}</td>
                                                        <td>{result.productCode}</td>
                                                        <td>{result.itemCode}</td>
                                                        {/* <td style={{fontWeight:'bold'}}>{result.currentStock} </td> */}
                                                        <td>{result.orderQty} </td>
                                                        <td>{result.suppliedQty}</td>
                                                        <td>{result.remainQty}</td>															
													</tr>
                                                )
                                            })
                                        : null
                                    }
                                    </tbody>
                                    <tfoot style={{fontWeight:'bold'}}>
                                        <tr>
                                            <td colSpan="3">Total</td>
                                            <td>{this.state.totalDemand}</td>
                                            <td>{this.state.totalSupply}</td>
                                            <td>{this.state.totalRemain}</td>
                                        </tr>
									</tfoot>
                            </table>
                            </div>
                           </div>
					</div>
				</div>
			</div>
		);
	}
}
