<template>
  <div class="block-wrap main-search">
    <font-awesome-icon class="main-search__search-icon" :icon="['fa', 'search']" />
    <input class="main-search__input" type="text" placeholder="Что-нибудь ищете? Начните писать...">
    <button class="main-search__button">Искать</button>
  </div>
</template>

<script>
  export default {
    data(){
      return {

      }
    }
  }
</script>

<style lang="scss">
  .main-search{
    position: relative;
    width: 80%;
    margin: 0 auto 20px;
    display: flex;
    /*background: rgba(255,255,255,.4)!important;*/
    background: #fff;
    &__search-icon{
      position: absolute;
      top: 50%;
      left: 40px;
      transform: translateY(-50%);
      font-size: 18px;
      color: #ccc;
    }
    &__input{
      padding: 10px;
      padding-left: 50px;
      flex-grow: 1;
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
      border: 1px solid #dedede;
      outline: none;
      &:focus{
        border-color: $linkColor;
      }
      &::-webkit-input-placeholder { /* Chrome/Opera/Safari */
        font-size: 15px;
        color: #cecece;
      }
      &::-moz-placeholder { /* Firefox 19+ */
        font-size: 15px;
        color: #cecece;
      }
      &:-ms-input-placeholder { /* IE 10+ */
        font-size: 15px;
        color: #cecece;
      }
      &:-moz-placeholder { /* Firefox 18- */
        font-size: 15px;
        color: #cecece;
      }
      &.error{
        border-color: #EC7063;
      }
    }
    &__button{
      min-width: 170px;
      border: none;
      border-radius: 4px;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      transition: .3s;
      color: #fff;
      background: $linkColor;
      &:hover{
        color: #fff!important;
        background: darken($linkColor, 10%);
      }
      &:focus{
        color: #fff!important;
        background: darken($linkColor, 10%);
      }
    }
  }
</style>