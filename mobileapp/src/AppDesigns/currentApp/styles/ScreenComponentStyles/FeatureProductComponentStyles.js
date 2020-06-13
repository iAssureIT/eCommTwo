import { StyleSheet, Dimensions,Platform } from 'react-native';
import {colors} from '../CommonStyles.js';
const window = Dimensions.get('window');

export default StyleSheet.create({
	title:{
		 fontFamily:"Montserrat-SemiBold",
		 fontSize:16,
		 marginBottom:12,
	},
	popularWrapper:{
	flex:0.5, height:100,borderWidth:1,borderColor:'#ccc',borderRadius:5,width:'100%',marginRight:15,marginBottom:15
	},
	flxdir1:{
		flex:1,flexDirection:'row',
		// position:'absolute',top:150,
	},
	featureprodprice:{
		flex:1,flexDirection:'row',
		// position:'absolute',
	},
	buttonGreen:{
		backgroundColor: colors.buttonGreen,
		height: 45,
		width:"100%",
	},
	flx5:{
		flex:0.5,
		position:'absolute',top:150,
	},
	featureprod:{
		borderWidth:1,borderColor:'#f1f1f1',
		backgroundColor:'#ccc',width:175,
		height:100,flexDirection:'row',
		marginBottom:80,borderRadius:10,
	},
	featureimg:{
		height:100,borderRadius:10,
		width:175,backgroundColor:'#fff',borderColor:"#ccc",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.8,
		shadowRadius: 2,
		elevation: 8,
	},
	featurelistwrap:{
		width:'100%',flexDirection:'row',flexWrap:'wrap',
	},
	featureprodname:{
		
		position:'absolute',top:100,right:50,
		paddingHorizontal:10,flexShrink: 1,zIndex:1,
		fontSize:12,fontFamily:"Montserrat-SemiBold",
		flexWrap:'wrap',color:'#666',paddingVertical:25,
	},

});