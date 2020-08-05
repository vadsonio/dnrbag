<template>
  <div class="admin-panel__campaigns">
    <div class="admin-panel__row">
      <ul class="admin-panel__list nav">
        <li class="admin-panel__item id">
          №
        </li>
        <li class="admin-panel__item img">
          Картинка
        </li>
        <li class="admin-panel__item uniqueId">
          Уникальный id
        </li>
        <li class="admin-panel__item createdBy">
          Создатель
        </li>
        <li class="admin-panel__item name">
          Название
        </li>
        <li class="admin-panel__item description">
          Описание
        </li>
        <li class="admin-panel__item price">
          Цена
        </li>
        <li class="admin-panel__item category">
          Категория
        </li>
        <li class="admin-panel__item phone">
          Телефон
        </li>
        <li class="admin-panel__item createdTime">
          Создан
        </li>
      </ul>
    </div>
    <div class="admin-panel__row" v-for="campaignRow in reversedAllCampaigns" :key="campaignRow.id">
      <!--{{campaignRow}}-->
      <ul class="admin-panel__list">
        <li class="admin-panel__item id">
          {{campaignRow.createdNumber}}
        </li>
        <li class="admin-panel__item img">
          <img :src="'http://localhost:3000/campaignImg/'+campaignRow.campaignImages[0]"  alt="">
        </li>
        <li class="admin-panel__item uniqueId">
          {{campaignRow._id}}
        </li>
        <li class="admin-panel__item createdBy">
          {{campaignRow.userId}}
        </li>
        <li class="admin-panel__item name">
          <router-link class="campaign-link" :to="{ path: `/campaignInfo?campaignId=${campaignRow._id}`}">
            {{campaignRow.campaignName}}
          </router-link>
        </li>
        <li class="admin-panel__item description" @click="showDescription(campaignRow.campaignDescription)">
          Читать
        </li>
        <li class="admin-panel__item price">
          {{campaignRow.campaignPrice}}
        </li>
        <li class="admin-panel__item category">
          {{campaignRow.campaignCategory}}
        </li>
        <li class="admin-panel__item phone">
          {{campaignRow.campaignPhone}}
        </li>
        <li class="admin-panel__item createdTime">
          {{campaignRow.campaignDate}}
        </li>
        <li class="admin-panel__item">
          <span class="delete-btn" @click="deleteCampaign(campaignRow._id, campaignRow.userId)">Удалить</span>
          <span class="moderate-btn">Модерация</span>
        </li>
      </ul>
    </div>
    <div class="popup" v-if="popup.show">
      {{popup.text}}
      <span class="popup__close" @click="popup.show = false">×</span>
    </div>
    <div class="confirmBlock" :class="{'active': confirm.show}">
      <p class="confirmBlock__text">
        Вы уверены, что хотите удалить это объявление?
      </p>
      <div class="confirmBlock__btns">
        <span ref="confirmYes" class="confirmBlock__button confirm">да</span>
        <span ref="confirmNo" class="confirmBlock__button denied">нет</span>
      </div>

    </div>
  </div>
</template>

<script>
  import { mapGetters, mapMutations, mapActions } from 'vuex';

  export default {
    data(){
      return{
        popup: {
          show: false,
          text: ''
        },
        confirm: {
          show: false,
          confirmBoolean: ''
        }
      }
    },
    methods:{
      ...mapActions(['AllCampaigns', 'deleteCampaignStore']),
      showDescription(fullDescription){
        this.popup.show = true;
        this.popup.text = fullDescription;
      },
      async deleteCampaign(campaignId, userId){
        this.confirm.show = true;

        await this.confirmMessage().then(
          success=>{
            this.confirm.show=false;
            this.deleteCampaignStore({campaignId, userId});
          },
          err=>{
            this.confirm.show=false;
            console.log('doesnt work');
            return false;
          }
        );

      },
      confirmMessage(){
        return new Promise((reject, resolve)=>{
          this.$refs.confirmYes.onclick = ()=>{
            reject();
          };

          this.$refs.confirmNo.onclick = ()=>{
            resolve();
          };
        });
      }
    },
    mounted(){
      this.AllCampaigns();
    },
    computed:{
      ...mapGetters(['getAllCampaigns']),
      reversedAllCampaigns() {
        return this.getAllCampaigns.slice().reverse();
      }
    }
  }
</script>

<style lang="scss" scoped>
  .admin-panel{
    &__campaigns{
      position: relative;
    }
    &__item{
      &.id{
        width: 50px;
        flex-shrink: 0;
      }
      &.name{
        width: 150px;
        flex-shrink: 0;
        font-size: 12px;
        line-height: 14px;
      }
      &.email{
        width: 150px;
        flex-shrink: 0;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      &.createdTime{
        width: 120px;
        flex-shrink: 0;
      }
      &.uniqueId{
        width: 130px;
        flex-shrink: 0;
      }
      &.createdBy{
        width: 130px;
        flex-shrink: 0;
      }
      &.img{
        width: 110px;
        flex-shrink: 0;
        img{
          width: 100%;
        }
      }
      &.description{
        width: 110px;
        flex-shrink: 0;
        font-size: 12px;
        line-height: 14px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        cursor: pointer;
        text-decoration: underline;
      }
      &.price{
        width: 90px;
        flex-shrink: 0;
      }
      &.category{
        width: 90px;
        flex-shrink: 0;
      }
      &.phone{
        width: 90px;
        flex-shrink: 0;
      }
      .campaign-link{
        text-decoration: underline;
        color: #333;
      }
    }
    .popup{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 70%;
      height: 90%;
      padding: 30px;
      border-radius: 10px;
      color: #fff;
      background: rgba(0, 0, 0, 0.9);
      white-space: pre-line;
      &__close{
        position: absolute;
        top: 5px;
        right: 10px;
        font-size: 30px;
        line-height: 1;
        cursor: pointer;
      }
    }
    .delete-btn{
      padding: 2px 5px;
      margin-bottom: 10px;
      display: block;
      border-radius: 4px;
      cursor: pointer;
      color: #fff;
      background-color: #E74C3C;
    }
    .moderate-btn{
      padding: 2px 5px;
      display: block;
      border-radius: 4px;
      cursor: pointer;
      color: #333;
      background-color: #ffda00;
    }
    .confirmBlock{
      visibility: hidden;
      padding: 30px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 400px;
      height: auto;
      background: #fff;
      box-shadow: 0 0 5px rgba(0,0,0,.2);
      &__text{
        margin-top: 0;
      }
      &__btns{
        display: flex;
        justify-content: space-around;
      }
      &__button{
        padding: 5px 20px;
        cursor: pointer;
        color: #fff;
        &.confirm{
          background: #52BE80;
        }
        &.denied{
          background: #E74C3C;
        }
      }
      &.active{
        visibility: visible;
      }
    }
  }
</style>