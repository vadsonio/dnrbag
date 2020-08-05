<template>
  <div class="info-popup info-popup--pink">
    <div class="info-popup__icon-block">
      <font-awesome-icon class="info-popup__icon" :icon="['fas', 'exclamation-triangle']" />
    </div>
    <div class="info-popup__text-area">
      {{infoText}}
    </div>
  </div>
</template>

<script>
  export default{
    props: {
      infoText: {
        type: String,
        required: true
      }
    },
    data(){
      return{

      }
    }
  }

</script>

<style lang="scss">
.info-popup{
  display: flex;
  margin-bottom: 10px;
  border-radius: 10px;
  overflow: hidden;
  min-height: 50px;
  color: #fff;
  background: rgba(58, 54, 70, .9);
  &--pink{
    background: rgba(123, 128, 220, .7);
    .info-popup__icon-block{
      background: #7B80DC;
    }
    .info-popup__icon{
      color: #fff;
    }
  }
  &__icon-block{
    padding: 20px;
    position: relative;
    width: 10%;
    flex-shrink: 0;
    background: rgba(58, 54, 70, 1);
  }
  &__icon{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 20px;
    color: #ffd400;
  }
  &__text-area{
    padding: 10px;
    font-size: 14px;
    width: 100%;
    display: flex;
    align-items: center;
  }
}
</style>

