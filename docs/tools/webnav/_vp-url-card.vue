<script setup>
import { ElMessageBox } from 'element-plus'
const { title, url, description } = defineProps({
  title: String,
  url: String,
  description: String,
})

const showDetail = () => {
  ElMessageBox.confirm(description, title, {
    confirmButtonText: '访问',
    cancelButtonText: '取消',
  })
    .then(() => {
      window.open(url, '_blank')
    })
    .catch(() => {})
}
</script>

<template>
  <div class="vp-url-card" @click="showDetail">
    <div class="vp-url-card-title">{{ title }}</div>
    <el-divider style="margin: 0" />
    <div class="vp-url-card-body">
      <div class="vp-url-card-des ellipsis-multiline-2" v-if="description">
        {{ description }}
      </div>
      <div class="vp-url-card-url ellipsis-multiline-1" @click.stop="() => {}">
        <a :href="url" target="_blank">{{ url }}</a>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@media screen and (max-width: 400px) {
  .vp-url-card {
    width: 150px !important;
  }
}

.vp-url-card {
  display: inline-flex;
  flex-direction: column;
  width: 200px;
  margin-bottom: 16px;
  text-decoration: none;
  background-color: #fff;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  color: #000;

  &:hover {
    color: #000;
    box-shadow: var(--vp-shadow-3);
  }

  .vp-url-card-title {
    padding: 8px;
  }

  .vp-url-card-body {
    font-size: 12px;
    padding: 8px;
  }
}
</style>
