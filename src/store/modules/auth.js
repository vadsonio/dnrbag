const axios = require('axios');

export default{
  actions: {
    checkUserLog({commit, dispatch, state}){
      return new Promise((resolve, reject)=>{
        let authInfo = {
          name: state.userInfo.name,
          token: state.userInfo.token,
          uniqueId: state.userInfo.uniqueId
        }
        axios
          .post(process.env.VUE_APP_SERVER_CHECKLOGIN, {
            authInfo
          })
          .then(response => {
            resolve('auth-good');
          })
          .catch(err=>{
            console.log('auth-bad', err.response.data.type);
            reject('auth-bad');
          })
      });
    },
    signUp({commit}, payload){
     return new Promise((resolve, reject)=>{
       let user = {
         name: payload.name,
         email: payload.email,
         password: payload.password
       }

       axios
         .post(process.env.VUE_APP_SERVER_REGISTRATION, {
           user
         })
         .then(response=>{
           if(response.data.type = 'success'){
             let loggedInfo = {
               name: response.data.userName,
               token: response.data.token,
               uniqueId: response.data.uniqueId
             }
             commit('setUser', loggedInfo);
             resolve();
           }
         })
         .catch(err=>{
           console.log('err', err);
           if(err.response.data && err.response.data.type === 'registration error'){
             if(err.response.data.message === 'user with this email exist'){
               reject('Такой email уже занят. Попробуйте придумать новый');
             }
           } else {
             console.log(err.response);
           }
         })
     })
    },
    signIn({commit}, payload){
      return new Promise((resolve, reject)=>{
        let user = {
          email: payload.email,
          password: payload.password
        }

        axios
          .post(process.env.VUE_APP_SERVER_LOGIN, {
            user
          })
          .then(response=>{
            if(response.data.type = 'success'){
              let loggedInfo = {
                name: response.data.userName,
                token: response.data.token,
                uniqueId: response.data.uniqueId
              }
              commit('setUser', loggedInfo);
              resolve();
            }
          })
          .catch(err=>{
            console.log(err);
            if(err.response.data && err.response.data.type === 'login error'){
              if(err.response.data.msg === 'No users match'){
                reject('Нет такого пользователя. Попробуйте ввести данные заново.');
              }
            } else {
              console.log(err);
            }
          })
      });
    },
    signOut({commit}, payload){
      commit('unsetUser', payload);
    }
  },
  mutations: {
    setUser(state, loggedInfo){

      let authInfo = {name: loggedInfo.name, token: loggedInfo.token, logged: true, uniqueId: loggedInfo.uniqueId};

      state.userInfo = authInfo;
      localStorage.authInfo = JSON.stringify(authInfo);
    },
    unsetUser(state, uniqueId){
      delete localStorage.authInfo;
      state.userInfo = {name: null, token: null, logged: false};

      console.log('mutation', uniqueId);
      axios.post('http://localhost:3000/auth/logOut', {
        uniqueId
      }).then(
        response => {
          console.log(response);
        }
      ).catch(err=>{
        console.log(err);
      })
    }
  },
  state: {
    userInfo: {
      name: JSON.parse(typeof localStorage.authInfo === 'undefined' ? false : localStorage.authInfo).name || null,
      token: JSON.parse(typeof localStorage.authInfo === 'undefined' ? false : localStorage.authInfo).token || null,
      logged: JSON.parse(typeof localStorage.authInfo === 'undefined' ? false : localStorage.authInfo).logged || false,
      uniqueId: JSON.parse(typeof localStorage.authInfo === 'undefined' ? false : localStorage.authInfo).uniqueId || null
    }
  },
  getters:{
    loggedUser: state => state.userInfo
  }
}