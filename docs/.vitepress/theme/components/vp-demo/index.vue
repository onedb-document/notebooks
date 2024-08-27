<script setup lang="ts">
import { getCurrentInstance, ref } from 'vue'
import { isClient, useClipboard, useToggle } from '@vueuse/core'
import { CaretTop } from '@element-plus/icons-vue'

/** 源代码的执行效果，采用slot传递过来 */
const props = defineProps<{
  /** 源代码，供复制使用 */
  rawSource: string
}>()

const slots = defineSlots<{ description: any; sourceCode: any }>()

const vm = getCurrentInstance()!

const { copy, isSupported } = useClipboard({
  source: decodeURIComponent(props.rawSource),
  read: false,
})

const [sourceVisible, toggleSourceVisible] = useToggle()
const demoSourceUrl = 'https://www.baidu.com/'

const sourceCodeRef = ref<HTMLButtonElement>()

const onPlaygroundClick = () => {
  const link = 'https://www.baidu.com/'
  if (!isClient) return
  window.open(link)
}

const onSourceVisibleKeydown = (e: KeyboardEvent) => {
  if (['Enter', 'Space'].includes(e.code)) {
    e.preventDefault()
    toggleSourceVisible(false)
    sourceCodeRef.value?.focus()
  }
}

const copyCode = async () => {
  const { $message } = vm.appContext.config.globalProperties
  if (!isSupported) {
    $message.error('复制失败')
  }
  try {
    await copy()
    $message.success('复制成功')
  } catch (e: any) {
    $message.error(e.message)
  }
}
</script>

<template>
  <div class="vp-demo">
    <div style="padding: 1.5rem">
      <slot></slot>
    </div>

    <ElDivider style="margin: 0" />

    <div class="op-btns">
      <!-- <ElTooltip :content="'在playground中编辑'" :show-arrow="false" :trigger="['hover', 'focus']" :trigger-keys="[]">
        <ElIcon
          :size="16"
          :aria-label="'在playground中编辑'"
          tabindex="0"
          role="link"
          class="op-btn"
          @click="onPlaygroundClick"
          @keydown.prevent.enter="onPlaygroundClick"
          @keydown.prevent.space="onPlaygroundClick"
        >
          <Edit />
        </ElIcon>
      </ElTooltip>
      <ElTooltip :content="'在github中编辑'" :show-arrow="false" :trigger="['hover', 'focus']" :trigger-keys="[]">
        <ElIcon :size="16" class="op-btn github" style="color: var(--text-color-light)">
          <a :href="demoSourceUrl" :aria-label="'在github中编辑'" rel="noreferrer noopener" target="_blank">
            <Avatar />
          </a>
        </ElIcon>
      </ElTooltip> -->
      <ElTooltip :content="'复制代码'" :show-arrow="false" :trigger="['hover', 'focus']" :trigger-keys="[]">
        <ElIcon
          :size="16"
          :aria-label="'复制代码'"
          class="op-btn"
          tabindex="0"
          role="button"
          @click="copyCode"
          @keydown.prevent.enter="copyCode"
          @keydown.prevent.space="copyCode"
        >
          <DocumentCopy />
        </ElIcon>
      </ElTooltip>
      <ElTooltip :content="'查看源代码'" :show-arrow="false" :trigger="['hover', 'focus']" :trigger-keys="[]">
        <button
          ref="sourceCodeRef"
          :aria-label="sourceVisible ? '隐藏源代码' : '查看源代码'"
          class="reset-btn el-icon op-btn"
          @click="toggleSourceVisible()"
        >
          <ElIcon :size="16">
            <View />
          </ElIcon>
        </button>
      </ElTooltip>
    </div>

    <ElCollapseTransition>
      <div v-show="sourceVisible">
        <div v-if="slots.description" class="vp-demo-description-wrapper">
          <slot name="description"></slot>
        </div>
        <div class="vp-demo-source-code-wrapper">
          <slot name="sourceCode"></slot>
        </div>
      </div>
    </ElCollapseTransition>

    <Transition name="el-fade-in-linear">
      <div
        v-show="sourceVisible"
        class="vp-demo-float-control"
        tabindex="0"
        role="button"
        @click="toggleSourceVisible(false)"
        @keydown="onSourceVisibleKeydown"
      >
        <ElIcon :size="16">
          <CaretTop />
        </ElIcon>
        <span>{{ '隐藏源代码' }}</span>
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.vp-demo {
  margin: 16px 0;
  overflow: hidden;
  border: 1px solid var(--el-border-color);
  border-radius: var(--el-border-radius-base);

  .op-btns {
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 2.5rem;

    .el-icon {
      &:hover {
        color: var(--text-color);
      }
    }

    .op-btn {
      margin: 0 0.5rem;
      cursor: pointer;
      color: var(--text-color-lighter);
      transition: 0.2s;

      &.github a {
        transition: 0.2s;
        color: var(--text-color-lighter);

        &:hover {
          color: var(--text-color);
        }
      }
    }
  }

  &-float-control {
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid var(--border-color);
    height: 44px;
    box-sizing: border-box;
    background-color: var(--bg-color, #fff);
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    margin-top: -1px;
    color: var(--el-text-color-secondary);
    cursor: pointer;
    position: sticky;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;

    span {
      font-size: 14px;
      margin-left: 10px;
    }

    &:hover {
      color: var(--el-color-primary);
    }
  }
}
.vp-demo-description-wrapper {
  padding: 0.5rem;
  border-top: 1px solid var(--el-border-color);
}
</style>

<style>
.vp-demo-source-code-wrapper > div[class*='language-'] {
  margin: 0 !important;
  border-radius: 0 !important;
}
</style>
