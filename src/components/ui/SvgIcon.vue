<template>
  <svg
    :class="[className]"
    :style="{ width: size + 'px', height: size + 'px', color: color }"
    aria-hidden="true"
  >
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  // 图标名称
  name: {
    type: String,
    required: true
  },
  // 图标大小
  size: {
    type: Number,
    default: 20
  },
  // 图标颜色
  color: {
    type: String,
    default: 'currentColor'
  },
  // 自定义类名
  className: {
    type: String,
    default: ''
  }
})

// 计算图标路径
const iconName = computed(() => {
  return `#icon-${props.name}`
})
</script>

<style scoped>
svg {
  display: inline-block;
  vertical-align: middle;
}
</style>