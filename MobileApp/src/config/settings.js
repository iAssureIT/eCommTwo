let METEOR_URL = '';

if (__DEV__) {
  METEOR_URL = 'ws://192.168.2.22:3000/websocket';
 } 
else {  
  METEOR_URL = 'ws://qacoffic.iassureit.com/websocket'; // your production server url
  // METEOR_URL = 'ws://test.pamtap.com/websocket'; // your production test server url
}

export const settings = {  
	env : process.env.NODE_ENV,  
	METEOR_URL
};

export default settings;