<template>
  <nav class="auth-nav">
    <ul class="auth-nav__list">
      <li class="auth-nav__item" v-if="authUser">
        <router-link class="auth-nav__link" :to="{ path: '/signIn' }">Войти</router-link>
      </li>
      <li class="auth-nav__item" v-if="authUser">
        <router-link class="auth-nav__link" :to="{ path: '/signUp' }">Зарегистрироваться</router-link>
      </li>
      <li class="auth-nav__item" v-if="!authUser">
        <a class="auth-nav__link" @click="signOutNav">Выйти</a>
      </li>
      <li class="auth-nav__item" v-if="!authUser">
        <div class="logged-user-settings" :class="{'active': loggedUserSetting}" @click="loggedUserSetting=!loggedUserSetting">
          <div class="logged-user-settings__icon">
            <font-awesome-icon class="" :icon="['fas', 'cog']" />
          </div>
          <div class="logged-user-settings__name">
            {{loggedUser.name}}
          </div>
        </div>
      </li>
    </ul>
  </nav>
</template>

<script>
  import { mapGetters, mapMutations, mapActions } from 'vuex';

  export default{
    data(){
      return{
        loggedUserSetting: false
      }
    },
    methods:{
      ...mapActions(['signOut']),
      signOutNav(){
        console.log(this.loggedUser.uniqueId);
        this.signOut(this.loggedUser.uniqueId);
        location.reload();
      }
    },
    computed:{
      ...mapGetters(['loggedUser']),
      authUser(){
        const userName = this.loggedUser.name;
        return userName !== null ? false : true
      }
    }
  }

</script>

<style lang="scss">
  .auth-nav{
    &__list{
      padding: 0;
      margin: 0;
      list-style: none;
    }
    &__item{
      margin-right: 20px;
      display: inline-block;
      &:last-child{
        margin-right: 0;
      }
    }
    &__link{
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      color: $linkColor;
      &:hover{
        color: darken($linkColor, 10%);
      }
      &:focus{
        color: darken($linkColor, 20%);
      }
    }
  }
</style>