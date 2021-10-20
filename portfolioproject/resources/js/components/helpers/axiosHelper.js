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

  // console.log('axios data', axiosData);

  return loginConfig;

}

export function getLogoutConfig(token){
  //assemble the Axios Config with token
  return {
    url: '/api/logout',
    method: 'get',
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization' : 'Bearer ' + token
    },
    responseType: 'json',
  }
}

export function getUsers(search_word){
    const userToken = JSON.parse(localStorage.getItem('userToken'));

    //Data from the form
    const searchWord = {search_word};

    //create string for axios
    const axiosData = Object.keys(searchWord).map((key) =>( encodeURIComponent(key) + '=' + encodeURIComponent(searchWord[key]))).join('&');

    if(!searchWord) {
        const getUsersConfig = {
            url: '/api/index',
            method: 'get',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Authorization' : 'Bearer ' + userToken,
                // 'Content-Type': 'application/json'
            },
            data: axiosData,
            responseType: 'json',
        }
        // console.log('axios data', axiosData);
        return getUsersConfig;
    } else {
        const getUsersConfig = {
            url: '/api/index',
            method: 'post',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Authorization' : 'Bearer ' + userToken,
                // 'Content-Type': 'application/json'
            },
            data: axiosData,
            responseType: 'json',
        }
        // console.log('axios data', axiosData);
        return getUsersConfig;
    }

}

export function getReceivedMessagesConfig(){
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

export function getSendMessagesConfig(){
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

export function postSentMessagesConfig(receiver_id, description){
  const userToken = JSON.parse(localStorage.getItem('userToken'));

    //Data from the form
    const messageData = { receiver_id, description };

    //create string for axios
    const axiosData = Object.keys(messageData).map((key) =>( encodeURIComponent(key) + '=' + encodeURIComponent(messageData[key]))).join('&');

  const sentMessageConfig = {
    url: '/api/sentmessage',
    method: 'post',
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization' : 'Bearer ' + userToken,
    },
    data: axiosData,
    responseType: 'json',
}

  // console.log('axios data', axiosData);

  return sentMessageConfig;
}
