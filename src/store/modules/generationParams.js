const axios = require('axios');

export default{
  actions:{
    generateCampaignId({commit}){
      axios.get('http://localhost:3000/genParams/campaignId').then(
        response => {
          commit('setCampaignId', response.data.campaignId);
        }
      ).catch(err=>{
        console.log(err);
      })
    },
    countriesList({commit}){
      axios.get('http://localhost:3000/genParams/countriesList').then(
        response => {
          // console.log(response.data);
          commit('setCountriesList', response.data);
        }
      ).catch(err=>{
        console.log(err);
      })
    }
  },
  mutations:{
    setCampaignId(state, campaignId){
      state.campaignId = campaignId;
    },
    setCountriesList(state, countriesArray){
      state.countriesList = countriesArray;
    }
  },
  state:{
    campaignId: '',
    countriesList: []
  },
  getters:{
    getCampaignId: state => state.campaignId,
    getCountriesList: state => state.countriesList
  }
}