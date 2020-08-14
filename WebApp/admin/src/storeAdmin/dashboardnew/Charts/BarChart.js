// import React,{Component} from 'react';
// import { render } from 'react-dom';
// import {Bar} from 'react-chartjs-2';
// import axios             from 'axios';
// import moment from 'moment';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'font-awesome/css/font-awesome.min.css';
// import '../dashboard.css';

// const options = {
//     scales: {
//       xAxes: [{
//         stacked: true,
//       }],
//       yAxes: [{
//         stacked: true,
//       }],
//     },
//     responsive: true,
//     maintainAspectRatio: false     
// };
// export default class BarChart extends Component{
//   constructor(props) {
//    super(props);
//     this.state = {
//       boxColor:props.boxColor,
//       title:props.title,
//       display:props.display,
//       "data" : {
//       labels: [],
//       datasets: [{
//             label: 'Estimated Cost',
//             backgroundColor:'rgba(54, 162, 235, 1)',
//             borderColor: 'rgba(54, 162, 235, 0.5)',
//             borderWidth: 1,
//             hoverBackgroundColor:'rgba(255, 206, 86, 0.5)',
//             hoverBorderColor:'rgba(255, 206, 86, 0.5)',
//             stack: '1',
//             data: []
//           }]
//       }
//     }
//   }
   
//   componentDidMount(){
//     if(this.props.display){
//       this.setState({
//         boxColor: this.props.boxColor,
//         title: this.props.title,
//         apiData : this.props.api,
//       },()=>{this.getData()})
//     }
//   }

//   componentWillMount(){
//     if(this.props.display){
//       this.setState({
//         boxColor: this.props.boxColor,
//         title: this.props.title,
//         apiData : this.props.api,
//       },()=>{this.getData()})
//     }
//   }

//   componentWillReceiveProps(nextProps){
//     if(nextProps.display){
//       this.setState({
//         boxColor: nextProps.boxColor,
//         title: nextProps.title,
//         apiData : nextProps.api,
//       },()=>{this.getData()})
//     }
//   }

//   getData(){
//     var data = {...this.state.data};

//     if(this.state.apiData){
//       var Method = this.state.apiData.method;
//       var Path = this.state.apiData.path;
//       var postData = this.state.apiData.postData;
//         axios({
//           method: Method,
//           url: Path,
//           data:postData
//         })
//         .then((response)=>{ 
//           console.log("response",response.data);
//           var monthsArray = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
//           var piechartcolor = [];
//           var totalEstimate = [];
//           var janTotal   = 0;
//           var febTotal   = 0;
//           var marchTotal = 0;
//           var aprilTotal = 0;
//           var mayTotal   = 0;
//           var juneTotal  = 0;
//           var julyTotal  = 0;
//           var augTotal   = 0;
//           var septTotal  = 0;
//           var octTotal   = 0;
//           var novTotal   = 0;
//           var decTotal   = 0;
//          if(response.data && response.data.length >0){
//             response.data.map((data,index)=>{ 
//               var month = moment(data.createdAt).format('MMMM');
//               if(month === 'January'){
//                 janTotal = janTotal + data.total
//               }else if(month === 'February'){
//                 febTotal = febTotal + data.total
//               }else if(month === 'March'){
//                 marchTotal = marchTotal + data.total
//               }else if(month === 'April'){
//                 aprilTotal = aprilTotal + data.total
//               }else if(month === 'May'){
//                 mayTotal = janTotal + data.total
//               }else if(month === 'June'){
//                 juneTotal = juneTotal + data.total
//               }else if(month === 'July'){
//                 julyTotal = julyTotal + data.total
//               }else if(month === 'August'){
//                 augTotal = augTotal + data.total
//               }else if(month === 'September'){
//                 septTotal = septTotal + data.total
//               }else if(month === 'October'){
//                 octTotal = octTotal + data.total
//               }else if(month === 'November'){
//                 novTotal = novTotal + data.total
//               }else if(month === 'December'){
//                 decTotal = decTotal + data.total
//               }
            
//             })
            
//           totalEstimate = [janTotal,febTotal,marchTotal,aprilTotal,mayTotal,juneTotal,julyTotal,augTotal,septTotal,octTotal,novTotal,decTotal];

