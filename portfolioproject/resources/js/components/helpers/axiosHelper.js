import axios from "axios";

export function getLoginConfig({ email, password }){

  //Data from the form
  const userData = { email, password };

  //create string for axios
  const axiosData = Object.keys(userData).map((key) =>( encodeURIComponent(key) + '=' + encodeURIComponent(userData[key]))).join('&');

  //assemble the Axios Config
  const loginConfig = {
    url: '/api/login',
    method: 'post',
    headers: { 'X-Requested-With': 'XMLHttpRequest' },
    data: axiosData,
    responseType: 'json',
  }

  console.log('axios data', axiosData);
  // console.log('login data', loginConfig);

  return loginConfig;

}

export function getLogoutConfig(token){
  //assemble the Axios Config with token
  return {
    url: '/api/logout',
    method: 'get',
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization' : 'Bearer ' + token},
    responseType: 'json',
  }
}

export function getReceivedMessagesConfig(token){
  const userToken = JSON.parse(localStorage.getItem('userToken'));

  //assemble the Axios Config with token
  if(userToken) {
    return {
      url: '/api/receivedmessages',
      method: 'get',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization' : 'Bearer ' + userToken},
      responseType: 'json',
    }
  }
}

export function getSendMessagesConfig(token){
  const userToken = JSON.parse(localStorage.getItem('userToken'));

  //assemble the Axios Config with token
  if(userToken) {
    return {
      url: '/api/sendmessages',
      method: 'get',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization' : 'Bearer ' + userToken},
      responseType: 'json',
    }
  }
}