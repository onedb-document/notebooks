<script setup lang="ts">
import { ref, provide } from 'vue'

const activeName = ref('')

provide('activeName', activeName)
</script>

<template>
  <el-collapse
    class="vp-collapse vp-theme-block"
    ref="collapse"
    accordion
    v-model="activeName"
    v-bind="$attrs"
  >
    <slot></slot>
  </el-collapse>
</template>

<style></style>
