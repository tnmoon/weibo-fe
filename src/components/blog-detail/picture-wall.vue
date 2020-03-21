<template>
  <div
    class="picture-wall-wrapper"
    :style="{'width':urlArray.length === 4 || urlArray.length === 8 ? '465px' : '350px'}"
  >
    <img
      :src="'http://q5s8clnvd.bkt.clouddn.com/'+urlArray[i-1]"
      :style="{'width':urlArray.length === 1 ? '167px' : '110px'}"
      v-for="i in urlArray.length"
      :key="i"
    />
  </div>
</template>

<script>
export default {
  name: 'picture-wall',
  props: {
    urlArray: {
      type: Array,
      required: false
    }
  }
}
</script>

<style lang="scss">
.picture-wall-wrapper {
  img {
    margin: 0 4px 0 0;
    border: 1px solid rgba(0, 0, 0, 0.05);
  }
}
</style>
