export function registerSubmitConfig({ name, email, password, password_confirmation }){
    const userData = { name, email, password, password_confirmation };
    const submitConfig = {
      url: '/api/register',
      method: 'post',
      headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/json',
        },
      data: userData,
      responseType: 'json',
    }
    return submitConfig;
}

export function getLoginConfig({ email, password }){
  const userData = { email, password };
  const axiosData = Object.keys(userData).map((key) =>( encodeURIComponent(key) + '=' + encodeURIComponent(userData[key]))).join('&');
  const loginConfig = {
    url: '/api/login',
    method: 'post',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    data: axiosData,
    responseType: 'json',
  }
  return loginConfig;
}

export function getLogoutConfig(token){
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
    const searchWord = {search_word};
    const axiosData = Object.keys(searchWord).map((key) =>( encodeURIComponent(key) + '=' + encodeURIComponent(searchWord[key]))).join('&');
    if(!searchWord) {
        const getUsersConfig = {
            url: '/api/index',
            method: 'get',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Authorization' : 'Bearer ' + userToken,
            },
            data: axiosData,
            responseType: 'json',
        }
        return getUsersConfig;
    } else {
        const getUsersConfig = {
            url: '/api/index',
            method: 'post',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Authorization' : 'Bearer ' + userToken,
            },
            data: axiosData,
            responseType: 'json',
        }
        return getUsersConfig;
    }
}

export function getUserDetail(user_id){
    const userToken = JSON.parse(localStorage.getItem('userToken'));
    const userId = {user_id};
    const axiosData = Object.keys(userId).map((key) =>( encodeURIComponent(key) + '=' + encodeURIComponent(userId[key]))).join('&');
    const getUsersConfig = {
        url: '/api/detail',
        method: 'post',
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Authorization' : 'Bearer ' + userToken,
        },
        data: axiosData,
        responseType: 'json',
    }
    return getUsersConfig;
}

export function getReceivedMessagesConfig(){
  const userToken = JSON.parse(localStorage.getItem('userToken'));
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
    const messageData = { receiver_id, description };
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
  return sentMessageConfig;
}

export function postFollowUserConfig(following_user_id){
    const userToken = JSON.parse(localStorage.getItem('userToken'));
    const messageData = { following_user_id };
    if(!following_user_id) {
        return console.log("What the hell do you want?");
    }
    const axiosData = Object.keys(messageData).map((key) =>( encodeURIComponent(key) + '=' + encodeURIComponent(messageData[key]))).join('&');
    const sentMessageConfig = {
        url: '/api/followinguser',
        method: 'post',
        headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization' : 'Bearer ' + userToken,
        },
        data: axiosData,
        responseType: 'json',
    }
    return sentMessageConfig;
}

export function getFollowedUserConfig(){
    const userToken = JSON.parse(localStorage.getItem('userToken'));
    if(userToken) {
      return {
        url: '/api/followeduser',
        method: 'get',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Authorization' : 'Bearer ' + userToken},
        responseType: 'json',
      }
    }
}

export function getFollowingUserConfig(){
    const userToken = JSON.parse(localStorage.getItem('userToken'));
    if(userToken) {
        return {
        url: '/api/followinguser',
        method: 'get',
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Authorization' : 'Bearer ' + userToken},
        responseType: 'json',
        }
    }
}

export function getMutuallyUserConfig(){
    const userToken = JSON.parse(localStorage.getItem('userToken'));
    if(userToken) {
        return {
        url: '/api/mutuallyfollow',
        method: 'get',
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Authorization' : 'Bearer ' + userToken},
        responseType: 'json',
        }
    }
}
