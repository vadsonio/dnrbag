<template>
  <div class="admin-panel__user">
    <div class="admin-panel__row">
      <ul class="admin-panel__list nav">
        <li class="admin-panel__item id">
          id
        </li>
        <li class="admin-panel__item name">
          Имя
        </li>
        <li class="admin-panel__item email">
          email
        </li>
        <li class="admin-panel__item createdTime">
          Создан
        </li>
        <li class="admin-panel__item uniqueId">
          Уникальный id
        </li>
        <li class="admin-panel__item campaigns">
          Объявления
        </li>
        <li class="admin-panel__item authState">
          Авторизация
        </li>
        <li class="admin-panel__item userRole">
          Роль
        </li>
        <li class="admin-panel__item controls">

        </li>
      </ul>
    </div>
    <div class="admin-panel__row" v-for="userRow in getAllUsers" :key="userRow.id">
      <ul class="admin-panel__list">
        <li class="admin-panel__item id">
          {{userRow._id}}
        </li>
        <li class="admin-panel__item name">
          {{userRow.name}}
        </li>
        <li class="admin-panel__item email">
          {{userRow.email}}
        </li>
        <li class="admin-panel__item createdTime">
          {{userRow.createDate}}
        </li>
        <li class="admin-panel__item uniqueId">
          {{userRow.uniqueId}}
        </li>
        <li class="admin-panel__item campaigns">
          <ul class="admin-panel__sublist">
            <li class="admin-panel__subitem" v-for="camp in userRow.campaigns">
              <router-link class="campaign-link" :to="{ path: `/campaignInfo?campaignId=${camp}`}">
                {{camp}}
              </router-link>
            </li>
            <li class="admin-panel__subitem empty" v-if="userRow.campaigns.length === 0">Компаний нет</li>
          </ul>
        </li>
        <li class="admin-panel__item authState">
          {{userRow.autorized}}
        </li>
        <li class="admin-panel__item userRole">
          {{userRow.role}}
        </li>
        <li class="admin-panel__item controls">
          <span class="delete-btn" @click="deleteUser(userRow.uniqueId)">Удалить</span>
          <span class="moderate-btn">Забанить</span>
        </li>
      </ul>
    </div>
    <div class="confirmBlock" :class="{'active': confirm.show}">
      <p class="confirmBlock__text">
        Вы уверены, что хотите удалить пользователя и все его объявления?
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
        confirm: {
          show: false,
          confirmBoolean: ''
        }
      }
    },
    methods:{
      ...mapActions(['AllUsers', 'deleteUserStore']),
      async deleteUser(uniqueId){
        this.confirm.show = true;

        await this.confirmMessage().then(
          success => {
            this.confirm.show=false;
            this.deleteUserStore({uniqueId});
          },
          err=>{
            this.confirm.show=false;
            return false;
          }
        )
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
      this.AllUsers();
    },
    computed:{
      ...mapGetters(['getAllUsers'])
    }
  }
</script>

<style lang="scss" scoped>
  .admin-panel{
    &__item{
      &.id{
        width: 50px;
        flex-shrink: 0;
      }
      &.name{
        width: 150px;
        flex-shrink: 0;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      &.email{
        width: 150px;
        flex-shrink: 0;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      &.createdTime{
        width: 150px;
        flex-shrink: 0;
      }
      &.uniqueId{
        width: 130px;
        flex-shrink: 0;
      }
      &.campaigns{
        width: 130px;
        flex-shrink: 0;
      }
      &.authState{
        width: 100px;
        flex-shrink: 0;
      }
      &.userRole{
        width: 100px;
        flex-shrink: 0;
      }
      &.controls{
        text-align: center;
      }
      .campaign-link{
        text-decoration: underline;
        color: #333;
      }

    }
    .delete-btn{
      padding: 2px 5px;
      margin: 0 auto 10px;
      display: block;
      border-radius: 4px;
      max-width: 100px;
      cursor: pointer;
      color: #fff;
      background-color: #E74C3C;
    }
    .moderate-btn{
      padding: 2px 5px;
      margin: 0 auto 10px;
      display: block;
      border-radius: 4px;
      max-width: 100px;
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