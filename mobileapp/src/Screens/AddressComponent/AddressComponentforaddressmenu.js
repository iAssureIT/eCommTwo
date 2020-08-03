import React from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Alert,
  AsyncStorage
} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { TextField } from 'react-native-material-textfield';
import { Button, Icon, } from "react-native-elements";
import HeaderBar5 from '../../ScreenComponents/HeaderBar5/HeaderBar5.js';
import Footer from '../../ScreenComponents/Footer/Footer1.js';
import styles from '../../AppDesigns/currentApp/styles/ScreenStyles/Addressstyles.js';
import { colors, sizes } from '../../AppDesigns/currentApp/styles/CommonStyles.js';
import Loading from '../../ScreenComponents/Loading/Loading.js';
import axios from "axios";
import Modal from "react-native-modal";

export default class AddressComponentforaddressmenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputFocusColor: colors.textLight,
      isOpen: false,
      starCount: 2.5,
      fromPincode: '',
      mobileNumber: '',
      fromarea: '',
      pincodenotexist: '',
      contactperson: '',
      fromaddress: '',
      fromPincode: '',
      addresstype: 'Home',
      addsaved: false,
      validpincodeaddress: false,
      pincodeExists: false,
    };
  }
  componentWillReceiveProps(nextProps) {
    this.allowpincodes();
  }
  updateMenuState(isOpen) {
    this.setState({ isOpen });
  }

  componentDidMount() {
    AsyncStorage.multiGet(['token', 'user_id'])
      .then((data) => {
        // user_id = data[1][1]
        // console.log("user_id ===>>", data[1][1]);
        this.setState({ user_id: data[1][1] })
        const addressId = this.props.navigation.getParam('addressId', 'No addressId');
        // console.log("addressId ===>>", addressId);
        axios.get('/api/ecommusers/' + data[1][1])
          .then((response) => {
            this.setState({
              mobileNumber: response.data.profile.mobile,
              contactperson: response.data.profile.fullName
            })
          })
      });
    this.getgooglekeyData();
  }
  getgooglekeyData() {
    var type = 'GOOGLE';
    axios.get('/api/projectsettings/get/' + type)
      .then((response) => {

        this.setState({ googleapikeyInfo: response.data.googleapikey }, () => {
          // console.log(" response.data Post google==>", this.state.googleapikeyInfo);
        });
      })
      .catch((error) => { });
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
  allowpincodes() {
    console.log("response.data.fromPincode==>", this.state.fromPincode);
    axios.get("/api/allowablepincode/checkpincode/" + this.state.fromPincode)
      .then((response) => {
        if (response) {
          // console.log("response.data.message==>", response.data);
          if (response.data.message !== "Delivery Available") {
            this.setState({ fromPincode: '', pincodeExists: true, pincodenotallowed: response.data.message, pincodenotexist: "Delevery not possible on this address" });
          } else {
            this.setState({
              pincodenotexist: "Delevery possible on this address"
            })
          }
        }
      });
  }
  // pincodeexistsornot(pincode) {
  pincodeexistsornot(pincode, formatted_address, area, city, state, country, latlong) {
    // console.log("pincodeexistsornot.fromPincode==>", pincode);
    axios.get("/api/allowablepincode/checkpincode/" + pincode)
      .then((response) => {
        if (response) {

          if (response.data.message === "Delivery Not Available") {
            console.log("Delevery not possible on this address");
            this.setState({
              fromPincode: '',
              fromarea: '', fromcity: '', fromcountry: '',
              pincodeExists: true, pincodenotexist: "Delevery not possible on this address", pincodenotallowedyes: response.data.message
            });
          } else {
            // console.log("pincodeexistsornot.fromPincode==>", pincode);
            this.setState({
              fromaddress: formatted_address,
              fromarea: area, fromcity: city,
              fromstate: state, fromcountry: country, fromPincode: pincode, fromlatlong: latlong,
              formatted_address: formatted_address,
              pincodenotexist: "Delevery possible on this address"
            })
          }
        }
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

  handleMobileChange(value) {
    if (value.startsWith && value.startsWith('+')) {
      value = value.substr(3);
    }
    let x = value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    let y = x.input ? (!x[2] && !x[3]) ? '+91 ' + x[1] : (!x[3] ? '+91 ' + x[1] + '-' + x[2] : '+91 ' + x[1] + '-' + x[2] + '-' + x[3]) : '';
    this.setState({
      mobileNumber: y,
    });
  }

  saveAddress = () => {
    axios.get("/api/allowablepincode/checkpincode/" + this.state.fromPincode)
      .then((response) => {
        console.log("response.data.message==>", response.data);
        if (response.data.message === "Delivery Available") {
          var id = this.state.user_id;
          var formValues = {
            "user_ID": id,
            "name": this.state.contactperson,
            "addressLine1": this.state.fromaddress,
            "addressLine2": this.state.fromarea,
            "pincode": this.state.fromPincode,
            "district": this.state.modaldistrict,
            "city": this.state.fromcity,
            "state": this.state.fromstate,
            "country": this.state.fromcountry,
            "mobileNumber": this.state.mobileNumber,
            "addType": this.state.addresstype,
          }
          console.log('if form deliveryAddressID', formValues);
          // if(this.state.fromaddress || this.state.fromPincode === '' || undefined){
          //  this.setState({ validpincodeaddress : true})
          // }else{
          axios.patch('/api/ecommusers/updateuseraddress', formValues)
            .then((response) => {
              console.log("response after update:==>>>", response.data);
              this.setState({ addsaved: true, });

            })
            .catch((error) => {
              console.log('error', error)
            });
          // }
        } else {
          this.setState({ pincodeExists: true, });
        }
      })

      .catch((error) => {
        this.setState({ validpincodeaddress : true})
        console.log('error', error)
      });
    // }
  }

  render() {
    const { navigate, goBack } = this.props.navigation;
    let ShippingType = [{ value: 'Home', }, { value: 'Office', }, { value: 'Relative', }, { value: 'Friend', }];
    if (this.props.loading) {
      return (
        <Loading />
      );
    } else {
      return (
        <React.Fragment>
          <HeaderBar5
            goBack={goBack}
            headerTitle={'ADD NEW ADDRESS'}
            navigate={navigate}
            toggle={() => this.toggle.bind(this)}
            openControlPanel={() => this.openControlPanel.bind(this)}
          />
          <View style={styles.addsuperparent}>
            <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" >
              <View style={styles.formWrapper}>
                <View style={{ backgroundColor: '#fff', paddingVertical: 20, paddingHorizontal: 15, marginTop: 15, marginBottom: "5%" }}>

                  <View style={[styles.formInputView, styles.marginBottom20]}>
                    <View style={[styles.inputWrapper]}>
                      <GooglePlacesAutocomplete
                        placeholder='Address'
                        minLength={2} // minimum length of text to search
                        autoFocus={true}
                        returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                        keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
                        listViewDisplayed={false}    // true/false/undefined
                        fetchDetails={true}
                        onChangeText={(this.state.from)}
                        value={this.state.from}
                        enablePoweredByContainer={false}
                        currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
                        currentLocationLabel="Current location"
                        nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                        renderDescription={row => row.description} // custom description render
                        onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                          for (var i = 0; i < details.address_components.length; i++) {
                            for (var b = 0; b < details.address_components[i].types.length; b++) {
                              switch (details.address_components[i].types[b]) {
                                case 'sublocality_level_2':
                                  var address = details.address_components[i].long_name;
                                  break;
                                case 'sublocality_level_1':
                                  var area = details.address_components[i].long_name;
                                  break;
                                case 'locality':
                                  var city = details.address_components[i].long_name;
                                  break;
                                case 'administrative_area_level_1':
                                  var state = details.address_components[i].long_name;
                                  break;
                                case 'country':
                                  var country = details.address_components[i].long_name;
                                  break;
                                case 'postal_code':
                                  var pincode = details.address_components[i].long_name;
                                  break;
                              }
                            }
                          }
                          const latlong = details.geometry.location
                          this.pincodeexistsornot(pincode, details.formatted_address, area, city, state, country, latlong);
                          if (this.state.pincodenotallowedyes) {
                            const latlong = details.geometry.location
                            this.setState({
                              fromaddress: details.formatted_address,
                              fromarea: area, fromcity: city,
                              fromstate: state, fromcountry: country, fromPincode: pincode, fromlatlong: latlong,
                              formatted_address: details.formatted_address,
                            })
                          }

                        }}
                        getDefaultValue={() => ''}
                        query={{
                          key: 'AIzaSyCrzFPcpBm_YD5DfBl9zJ2KwOjiRpOQ1lE',
                        }}
                        styles={{
                          textInputContainer: {
                            backgroundColor: 'rgba(0,0,0,0)',
                            borderTopWidth: 0,
                            borderBottomWidth: 0,

                          },
                          textInput: {
                            marginTop: 10,
                          },

                        }}
                      />
                    </View>
                  </View>
                  <View style={[styles.formInputView, styles.marginBottom20]}>
                    <View style={[styles.inputWrapper]}>
                      <View style={styles.inputText2Wrapper}>
                        <TextField
                          label="Home,Building"
                          onChangeText={(fromaddress) => { this.setState({ fromaddress }) }}
                          lineWidth={1}
                          tintColor={colors.tintColor}
                          inputContainerPadding={0}
                          labelHeight={13}
                          labelFontSize={sizes.label}
                          titleFontSize={13}
                          baseColor={'#666'}
                          textColor={'#333'}
                          value={this.state.fromaddress}
                          containerStyle={styles.textContainer}
                          inputContainerStyle={styles.textInputContainer}
                          titleTextStyle={styles.textTitle}
                          style={styles.textStyle}
                          labelTextStyle={styles.textLabel}
                          autoCapitalize='none'
                        />
                      </View>
                    </View>
                  </View>
                  <View style={[styles.formInputView, styles.marginBottom20]}>
                    <View style={[styles.inputWrapper]}>
                      <View style={styles.inputText2Wrapper}>
                        <TextField
                          label="Road Area Name"
                          onChangeText={(fromarea) => { this.setState({ fromarea }) }}
                          lineWidth={1}
                          tintColor={colors.tintColor}
                          inputContainerPadding={0}
                          labelHeight={13}
                          labelFontSize={sizes.label}
                          titleFontSize={13}
                          baseColor={'#666'}
                          textColor={'#333'}
                          value={this.state.fromarea}
                          containerStyle={styles.textContainer}
                          inputContainerStyle={styles.textInputContainer}
                          titleTextStyle={styles.textTitle}
                          style={styles.textStyle}
                          labelTextStyle={styles.textLabel}
                          autoCapitalize='none'
                        />
                      </View>
                    </View>
                  </View>
                  <View style={[styles.formInputView, styles.marginBottom20]}>
                    <View style={[styles.inputWrapper]}>
                      <View style={styles.inputText2Wrapper}>
                        <TextField
                          label="Pincode"
                          onChangeText={(fromPincode) => { this.setState({ fromPincode }) }}
                          // onChangeText={(fromPincode) => { this.setState({ fromPincode }) }}
                          // onChangeText ={() => { this.allowpincodes() }}
                          lineWidth={1}
                          onBlur={() => { this.allowpincodes() }}
                          tintColor={colors.tintColor}
                          inputContainerPadding={0}
                          labelHeight={13}
                          labelFontSize={sizes.label}
                          titleFontSize={13}
                          baseColor={'#666'}
                          textColor={'#333'}
                          value={this.state.fromPincode}
                          containerStyle={styles.textContainer}
                          inputContainerStyle={styles.textInputContainer}
                          titleTextStyle={styles.textTitle}
                          style={styles.textStyle}
                          labelTextStyle={styles.textLabel}
                          autoCapitalize='none'
                        />
                      </View>
                    </View>
                    {/* {this.displayValidationError('fromPincodeError')} */}
                  </View>
                  <View style={[styles.formInputView, styles.marginBottom20]}>
                    <View style={[styles.inputWrapper]}>
                      <View style={styles.inputTextWrapper}>
                        <TextField
                          label="State"
                          onChangeText={(fromstate) => { this.setState({ fromstate }) }}
                          lineWidth={1}
                          tintColor={colors.tintColor}
                          inputContainerPadding={0}
                          labelHeight={13}
                          labelFontSize={sizes.label}
                          titleFontSize={13}
                          baseColor={'#666'}
                          textColor={'#333'}
                          value={this.state.fromstate}
                          containerStyle={styles.textContainer}
                          inputContainerStyle={styles.textInputContainer}
                          titleTextStyle={styles.textTitle}
                          style={styles.textStyle}
                          labelTextStyle={styles.textLabel}
                          autoCapitalize='none'
                        />
                      </View>
                    </View>
                  </View>
                  <View style={[styles.formInputView, styles.marginBottom20]}>
                    <View style={[styles.inputWrapper]}>
                      <View style={styles.inputTextWrapper}>
                        <TextField
                          label="Country"
                          onChangeText={(fromcountry) => { this.setState({ fromcountry }) }}
                          lineWidth={1}
                          tintColor={colors.tintColor}
                          inputContainerPadding={0}
                          labelHeight={13}
                          labelFontSize={sizes.label}
                          titleFontSize={13}
                          baseColor={'#666'}
                          textColor={'#333'}
                          value={this.state.fromcountry}
                          containerStyle={styles.textContainer}
                          inputContainerStyle={styles.textInputContainer}
                          titleTextStyle={styles.textTitle}
                          style={styles.textStyle}
                          labelTextStyle={styles.textLabel}
                          autoCapitalize='none'
                        />
                      </View>
                    </View>
                  </View>
                  <View style={[styles.formInputView, styles.marginBottom20]}>
                    <View style={[styles.inputWrapper]}>
                      <View style={styles.inputTextWrapper}>
                        <TextField
                          label="Contact Person Name"
                          onChangeText={(contactperson) => { this.setState({ contactperson }) }}
                          lineWidth={1}
                          tintColor={colors.tintColor}
                          inputContainerPadding={0}
                          labelHeight={13}
                          labelFontSize={sizes.label}
                          titleFontSize={13}
                          baseColor={'#666'}
                          textColor={'#333'}
                          value={this.state.contactperson}
                          containerStyle={styles.textContainer}
                          inputContainerStyle={styles.textInputContainer}
                          titleTextStyle={styles.textTitle}
                          style={styles.textStyle}
                          labelTextStyle={styles.textLabel}
                          autoCapitalize='none'
                        />
                      </View>
                    </View>
                  </View>
                  <View style={[styles.formInputView, styles.marginBottom20]}>
                    <View style={[styles.inputWrapper]}>
                      <View style={styles.inputTextWrapper}>
                        <TextField
                          label="Mobile Number"
                          // onChangeText={(mobileNumber) => { this.setState({ mobileNumber }) }}
                          // onChangeText={(mobileNumber) => { this.setState({ mobileNumber })}}
                          onChangeText={(mobileNumber) => { this.setState({ mobileNumber }), this.handleMobileChange(mobileNumber) }}
                          lineWidth={1}
                          tintColor={colors.tintColor}
                          inputContainerPadding={0}
                          labelHeight={13}
                          labelFontSize={sizes.label}
                          titleFontSize={13}
                          baseColor={'#666'}
                          textColor={'#333'}
                          value={this.state.mobileNumber}
                          containerStyle={styles.textContainer}
                          inputContainerStyle={styles.textInputContainer}
                          titleTextStyle={styles.textTitle}
                          style={styles.textStyle}
                          labelTextStyle={styles.textLabel}
                          autoCapitalize='none'
                        />
                        {/* {this.displayValidationError('mobileNumberError')} */}
                      </View>
                    </View>
                  </View>
                  <View style={[styles.formInputView, styles.marginBottom20]}>
                    <View style={[styles.inputWrapper]}>
                      <View style={styles.inputImgWrapper}></View>
                      <View style={styles.inputTextWrapper}>
                        <Dropdown
                          label='Type of Address'
                          containerStyle={styles.ddContainer}
                          dropdownOffset={{ top: 0, left: 0 }}
                          itemTextStyle={styles.ddItemText}
                          inputContainerStyle={styles.ddInputContainer}
                          labelHeight={10}
                          tintColor={colors.button}
                          labelFontSize={sizes.label}
                          fontSize={15}
                          baseColor={'#666'}
                          textColor={'#333'}
                          labelTextStyle={styles.ddLabelText}
                          style={styles.ddStyle}
                          data={ShippingType}
                          value={this.state.addresstype}
                          onChangeText={(addresstype) => { this.setState({ addresstype }) }}

                        />
                      </View>
                    </View>

                  </View>
                </View>
                <View style={styles.canclebtn}>
                  <Button
                    onPress={() => this.saveAddress()}
                    title={"SAVE"}
                    buttonStyle={styles.button1}
                    containerStyle={styles.buttonContainerS}
                    titleStyle={styles.buttonTextEDIT}
                  />
                </View>

              </View>
            </ScrollView>
            {/* <Footer /> */}
          </View>
          <Modal isVisible={this.state.addsaved}
            onBackdropPress={() => this.setState({ addsaved: false })}
            coverScreen={true}
            hideModalContentWhileAnimating={true}
            style={{ paddingHorizontal: '5%', zIndex: 999 }}
            animationOutTiming={500}>
            <View style={{ backgroundColor: "#fff", alignItems: 'center', borderRadius: 20, paddingVertical: 30, paddingHorizontal: 10 ,borderWidth:2,borderColor:"#80c21c"}}>
              <View style={{ justifyContent: 'center', }}>
                <Icon size={50} name='shopping-cart' type='feather' color='#666' style={{}} />
              </View>
              <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 16, textAlign: 'center', justifyContent: 'center', marginTop: 20 }}>
                Address Added Successfully.
              </Text>
              <View style={styles.yesmodalbtn}>
                <View style={styles.ordervwbtn}>
                  <TouchableOpacity>
                    <Button
                      onPress={() => this.props.navigation.navigate('AddressMenu', this.state.user_id)}
                      // onPress={() => this.setState({ addsaved: false })}
                      titleStyle={styles.buttonText1}
                      title="OK"
                      buttonStyle={styles.buttonGreen}
                      containerStyle={styles.buttonContainer2}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

          <Modal isVisible={this.state.pincodeExists}
            onBackdropPress={() => this.setState({ pincodeExists: false })}
            coverScreen={true}
            hideModalContentWhileAnimating={true}
            style={{ paddingHorizontal: '5%', zIndex: 999 }}
            animationOutTiming={500}>
            <View style={{ backgroundColor: "#fff", alignItems: 'center', borderRadius: 20, paddingVertical: 30, paddingHorizontal: 10,borderWidth:2,borderColor:"#c10000" }}>
              <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 16, textAlign: 'center', justifyContent: 'center', marginTop: 20 }}>
                Sorry ! Delivery is not possible on this pincode.
                </Text>
              <View style={styles.yesmodalbtn}>
                <TouchableOpacity>
                  <Button
                    onPress={() => this.setState({ pincodeExists: false })}
                    titleStyle={styles.buttonText1}
                    title="OK"
                    buttonStyle={styles.buttonGreen}
                    containerStyle={styles.buttonContainer2}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <Modal isVisible={this.state.validpincodeaddress}
            onBackdropPress={() => this.setState({ validpincodeaddress: false })}
            coverScreen={true}
            hideModalContentWhileAnimating={true}
            style={{ paddingHorizontal: '5%', zIndex: 999 }}
            animationOutTiming={500}>
            <View style={{ backgroundColor: "#fff", alignItems: 'center', borderRadius: 20, paddingVertical: 30, paddingHorizontal: 10,borderWidth:2,borderColor:"#c10000" }}>
              <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 16, textAlign: 'center', justifyContent: 'center', marginTop: 20 }}>
                Please Enter valid Address and Pincode!
              </Text>
              <View style={styles.yesmodalbtn}>
                <TouchableOpacity>
                  <Button
                    onPress={() => this.setState({ validpincodeaddress: false })}
                    titleStyle={styles.buttonText1}
                    title="OK"
                    buttonStyle={styles.buttonGreen}
                    containerStyle={styles.buttonContainer2}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </React.Fragment>
      );
    }
  }
}




