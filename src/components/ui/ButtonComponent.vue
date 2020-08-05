<template>
  <component :is="typeOfComponent" class="button">
    {{componentType}}
    <slot></slot>
  </component>
</template>

<script>
  export default{
    name: 'buttonLink',
    props: {
      buttonType: {
        type: String,
        required: true
      }
    },
    data(){
      return{
        typeOfComponent: ''
      }
    },
    computed: {
      componentType(){
        this.buttonType === 'link' ? this.typeOfComponent = "a" : this.typeOfComponent="button"
      }
    }
  }

</script>

<style lang="scss">
.button{

}
</style>