//           if (totalEstimate.length > 0) {
//             data.datasets[0].data = totalEstimate;
//             data.labels =  monthsArray;
//             this.setState({
//               "data" : data
//             },()=>{
//             })            
//           }
//         }  
//       })
//       .catch((error)=>{  
//         console.log('error=>',error)      
//       });
//     }
//   }

    
//   render(){
//     return(
//       <div>
//       {this.state.display ?
//         <div className="col-md-8">
//           <div className={"box "+this.state.boxColor}>
//             <div className="box-header with-border">
//               <h3 className="box-title">{this.state.title}</h3>
//             </div>
//             <div className="box-body no-padding">
//             {this.state.data && this.state.data.datasets[0].data.length > 0 ?
//               <Bar data={this.state.data} height={200}  options={options} />
//             :
//             <div>
//               <img className="chartStyle" src="/images/loading-gif.gif"/>
//               <p className="pull-right noChartData">No Data Found</p>
//             </div>
//             }
//             </div>
//           </div>
//         </div> 
//        :
//         null
//       }
//       </div>
//         );
     
//   }
// }

//@@@@@@
import React,{Component} from 'react';
import { render } from 'react-dom';
import {Bar} from 'react-chartjs-2';
import axios             from 'axios';


import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

import '../dashboard.css';

const options = {
    scales: {
      xAxes: [{
        stacked: true,
      }],
      yAxes: [{
        stacked: true,
          }],
    },
    responsive: true,
    maintainAspectRatio: false     
};
export default class BarChart extends Component{
  
  constructor(props) {
   super(props);
    this.state = {
      boxColor:props.boxColor,
      title:props.title,
      display:props.display,
      "data" : {
      labels: [],
      datasets: [{
            label: 'Total Cost',
            backgroundColor:'rgba(54, 162, 235, 1)',
            borderColor: 'rgba(54, 162, 235, 0.5)',
            borderWidth: 1,
            hoverBackgroundColor:'rgba(255, 206, 86, 0.5)',
            hoverBorderColor:'rgba(255, 206, 86, 0.5)',
            stack: '1',
            data: []
          }]
      }
    }
  }
   
  componentDidMount(){
    if(this.props.display){
      this.setState({
        boxColor: this.props.boxColor,
        title: this.props.title,
        apiData : this.props.api,
      },()=>{this.getData()})
    }
  }

  componentWillMount(){
    if(this.props.display){
      this.setState({
        boxColor: this.props.boxColor,
        title: this.props.title,
        apiData : this.props.api,
      },()=>{this.getData()})
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.display){
      this.setState({
        boxColor: nextProps.boxColor,
        title: nextProps.title,
        apiData : nextProps.api,
      },()=>{this.getData()})
    }
  }

  getData(){
    var data = {...this.state.data};

    if(this.state.apiData){
      var Method = this.state.apiData.method;
      var Path = this.state.apiData.path;
      var PostData = this.state.apiData.PostData;
        axios({
          method: Method,
          url: Path,
          data : PostData
        })
        .then((response)=>{ 
          var booking = [];
          var piechartcolor =[];
          var totalEstimate = [];
         if(response.data && response.data.length >0){
            response.data.map((data,index)=>{ 
              booking.push(data.name);
              totalEstimate.push(data.totalCost);
            })
          if (totalEstimate.length > 0) {
            data.datasets[0].data = totalEstimate;
            data.labels = booking;
            this.setState({
              "data" : data
            })
            
          }
        }  
      })
      .catch((error)=>{  
        console.log('error=>',error)      
      });
    }
  }

    
  render(){ 
    return(
      this.state.display ?
        <div className="col-md-8">
          <div className={"box "+this.state.boxColor}>
            <div className="box-header with-border">
              <h3 className="box-title">{this.state.title}</h3>
            </div>
            <div className="box-body no-padding">
            {this.state.data && this.state.data.datasets[0].data.length > 0 ?
              <Bar data={this.state.data} height={300}  options={options} />
            :
            <div>
               <img className="chartStyle" src="/images/loading-gif.gif"/>
                <p className="pull-right noChartData">No Data Found</p>
            </div>
            }
            </div>
          </div>
        </div> 
       :
       null
    );
  }
}

