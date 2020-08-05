<template>
  <div class="body">
    <component :is="componentToLoad"></component>
  </div>
</template>

<script>
  import { mapGetters, mapMutations, mapActions } from 'vuex';

  export default{
    data(){
      return {
        componentToUpload: 'LoadingSpinner'
      }
    },
    methods:{
      ...mapActions(['checkUserLog']),
      importComponent(componentName){
          return () => import(`@/components/ui/${componentName}`)
      }
    },
    async mounted(){
      await this.checkUserLog().then(
        success =>{
          this.componentToUpload = 'CreateAllowed';
        },
        failed =>{
          this.componentToUpload = 'CreateDenied';
        }
      )
    },
    computed: {
      componentToLoad(){
        return this.importComponent(this.componentToUpload);
      }
    }
  }
</script>

<style lang="scss">
.body{
  position: relative;
  height: calc(100vh - 70px);
}
</style>