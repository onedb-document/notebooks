<!--.vitepress/theme/MyLayout.vue-->
<script setup lang="ts">
import { onMounted, onUnmounted, watch } from "vue"
import { useRouter, useData } from "vitepress"
import * as echarts from "echarts"
import { utils, getElId } from "./utils.mts"

const router = useRouter()

const props = defineProps({
  path: {
    type: String,
    required: false,
  },
  style: {
    type: Object,
    required: false,
  },
})

const { isDark } = useData()

const id = getElId()

onMounted(() => {
  console.log("MindTree mounted")
  const mychart = echarts.init(document.getElementById(id))
  mychart.setOption(utils.getOption(props.path ?? utils.getPath(router), { isDark: isDark.value }))
  mychart.on("click", params => {
    const data = params.data as any
    const link = data?.value
    const children = data?.children
    /** 有子节点的话，就展开，而不是进行跳转 */
    if (Array.isArray(children) && children.length) return
    if (link) router.go(link)
  })
  watch(isDark, () => {
    mychart.setOption(utils.getOption(props.path ?? utils.getPath(router), { isDark: isDark.value }))
  })
})

onUnmounted(() => {
  console.log("MindTree unmounted")
})
</script>

<template>
  <div :id="id" :style="[{ width: '100%', height: '500px', ...props.style }]"></div>
</template>
