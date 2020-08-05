const axios = require('axios');

export default{
  actions:{
    CreateCampaign({commit}, payload){
      return new Promise((resolve, reject)=>{

        let data = new FormData();

        data.append('userId', payload.userId);
        data.append('campaignTitle', payload.campaignTitle);
        data.append('campaignDescription', payload.campaignDescription);
        data.append('campaignPrice', payload.campaignPrice);
        data.append('campaignId', payload.campaignId);
        data.append('campaignCategory', payload.campaignCategory);
        data.append('campaignPhone', payload.campaignPhone);

        let files = payload.campaignPictures;

        for(let i=0; i<files.length; i++){
          data.append('campaignPicture', files[i]);
        }

        let config = {
          header : {
            'Content-Type' : 'multipart/form-data'
          }
        }

        // for (var pair of data.entries()) {
        //   console.log(pair[0]+ ', ' + pair[1]);
        // }

        axios.post('http://localhost:3000/setFiles/addCampaign', data, config).then(
          response => {
            console.log(response);
            resolve('New campaign created');
          }
        ).catch(err=>{
          console.log(err);
          reject('Error, when campaign created');
        })
      });
    },
    AllCampaigns({commit}){
      return new Promise((resolve, reject)=>{
        axios.get('http://localhost:3000/getCampaigns/all')
          .then(response => {
            commit('setAllCampaigns', response.data.campaigns);
            resolve();
          })
          .catch(err => {
            console.log(err);
            reject(err);
          })
      })
    },
    LastCampaigns({commit}){
      return new Promise((resolve, reject)=>{
        axios.get('http://localhost:3000/getCampaigns/lastCampaignsPreview')
          .then(response =>{
            commit('setLastCampaigns', response.data.lastCampaigns);
          })
          .catch(err =>{
            console.log(err)
          })
      })
    },
    deleteCampaignStore({commit}, payload){
      let campaignToDelete = {
        campaignId: payload.campaignId,
        userId: payload.userId
      }

      axios.post('http://localhost:3000/adminPanel/deleteCampaign', campaignToDelete)
        .then(response=>{
          if(response.data.msg === 'campaign deleted'){
            location.reload();
          }
        })
        .catch(err=>{
          console.log(err);
        })
    }
  },
  mutations:{
    setAllCampaigns(state, campaigns){
      state.allCampaigns = campaigns;
    },
    setLastCampaigns(state, campaigns){
      state.lastCampaigns = campaigns;
    }
  },
  state:{
    allCampaigns: [],
    lastCampaigns: []
  },
  getters:{
    getAllCampaigns: state => state.allCampaigns,
    getLastCampaigns: state => state.lastCampaigns
  }
}