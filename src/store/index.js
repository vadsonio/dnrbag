import Vue from 'vue'
import Vuex from 'vuex'

import Auth from './modules/auth';
import CampaignDatabase from './modules/campaignDatabase';
import UsersDatabase from './modules/usersDatabase';
import GenerationParams from './modules/generationParams';

Vue.use(Vuex)

let store = new Vuex.Store({
  modules: {
    Auth,
    CampaignDatabase,
    UsersDatabase,
    GenerationParams
  }
})

export default store;