<template>
  <header class="header">
    <div class="container h-100">
      <div class="flex align-center justify-between h-100">
        <router-link class="header__logo" :to="{ path: '/' }">
          <img src="../../assets/logo.png" alt="logo">
        </router-link>
        <MainNav/>
        <AuthNav/>
      </div>
    </div>
  </header>
</template>

<script>
import MainNav from '../ui/MainNav';
import AuthNav from '../ui/AuthNav';


export default {
  methods: {

  },
  components: {
    MainNav,
    AuthNav
  }
}
</script>

<style lang="scss">
.header{
  @include blockShadow;
  position: relative;
  margin-bottom: 20px;
  height: 50px;
  z-index: 2;
  background-color: $componentsBackgroundColor;
  &__logo{
    img{
      width: 80px;
    }
  }
  &__account{
    &-link{
      font-size: 14px;
      font-weight: 600;
      color: $linkColor;
      &:hover{
        color: darken($linkColor, 10%);
      }
      &:focus{
        color: darken($linkColor, 20%);
      }
    }
  }
}
</style>