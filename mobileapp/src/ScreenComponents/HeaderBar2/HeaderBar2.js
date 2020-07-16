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
// import styles from "./styles.js";
import axios              from 'axios'; 
import styles from '../../AppDesigns/currentApp/styles/ScreenComponentStyles/HeaderBar2Styles.js';
import { colors } from '../../AppDesigns/currentApp/styles/CommonStyles.js';
import Search from 'react-native-search-box';


export default class HeaderBars2 extends ValidationComponent {
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
    this.setState({ searchText });
  };

  _goBack = () => {
    this.props.goBack();
  };

  render() {
    return (
      <View style={{
        "borderBottomWidth": 1,
        "borderBottomColor": "#80c21c",
        "backgroundColor": "#80c21c", elevation: 4,
        "boxShadow": "10px 5px 5px black"
      }}>
        <Header
          backgroundColor={'transparent'}
          placement="left"
          leftContainerStyle={{ backgroundColor: 'transparent', paddingHorizontal: 15 }}
          centerContainerStyle={{ backgroundColor: 'transparent', paddingLeft: 0, paddingRight: 0, paddingTop: 0 }}
          rightContainerStyle={{ backgroundColor: 'transparent', paddingHorizontal: 15 }}
          leftComponent={
            <View style={styles.flxdir}>
              <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10, alignSelf: 'center' }}>
                <TouchableOpacity onPress={this.props.toggle()}>
                  <Icon size={25} name='bars' type='font-awesome' color='#fff' />
                  {/* <Icon size={25} name='bars' type='font-awesome' color='#ff3e6c' /> */}
                </TouchableOpacity>

              </View>
              <Image
                resizeMode="contain"
                source={require("../../AppDesigns/currentApp/images/white_logo.png")}
                style={{ height: 45, width: 45, marginTop: 15, marginLeft: 10 }}
              />
            </View>
          }
          centerComponent={
            <View style={styles.flxdir}>
              <Image
                resizeMode="contain"
                source={require("../../AppDesigns/currentApp/images/white_name.png")}
                style={{ height: 65, width: 120, marginTop: 10, marginLeft: 40 }}
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
          containerStyle={{ paddingTop: 0, paddingLeft: 0, paddingRight: 0, backgroundColor: '#80c21c' }}
        />

        <View style={{ paddingHorizontal: 15, marginBottom: 30, }}>
          <SearchBar
            placeholder='Search for Product, Brands and More'
            containerStyle={styles.searchContainer}
            inputContainerStyle={styles.searchInputContainer}
            inputStyle={styles.searchInput}
            onChangeText={this.updateSearch}
            value={this.state.searchText}
          />
        </View>









        {
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
        }
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
