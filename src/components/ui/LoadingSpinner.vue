<template>
  <div class="centered-load-spinner">
    <font-awesome-icon class="centered-load-spinner__icon" :icon="['fa', 'circle-notch']" />
  </div>
</template>

<script>

</script>

<style lang="scss">
  .centered-load-spinner{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    &__icon{
      font-size: 35px;
      color: $linkColor;
      animation: 1.5s spinning infinite;
    }
  }

  @keyframes spinning {
    to {
      transform: rotate(360deg);
    }
  }
</style>