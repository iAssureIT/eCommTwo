import { StyleSheet, Dimensions,Platform } from 'react-native';
import {colors} from '../../config/styles.js';
const window = Dimensions.get('window');

export default StyleSheet.create({

  container:{
    alignItems:'center',
    minHeight:'100%',
  },
   buttonSignUp:{
     width:'100%',
    backgroundColor: colors.button,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:50,
    borderWidth:1,
    borderColor:'#0275D8'

  },
    buttonContainer:{
    width:'100%',

  },
    buttonText:{
    color: '#000',
    backgroundColor:"#f0f",
    borderRadius:50,
    fontSize:15,
    fontFamily:"Montserrat-SemiBold",
  },

  formContainer:{
    alignItems:'center',
  },
  formInputView: {
    width:'100%',
    paddingHorizontal:15
  },
   loginTitleTxt:{
    fontSize: 22,
    color:'#c10000',
    fontFamily:"Montserrat-Bold",
    textAlign:'center'

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
    marginVertical: 10,
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
  linkText:{
    fontSize: 15,
    fontFamily:"Montserrat-Regular",
  },
  bgImage:{
    width:'100%',
    height:'100%',
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
    paddingTop: 35,
    paddingBottom : 15,
    shadowRadius: 5,
    shadowOffset: { height: 2, width: 0 },
  },
  otpWrap:{
    marginBottom:30,
    paddingHorizontal:28

  },
  otpText:{
    fontFamily:"Montserrat-Regular",
    fontSize: 15,
    textAlign:'center'
  },
  otpInputWrap:{
    backgroundColor:'transparent',
    width:'100%',
    flexDirection:'row',
    paddingTop:10,
    justifyContent:'center'
  },
  otpInput:{
    width:40,
    height:40,
    borderWidth:1,
    borderColor:colors.border,
    borderRadius: 3,
    marginRight: 5,
  },
  buttonContainer:{
    width:'45%',
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
  marginBottom20:{
    marginBottom : 20
  },
  textContainer:{
    height:40,
  },
  textInputContainer:{
    backgroundColor:'transparent',
    borderBottomColor: "transparent",
  },
  textTitle:{
    fontFamily:"Montserrat-Regular",
    top:0
  },
  textStyle:{
    fontFamily:"Montserrat-Regular",
    backgroundColor:'transparent',
    paddingTop:0,
    marginTop:-6,
    textAlign:'center'
  },
  textLabel:{
    backgroundColor:'#fff',
    fontFamily:"Montserrat-Regular",
    top:-10,
    textAlign:'center'
  },
   button1Container:{
    width:'45%',
    ...Platform.select({
      ios:{
        justifyContent:'center',

      },
      android : {
        alignItems:'center'
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
    borderColor:'#333'

  },
   buttonSignInText:{
    color: colors.buttonText1,
    borderRadius:50,
    fontSize:13,
    fontFamily:"Montserrat-Regular",
  },
});
