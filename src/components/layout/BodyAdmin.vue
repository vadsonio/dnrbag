<template>
  <div class="admin-panel">
    <div class="block-wrap">
      <h1 class="admin-panel__title">Панель администратора</h1>
      <ul class="admin-panel__tabs">
        <li class="admin-panel__tabs-item" :class="{'active': tabIndex==0}" @click="changeTab(0)">
          Все пользователи
        </li>
        <li class="admin-panel__tabs-item" :class="{'active': tabIndex==1}" @click="changeTab(1)">
          Все объявления
        </li>
      </ul>
      <AdminUser v-if="tabIndex == 0"/>
      <AdminCampaigns v-else/>
    </div>
  </div>
</template>

<script>
  import AdminUser from '../ui/AdminUsers';
  import AdminCampaigns from '../ui/AdminCampaigns';

  export default {
    data(){
      return{
        tabIndex: 0
      }
    },
    methods:{
      changeTab(index){
        this.tabIndex = index;
      }
    },
    components: {
      AdminUser,
      AdminCampaigns
    }
  }
</script>

<style lang="scss">
.admin-panel{
  max-width: 80%;
  margin: 0 auto;
  &__title{
    font-size: 18px;
    color: $linkColor;
  }
  &__row{
    &:nth-child(odd){
      background-color: #eee;
    }
  }
  &__tabs{
    padding: 0;
    margin: 0 0 20px;
    list-style: none;
    display: flex;
    &-item{
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      &:first-child{
        margin-right: 10px;
      }
      &.active{
        text-decoration: underline;
        color: $linkColor;
      }
    }
  }
  &__list{
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    width: 100%;
    border: 1px solid #eaeaea;
    &.nav .admin-panel__item{
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 13px;
    }
  }
  &__item{
    padding: 5px;
    width: 100%;
    display: block;
    line-height: 20px;
    font-size: 13px;
    text-align: center;
    border-right: 1px solid #e5e5e5;
  }
  &__sublist{
    padding: 0;
    list-style: none;
    height: 100%;
  }
  &__subitem{
    line-height: 24px;
    &.empty{
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
    }
  }
}
</style>