// import React from 'react';
// import {
//   ScrollView,
//   Text,
//   View,
//   Dimensions,
//   TouchableOpacity,
//   Alert,
//   AsyncStorage
// } from 'react-native';
// import { Dropdown } from 'react-native-material-dropdown';
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
// import { TextField } from 'react-native-material-textfield';
// import { Header, Button, Icon, SearchBar, CheckBox } from "react-native-elements";

// import HeaderBar5 from '../../ScreenComponents/HeaderBar5/HeaderBar5.js';
// // import Footer from '../../ScreenComponents/Footer/Footer.js';
// import Footer from '../../ScreenComponents/Footer/Footer1.js';
// import styles from '../../AppDesigns/currentApp/styles/ScreenStyles/Addressstyles.js';
// import { colors, sizes } from '../../AppDesigns/currentApp/styles/CommonStyles.js';
// import Loading from '../../ScreenComponents/Loading/Loading.js';
// import axios from "axios";
// import Modal from "react-native-modal";
// import Geolocation from 'react-native-geolocation-service';

// export default class AddressComponentforaddressmenu extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       inputFocusColor: colors.textLight,
//       isOpen: false,
//       starCount: 2.5,
//       fromPincode: '',
//       mobileNumber: '',
//       fromarea: '',
//       pincodenotexist: '',

