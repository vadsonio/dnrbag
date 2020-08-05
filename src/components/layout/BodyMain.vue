<template>
  <!-- MAIN PAGE -->
  <div class="main-overlay">
    <div class="container">
      <MainSearch/>
      <MainCategories/>
    </div>
  </div>
</template>

<script>
  import MainSearch from '@/components/ui/MainSearch.vue';
  import MainCategories from '@/components/ui/MainCategories.vue';

  export default{
    props: {
      name: ''
    },
    data(){
      return{

      }
    },
    components: {
      MainSearch,
      MainCategories
    }
  }
</script>

<style lang="scss">

</style>