<template>
  <div class="header">
    <router-link to="/goodList">
      <el-input class="header-in"
                placeholder="搜索"
                prefix-icon="el-icon-search"
                disabled>
      </el-input>
    </router-link>
  </div>
</template>
<script>
export default {
  name: "Search"
}
</script>
<style lang="stylus" scoped>
.header {
  width: 100%;
  height: 1.45rem;
  line-height: 1.45rem;
  text-align: center;
  position: fixed;
  z-index: 1;

  .header-in {
    width: 70%;
    display: inline-block;
    font-size: 0.35rem;

    >>>.el-input__inner {
      border-radius: 2rem;
      height: 0.95rem;
      font-size: 0.28rem;
    }
  }
}
</style>