//       // mobileNumberError: [],
//       fromPincodeError: [],

//       contactperson: '',
//       addresstype: 'Home',
//       addsaved: false,
//       pincodeExists: false,
//     };
//   }
//   componentWillReceiveProps(nextProps) {
//   }
//   updateMenuState(isOpen) {
//     this.setState({ isOpen });
//   }

//   componentDidMount() {
//     console.log("componentDidMount.fromPincode==>");
//     AsyncStorage.multiGet(['token', 'user_id'])
//       .then((data) => {
//         this.setState({ user_id: data[1][1] })
//         const addressId = this.props.navigation.getParam('addressId', 'No addressId');
//         axios.get('/api/ecommusers/' + data[1][1])
//           .then((response) => {
//             // console.log("response LIst ecommusers:==>>>", response.data.profile.mobile);
//             this.setState({ 
//               mobileNumber: response.data.profile.mobile,
//               contactperson: response.data.profile.fullName
//              })

//           })
//       });
//   }
//   displayValidationError = (errorField) => {
//     let error = null;
//     if (this.state[errorField]) {
//       error = <View style={{ width: '100%' }}>
//         <Text style={{ color: '#dc3545' }}>{this.state[errorField][0]}</Text>
//       </View>;
//     }
//     return error;
//   }
//   // validInput = () => {
//   //   const {
//   //     // fromaddress,
//   //     // fromarea,
//   //     // mobileNumber,
//   //     fromPincode,
//   //   } = this.state;
//   //   let valid = true;
//   //   this.validate({
//   //     fromPincode: {
//   //       required: true,
//   //       minlength: 6,
//   //       maxlength: 6
//   //     },
//   //   });
//   //   if (this.isFieldInError("fromPincode")) {
//   //     this.setState({ fromPincodeError: this.getErrorsInField("fromPincode") });
//   //     valid = false;
//   //   } else {
//   //     this.setState({ fromPincodeError: "" });
//   //     valid = true;
//   //   }
//   // };

