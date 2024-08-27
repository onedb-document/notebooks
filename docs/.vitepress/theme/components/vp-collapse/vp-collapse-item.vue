<script setup lang="ts">
import { onMounted, inject, Ref } from 'vue'

const props = defineProps({
  name: String,
})

const activeName = inject('activeName') as Ref<string>

onMounted(() => {
  if (!activeName.value && props.name) {
    activeName.value = props.name
  }
})
</script>

<template>
  <!-- 属性、插槽透传 -->
  <el-collapse-item v-bind="{ ...$attrs, ...props }">
    <template v-for="(item, key, index) in $slots" :key="index" v-slot:[key]>
      <slot :name="key"></slot>
    </template>
  </el-collapse-item>
</template>

<style></style>
