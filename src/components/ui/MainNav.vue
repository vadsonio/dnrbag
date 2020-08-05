<template>
  <nav class="main-nav">
    <ul class="main-nav__list">
      <li class="main-nav__item">
        <router-link class="main-nav__link" :to="{ path: '/' }">На главную</router-link>
      </li>
      <li class="main-nav__item">
        <router-link class="main-nav__link button" :to="{ path: '/createAdv' }">
            Создать объявление
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>

  // console.log(db);

  export default {
    name: "MainNav"
  }
</script>

<style lang="scss">
.main-nav{
  &__list{
    padding: 0;
    margin: 0;
    list-style: none;
  }
  &__item{
    margin-right: 40px;
    display: inline-block;
    &:last-child{
      margin-right: 0;
    }
  }
  &__link{
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
</style>