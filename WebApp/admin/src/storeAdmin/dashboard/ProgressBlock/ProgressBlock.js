import React,{Component} from 'react';
import { render } from 'react-dom';
import axios                    from 'axios';


import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

import '../Dashboard.css';

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
      data : [],
      compairFieldCount : 0,
      compairField: props.compairField,
      topCount : 4
    }
  }
   
  componentDidMount(){
      // if(this.props.display){
        this.setState({
          Field: this.props.Field,
          FieldName: this.props.Field.FieldName,
          compairField: this.props.compairField ? this.props.compairField : '',
          bgColor: this.props.bgColor,
          faIcon: this.props.faIcon,
        },()=>{this.getData()})
      // }
   
  }

  componentWillMount(){
      // if(this.props.display){
        this.setState({
          Field: this.props.Field,
          FieldName: this.props.Field.FieldName,
          compairField: this.props.compairField ? this.props.compairField : '',
          bgColor: this.props.bgColor,
          faIcon: this.props.faIcon,
        },()=>{this.getData()})
      // }
    
  }

  componentWillReceiveProps(nextProps){
    // if(nextProps.display){
      this.setState({
        Field: nextProps.Field,
        FieldName: nextProps.Field.FieldName,
        compairField: nextProps.compairField ? nextProps.compairField : '',
        bgColor: nextProps.bgColor,
        faIcon: nextProps.faIcon,
      },()=>{this.getData()})
    // }
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
        var topArray =[];
        response.data.sort(function(a, b){return b.totalSale-a.totalSale});
        var arr =  response.data.slice(0,4); 
        arr.map(function(data,index){
          var tot = data.totalSale ? data.totalSale : 0;
          if(tot === 0 || tot === '0'){
            var percentage = '0'
          }else{
            var percentage = (parseInt(tot)/parseInt(tot))*100
          }
          var avgdata = {
            "FieldCount":data.totalSale ? data.totalSale : 0,
            "percentage":percentage,
            "franchiseName" : data.franchiseName
          };
          topArray.push(avgdata);
        });

        if(topArray.length < this.state.topCount){
          var newarr = this.state.topCount - topArray.length 
          for (let i = 0; i < newarr; i++) {
            topArray.push({"FieldCount": 0,"percentage":0,"franchiseName" : ''})
          }
        }
        this.setState({
          data:topArray,
        },()=>{
          console.log("curr",this.state);
        })

        if(this.state.compairField){
          var compairFieldMethod = this.state.compairField.method;
          var compairFieldPath = this.state.compairField.path;
    
          axios({
            method: compairFieldMethod,
            url: compairFieldPath
          })  
          .then((response)=>{
            this.setState({
              compairFieldCount:response.data
            })
          })
          .catch((err)=>{console.log('compair field err: ',err)})
        }
      }
    })
    .catch((err)=>{console.log('ProgressBlock err: ',err)})

  }

    
  render(){
    return(
      this.state.display ?
      <div className="col-md-4 col-sm-6 col-xs-12">
       {this.state.data.length > 0 ? 
           <div className="box box-danger">
              <div className="box-header with-border">
                  <h3 className="box-title">Top Franchise Sale</h3>
              </div>
              <div className="box-body no-margin">
                {this.state.data.map((data, i)=>{
                  var index = i+1;
                  var topClass = data.FieldCount !== 0 ? index : 0;
                    return(
                            <div className={"info-box top"+topClass}>
                            <span className="info-box-icon"><i class="fa fa-arrow-upp" aria-hidden="true">{i+1}</i></span>
                              {data.FieldCount > 0 ? 
                               <div className="info-box-content">
                                  <span className="info-box-text">{data.franchiseName}</span>
                                  <span className="info-box-number"><i className={"fa fa-inr"}></i> {data.FieldCount} / {this.state.compairFieldCount}</span>
                                  <div className="progress">
                                    <div className="progress-bar bg-white" style={{width: (data.FieldCount/ this.state.compairFieldCount)*100+"%"}}></div>
                                  </div>  
                                  <span className="progress-description">
                                  {index} Best Franchise/Sale Revenue
                                  </span>              
                               </div>
                              : 
                              <div className="info-box-content">
                                  <span className="info-box-text">{data.franchiseName}</span>
                                  <span className="info-box-number emptyText"></span>
                                  <div className="progress">
                                    <div className="progress-bar bg-white" style={{width: (data.FieldCount/ this.state.compairFieldCount)*100+"%"}}></div>
                                  </div>  
                                  <span className="progress-description">
                                  {/* {index} Best Franchise/Sale Revenue */}
                                  </span>              
                              </div>
                              }
                            </div>
                      );
                    })
                }
              </div>
            </div>
        : 
          // <div className="col-md-4 col-sm-6 col-xs-12 text-center">
             <div className="box box-danger">
                <div className="box-header with-border">
                  <h3 className="box-title">Top Franchise Sale</h3>
                </div>
                <div className="box-body no-padding">
                  <img className="chartStyle" src="/images/dot-gif.gif"/>
                  <p className="noChartData">No Data Found</p>
                </div>
            </div>
          // </div>
        }
      </div>
      : null
        );
  }
}