//   // validInputField = (stateName, stateErr) => {
//   //   const {
//   //     // fromaddress,
//   //     // fromarea,
//   //     // mobileNumber,
//   //     fromPincode,
//   //   } = this.state;
//   //   let valid = true;

//   //   this.validate({
//   //     [stateName]: {
//   //       required: true,
//   //     },
//   //   });

//   //   if (this.isFieldInError(stateName)) {
//   //     let validinptError = this.getErrorsInField(stateName);
//   //     this.setState({ validinptError });
//   //     valid = false;
//   //   } else {
//   //     this.setState({ [stateErr]: "" });
//   //   }
//   //   return valid;
//   // };

//   toggle() {
//     let isOpen = !this.state.isOpen;
//     this.setState({
//       isOpen
//     });
//   }

//   closeControlPanel = () => {
//     this._drawer.close()
//   }

//   openControlPanel = () => {
//     this._drawer.open()
//   }

//   handleZipChange(value) {
//     let x = value.replace(/\D/g, '').match(/(\d{0,5})(\d{0,4})/);
//     let y = !x[2] ? x[1] : x[1] + '-' + x[2];
//     this.setState({
//       zipcode: y,
//     });
//   }
//   allowpincodes() {
//     console.log("response.data.fromPincode==>", this.state.fromPincode);
//     axios.get("/api/allowablepincode/checkpincode/" + this.state.fromPincode)
//       .then((response) => {
//         if (response) {
//           console.log("response.data.message==>", response.data);
//           // axios.get("/api/allowablepincode/get")
//           //   .then((pincodes) => {
//           //     // console.log("PINCODEs==>",pincodes.data);
//           //     let allowpins = [];
//           //     for (var i = 0; i < pincodes.data.length; i++) {
//           //       allowpins.push({
//           //         'value': pincodes.data[i].allowablePincodes,
//           //       });
//           //     }
//           //     console.log("PINCODEs==>", allowpins);
//           //   });

