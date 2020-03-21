<template>
  <div class="error-wrapper">
    <p>错误页面</p>
    <el-button @click="$router.replace({ path: '/' })">返回首页</el-button>
  </div>
</template>

<script>
export default {
  name: 'error'
}
</script>

<style lang="scss">
.error-wrapper {
  text-align: center;
  background-color: #303133;
  height: 100%;
  display: -webkit-flex;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  p {
    margin-top: 0;
    font-weight: 400;
    font-size: 19px;
    color: white;
  }
}
</style>
