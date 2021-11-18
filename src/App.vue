<template>
  <div class="puzzle-page">
      <div class="blur"></div>
      <router-view/>
  </div>
</template>

<style lang="scss" scoped>
.puzzle-page{
    height: 100vh;
    width: 100vw;
    background-color: #eee;
    display: flex;
    justify-content: center;
    align-items: center;
}
.blur{
    position: fixed; top: 0; left: 0; filter: blur(4px); width: 100vw; height: 100vh;
    background-image: url("./assets/bg.png");
    background-size: cover;
}
</style>