//           if (response.data.message !== "Delivery Available") {
//             console.log("Delevery not possible on this address");
//             this.setState({ pincodeExists: true, pincodenotallowed: response.data.message });
//           } else {

//           }
//         }
//       });
//   }
//   pincodeexistsornot(pincode,formatted_address,area,city,state,country,latlong){

//     axios.get("/api/allowablepincode/checkpincode/" + pincode)
//       .then((response) => {
//         if (response) {

//           if (response.data.message !== "Delivery Available") {
//             console.log("Delevery not possible on this address");
//             this.setState({ pincodeExists: true, pincodenotexist:"Delevery not possible on this address", pincodenotallowedyes: response.data.message });
//           } else {
//             // console.log("pincodeexistsornot.fromPincode==>", pincode);
//             // this.setState({ fromPincode: pincode,});
//             this.setState({
//               fromaddress: formatted_address,
//               fromarea: area, fromcity: city,
//               fromstate: state, fromcountry: country, fromPincode: pincode, fromlatlong: latlong,
//               formatted_address: formatted_address,
//             },()=>{
//               console.log("pincode in places==>",this.state.fromPincode)
//             })
//           }
//         }
//       });
//   }
//   handleDelete = (id) => {
//     Alert.alert("", "Are you sure you want to delete ?", [
//       { text: "Cancel" },
//       {
//         text: "Delete",
//         onPress: () => {
//           this.deleteCompetitor(id);
//         }
//       },
//     ]);
//   };

//   handleMobileChange(value) {
//     // console.log("value = ",value);
//     if (value.startsWith && value.startsWith('+')) {
//       value = value.substr(3);
//     }
//     let x = value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
//     let y = x.input ? (!x[2] && !x[3]) ? '+91 ' + x[1] : (!x[3] ? '+91 ' + x[1] + '-' + x[2] : '+91 ' + x[1] + '-' + x[2] + '-' + x[3]) : '';
//     this.setState({
//       mobileNumber: y,
//     });
//   }

//   saveAddress = () => {
//     // console.log('this.state.fromaddress==>', this.state.fromaddress);
//     // if (this.validInput()) {  
//     var id = this.state.user_id;
//     var formValues = {
//       "user_ID": id,
//       "name": this.state.contactperson,
//       "addressLine1": this.state.fromaddress,
//       "addressLine2": this.state.fromarea,
//       "pincode": this.state.fromPincode,
//       "district": this.state.modaldistrict,
//       "city": this.state.fromcity,
//       "state": this.state.fromstate,
//       "country": this.state.fromcountry,
//       "mobileNumber": this.state.mobileNumber,
//       "addType": this.state.addresstype,
//     }
//     console.log('if form deliveryAddressID', formValues);

