
import React from 'react';
import {
  ScrollView,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Alert,
  AsyncStorage
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { TextField } from 'react-native-material-textfield';
import { Header, Button, Icon, SearchBar, CheckBox } from "react-native-elements";
import Menu from '../../ScreenComponents/Menu/Menu.js';
import HeaderBar5 from '../../ScreenComponents/HeaderBar5/HeaderBar5.js';
// import Footer from '../../ScreenComponents/Footer/Footer.js';
import Footer from '../../ScreenComponents/Footer/Footer1.js';
import styles from '../../AppDesigns/currentApp/styles/ScreenStyles/Addressstyles.js';
import { colors, sizes } from '../../AppDesigns/currentApp/styles/CommonStyles.js';
import Loading from '../../ScreenComponents/Loading/Loading.js';
import axios from "axios";
import Modal from "react-native-modal";
import Geolocation from 'react-native-geolocation-service';

export default class AddressComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputFocusColor: colors.textLight,
      isOpen: false,
      starCount: 2.5,
      fullName: '',
      mobileNumber: '',
      contactperson: '',
      addresstype: '',
      addsaved: false,
    };
  }
  componentWillReceiveProps(nextProps) {
  }
  updateMenuState(isOpen) {
    this.setState({ isOpen });
  }

  componentDidMount() {

    AsyncStorage.multiGet(['token', 'user_id'])
      .then((data) => {
        // user_id = data[1][1]
        console.log("user_id ===>>", data[1][1]);
        this.setState({ user_id: data[1][1] })
      

      const addressId = this.props.navigation.getParam('addressId', 'No addressId');
      console.log("addressId ===>>", addressId);
      axios.get('/api/ecommusers/' + data[1][1])
        .then((response) => {
          console.log("response LIst:==>>>", response.data.deliveryAddress);
          // axios.get('/api/ecommusers/' + addressId)
          //   .then((user) => {

          //   })
          //   .catch((error) => {})
        })
      });
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

  saveAddress() {
    console.log('this.state.contactperson==>', this.state.contactperson);
    var id = this.state.user_id;
    var formValues = {
      "user_ID": id,
      // "deliveryAddressID": deliveryAddressID,
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
    axios.patch('/api/ecommusers/updateuseraddress', formValues)
      .then((response) => {
        console.log("response after update:==>>>", response.data);
        this.setState({ addsaved: true, });

      })
      .catch((error) => {
        console.log('error', error)
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
        <React.Fragment>
          <HeaderBar5
            goBack={goBack}
            headerTitle={'Add New Address'}
            navigate={navigate}
            toggle={() => this.toggle.bind(this)}
            openControlPanel={() => this.openControlPanel.bind(this)}
          />
          <View style={styles.addsuperparent}>
            <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" >
              <View style={styles.formWrapper}>
                <View style={styles.addparent}>
                  <View style={[styles.formInputView, styles.marginBottom20]}>

                  </View>
                </View>

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
                          this.setState({
                            fromaddress: details.formatted_address,
                            fromarea: area, fromcity: city,
                            fromstate: state, fromcountry: country, fromPincode: pincode, fromlatlong: latlong,
                            formatted_address: details.formatted_address,
                          })
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
                      // currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
                      // currentLocationLabel="Current location"
                      // nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch                                        
                      />
                    </View>
                  </View>
                  <View style={[styles.formInputView, styles.marginBottom20]}>
                    <View style={[styles.inputWrapper]}>
                      <View style={styles.inputText2Wrapper}>
                        <TextField
                          label="Home,Building"
                          onChangeText={(fromaddress) => { this.setState({ fromaddress }, () => { this.validInputField('fromaddress', 'fromaddressError'); }) }}
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
                    {this.displayValidationError('emailError')}
                  </View>
                  <View style={[styles.formInputView, styles.marginBottom20]}>
                    <View style={[styles.inputWrapper]}>
                      <View style={styles.inputText2Wrapper}>
                        <TextField
                          label="Road Area Name"
                          onChangeText={(fromarea) => { this.setState({ fromarea }, () => { this.validInputField('fromarea', 'fromareaError'); }) }}
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
                          onChangeText={(fromPincode) => { this.setState({ fromPincode }, () => { this.validInputField('fromPincode', 'fromPincodeError'); }) }}
                          lineWidth={1}
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
                    {this.displayValidationError('emailError')}
                  </View>
                  <View style={[styles.formInputView, styles.marginBottom20]}>
                    <View style={[styles.inputWrapper]}>
                      <View style={styles.inputTextWrapper}>
                        <TextField
                          label="State"
                          onChangeText={(fromstate) => { this.setState({ fromstate }, () => { this.validInputField('fromstate', 'fromstateError'); }) }}
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
                          onChangeText={(fromcountry) => { this.setState({ fromcountry }, () => { this.validInputField('fromcountry', 'fromcountryError'); }) }}
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
                          onChangeText={(mobileNumber) => { this.setState({ mobileNumber }) }}
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
                      </View>
                    </View>
                  </View>
                  <View style={[styles.formInputView, styles.marginBottom20]}>
                    <View style={[styles.inputWrapper]}>
                      <View style={styles.inputTextWrapper}>
                        <TextField
                          label="Type of Address"
                          onChangeText={(addresstype) => { this.setState({ addresstype }) }}
                          lineWidth={1}
                          tintColor={colors.tintColor}
                          inputContainerPadding={0}
                          labelHeight={13}
                          labelFontSize={sizes.label}
                          titleFontSize={13}
                          baseColor={'#666'}
                          textColor={'#333'}
                          value={this.state.addresstype}
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

                  {/* <View style={[styles.formInputView,styles.marginBottom20]}>
                              <View style={[styles.inputWrapper]}>
                                <View style={styles.inputImgWrapper}></View>
                                <View style={styles.inputTextWrapper}>
                                  <Dropdown
                                    label               = 'Country'
                                    containerStyle      = {styles.ddContainer}
                                    dropdownOffset      = {{top:0, left: 0}}
                                    itemTextStyle       = {styles.ddItemText}
                                    inputContainerStyle = {styles.ddInputContainer}
                                    labelHeight         = {10}
                                    tintColor           = {colors.button}
                                    labelFontSize       = {sizes.label}
                                    fontSize            = {15}
                                    baseColor           = {'#666'}
                                    textColor           = {'#333'}
                                    labelTextStyle      = {styles.ddLabelText}
                                    style               = {styles.ddStyle}
                                    data                = {this.props.industryData}
                                    value               = {this.state.industryType}
                                    onChangeText        = {industryType => {this.handleType(industryType); this.validInputField('industryType', 'industryTypeError');}}
                                                          
                                  />
                                </View>
                              </View>
                              {this.displayValidationError('industryTypeError')}
                            </View>
                            <View style={[styles.formInputView,styles.marginBottom20]}>
                              <View style={[styles.inputWrapper]}>
                                <View style={styles.inputImgWrapper}></View>
                                <View style={styles.inputTextWrapper}>
                                  <Dropdown
                                    label               = 'State'
                                    containerStyle      = {styles.ddContainer}
                                    dropdownOffset      = {{top:0, left: 0}}
                                    itemTextStyle       = {styles.ddItemText}
                                    inputContainerStyle = {styles.ddInputContainer}
                                    labelHeight         = {10}
                                    tintColor           = {colors.button}
                                    labelFontSize       = {sizes.label}
                                    fontSize            = {15}
                                    baseColor           = {'#666'}
                                    textColor           = {'#333'}
                                    labelTextStyle      = {styles.ddLabelText}
                                    style               = {styles.ddStyle}
                                    data                = {this.props.industryData}
                                    value               = {this.state.industryType}
                                    onChangeText        = {industryType => {this.handleType(industryType); this.validInputField('industryType', 'industryTypeError');}}
                                                          
                                  />
                                </View>
                              </View>
                              {this.displayValidationError('industryTypeError')}
                            </View>
                            <View style={[styles.formInputView,styles.marginBottom20]}>
                              <View style={[styles.inputWrapper]}>
                                <View style={styles.inputImgWrapper}></View>
                                <View style={styles.inputTextWrapper}>
                                  <Dropdown
                                    label               = 'District'
                                    containerStyle      = {styles.ddContainer}
                                    dropdownOffset      = {{top:0, left: 0}}
                                    itemTextStyle       = {styles.ddItemText}
                                    inputContainerStyle = {styles.ddInputContainer}
                                    labelHeight         = {10}
                                    tintColor           = {colors.button}
                                    labelFontSize       = {sizes.label}
                                    fontSize            = {15}
                                    baseColor           = {'#666'}
                                    textColor           = {'#333'}
                                    labelTextStyle      = {styles.ddLabelText}
                                    style               = {styles.ddStyle}
                                    data                = {this.props.industryData}
                                    value               = {this.state.industryType}
                                    onChangeText        = {industryType => {this.handleType(industryType); this.validInputField('industryType', 'industryTypeError');}}
                                                          
                                  />
                                </View>
                              </View>
                              {this.displayValidationError('industryTypeError')}
                            </View>
                             <View style={[styles.formInputView,styles.marginBottom20]}>
                              <View style={[styles.inputWrapper]}>
                                <View style={styles.inputImgWrapper}></View>
                                <View style={styles.inputTextWrapper}>
                                  <Dropdown
                                    label               = 'City'
                                    containerStyle      = {styles.ddContainer}
                                    dropdownOffset      = {{top:0, left: 0}}
                                    itemTextStyle       = {styles.ddItemText}
                                    inputContainerStyle = {styles.ddInputContainer}
                                    labelHeight         = {10}
                                    tintColor           = {colors.button}
                                    labelFontSize       = {sizes.label}
                                    fontSize            = {15}
                                    baseColor           = {'#666'}
                                    textColor           = {'#333'}
                                    labelTextStyle      = {styles.ddLabelText}
                                    style               = {styles.ddStyle}
                                    data                = {this.props.industryData}
                                    value               = {this.state.industryType}
                                    onChangeText        = {industryType => {this.handleType(industryType); this.validInputField('industryType', 'industryTypeError');}}
                                                          
                                  />
                                </View>
                              </View>
                              {this.displayValidationError('industryTypeError')}
                             
                        </View> */}
                </View>
                <View style={styles.canclebtn}>
                  <TouchableOpacity>
                    <Button
                      onPress={() => this.saveAddress()}
                      title={"SAVE"}
                      buttonStyle={styles.button1}
                      containerStyle={styles.buttonContainerS}
                      titleStyle={styles.buttonTextEDIT}
                    />
                  </TouchableOpacity>
                </View>

              </View>

              <View style={styles.addcanclebtn}>
                {/* <View style={styles.canclebtn}>
                            <TouchableOpacity>
                                <Button
                                // onPress={()=>this.props.navigation.navigate('CartComponent')}
                                title={"CANCEL"}
                                buttonStyle={styles.button1}
                                containerStyle={styles.buttonContainerS}
                                titleStyle={styles.buttonTextEDIT}
                                />
                            </TouchableOpacity>
                        </View> */}
                {/* <View style={styles.canclebtn}>
                            <TouchableOpacity >
                                <Button
                                onPress={()=>this.props.navigation.navigate('AddressDefaultComp')}
                                title={"SAVE"}
                                buttonStyle={styles.buttonORANGE}
                                containerStyle={styles.buttonContainerS}
                                titleStyle={styles.buttonTextEDIT}

                                />
                            </TouchableOpacity>
                        </View> */}
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
            <View style={{ backgroundColor: "#fff", alignItems: 'center', borderRadius: 20, paddingVertical: 30, paddingHorizontal: 10 }}>
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
                      onPress={() => this.props.navigation.navigate('AddressDefaultComp', this.state.user_id)}
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
        </React.Fragment>
      );
    }
  }
}



