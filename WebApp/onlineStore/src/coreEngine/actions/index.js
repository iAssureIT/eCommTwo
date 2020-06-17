import axios from 'axios';

export function getCartData() {

	return dispatch =>{

	// $('.fullpageloader').show();

	const userid = localStorage.getItem('user_ID');
  
    if (userid) {
      return axios.get("/api/carts/get/cartproductlist/"+userid)
        .then((response)=>{
            console.log("redux action cart response.data===",response.data);
        		dispatch(fetchcartdata(response.data));
        })
        .catch((error)=>{
              console.log('error', error);
        })
    }else{
      dispatch(fetchcartdata([]));
    }
  }  
}

export const fetchcartdata = cartdata => ({
    type: 'FETCH_CART_DATA',
    cartData: cartdata
  });

export const searchProductAction = (searchCriteria, searchResult )=> ({
      type: 'SEARCH_PRODUCT',
      searchCriteria: searchCriteria,
      searchResult: searchResult
});