//     axios.patch('/api/ecommusers/updateuseraddress', formValues)
//       .then((response) => {
//         console.log("response after update:==>>>", response.data);
//         this.setState({ addsaved: true, });

//       })
//       .catch((error) => {
//         console.log('error', error)
//       });
//     // }
//   }

//   render() {

//     const { navigate, dispatch, goBack } = this.props.navigation;

//     let ShippingType = [{ value: 'Home', }, { value: 'Office', }, { value: 'Relative', }, { value: 'Friend', }];

//     if (this.props.loading) {
//       return (
//         <Loading />
//       );
//     } else {
//       return (
//         <React.Fragment>
//           <HeaderBar5
//             goBack={goBack}
//             headerTitle={'Add New Address'}
//             navigate={navigate}
//             toggle={() => this.toggle.bind(this)}
//             openControlPanel={() => this.openControlPanel.bind(this)}
//           />
//           <View style={styles.addsuperparent}>
//             <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" >
//               <View style={styles.formWrapper}>
//                 <View style={{ backgroundColor: '#fff', paddingVertical: 20, paddingHorizontal: 15, marginTop: 15, marginBottom: "5%" }}>

//                   <View style={[styles.formInputView, styles.marginBottom20]}>
//                     <View style={[styles.inputWrapper]}>
//                       <GooglePlacesAutocomplete
//                         placeholder='Address'
//                         minLength={2} // minimum length of text to search
//                         autoFocus={true}
//                         returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
//                         keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
//                         listViewDisplayed={false}    // true/false/undefined
//                         fetchDetails={true}

//                         onChangeText={(this.state.from)}
//                         value={this.state.from}
//                         enablePoweredByContainer={false}
//                         currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
//                         currentLocationLabel="Current location"
//                         nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
//                         renderDescription={row => row.description} // custom description render
//                         onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
//                           for (var i = 0; i < details.address_components.length; i++) {
//                             for (var b = 0; b < details.address_components[i].types.length; b++) {
//                               switch (details.address_components[i].types[b]) {
//                                 case 'sublocality_level_2':
//                                   var address = details.address_components[i].long_name;
//                                   break;
//                                 case 'sublocality_level_1':
//                                   var area = details.address_components[i].long_name;
//                                   break;
//                                 case 'locality':
//                                   var city = details.address_components[i].long_name;
//                                   break;
//                                 case 'administrative_area_level_1':
//                                   var state = details.address_components[i].long_name;
//                                   break;
//                                 case 'country':
//                                   var country = details.address_components[i].long_name;
//                                   break;
//                                 case 'postal_code':
//                                   var pincode = details.address_components[i].long_name;
//                                   break;
//                               }
//                             }
//                           }
//                           const latlong = details.geometry.location
//                           this.pincodeexistsornot(pincode,details.formatted_address,area,city,state,country,latlong);
//                           // if(this.state.pincodenotallowedyes){

//                           //   this.setState({
//                           //     fromaddress: details.formatted_address,
//                           //     fromarea: area, fromcity: city,
//                           //     fromstate: state, fromcountry: country, fromPincode: pincode, fromlatlong: latlong,
//                           //     formatted_address: details.formatted_address,
//                           //   },()=>{
//                           //     console.log("pincode in places==>",this.state.fromPincode)
//                           //   })
//                           // }

//                         }}
//                         getDefaultValue={() => ''}
//                         query={{
//                           key: 'AIzaSyCrzFPcpBm_YD5DfBl9zJ2KwOjiRpOQ1lE',
//                         }}
//                         styles={{
//                           textInputContainer: {
//                             backgroundColor: 'rgba(0,0,0,0)',
//                             borderTopWidth: 0,
//                             borderBottomWidth: 0,

//                           },
//                           textInput: {
//                             marginTop: 10,
//                           },

//                         }}
//                       // currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
//                       // currentLocationLabel="Current location"
//                       // nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch                                        
//                       />
//                       {/* {this.displayValidationError('fromaddress')} */}
//                     </View>
//                   </View>
//                   <View style={[styles.formInputView, styles.marginBottom20]}>
//                     <View style={[styles.inputWrapper]}>
//                       <View style={styles.inputText2Wrapper}>
//                         <TextField
//                           label="Home,Building"
//                           onChangeText={(fromaddress) => { this.setState({ fromaddress }) }}
//                           lineWidth={1}
//                           tintColor={colors.tintColor}
//                           inputContainerPadding={0}
//                           labelHeight={13}
//                           labelFontSize={sizes.label}
//                           titleFontSize={13}
//                           baseColor={'#666'}
//                           textColor={'#333'}
//                           value={this.state.fromaddress}
//                           containerStyle={styles.textContainer}
//                           inputContainerStyle={styles.textInputContainer}
//                           titleTextStyle={styles.textTitle}
//                           style={styles.textStyle}
//                           labelTextStyle={styles.textLabel}
//                           autoCapitalize='none'
//                         />
//                       </View>
//                     </View>
//                   </View>
//                   <View style={[styles.formInputView, styles.marginBottom20]}>
//                     <View style={[styles.inputWrapper]}>
//                       <View style={styles.inputText2Wrapper}>
//                         <TextField
//                           label="Road Area Name"
//                           onChangeText={(fromarea) => { this.setState({ fromarea }) }}
//                           lineWidth={1}
//                           tintColor={colors.tintColor}
//                           inputContainerPadding={0}
//                           labelHeight={13}
//                           labelFontSize={sizes.label}
//                           titleFontSize={13}
//                           baseColor={'#666'}
//                           textColor={'#333'}
//                           value={this.state.fromarea}
//                           containerStyle={styles.textContainer}
//                           inputContainerStyle={styles.textInputContainer}
//                           titleTextStyle={styles.textTitle}
//                           style={styles.textStyle}
//                           labelTextStyle={styles.textLabel}
//                           autoCapitalize='none'
//                         />
//                         {/* {this.displayValidationError('fromareaError')} */}

