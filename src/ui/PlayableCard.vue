<template>
  <div class="card">
    <slot name="header"></slot>
    <div class="illustration"></div>
    <slot name="body"></slot>
    <slot name="footer"></slot>
  </div>
</template>

<style lang="scss" scoped>
.card {
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 200px;
  height: 300px;
  padding: 8px;

  .illustration {
    border: 1px solid black;
    width: 100px;
    height: 100px;
    align-self: center;
  }
}
</style>
