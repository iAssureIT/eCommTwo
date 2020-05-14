// import React, {Component} from 'react';
// import './Pagealert.css';
// import $ from "jquery";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'font-awesome/css/font-awesome.min.css';
// import axios from 'axios';
// export default class Pagealert extends Component {
// constructor(props) {
//         super(props);
//         window.scrollTo(0, 0);
//       this.state = {
//         Alert  : "sucess",
//         Alert1  : "info",
//         Alert2  : "warning",
//         Alert3  : "danger",
//       };

//     }

// componentDidMount(){}  

// componentWillMount() {}
  
//   render() {  
//         return (
//                   <div className="col-lg-12 alertDisplay">
//                   { this.state.Alert == "sucess" ?
//                       <div className="alert alert-success alert-dismissible fade in">
//                         <a href="#" className="close" data-dismiss="alert" aria-label="close">&times;</a>
//                         <strong>Success!</strong> This alert box could indicate a successful or positive action.
//                       </div>
//                       : this.state.Alert == info ?
//                       <div className="alert alert-info alert-dismissible fade in">
//                         <a href="#" className="close" data-dismiss="alert" aria-label="close">&times;</a>
//                         <strong>Info!</strong> This alert box could indicate a neutral informative change or action.
//                       </div>
//                       : this.state.Alert == warning ?
//                       <div className="alert alert-warning alert-dismissible fade in">
//                         <a href="#" className="close" data-dismiss="alert" aria-label="close">&times;</a>
//                         <strong>Warning!</strong> This alert box could indicate a warning that might need attention.
//                       </div>
//                       : this.state.Alert == danger ?
//                       <div className="alert alert-danger alert-dismissible fade in">
//                         <a href="#" className="close" data-dismiss="alert" aria-label="close">&times;</a>
//                         <strong>Danger!</strong> This alert box could indicate a dangerous or potentially negative action.
//                       </div>
//                       :
//                       null
//                   }
//                   </div>
//                 );  
//            }
// }