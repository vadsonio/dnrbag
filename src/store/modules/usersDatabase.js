const axios = require('axios');

export default{
  actions: {
    AllUsers({commit}){
      axios.get('http://localhost:3000/adminPanel/users')
        .then(response => {
          console.log(response);
          commit('setAllUsers', response.data.users);
        })
        .catch(err => {
          console.log(err);
        })
    },
    deleteUserStore({commit}, payload){
      let userUniqueId = {
        userUniqueId:payload.uniqueId
      };

      axios.post('http://localhost:3000/adminPanel/deleteUser', userUniqueId)
        .then(response=>{
          console.log(response);
        })
        .catch(err =>{
          console.log(err);
        });
      console.log('vuex', payload);
    }
  },
  mutations: {
    setAllUsers(state, users){
      state.allUsers = users;
    }
  },
  state: {
    allUsers: []
  },
  getters: {
    getAllUsers: state => state.allUsers
  }
}