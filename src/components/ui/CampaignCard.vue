<template>
  <div class="campaign-card">
    <div class="block-wrap">
      <div class="campaign-card__photos">
        <img class="campaign-card__img" :class="index === imgActive ? 'active' : ''" v-for="(image, index) in images" :src="'http://localhost:3000/campaignImg/'+image" alt="">
      </div>
      <div class="campaign-card__img-quantity" v-if="images.length>1">
        {{imagesQuantity}}
      </div>
      <ul v-if="imagesDots" class="campaign-card__dots">
        <li class="campaign-card__dot-item" :class="imgActive == index ? 'active' : ''" v-for="(dots, index) in images" :key="index" @mouseover="nextImg(index)"></li>
      </ul>
      <router-link :to="{ path: `/campaignInfo?campaignId=${campaignProps._id}`}">
        <h2 class="campaign-card__title">
          {{campaignProps.campaignName}}
        </h2>
        <p class="campaign-card__description">
          {{campaignProps.campaignDescription}}
        </p>
        <p class="campaign-card__price">
          {{campaignProps.campaignPrice | priceFormatter}}
        </p>
        <time class="campaign-card__time">
          Добавлено: {{campaignProps.campaignDate | dateFormatter}}
        </time>
        <p class="campaign-card__place">
          {{campaignProps.campaignCountry}}, {{campaignProps.campaignCity}}
        </p>

      </router-link>

      <!--{{campaignProps}}-->
    </div>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'CampaignCard',
    props: ['campaignProps'],
    data(){
      return{
        images: this.campaignProps.campaignImages,
        imgActive: 0
      }
    },
    methods:{
      getCampaigns(){
        // GridFS storage
        // axios.get(`http://localhost:3000/getFiles/filesById/${this.campaignProps._id}`).then(
        //   response => {
        //     this.images = response.data;
        //   }
        // )


      },
      activeImg(){

      },
      nextImg(imgIndex){
        this.imgActive = imgIndex;
      }
    },
    computed:{
      imagesDots(){
        if(this.images.length>1){
          return true;
        }
      },
      imagesQuantity(){
        return `${this.imgActive+1} из ${this.images.length}`;
      }
    },
    mounted(){
      this.getCampaigns();
      this.activeImg();
    },
    filters:{
      priceFormatter(value){
        if (!value) return ''

        let formatter = new Intl.NumberFormat('ru-RU', {
          style: 'currency',
          currency: 'RUB',
        });

        return formatter.format(value);
      },
      dateFormatter(value){
        if(!value) return ''

        let splitted = value.split('|');

        let splittedDate = splitted[0].trim(),
            splittedTime = splitted[1].trim();

        let currentDate = new Date();

        let currentMonth = currentDate.getMonth()+1;

        if(currentMonth<10){
          currentMonth = '0'+currentMonth;
        }

        let td = currentDate.getDate()+'.'+currentMonth+'.'+currentDate.getFullYear();

        if(td == splittedDate){
          // console.log('ident');
          return `Сегодня ${splittedTime}`;
        } else{
          // console.log('not ident');
          return `${splittedDate} ${splittedTime}`;
        }

      }
    }
  }

</script>

<style lang="scss">
.campaign-card{
  position: relative;
  width: calc(33.3333% - 20px);
  margin: 0 10px 10px;
  &__photos{
    margin-bottom: 10px;
    position: relative;
    width: 100%;
  }
  &__photos:before{
    content: '';
    display: block;
    padding-top: 65%;
  }
  &__img{
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    &.active{
      display: block;
    }
  }
  &__dots{
    padding: 0;
    margin: 0 0 5px;
    display: flex;
    justify-content: center;
  }
  &__dot-item{
    display: block;
    margin-right: 5px;
    width: 100%;
    height: 4px;
    background: #eaeaea;
    opacity: .8;
    cursor: pointer;
    &:last-child{
      margin-right: 0;
    }
    &.active{
      background-color: $linkColor;
      &:hover{
        background-color: $linkColor;
      }
    }
    &:hover{
      opacity: 1;
      background: #cacaca;
    }
  }
  &__title{
    margin-bottom: 5px;
    display: block;
    font-size: 16px;
    line-height: 20px;
    max-height: 60px;
    overflow: hidden;
    color: #333;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
  }
  &__img-quantity {
    padding: 1px 5px;
    position: absolute;
    top: 20px;
    font-size: 12px;
    color: #fff;
    background: rgba(0,0,0,.2);
    border-bottom-right-radius: 4px;
  }
  &__description {
    margin-top: 0;
    color: #888;
    font-size: 13px;
    line-height: 18px;
    height: auto;
    max-height: 54px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &__price {
    margin-top: 0;
    font-size: 16px;
    font-weight: 700;
    color: #000;
  }
  &__time {
    font-size: 12px;
    color: #888;
  }
  &__place{
    margin: 0;
    font-size: 11px;
    font-weight: 600;
    color: #000000;
  }
}
</style>