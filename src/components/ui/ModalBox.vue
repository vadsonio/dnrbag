<template>
  <div class="modal-box">
    <slot></slot>
  </div>
</template>

<script>

</script>

<style lang="scss">
  .modal-box{
    @include absCenter;
    @include blockShadow;
    padding: 20px 10px;
    max-width: 400px;
    width: 100%;
    border-radius: 6px;
    background-color: rgba(250,250,250,.5);
  }
</style>