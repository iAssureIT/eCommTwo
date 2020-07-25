import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  Image
} from "react-native";
import { Header, Icon, SearchBar } from 'react-native-elements';
import ValidationComponent from "react-native-form-validator";
import axios              from 'axios'; 
import styles from '../../AppDesigns/currentApp/styles/ScreenComponentStyles/HeaderBar2Styles.js';
import { connect }        from 'react-redux';

class HeaderBars2 extends ValidationComponent {
  constructor(props) {
    super(props);
    this.state = {
      searchText: ''
    }
  }

  _goBack = () => {
    this.props.goBack();
  }

  handleNavigation = (screen) => {
    this.props.navigate(screen);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      this.setState({
        count: parseInt(nextProps.count)
      })
    }
  }
  componentDidMount(){
    axios.get("/api/sections/get/get_megamenu_list")
    .then((response)=>{
     if(response.data){
      // console.log("section data===",response.data.categoryData); 
      this.setState({ 
          categoryData : response.data
      })
      // console.log("megamenu section Data: ",this.state.categoryData);
    }
    })
    .catch((error)=>{
        console.log('error', error);
    })
  }
  updateSearch = searchText => {
  // updateSearch =(searchText)=> {
    // this.setState({ searchText });
   
    this.setState({searchText : searchText}
      ,()=>{
        console.log(" serarch==>",this.state.searchText);
        this.props.setGloblesearch(this.state.searchText);
        // this.props.navigate("Dashboard",{searchText : this.state.searchText});
      })
      // var searchstr = searchText.trim();
      // if(searchText){
      //   var formValues = {
      //     "searchstr": searchstr,
      //     "loading": true
      //   }
        // console.log("formValues of serarch==>",formValues);
        // this.props.searchProductFun(formValues, this.state.searchResult);
        // var searchResult = [];
        // axios.get("/api/products/get/search/" + searchText)
        //   .then((response) => {
        //     console.log("searchResult of serarch==>",response.data);
        //     // this.setState({ searchResult: response.data},()=>{
              
        //     // });
        //     // searchResult = response.data
        //     // this.props.setGloblesearch(response.data);
        //     // formValues.loading = false;
        //     // this.setState({ searchResult: response.data }, () => {
        //       // this.props.searchProductFun(formValues, this.state.searchResult);

        //     // });
            
        //   })
        //   .catch((error) => {})
          // console.log("before of serarch page==>",searchResult);
         
      // }else{
      //   // this.props.navigate("Dashboard");
      // }
      
    
  };
  searchedText = (text)=>{
    this.setState({
      searchText      : text,
      loading         : true,
      page            : 0,
      farmerList      : [],
    });
}

  render() {
    var { navigation } = this.props;
    return (
      <View style={styles.header2main}>
        <Header
          backgroundColor={'transparent'}
          placement="left"
          leftContainerStyle={styles.leftside}
          centerContainerStyle={styles.center}
          rightContainerStyle={styles.rightside}
          leftComponent={
            <View style={styles.flxdir}>
              <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10, alignSelf: 'center' }}>
                <TouchableOpacity onPress={this.props.toggle()}>
                  <Icon size={25} name='bars' type='font-awesome' color='#fff' />
                  {/* <Icon size={25} name='bars' type='font-awesome' color='#ff3e6c' /> */}
                </TouchableOpacity>

              </View>
              {/* <Image
                resizeMode="contain"
                source={require("../../AppDesigns/currentApp/images/white_logo.png")}
                style={styles.whitelogo}
              /> */}
            </View>
          }
          centerComponent={
            <View style={styles.flxdircenter}>
              <Image
                resizeMode="contain"
                // source={require("../../AppDesigns/currentApp/images/white_name.png")}
                source={require("../../AppDesigns/currentApp/images/Logounimandai.jpg")}
                style={styles.whitename}
              />
            </View>
          }
          rightComponent={
            <View style={styles.flxdir}>
              <TouchableOpacity>
                <View style={styles.notificationbell}>
                  <Icon name="bell-o" type="font-awesome" size={25} color="#fff" style={styles.bellIcon} />
                  <Text style={styles.notificationText}>{0}</Text>
                </View>
              </TouchableOpacity>
            </View>
          }
          containerStyle={styles.rightcnt}
        />
        <View style={styles.searchvw}>
           <SearchBar
            placeholder='Search for Product, Brands and More'
            containerStyle={styles.searchContainer}
            inputContainerStyle={styles.searchInputContainer}
            inputStyle={styles.searchInput}
            onChangeText={this.updateSearch.bind(this)}
            value={this.state.searchText}
          /> 
        </View>








        {/* {
            this.state.categoryData && this.state.categoryData.map((data,index)=>{
              console.log("categoryData data===>",data.section);
                return(
                  // <View style={{ paddingHorizontal: 5, marginBottom: 30, }}>
                      <View style={{ flexDirection: 'row', flex: 1 }}>
                        <View style={styles.iconOuterWrapper}>
                          <TouchableOpacity onPress={() => this.HomeNavigate()} >
                            <Text style={styles.footerTitle}>{data.section}</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                  // </View>
                );
            })
        } */}
        {/* <View style={{ paddingHorizontal: 15, marginBottom: 30, }}>
          <View style={{ flexDirection: 'row', flex: 1 }}>
            <View style={styles.iconOut erWrapper}>
              <TouchableOpacity onPress={() => this.HomeNavigate()} >
                <Text style={styles.footerTitle}>Fruits</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.iconOuterWrapper}>
              <TouchableOpacity onPress={() => this.cart()} >
                <Text style={styles.footerTitle}>Vegetables</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.iconOuterWrapper}>
              <TouchableOpacity onPress={() => this.wishlist()}>
                <Text style={styles.footerTitle}>Frozen Items</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.iconOuterWrapper}>
              <TouchableOpacity onPress={() => this.order()} >
                <Text style={styles.footerTitle}>Other</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View> */}

      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // selectedVehicle: state.selectedVehicle,
    // purposeofcar: state.purposeofcar,

  }
};

const mapDispatchToProps = (dispatch)=>{
return {
    setGloblesearch : (searchText) => dispatch({
          searchText   : searchText,
          type        : "SET_GLOBAL_Search",
      
    })
}
};
export default connect(mapStateToProps,mapDispatchToProps)(HeaderBars2);
