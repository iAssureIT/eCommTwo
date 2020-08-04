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

  // componentWillReceiveProps(nextProps) {
  //   this.setState({
  //       // searchText : ""
  //   })
  // }
  componentWillUnmount () {
    this.focusListener.remove()
  }
  
  componentDidMount(){
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      
    this.setState({searchText : ""}
      ,()=>{
        // console.log(" serarch==>",this.state.searchText);
          this.props.setGloblesearch(this.state.searchText);
        })
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
                  <Icon size={25} name='bars' type='font-awesome' color='#80c21c' />
                </TouchableOpacity>

              </View>
            </View>
          }
          centerComponent={
            <View style={styles.flxdircenter}>
              <Image
                resizeMode="contain"
                source={require("../../AppDesigns/currentApp/images/Logounimandai.jpg")}
                style={styles.whitename}
              />
            </View>
          }
          rightComponent={
            <View style={styles.flxdir}>
              <TouchableOpacity>
                <View style={styles.notificationbell}>
                  <Icon name="bell-o" type="font-awesome" size={25} color="#80c21c" style={styles.bellIcon} />
                  {/* <Text style={styles.notificationText}>{0}</Text> */}
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
    setGloblesearch   : (searchText) => dispatch({
          searchText  : searchText,
          type        : "SET_GLOBAL_Search",
    })
}
};
export default connect(mapStateToProps,mapDispatchToProps)(HeaderBars2);
