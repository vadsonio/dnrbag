<template>
  <div class="main-categories">
    <div class="block-wrap">
      <ul class="main-categories__list">
        <li class="main-categories__item">
          <router-link class="main-categories__link" :to="{ path: '/category?name=realty' }">
            <font-awesome-icon class="main-categories__link-icon" :icon="['fa', 'home']" />
            Недвижимость
          </router-link>
        </li>
        <li class="main-categories__item">
          <router-link class="main-categories__link" :to="{ path: '/category?name=cars' }">
            <font-awesome-icon class="main-categories__link-icon" :icon="['fa', 'car']" />
            Транспорт
          </router-link>
        </li>
        <li class="main-categories__item">
          <router-link class="main-categories__link" :to="{ path: '/category?name=repair' }">
            <font-awesome-icon class="main-categories__link-icon" :icon="['fa', 'cogs']" />
            Ремонт
          </router-link>
        </li>
        <li class="main-categories__item">
          <router-link class="main-categories__link" :to="{ path: '/category?name=animals' }">
            <font-awesome-icon class="main-categories__link-icon" :icon="['fa', 'paw']" />
            Животные
          </router-link>
        </li>
        <li class="main-categories__item">
          <router-link class="main-categories__link" :to="{ path: '/category?name=appliances' }">
            <font-awesome-icon class="main-categories__link-icon" :icon="['fa', 'blender']" />
            Техника (бытовая)
          </router-link>
        </li>
        <li class="main-categories__item">
          <router-link class="main-categories__link" :to="{ path: '/category?name=computers' }">
            <font-awesome-icon class="main-categories__link-icon" :icon="['fa', 'desktop']" />
            Техника (компьютеры)
          </router-link>
        </li>
        <li class="main-categories__item">
          <router-link class="main-categories__link" :to="{ path: '/category?name=fashion' }">
            <font-awesome-icon class="main-categories__link-icon" :icon="['fa', 'tshirt']" />
            Мода (одежда)
          </router-link>
        </li>
        <li class="main-categories__item">
          <router-link class="main-categories__link" :to="{ path: '/category?name=sport' }">
            <font-awesome-icon class="main-categories__link-icon" :icon="['fa', 'futbol']" />
            Спорт
          </router-link>
        </li>
        <li class="main-categories__item">
          <router-link class="main-categories__link" :to="{ path: '/category?name=children' }">
            <font-awesome-icon class="main-categories__link-icon" :icon="['fa', 'baby-carriage']" />
            Детям
          </router-link>
        </li>
      </ul>
    </div>

    <h2 class="main-categories__section-title">Последние объявления</h2>

    <div v-masonry class="main-categories__adv-wrap" v-if="reversedCampaigns.length>0" transition-duration="0.3s" item-selector=".masonry-item" horizontal-order="true">
      <CampaignCard class="masonry-item" v-masonry-tile v-for="campaign in getLastCampaigns" :key="campaign._id" :campaignProps="campaign"/>
    </div>
    <div class="main-categories__adv-no-campaigns" v-else>
      К сожалению пока ничего нет :(
    </div>



  </div>
</template>

<script>
  import { library } from '@fortawesome/fontawesome-svg-core'

  import {  faHome, faCar, faCogs, faPaw, faBlender, faDesktop, faTshirt, faFutbol, faBabyCarriage } from '@fortawesome/free-solid-svg-icons';
  library.add(faHome, faCar, faCogs, faPaw, faBlender, faDesktop, faTshirt, faFutbol, faBabyCarriage )

  import CampaignCard from './CampaignCard';

  import { mapGetters, mapMutations, mapActions } from 'vuex';

  import Vue from 'vue'
  import {VueMasonryPlugin} from 'vue-masonry';
  Vue.use(VueMasonryPlugin)

  export default{
    data(){
      return{
        images: []
      }
    },
    methods:{
      ...mapActions(['AllCampaigns', 'LastCampaigns'])
    },
    async mounted(){
      this.AllCampaigns().then(
        (success)=>{
          console.log('categories init');
        },
        (err)=>{
          console.log('categories init error');
        }
      );

      this.LastCampaigns();
    },
    computed:{
      ...mapGetters(['getAllCampaigns', 'getLastCampaigns']),
      reversedCampaigns(){
        return this.getAllCampaigns.slice().reverse();
      }
    },
    components: {
      CampaignCard
    }
  }
</script>

<style lang="scss">
  .main-categories{
    width: 80%;
    margin: 0 auto 20px;
    &__list{
      list-style: none;
      margin: 0;
      padding: 0;
    }
    &__item{
      display: inline-block;
      padding: 0 5px;
      width: 33.3333%;
      margin-bottom: 15px;
    }
    &__link{
      display: block;
      position: relative;
      padding: 15px 10px;
      border: 1px solid #ececec;
      border-radius: 4px;
      text-align: end;
      font-size: 14px;
      color: #333;
      font-weight: 600;
      transition: .4s;
      &:hover{
        border: 1px solid lighten($linkColor, 25%);
        background: lighten($linkColor, 30%);
      }
    }
    &__link-icon{
      position: absolute;
      top: 50%;
      left: 15px;
      transform: translateY(-50%);
      font-size: 25px;
      color: $linkColor;
    }
    &__section-title{
      margin-top: 40px;
      color: $linkColor;
    }
    &__adv-wrap{
      display: flex;
      flex-wrap: wrap;
      margin: 0 -10px;
    }
  }
</style>