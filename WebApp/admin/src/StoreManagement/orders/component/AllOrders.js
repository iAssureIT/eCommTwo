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


export default class AllOrders extends Component{
  
  constructor(props) {
   super(props);
    this.state = {
      "data" : [] 
    }
    this.getOrders = this.getOrders.bind(this);
  }
   
  componentDidMount(){
    this.getOrders();
  }    
  getOrders(){
      axios.get("/api/orders/get/list")
            .then((response)=>{
              // console.log("response.data of order==>",response.data)
              var UsersArray = [];
              
                for (let i = 0; i < response.data.length; i++) {
                  var _id = response.data[i]._id;
                  var orderID = response.data[i].orderID;
                  var allocatedToFranchise = response.data[i].allocatedToFranchise ?response.data[i].allocatedToFranchise.companyName : null;
                  var userFullName = response.data[i].userFullName;
                  var totalQuantity = response.data[i].cartQuantity;
                  var currency = response.data[i].currency;
                  var totalAmount = response.data[i].total;
                  var productarr = [];
                  for(let j in response.data[i].products){
                      productarr.push(response.data[i].products[j].productName +' '+response.data[i].products[j].quantity )
                  }
                  var createdAt = moment(response.data[i].createdAt).format("DD/MM/YYYY hh:mm a");
                  var status = response.data[i].status;
                  var deliveryStatus = response.data[i].deliveryStatus[response.data[i].deliveryStatus.length-1].status === "Dispatch" ? 'Out for Delivery' : response.data[i].deliveryStatus[response.data[i].deliveryStatus.length-1].status;
                  var viewOrder =  "/viewOrder/"+response.data[i]._id;
                  var deliveryStatus =  response.data[i].deliveryStatus[response.data[i].deliveryStatus.length-1].status;

                  var UserArray = [];
                  UserArray.push(orderID);
                  UserArray.push(allocatedToFranchise);
                  UserArray.push(userFullName);
                  // UserArray.push(totalQuantity);
                  UserArray.push(productarr.toString());
                  UserArray.push(<i className={"fa fa-"+currency}>&nbsp;{(parseInt(totalAmount)).toFixed(2)}</i>);
                  UserArray.push(createdAt);
                  UserArray.push({status : status, deliveryStatus : deliveryStatus});
                  UserArray.push({_id:_id, viewOrder:viewOrder, deliveryStatus:deliveryStatus});
                  
                  UsersArray.push(UserArray);
                }

                this.setState({
                  data: UsersArray
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
      <AdminOrdersList tableTitle={'All Orders'} data={this.state.data} getOrdersFun={this.getOrders}/>
      </div>
      );
    
  }
}
