import React, { Component }   from 'react';
import $                      from "jquery";
import jQuery                 from 'jquery';
import axios                  from 'axios';
import moment                 from 'moment';
import IAssureTableUM            from '../../IAssureTableUM/IAssureTable.jsx';
import swal                   from 'sweetalert';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/js/modal.js';
import './userManagement.css';

class DeletedUsers extends Component {


  constructor(props) {
    super(props);
    this.state = {
      "tableData"         : props && props.tableData ? props.tableData : [],
      "startRange"        : 0,
      "limitRange"        : 10000, 
      "twoLevelHeader"    : {
          apply           : false,
      },
      "tableHeading"     : {
        fullName        : 'User Details',
        roles           : 'Role',
        createdAt       : 'Registered Since',
        lastLogin       : "Last Login",
        deletedOn       : "Deleted On",
        deletedBy       : "Deleted By",
        actions         : 'Action',
      },
      "tableObjects"    : {
        paginationApply : false,
      },
      checkedUser  : [],
      activeswal : false,
      blockswal : false,
      confirmDel : false,
      unCheckedUser:false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const datatype = event.target.getAttribute('data-text');
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }
  componentDidMount() {
    var data = {
      "startRange"        : parseInt(this.state.startRange),
      "limitRange"        : parseInt(this.state.limitRange), 
    }    
    axios.post('/api/users/get/list', data)
    .then( (res)=>{  
    })
    .catch((error)=>{
    }); 

    this.props.getuserData(this.state.startRange, this.state.limitRange)
    this.getData(this.state.startRange, this.state.limitRange);
    this.setState({
      tableData     : this.props.tableData ,          
    })
  }
  
  getData(startRange, limitRange){    
    var data = {
      "startRange"        : parseInt(startRange),
      "limitRange"        : parseInt(limitRange), 
    }    
    axios.post('/api/users/get/list', data)
      .then( (res)=>{  
        var tableData = res.data.filter((data,i)=>{
          return data.status==='<span class="label label-default statusLabel">deleted</span>';
        }); 
        console.log('deleteres',tableData);
        var tableData = tableData.map((a, i)=>{
          return {
            _id             : a._id,
            fullName        : '<div class="wraptext"><p>'+a.fullName+'</p>'+'<p><i class="fa fa-envelope"></i> '+a.email+'</p>'+'<p><i class="fs16 fa fa-mobile"></i> '+a.mobNumber+'</p></div>',
            roles           : a.role.map((b,j)=> '  <span>'+b+' </span>').toString(),
            createdAt       : moment(a.createdAt).format("DD-MMM-YY LT"),
            lastLogin       : a.lastLogin !=="-" ? moment(a.lastLogin).format("DD-MMM-YY LT") : "-",
            deletedOn       : a.statusupdatedAt !=="-" ? moment(a.statusupdatedAt).format("DD-MMM-YY LT") : "-",
            deletedBy       : a.statusupdatedBy,
          }
        })
        this.setState({
          completeDataCount : res.data.length,
          tableData     : tableData,          
        })
    })
    .catch((error)=>{}); 
  }

  setunCheckedUser(value){
    this.setState({
      unCheckedUser : value,
    })
  }
  selectedUser(checkedUsersList){
    this.setState({
      checkedUser : checkedUsersList,
    },()=>{
      console.log('checkedUser',this.state.checkedUser);
    })
  }
  close(event){
    this.setState({
      firstname: "",
      lastname: "",
      signupEmail: "",
      mobile: "",
      role: "",
    });
    var modal = document.getElementById("DeletedUsersModal");
    modal.style.display = "none";
    $('.modal-backdrop').remove();
    $("#userInfo").validate().resetForm();
  }
  render() {
    return (
      <div className="modal" id="DeletedUsersModal" role="dialog">
        <div className="adminModal adminModal-dialog col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="modal-content adminModal-content col-lg-10 col-lg-offset-1 col-md-6 col-md-offset-3 col-sm-10 col-sm-offset-1 col-xs-12 noPadding">
            <div className="modal-header adminModal-header col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <button type="button" onClick={this.close.bind(this)} className="close " data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 className="modal-title row deleteTitle" id="exampleModalLabel">Deleted Users</h4>
            </div>
            <div className="modal-body adminModal-body col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <IAssureTableUM
                // completeDataCount={this.state.completeDataCount}
                // twoLevelHeader={this.state.twoLevelHeader} 
                getData={this.getData.bind(this)} 
                getuserData={this.getData.bind(this)} 
                tableHeading={this.state.tableHeading} 
                tableData={this.state.tableData} 
                // tableObjects={this.state.tableObjects}
                // selectedUser={this.selectedUser.bind(this)} 
                // setunCheckedUser={this.setunCheckedUser.bind(this)} 
                // unCheckedUser={this.state.unCheckedUser}
                DeletedUsersTable = {true}
              />      
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default DeletedUsers;