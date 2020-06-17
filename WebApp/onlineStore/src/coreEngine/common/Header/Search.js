import React, { Component }       from 'react';
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import Megamenu                   from '../Megamenu/Megamenu.js';
import axios                      from 'axios';
import { withRouter }             from 'react-router-dom';
import Message                    from '../../blocks/Message/Message.js'; 
import { connect }                from 'react-redux';
import { bindActionCreators }     from 'redux';
import {getCartData, searchProductAction} from '../../actions/index';
import $                          from "jquery";
import '../../../sites/currentSite/common/UnimandaiHeader.css';

// import './Header.css';
// import jQuery from "jquery";



class Search extends Component {
  constructor(props){
    super(props);
    this.state = {
      options       :[], 
      catArray      :[],
      searchstr     :'',
      searchCriteria:[],
      searchResult  :[],
      hotProducts   :[],
      categoryDetails: [],
      productCartData:[],
      cartProduct    :[],
      localCategories: [],
      userData       : {},
      firstname      : '',
      lastname       : ''
    }  
    
    if (window.location.pathname !== "/searchProducts") {
      localStorage.removeItem("catArray");
      localStorage.removeItem("searchstr");
    }
}
componentWillMount() {
      $(document).ready(function(e){
      
      $('.search-panel li a').on('click', function(e){
        var sp = $(this).closest('.search-panel');
        var to = $(this).html();
        var text = $(this).html();
        sp.data('search', to);
        sp.find('button span.search_by').html(text);
      });
    });

}

   async componentDidMount(){
    // await this.props.    
    if (searchstr) {
      $('.headersearch').val(searchstr);
      this.searchProducts();
    }

  }


  componentWillReceiveProps(nextProps) {
 
  }

  unique(arr, prop) {
    return arr.map(function (e) { return e[prop]; }).filter(function (e, i, a) {
      return i === a.indexOf(e);
    });
  }

  handleChange(selectedOption) {
    var catArray = [];

    selectedOption.map((data, index) => {
      catArray.push({ id: data.value, category: data.label, section_ID: data.section_ID });
    })

    localStorage.setItem("catArray", JSON.stringify(selectedOption));

    this.setState({ localCategories: selectedOption },
      () => {
      });
    this.setState({ catArray: catArray });
  }

  searchProducts() {
    if (this.state.catArray.length > 0) {

      var searchstr = $('.headersearch').val()
      var formValues = {
        "searchstr": searchstr,
        "catArray": this.state.catArray,
        "loading": true,
      }

      if (searchstr !== '') {
        localStorage.setItem("searchstr", searchstr);
      }
      this.props.searchProductFun(formValues, this.state.searchResult)

      //this.props.searchProduct();

      axios.post("/api/products/post/searchINCategory", formValues)
        .then((response) => {
          this.setState({ searchResult: response.data }, () => {
            formValues.loading = false;
            this.props.searchProductFun(formValues, this.state.searchResult);
          });
        })
        .catch((error) => {
          // console.log('error', error);
        })

      this.props.history.push("/searchProducts");
    }
    if (this.state.catArray.length === 0 && $('.headersearch').val() !== '') {
      // var searchstr = $('.headersearch').val();
      var formValues = {
        "searchstr": searchstr,
        "loading": true
      }
      this.props.searchProductFun(formValues, this.state.searchResult);
      axios.get("/api/products/get/search/" + searchstr)
        .then((response) => {
          formValues.loading = false;
          this.setState({ searchResult: response.data }, () => {
            this.props.searchProductFun(formValues, this.state.searchResult);
          });
        })
        .catch((error) => {
          // console.log('error', error);
        })

    //   this.props.history.push("/searchProducts");
    }

  }


 



  render() {
    return (
      <div className="homecontentwrapper">
        <header className="col-lg-12 headerflow">            
            <div className="col-lg-12 col-md-12">
                <div className="col-lg-12 col-md-12">
                    <input type="text" className="form-control control-search" placeholder="Search and hit enter..."/>
                    <button className="button_search" type="button">Search</button>
                </div>
            </div>
        </header>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    searchResult: state.searchResult,
    searchCriteria: state.searchCriteria,
    recentCartData :  state.recentCartData

  }
}
const mapDispachToProps = (dispatch) => {
  return  bindActionCreators({  searchProductFun: searchProductAction }, dispatch)
}
export default connect(mapStateToProps, mapDispachToProps)(withRouter(Search));
