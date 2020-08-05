<template>
  <div id="app">
    <AppMain/>
  </div>
</template>

<script>
  import AppMain from './components/layout/AppMain';

  // console.log(db);

  export default {
    name: 'App',
    components: {
      AppMain
    }
  }
</script>

<style lang="scss">
  /*@import './sass/main.scss';*/
  html, body{
    height: 100%;
  }
  body{
    background-position: center;
    background-size: cover;
    background-image: url("./assets/background-3.png");
    background-repeat: no-repeat;
    background-attachment: fixed;
  }

</style>
