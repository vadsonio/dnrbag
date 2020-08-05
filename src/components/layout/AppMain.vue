<template>
  <div>
    <AppHeader/>
    <router-view></router-view>
  </div>
</template>

<script>
  import AppHeader from './AppHeader';

  import { mapGetters, mapMutations, mapActions } from 'vuex';

  export default {
    name: "AppMain",
    methods:{
      ...mapActions(['initUserLog'])
    },
    components: {
      AppHeader
    }
  }

</script>

<style lang="scss">

</style>