//                       </View>
//                     </View>
//                   </View>
//                   <View style={[styles.formInputView, styles.marginBottom20]}>
//                     <View style={[styles.inputWrapper]}>
//                       <View style={styles.inputText2Wrapper}>
//                         <TextField
//                           label="Pincode"
//                           onChangeText={(fromPincode) => { this.setState({ fromPincode }) }}
//                           // onChangeText={(fromPincode) => { this.setState({ fromPincode }) }}
//                           // onChangeText ={() => { this.allowpincodes() }}
//                           lineWidth={1}
//                           onBlur={() => { this.allowpincodes() }}
//                           tintColor={colors.tintColor}
//                           inputContainerPadding={0}
//                           labelHeight={13}
//                           labelFontSize={sizes.label}
//                           titleFontSize={13}
//                           baseColor={'#666'}
//                           textColor={'#333'}
//                           value={this.state.fromPincode}
//                           containerStyle={styles.textContainer}
//                           inputContainerStyle={styles.textInputContainer}
//                           titleTextStyle={styles.textTitle}
//                           style={styles.textStyle}
//                           labelTextStyle={styles.textLabel}
//                           autoCapitalize='none'
//                         />
//                       </View>
//                     </View>
//                     {/* {this.displayValidationError('fromPincodeError')} */}
//                   </View>
//                   <View style={[styles.formInputView, styles.marginBottom20]}>
//                     <View style={[styles.inputWrapper]}>
//                       <View style={styles.inputTextWrapper}>
//                         <TextField
//                           label="State"
//                           onChangeText={(fromstate) => { this.setState({ fromstate }) }}
//                           lineWidth={1}
//                           tintColor={colors.tintColor}
//                           inputContainerPadding={0}
//                           labelHeight={13}
//                           labelFontSize={sizes.label}
//                           titleFontSize={13}
//                           baseColor={'#666'}
//                           textColor={'#333'}
//                           value={this.state.fromstate}
//                           containerStyle={styles.textContainer}
//                           inputContainerStyle={styles.textInputContainer}
//                           titleTextStyle={styles.textTitle}
//                           style={styles.textStyle}
//                           labelTextStyle={styles.textLabel}
//                           autoCapitalize='none'
//                         />
//                       </View>
//                     </View>
//                   </View>
//                   <View style={[styles.formInputView, styles.marginBottom20]}>
//                     <View style={[styles.inputWrapper]}>
//                       <View style={styles.inputTextWrapper}>
//                         <TextField
//                           label="Country"
//                           onChangeText={(fromcountry) => { this.setState({ fromcountry }) }}
//                           lineWidth={1}
//                           tintColor={colors.tintColor}
//                           inputContainerPadding={0}
//                           labelHeight={13}
//                           labelFontSize={sizes.label}
//                           titleFontSize={13}
//                           baseColor={'#666'}
//                           textColor={'#333'}
//                           value={this.state.fromcountry}
//                           containerStyle={styles.textContainer}
//                           inputContainerStyle={styles.textInputContainer}
//                           titleTextStyle={styles.textTitle}
//                           style={styles.textStyle}
//                           labelTextStyle={styles.textLabel}
//                           autoCapitalize='none'
//                         />
//                       </View>
//                     </View>
//                   </View>
//                   <View style={[styles.formInputView, styles.marginBottom20]}>
//                     <View style={[styles.inputWrapper]}>
//                       <View style={styles.inputTextWrapper}>
//                         <TextField
//                           label="Contact Person Name"
//                           onChangeText={(contactperson) => { this.setState({ contactperson }) }}
//                           lineWidth={1}
//                           tintColor={colors.tintColor}
//                           inputContainerPadding={0}
//                           labelHeight={13}
//                           labelFontSize={sizes.label}
//                           titleFontSize={13}
//                           baseColor={'#666'}
//                           textColor={'#333'}
//                           value={this.state.contactperson}
//                           containerStyle={styles.textContainer}
//                           inputContainerStyle={styles.textInputContainer}
//                           titleTextStyle={styles.textTitle}
//                           style={styles.textStyle}
//                           labelTextStyle={styles.textLabel}
//                           autoCapitalize='none'
//                         />
//                       </View>
//                     </View>
//                   </View>
//                   <View style={[styles.formInputView, styles.marginBottom20]}>
//                     <View style={[styles.inputWrapper]}>
//                       <View style={styles.inputTextWrapper}>
//                         <TextField
//                           label="Mobile Number"
//                           // onChangeText={(mobileNumber) => { this.setState({ mobileNumber }) }}
//                           onChangeText={(mobileNumber) => { this.setState({ mobileNumber }), this.handleMobileChange(mobileNumber) }}
//                           lineWidth={1}
//                           tintColor={colors.tintColor}
//                           inputContainerPadding={0}
//                           labelHeight={13}
//                           labelFontSize={sizes.label}
//                           titleFontSize={13}
//                           baseColor={'#666'}
//                           textColor={'#333'}
//                           value={this.state.mobileNumber}
//                           containerStyle={styles.textContainer}
//                           inputContainerStyle={styles.textInputContainer}
//                           titleTextStyle={styles.textTitle}
//                           style={styles.textStyle}
//                           labelTextStyle={styles.textLabel}
//                           autoCapitalize='none'
//                         />
//                         {/* {this.displayValidationError('mobileNumberError')} */}
//                       </View>
//                     </View>
//                   </View>
//                   <View style={[styles.formInputView, styles.marginBottom20]}>
//                     <View style={[styles.inputWrapper]}>
//                       <View style={styles.inputImgWrapper}></View>
//                       <View style={styles.inputTextWrapper}>
//                         <Dropdown
//                           label='Type of Address'
//                           containerStyle={styles.ddContainer}
//                           dropdownOffset={{ top: 0, left: 0 }}
//                           itemTextStyle={styles.ddItemText}
//                           inputContainerStyle={styles.ddInputContainer}
//                           labelHeight={10}
//                           tintColor={colors.button}
//                           labelFontSize={sizes.label}
//                           fontSize={15}
//                           baseColor={'#666'}
//                           textColor={'#333'}
//                           labelTextStyle={styles.ddLabelText}
//                           style={styles.ddStyle}
//                           data={ShippingType}
//                           value={this.state.addresstype}
//                           onChangeText={(addresstype) => { this.setState({ addresstype }) }}

