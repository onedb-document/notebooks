<script setup>
import VpUrlCard from './_vp-url-card.vue'
const { data } = defineProps({
  data: Array,
})
</script>

<template>
  <div class="vp-url-group">
    <vp-url-card
      v-for="item in data"
      :title="item.title"
      :description="item.description"
      :url="item.url"
    />
    <div v-for="item in 6" class="vp-url-group-hidden"></div>
  </div>
</template>

<style scoped lang="scss">
.vp-url-group {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  .vp-url-group-hidden {
    width: 200px;
    height: 0;
  }
}
</style>
