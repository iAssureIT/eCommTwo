import { StyleSheet, Dimensions,Platform } from 'react-native';
import { colors } from '../../config/styles.js';
// import { isIphoneX } from 'react-native-iphone-x-helper';
// import { getStatusBarHeight } from 'react-native-iphone-x-helper';
const window = Dimensions.get('window');

export default StyleSheet.create({

  container:{
    alignItems:'center',
    // minHeight:'100%',
       minHeight:window.height-25,
       // height:'auto',
    // flex:1,
  },

  loginTitleTxt:{
    fontSize: 22,
    color:'#c10000',
    fontFamily:"Montserrat-Bold",
    textAlign:'center'

  },
  formContainer:{
    alignItems:'center',
    // paddingHorizontal:'5%'
  },
  formInputView: {
    width:'90%',
  },
  inputText:{
    borderWidth:1,
    borderColor:'#aaa',
    height: 40,
    paddingLeft:10,
    textAlignVertical:'center',
    paddingTop:0,
    paddingBottom:0,
  },
  labelText:{
    top:5,
    paddingLeft:2,
  },
  button:{
    width:'90%',
    backgroundColor: colors.button,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:5
  },
  marginTB:{
    marginVertical: 15,
    // marginBottom: 20, 
  },
  buttonText:{
    color: colors.buttonText,
    borderRadius:50,
    fontFamily:"Montserrat-Regular",
  },
  linkWrap:{
    width: '100%',
    flexDirection:'row',
    justifyContent:'space-between',
  },
  linkLightText:{
    color: colors.textLight,
    // fontSize: 15,
    fontFamily:"Montserrat-Regular",
  },
  linkText:{
    color: colors.textLight,
    // fontSize: 15,
    fontFamily:"Montserrat-SemiBold",
    // textDecorationLine: 'underline'
  },
  bgImage:{
    // flex:1,
    width:'100%',
    height:'100%',
    alignItems:'center',
    // padding:10,
    // opacity:1,
    // borderBottomWidth:2,
    // borderColor:'#fff'
  },
  outerWrapper:{
    width:'100%',
    // padding:'6%',
    alignItems:'center',
    // height: 60,
    marginTop:((Platform.OS === 'ios') ? 50 : 0),
        backgroundColor: 'transparent',
        // paddingTop: getStatusBarHeight()
  },
  formWrapper:{
    width:'100%',
    paddingHorizontal:12,
    // paddingTop: 10,
    paddingBottom : 10,
    alignItems:'center',
    shadowRadius: 5,
    shadowOffset: { height: 2, width: 0 },
  },

  logoRoundWrapper :{
    height:80,
    width:80,
    borderRadius:80/2,
    backgroundColor:'#fff',
    position:'absolute',
    zIndex:1,
    borderColor: colors.primary,
    borderWidth:10,
    padding:6,
  },

  inputWrapper : {
    width:'100%',
    borderColor:'#666',
    borderWidth:1,
    flexDirection:'row',
    borderRadius: 5,
  },

  marginBottom30: {
    marginBottom: 30,
  },

  marginTop30:{
    marginTop: 30
  },

  marginBottom20:{
    marginBottom: 20
  },

  inputImgWrapper : {
    width:'10%',
    justifyContent:'center',
    alignItems:'center',
    borderRightWidth:1,
    borderColor: colors.textLight,
    marginVertical:15
  },

  inputTextWrapper : {
    width:'88%'
  },

  /*inputText:{
    fontFamily:"Montserrat-Regular",

  }*/
  buttonContainer:{
    width:'100%',
    marginTop:15,
    ...Platform.select({
      ios:{
        justifyContent:'center',
        marginLeft: 40

      },
      android : {
        alignItems:'center'
      }
    })
  },
  textContainer:{
    height:'auto',
    paddingLeft:10
  },
  textInputContainer:{
    backgroundColor:'transparent',
    paddingLeft:5,
    // fontFamily:"Montserrat-Regular",
    borderBottomColor: "transparent"
  },
  textTitle:{
    fontFamily:"Montserrat-Regular",
    top:0, 
    fontSize:12
  },
  textStyle:{
    fontFamily:"Montserrat-Regular",
    backgroundColor:'transparent',
    paddingTop:0,
    marginTop:-6,
    fontSize:14
  },
  textLabel:{
    backgroundColor:'#fff',
    fontFamily:"Montserrat-Regular",
    top:-7,
    


  },
  errorWrapper:{
    width:'100%',
    marginBottom:-15
  },
  errorText:{
    color:'#dc3545',
    fontSize:12,
    marginTop:3,
    paddingLeft:25,
    fontFamily:'Montserrat-Regular'
  },
  eyeWrapper:{
    width:'15%',
    justifyContent:'center',
    alignItems:'center',
  },
  inputText2Wrapper:{
    width:'74%',
    justifyContent:'center'
  },

});
