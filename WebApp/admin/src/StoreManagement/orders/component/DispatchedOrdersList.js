import React,{Component} from 'react';
// import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch,Link,location } from 'react-router-dom';
import axios                  from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import $ from "jquery";
import moment from 'moment';
import AdminOrdersList from './AdminOrdersList.js';


export default class DispatchedOrdersList extends Component{
  
  constructor(props) {
   super(props);
    this.state = {
      "data" : [] ,
      "allProductsArray" : []
    }
    this.getOrders = this.getOrders.bind(this);
  }
   
  componentDidMount(){
    this.getOrders();
  }    
  getOrders(){
      axios.get("/api/orders/get/orderlist/Dispatch")
            .then((response)=>{
              var UsersArray = [];
              var allProductsArray = [];
                for (let i = 0; i < response.data.length; i++) {
                  var _id = response.data[i]._id;
                  var orderID = response.data[i].orderID;
                  var userFullName = response.data[i].userFullName;
                  var allocatedToFranchise = response.data[i].allocatedToFranchise ?response.data[i].allocatedToFranchise.companyName : null;
                  var totalQuantity = response.data[i].totalQuantity;
                  var currency = response.data[i].currency;
                  var totalAmount = response.data[i].total;
                  var createdAt = moment(response.data[i].createdAt).format("DD/MM/YYYY hh:mm a");
                  var status = response.data[i].status;
                  var deliveryStatus = response.data[i].deliveryStatus[response.data[i].deliveryStatus.length-1].status === "Dispatch" ? 'Out for Delivery' : response.data[i].deliveryStatus[response.data[i].deliveryStatus.length-1].status;
                  var viewOrder =  "/viewOrder/"+response.data[i]._id;
                  var deliveryStatus =  response.data[i].deliveryStatus[response.data[i].deliveryStatus.length-1].status;

                  allProductsArray.push(response.data[i].products[0]);
                  var UserArray = [];
                  UserArray.push(orderID);
                  UserArray.push(allocatedToFranchise);
                  UserArray.push(userFullName);
                  UserArray.push(totalQuantity);
                  UserArray.push(<i className={"fa fa-"+currency}>&nbsp;{(parseInt(totalAmount)).toFixed(2)}</i>);
                   
                  UserArray.push(createdAt);
                  UserArray.push({status : status, deliveryStatus : deliveryStatus});
                  UserArray.push({_id:_id, viewOrder:viewOrder, deliveryStatus:deliveryStatus});
                  
                  UsersArray.push(UserArray);
                }

                this.setState({
                  data: UsersArray,
                  allProductsArray : allProductsArray
                });

                this.setState({
                  orderData: response.data
                });

            })
            .catch((error)=>{
                console.log('error', error);
            })
    }

  render(){
    return(
      <div>
      <AdminOrdersList tableTitle={'Dispatched Order List'} data={this.state.data} allProductsArray={this.state.allProductsArray} showStatusFilter="false" showStatusFilter="false" getOrdersFun={this.getOrders}/>
      </div>
      );
    
  }
}
