import { StyleSheet, Dimensions,Platform } from 'react-native';
import {colors} from '../../config/styles.js';
const window = Dimensions.get('window');

export default StyleSheet.create({

  container:{
    // backgroundColor: '#0ff',
    alignItems:'center',
    height:'100%',
    // minHeight:'100%',
    // flex:1,
  },
  /*containerView:{
  backgroundColor: '#0ff',
    alignItems:'center',
    justifyContent:'center',
    height:100
  },*/
  formContainer:{
    // alignItems:'center',
    paddingHorizontal:'10%',
  },
  loginTitleTxt:{
     fontSize: 22,
    color:'#c10000',
    fontFamily:"Montserrat-Bold",
    textAlign:'center'
  },
  formInputView: {
    width:'85%',
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
    top:6,
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
    marginVertical: 20,
    // marginBottom: 20,
  },
  buttonText:{
    color: colors.buttonText,
    fontSize: 13,
    fontFamily:"Montserrat-Regular",
  },
  linkWrap:{
    width: '100%',
    flexDirection:'row',
    justifyContent:'space-between',
  },
  bgImage:{
    width:'100%',
    height:'100%',
    alignItems:'center',
  },
  outerWrapper:{
    width:'100%',
    marginTop:((Platform.OS === 'ios') ? 50 : 0),
        backgroundColor: 'transparent',
    padding:'6%',
    alignItems:'center',
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
  formWrapper:{
    width:'100%',
    backgroundColor:'#fff',
    // padding:10,
    // paddingHorizontal:'10%',
    paddingTop: 20,
    paddingBottom : 20,
    alignItems:'center',
    // shadowOpacity: 0.8,
    // shadowColor: 'grey',
    shadowRadius: 5,
    shadowOffset: { height: 2, width: 0 },
  },

  inputWrapper : {
    width:'100%',
    borderColor:'#666',
    borderWidth:1,
    flexDirection:'row',
    borderRadius: 5,
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
  marginBottom30: {
    marginBottom: 30,
  },
    marginBottom20: {
    marginBottom: 20,
  },
  // buttonContainer:{
  //   // width:'100%',
   
  //   width:((Platform.OS === 'ios') ? '100%' : '100%'),
  //   marginLeft: ((Platform.OS === 'ios') ? 40 : 0),
  //   justifyContent: 'center',
  //   alignItems:'center',
  //   marginBottom: 10
  // },
  buttonContainer:{
    width:'100%',
    // backgroundColor:'#f0f',
    // marginTop:25,
    // ...Platform.select({
    //   ios:{
    //     justifyContent:'center',
    //     // marginLeft: 40

    //   },
    //   android : {
    //     alignItems:'center'
    //   }
    // }),
    // marginVertical: 10
  },
  textContainer:{
    height:"auto",
    paddingLeft:10
  },
  textInputContainer:{
    backgroundColor:'transparent',
    // left:5,
    // fontFamily:"Montserrat-Regular",
    borderBottomColor: "transparent"
  },
  textTitle:{
    fontFamily:"Montserrat-Regular",
    top:0
  },
  textStyle:{
    fontFamily:"Montserrat-Regular",
    backgroundColor:'transparent',
    paddingTop:0,
    marginTop:-6
  },
  textLabel:{
    backgroundColor:'#fff',
    fontFamily:"Montserrat-Regular",
    top:-7,

  },
  linkText:{
    fontSize: 15,
    fontFamily:"Montserrat-Regular",
  },
  errorWrapper:{
    width:'100%',
    marginBottom:-15
  },
  errorText:{
    color:'#dc3545',
    fontSize:13,
    fontFamily:'Montserrat-Regular'
  },
   buttonFrgContainer:{
    width:'50%',
    // marginTop:25,
    ...Platform.select({
      ios:{
        justifyContent:'center',
        // marginLeft: 40

      },
      android : {
       justifyContent:'center',
       marginLeft: 5

      }
    })
  },
   buttonFrg1Container:{
    width:'50%',
    // marginTop:25,
    ...Platform.select({
      ios:{
        justifyContent:'center',
        // marginLeft: 40

      },
      android : {
         justifyContent:'center',
     

      }
    })
  },
   buttonSignUp:{
     width:'90%',
    backgroundColor: colors.buttonSignUp,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:5,
    borderWidth:1,
    borderColor:'#333',

  },
   buttonSignInText:{
    color: colors.buttonText1,
    borderRadius:50,
    fontSize:13,
    fontFamily:"Montserrat-Regular",
  },
  buttonText1:{
    color: colors.buttonText,
    borderRadius:50,
    fontSize:15,
    fontFamily:"Montserrat-SemiBold",
  },
  buttonSignUp1:{
     width:'100%',
    backgroundColor: colors.button,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:5,
    borderWidth:1,
    borderColor:'#0275D8'

  },
});