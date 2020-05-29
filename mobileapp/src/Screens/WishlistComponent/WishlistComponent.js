
import React from 'react';
import {
  ScrollView,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import Drawer from 'react-native-drawer';
import { Header, Button, Icon, SearchBar } from "react-native-elements";
import SideMenu from 'react-native-side-menu';
import Menu from '../../ScreenComponents/Menu/Menu.js';
import HeaderBar5 from '../../ScreenComponents/HeaderBar5/HeaderBar5.js';
import Footer from '../../ScreenComponents/Footer/Footer.js';
import Notification from '../../ScreenComponents/Notification/Notification.js';
// import styles from './';
import styles from '../../AppDesigns/currentApp/styles/ScreenStyles/Wishliststyles.js';
import { colors } from '../../AppDesigns/currentApp/styles/CommonStyles.js.js';
import Loading from '../../ScreenComponents/Loading/Loading.js';
export default class WishlistComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputFocusColor: colors.textLight,
      isOpen: false,
      ProductData: [
        {
          "catImage": require("../../AppDesigns/currentApp/images/15.png"),
          "productTitle": "Kuki Fashion",
          "productName": "Women Red Solid Fit & Flat",
        },
        {
          "catImage": require("../../AppDesigns/currentApp/images/16.png"),
          "productTitle": "Kuki Fashion",
          "productName": "Embroidered Daily Wear",
        },
        {
          "catImage": require("../../AppDesigns/currentApp/images/17.png"),
          "productTitle": "Kuki Fashion",
          "productName": "Women Red Solid Fit & Flat",
        },
        {
          "catImage": require("../../AppDesigns/currentApp/images/18.png"),
          "productTitle": "Kuki Fashion",
          "productName": "Embroidered Daily Wear",
        },
      ]
    };
  }

  componentWillReceiveProps(nextProps) {
  }

  updateMenuState(isOpen) {
    this.setState({ isOpen });
  }

  displayValidationError = (errorField) => {
    let error = null;
    if (this.state[errorField]) {
      error = <View style={{ width: '100%' }}>
        <Text style={{ color: '#dc3545' }}>{this.state[errorField][0]}</Text>
      </View>;
    }
    return error;
  }

  toggle() {
    let isOpen = !this.state.isOpen;
    this.setState({
      isOpen
    });
  }

  closeControlPanel = () => {
    this._drawer.close()
  }

  openControlPanel = () => {
    this._drawer.open()
  }

  handleZipChange(value) {
    let x = value.replace(/\D/g, '').match(/(\d{0,5})(\d{0,4})/);
    let y = !x[2] ? x[1] : x[1] + '-' + x[2];
    this.setState({
      zipcode: y,
    });
  }

  handleDelete = (id) => {
    Alert.alert("", "Are you sure you want to delete ?", [
      { text: "Cancel" },
      {
        text: "Delete",
        onPress: () => {
          this.deleteCompetitor(id);
        }
      },
    ]);
  };

  deleteCompetitor(id) {
    console.log("id = ", id);
    Meteor.call('deleteCompetitor', id, (err, res) => {
      if (err) {

      } else {
        Alert.alert('', 'Competitor has been deleted');
      }
    });
  }



  searchUpdated(text) {
    this.setState({ searchText: text });
  }

  render() {
    const { navigate, dispatch, goBack } = this.props.navigation;
    const menu = <Menu navigate={navigate} isOpen={this.state.isOpen} />;
    if (this.props.loading) {
      return (
        <Loading />
      );
    } else {
      return (
        <Drawer
          ref={(ref) => this._drawer = ref}
          content={
            <Notification
              navigate={this.props.navigation.navigate}
              updateCount={() => this.updateCount.bind(this)}
              closeControlPanel={() => this.closeControlPanel.bind(this)}
            />
          }
          side="right"
        >
          <SideMenu disableGestures={true} openMenuOffset={300} menu={menu} isOpen={this.state.isOpen} onChange={isOpen => this.updateMenuState(isOpen)} >
            <HeaderBar5
              goBack={goBack}
              navigate={navigate}
              headerTitle={"My Wishlist"}
              toggle={() => this.toggle.bind(this)}
              openControlPanel={() => this.openControlPanel.bind(this)}
            />
            <View style={styles.superparent}>
              <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" >
                <View style={styles.formWrapper}>
                  <View style={styles.parent}>

                    <View style={styles.vwwishlist}>
                      {this.state.ProductData.map((ProductData, i) => {
                        return (

                          <View key={i} style={styles.width160}>
                            <View style={[styles.wishlist, (i % 2 == 0 ? {} : { marginLeft: 12 })]}>

                              <Image
                                source={ProductData.catImage}
                                style={styles.catimg}
                              />
                              <Text style={styles.peroff}> 80% OFF</Text>
                              <View style={[iconvw, (i % 2 == 0 ? { right: 20, top: -5 } : { right: 20, top: -5 })]}>
                                <Icon size={18} name='close' type='fontAwesome' color='#fff' style={{}} />
                              </View>
                            </View>
                            <View style={styles.padvert}>
                              <Text numberOfLines={1} style={[styles.prodtitle, (i % 2 == 0 ? {} : { marginLeft: 12 })]}>{ProductData.productTitle}</Text>
                              <Text numberOfLines={1} style={[styles.prodname, (i % 2 == 0 ? {} : { marginLeft: 12 })]}>{ProductData.productName}</Text>

                              <View style={[styles.rs, (i % 2 == 0 ? { marginLeft: 5 } : { marginLeft: 15 })]}>
                                <View style={styles.rs}>
                                  <Icon
                                    name="rupee"
                                    type="font-awesome"
                                    size={15}
                                    color="#333"
                                    iconStyle={styles.rsicn}
                                  />
                                  <Text>999</Text>
                                </View>
                                <Text style={styles.rsprice}>3140</Text>
                              </View>
                            </View>
                            <View style={[{}, (i % 2 == 0 ? { marginTop: -15, marginBottom: 10, marginRight: 8 } : { marginTop: -15, marginLeft: 12, marginBottom: 10 })]}>
                              <TouchableOpacity onPress={() => this.props.navigation.navigate('SubCatCompView')}>
                                <Button
                                  titleStyle={styles.buttonText}
                                  title="MOVE TO CART"
                                  buttonStyle={styles.button}
                                  containerStyle={styles.buttonContainer}
                                  icon={
                                    <Icon
                                      name="shopping-cart"
                                      type="feather"
                                      size={20}
                                      color="#fff"
                                      iconStyle={styles.mg10}
                                    />
                                  }
                                />
                              </TouchableOpacity>
                            </View>
                          </View>
                        )
                      })
                    }
                    </View>
                  </View>
                </View>
              </ScrollView>
              <Footer />
            </View>
          </SideMenu>
        </Drawer>
      );
    }
  }
}



