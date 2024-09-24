<script setup>
import { devopsData } from './_vp-url-data.ts'
import VpUrlGroup from './_vp-url-group.vue'
</script>

# 运维

## CI/CD

<VpUrlGroup :data="devopsData['CI/CD']" />

## 服务部署

<VpUrlGroup :data="devopsData['服务部署']" />

## 服务监控

<VpUrlGroup :data="devopsData['服务监控']" />
