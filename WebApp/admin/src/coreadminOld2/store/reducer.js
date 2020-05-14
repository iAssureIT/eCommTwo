const initialState = {
	rolewiseAccessToModule 		: false,
	accessToFacility 			: false
}

const reducer = (state = initialState, action) => {
	const newState = {...state}; 
	if(action.type === "FETCH_ROLEWISE_ACCESS"){
		newState.rolewiseAccessToModule 	= action.rolewiseAccessToModule;
	}
	if(action.type === "FETCH_ACCESS_FACILITY"){
		newState.accessToFacility 	= action.accessToFacility;
	}
	return newState;
}

export default reducer;