import React,{Component} from 'react';
import { render } from 'react-dom';
import axios                    from 'axios';


import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

import '../dashboard.css';

export default class ProgressBlock extends Component{
  
  constructor(props) {
   super(props);
    this.state = {
      bgColor:props.bgColor,
      faIcon:props.faIcon,
      display:props.display,
      FieldName:"",
      Field:props.Field,
      FieldCount:0,
      percentage:0,
    }
  }
   
  componentDidMount(){
      if(this.props.display){
        this.setState({
          Field: this.props.Field,
          FieldName: this.props.Field.FieldName,
          bgColor: this.props.bgColor,
          faIcon: this.props.faIcon,
        },()=>{this.getData()})
      }
   
  }

  componentWillMount(){
      if(this.props.display){
        this.setState({
          Field: this.props.Field,
          FieldName: this.props.Field.FieldName,
          bgColor: this.props.bgColor,
          faIcon: this.props.faIcon,
        },()=>{this.getData()})
      }
    
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.display){
      this.setState({
        Field: nextProps.Field,
        FieldName: nextProps.Field.FieldName,
        bgColor: nextProps.bgColor,
        faIcon: nextProps.faIcon,
      },()=>{this.getData()})
    }
  }

  getData(){
    var Method = this.state.Field.method ;
    var Path = this.state.Field.path ;

    axios({
      method: Method,
      url: Path
    })
    .then((response)=>{
      if(response){
        var tot = response.data[0].total;
        if(tot === 0 || tot === '0'){
          var percentage = 'NA'
        }else{
          var percentage = (parseInt(response.data[0].value)/parseInt(tot))*100
        }

        this.setState({
          FieldCount: response.data[0].value,
          percentage:percentage
        })
      }
    })
    .catch((err)=>{console.log('ProgressBlock err: ',err)})

  }

    
  render(){
    return(
      <div>
      {this.state.display ?
        <div className="col-md-4 col-sm-6 col-xs-12">
            <div className={"info-box "+this.state.bgColor}>
              <span className="info-box-icon"><i className={"fa "+this.state.faIcon} aria-hidden="true"></i></span>
              <div className="info-box-content">
                <span className="info-box-text">{this.state.FieldName}</span>
                <span className="info-box-number">{this.state.FieldCount}</span>
                <div className="progress">
                	<div className="progress-bar" style={{"width": this.state.percentage+"%"}}></div>
                </div>
                <span className="progress-description">{this.state.percentage != 'NA' ? (this.state.percentage+'% '+this.state.FieldName) : 'No Assignments'}</span>
              </div>
            </div>
          </div> 
          :
        null
      }
      </div>
        );
  }
}
