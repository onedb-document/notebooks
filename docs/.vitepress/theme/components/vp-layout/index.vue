<script setup>
import DefaultTheme from 'vitepress/theme'
import { onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vitepress'
import mermaid from 'mermaid'

mermaid.initialize({ startOnLoad: false })
const router = useRouter()
const { Layout } = DefaultTheme

// 创建一个IntersectionObserver实例
// const observer = new IntersectionObserver(entries => {
//   entries.forEach(entry => {
//     if (entry.isIntersecting) {
//       // 元素进入视口时的操作
//       // console.log('元素进入视口', entry)
//       mermaid.run({ nodes: [entry.target] })
//     } else {
//       // 元素离开视口时的操作
//       // console.log('元素离开视口')
//     }
//   })
// })

const observe = () => {
  // 选择需要观察的目标元素
  // const graphElList = document.querySelectorAll('.mermaid')
  // graphElList.forEach(graph => observer.observe(graph))
}

router.onAfterRouteChanged = () => {
  console.log('route changed')
  observe()
}

onMounted(() => {
  console.log('layout mounted')
  observe()
})

onUnmounted(() => {
  console.log('layout unmounted')
  // observer.disconnect()
})
</script>

<template>
  <div class="vp-layout-wrapper">
    <el-backtop></el-backtop>
    <Layout></Layout>
  </div>
</template>

<style></style>
