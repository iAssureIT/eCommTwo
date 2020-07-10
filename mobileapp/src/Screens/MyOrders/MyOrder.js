
import React from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  AsyncStorage

} from 'react-native';
import BouncingPreloader from 'react-native-bouncing-preloader';
import Modal from "react-native-modal";
import { Header, Button, Icon, SearchBar } from "react-native-elements";
import StepIndicator from 'react-native-step-indicator';
import Menu from '../../ScreenComponents/Menu/Menu.js';
import HeaderBar5 from '../../ScreenComponents/HeaderBar5/HeaderBar5.js';
// import Footer from '../../ScreenComponents/Footer/Footer.js';
import Footer from '../../ScreenComponents/Footer/Footer1.js';
import Notification from '../../ScreenComponents/Notification/Notification.js';
import styles from '../../AppDesigns/currentApp/styles/ScreenStyles/MyOrdersstyles.js';
import { colors } from '../../AppDesigns/currentApp/styles/CommonStyles.js';
import Loading from '../../ScreenComponents/Loading/Loading.js';
import axios from 'axios';

const labels = ["Order Placed", "Out for delivery", "In transition", "Delivered"];
const dateTime = ['13/12/2019 12:48 pm'];
const thirdIndicatorStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#80c21c',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#80c21c',
  stepStrokeUnFinishedColor: '#dedede',
  separatorFinishedColor: '#80c21c',
  separatorUnFinishedColor: '#dedede',
  stepIndicatorFinishedColor: '#80c21c',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 0,
  currentStepIndicatorLabelFontSize: 0,
  stepIndicatorLabelCurrentColor: 'transparent',
  stepIndicatorLabelFinishedColor: 'transparent',
  stepIndicatorLabelUnFinishedColor: 'transparent',
  labelColor: '#999999',
  labelSize: 13,
  labelFontFamily: 'OpenSans-Italic',
  currentStepLabelColor: '#80c21c'
}
export default class MyOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputFocusColor: colors.textLight,
      isOpen: false,
      cancelordermodal: false,
      currentPosition: 0,
    };
  }
  componentDidMount() {
    this.getorderlist();
  }
  getorderlist() {
    AsyncStorage.multiGet(['token', 'user_id'])
      .then((data) => {
        // console.log("user_id ===>>", data[1][1]);
        this.setState({ user_id: data[1][1] })
        axios.get('/api/orders/get/list/' + data[1][1])
          .then((response) => {
            console.log("response LIst:==>>>", response.data);
            var myorders = response.data
            this.setState({ myorders: myorders })
          })
          .catch((error) => {
            console.log('error', error)
          });
      });
  }
  componentWillReceiveProps(nextProps) {
    this.getorderlist();
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
  confirmcancelorderbtn = () => {
    var formValues = {
      "orderID": this.state.cancelorderid,
      "userid": this.state.user_id,
    }
    console.log("formValues==>", formValues);
    axios.patch('/api/orders/get/cancelOrder', formValues)
      .then((response) => {
        console.log("response cancel order==>", response.data);
        this.setState({
          cancelordermodal: false,
        });
        Alert.alert(
          "Your order has been cancelled."
        );
        this.getorderlist();
      })
      .catch((error) => {
      })
  }
  cancelorderbtn = (id) => {
    this.setState({
      cancelordermodal: true,
      cancelorderid: id,
    });
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

  onPageChange(position) {
    this.setState({ currentPosition: position });
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
        <React.Fragment>
          <HeaderBar5
            goBack={goBack}
            navigate={navigate}
            headerTitle={"My Orders"}
            toggle={() => this.toggle.bind(this)}
            openControlPanel={() => this.openControlPanel.bind(this)}
          />
          <View style={styles.superparent}>
            <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" >
              <View style={styles.formWrapper}>
                <View style={styles.parent}>
                  {
                    this.state.myorders ?
                      this.state.myorders && this.state.myorders.length > 0 ?
                        this.state.myorders.map((item, i) => {
                          // console.log("item===>", item.deliveryStatus[1].status);
                          return (
                            <View style={styles.prodinfoparent}>
                              <View style={styles.orderid}><Text style={styles.orderidinfo}>Order ID : {item.orderID}</Text></View>
                              {
                                item.products && item.products.length > 0 ?
                                  item.products.map((pitem, index) => {
                                    console.log("pitem===>", pitem);
                                    return (
                                      <View >
                                        <View style={styles.prodorderdets}>
                                          <View style={styles.flx3}>
                                            <Text style={styles.proddets}>Product :</Text>
                                            <Text style={styles.proddets}>Quantity :</Text>
                                            <Text style={styles.proddets}>Price :</Text>

                                          </View>
                                          <View style={styles.flx3}>
                                            <Text style={styles.prodinfo}>{pitem.productName}</Text>
                                            <Text style={styles.prodinfo}> {pitem.quantity} kg </Text>

                                            <View style={{ flexDirection: 'row', marginRight: 10, marginTop: 3 }}>
                                              <Icon
                                                name="rupee"
                                                type="font-awesome"
                                                size={15}
                                                color="#388e3c"
                                                iconStyle={styles.iconrps}
                                              />
                                              <Text style={styles.pricenum}>{pitem.originalPrice}</Text>

                                            </View>
                                          </View>
                                          <View style={styles.imgvw}>
                                            <Image
                                              style={styles.img15}
                                              source={{ uri: pitem.productImage[0] }}
                                            // source= {require("../../AppDesigns/currentApp/images/15.png")}
                                            />
                                          </View>
                                        </View>
                                        {item && item.deliveryStatus && 
                                          item.deliveryStatus[item.deliveryStatus.length - 1].status !== 'Cancelled' ?
                                            <View style={styles.orderstatus}>
                                              <Text style={styles.orderstatustxt}>Order Status</Text>
                                              <StepIndicator
                                                customStyles={thirdIndicatorStyles}
                                                currentPosition={this.state.currentPosition}
                                                labels={labels}
                                                dateTime={dateTime}
                                                stepCount={4}
                                              />
                                            </View>
                                            :
                                            <View style={styles.orderstatus}>
                                              <Text style={styles.ordercancelled}>Order Cancelled</Text>
                                            </View>

                                        }
                                        {item && item.deliveryStatus && 
                                          item.deliveryStatus[item.deliveryStatus.length - 1].status !== 'Cancelled' ?
                                            <View style={styles.cancelbtn}>
                                              <View style={styles.cancelvwbtn}>
                                                <TouchableOpacity>
                                                  <Button
                                                    onPress={() => this.cancelorderbtn(item._id)}
                                                    titleStyle={styles.buttonText}
                                                    title="CANCEL"
                                                    buttonStyle={styles.buttonRED}
                                                    containerStyle={styles.buttonContainer2}
                                                  />
                                                </TouchableOpacity>
                                              </View>
                                              <View style={styles.ordervwbtn}>
                                                <TouchableOpacity>
                                                  <Button
                                                    // onPress={()=>this.props.navigation.navigate('OrderDetails')}
                                                    titleStyle={styles.buttonText1}
                                                    title="ORDER DETAILS"
                                                    buttonStyle={styles.buttonGreen}
                                                    containerStyle={styles.buttonContainer2}
                                                  />
                                                </TouchableOpacity>
                                              </View>
                                            </View>
                                            :
                                            null
                                        }
                                      </View>

                                    );
                                  })
                                  : null
                              }

                            </View>

                          )
                        })
                        
                      :
                      <View style={{ flex: 1, alignItems: 'center', marginTop: '90%' }}>
                        <BouncingPreloader
                            icons={[
                              require("../../AppDesigns/currentApp/images/bellpaper.png"),
                              require("../../AppDesigns/currentApp/images/carrot.png"),
                              require("../../AppDesigns/currentApp/images/mangooo.png"),
                              require("../../AppDesigns/currentApp/images/tomato.png"),
                            ]}
                            leftRotation="-680deg"
                            rightRotation="360deg"
                            speed={2000} />
                      </View>
                      :
                      <View style={{ flex: 1, alignItems: 'center', marginTop: '10%' }}>
                        <Image
                          source={require("../../AppDesigns/currentApp/images/noproduct.jpeg")}
                        />
                      </View>
                  }


                </View>
              </View>
            </ScrollView>

          </View>
          <Footer />
          <Modal isVisible={this.state.cancelordermodal}
            onBackdropPress={() => this.setState({ cancelordermodal: false })}
            coverScreen={true}
            hideModalContentWhileAnimating={true}
            style={{ paddingHorizontal: '5%', zIndex: 999 }}
            animationOutTiming={500}>
            <View style={{ backgroundColor: "#fff", alignItems: 'center', borderRadius: 20, paddingVertical: 30, paddingHorizontal: 10 }}>
              <View style={{ justifyContent: 'center', backgroundColor: "transparent", width: 60, height: 60, borderRadius: 30, overflow: 'hidden' }}>
                <Icon size={50} name='shopping-cart' type='feather' color='#666' style={{}} />
              </View>
              <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 15, textAlign: 'center', marginTop: 20 }}>
                Are you sure you want to Cancel this order?
              </Text>
              <View style={styles.cancelbtn}>
                <View style={styles.cancelvwbtn}>
                  <TouchableOpacity>
                    <Button
                      onPress={() => this.setState({ cancelordermodal: false })}
                      titleStyle={styles.buttonText}
                      title="NO"
                      buttonStyle={styles.buttonRED}
                      containerStyle={styles.buttonContainer2}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.ordervwbtn}>
                  <TouchableOpacity>
                    <Button
                      onPress={() => this.confirmcancelorderbtn()}
                      titleStyle={styles.buttonText1}
                      title="Yes"
                      buttonStyle={styles.buttonGreen}
                      containerStyle={styles.buttonContainer2}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </React.Fragment>
      );
    }
  }
}