//                         />
//                       </View>
//                     </View>

//                   </View>
//                 </View>
//                 <View style={styles.canclebtn}>
//                   {
//                     this.state.pincodenotallowed === "Delivery Not Available" || this.state.pincodenotexist === "Delevery not possible on this address" ?
//                       <Button

//                         title={"SAVE"}
//                         buttonStyle={styles.buttongrey}
//                         containerStyle={styles.buttonContainerS}
//                         titleStyle={styles.buttonTextEDIT}
//                       />
//                       :
//                       <Button
//                         onPress={() => this.saveAddress()}
//                         title={"SAVE"}
//                         buttonStyle={styles.button1}
//                         containerStyle={styles.buttonContainerS}
//                         titleStyle={styles.buttonTextEDIT}
//                       />
//                   }
//                   {
//                     this.state.pincodenotallowed === "Delivery Not Available" ?
//                       <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 16, textAlign: 'center', color: 'red', marginTop: 20 }}>
//                         Sorry We are not delivering on this Address.
//                       </Text>
//                       :
//                       null
//                   }


//                 </View>

//               </View>

//               <View style={styles.addcanclebtn}>
//                 {/* <View style={styles.canclebtn}>
//                             <TouchableOpacity>
//                                 <Button
//                                 // onPress={()=>this.props.navigation.navigate('CartComponent')}
//                                 title={"CANCEL"}
//                                 buttonStyle={styles.button1}
//                                 containerStyle={styles.buttonContainerS}
//                                 titleStyle={styles.buttonTextEDIT}
//                                 />
//                             </TouchableOpacity>
//                         </View> */}
//                 {/* <View style={styles.canclebtn}>
//                             <TouchableOpacity >
//                                 <Button
//                                 onPress={()=>this.props.navigation.navigate('AddressDefaultComp')}
//                                 title={"SAVE"}
//                                 buttonStyle={styles.buttonORANGE}
//                                 containerStyle={styles.buttonContainerS}
//                                 titleStyle={styles.buttonTextEDIT}

//                                 />
//                             </TouchableOpacity>
//                         </View> */}
//               </View>
//             </ScrollView>
//             {/* <Footer /> */}
//           </View>
//           <Modal isVisible={this.state.addsaved}
//             onBackdropPress={() => this.setState({ addsaved: false })}
//             coverScreen={true}
//             hideModalContentWhileAnimating={true}
//             style={{ paddingHorizontal: '5%', zIndex: 999 }}
//             animationOutTiming={500}>
//             <View style={{ backgroundColor: "#fff", alignItems: 'center', borderRadius: 20, paddingVertical: 30, paddingHorizontal: 10 }}>
//               <View style={{ justifyContent: 'center', }}>
//                 <Icon size={50} name='shopping-cart' type='feather' color='#666' style={{}} />
//               </View>
//               <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 16, textAlign: 'center', justifyContent: 'center', marginTop: 20 }}>
//                 Address Added Successfully.
//               </Text>
//               <View style={styles.yesmodalbtn}>
//                 <View style={styles.ordervwbtn}>
//                   <TouchableOpacity>
//                     <Button
//                       onPress={() => this.props.navigation.navigate('AddressMenu')}
//                       // onPress={() => this.setState({ addsaved: false })}
//                       titleStyle={styles.buttonText1}
//                       title="OK"
//                       buttonStyle={styles.buttonGreen}
//                       containerStyle={styles.buttonContainer2}
//                     />
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </View>
//           </Modal>

//           <Modal isVisible={this.state.pincodeExists}
//             onBackdropPress={() => this.setState({ pincodeExists: false })}
//             coverScreen={true}
//             hideModalContentWhileAnimating={true}
//             style={{ paddingHorizontal: '5%', zIndex: 999 }}
//             animationOutTiming={500}>
//             <View style={{ backgroundColor: "#fff", alignItems: 'center', borderRadius: 20, paddingVertical: 30, paddingHorizontal: 10 }}>
//               {/* <View style={{ justifyContent: 'center', }}>
//                 <Icon size={50} name='shopping-cart' type='feather' color='#666' style={{}} />
//               </View> */}
//               <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 16, textAlign: 'center', justifyContent: 'center', marginTop: 20 }}>
//                 Sorry ! Delivery is not possible on this pincode.
//                 </Text>
//               <View style={styles.yesmodalbtn}>
//                 {/* <View style={styles.ordervwbtn}> */}
//                 <TouchableOpacity>
//                   <Button
//                     onPress={() => this.setState({ pincodeExists: false })}
//                     titleStyle={styles.buttonText1}
//                     title="OK"
//                     buttonStyle={styles.buttonGreen}
//                     containerStyle={styles.buttonContainer2}
//                   />
//                 </TouchableOpacity>
//                 {/* </View> */}
//               </View>
//             </View>
//           </Modal>
//         </React.Fragment>
//       );
//     }
//   }
// }



