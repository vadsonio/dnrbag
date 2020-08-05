<template>
 <div class="body-centered-modal">
   <div class="body-centered-modal__header">
     <h2>Нет прав доступа</h2>
   </div>
   <div class="body-centered-modal__body">
     <p class="body-centered-modal__title">Извините, но создавать объявления могут только зарегистрированные пользователи.
       Войдите либо зарегистрируйтесь.
     </p>
     <div class="body-centered-modal__btns">
       <router-link class="button button--transparent" :to="{ path: '/signIn' }">Войти</router-link>
       <router-link class="button button--transparent" :to="{ path: '/signUp' }">Зарегистрироваться</router-link>
     </div>
   </div>
   <div class="body-centered-modal__footer">
     <p>Вернуться на <router-link :to="{ path: '/' }">главную</router-link></p>
   </div>
 </div>
</template>

<style lang="scss">
.body-centered-modal{
  @include absCenter;
  @include blockShadow;
  top: 40%;
  max-width: 600px;
  width: 100%;
  border-radius: 6px;
  overflow: hidden;
  background-color: #fff;
  &__header{
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    background-color: $linkColor;
    h2{
      margin: 0;
      margin-left: 10px;
      font-size: 14px;
      color: #fff;
    }
  }
  &__body{
    padding: 20px 30px;
  }
  &__title{
    margin: 0;
    margin-bottom: 20px;
    font-size: 14px;
    font-weight: 600;
    color: #333;
  }
  &__btns{
    display: flex;
    justify-content: center;
    .button{
      margin: 0 5px;
    }
  }
  &__footer{
    padding: 10px;
    text-align: center;
    border-top: 1px solid #eee;
    p{
      margin: 0;
      font-size: 13px;
      color: #888;
      a{
        font-weight: 500;
        text-decoration: underline;
        color: $linkColor;
      }
    }
  }
}
</style>