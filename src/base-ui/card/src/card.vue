<template>
  <div class="bj-card">
    <div class="top">
      <slot name="top">
        {{ title }}
      </slot>
    </div>
    <div class="content">
      <slot name="content">123</slot>
    </div>
    <div class="buttom">
      <slot name="buttom"></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue'
defineProps({
  title: {
    type: String,
    default: '默认title'
  }
})
</script>
<style lang="less" scoped>
.bj-card {
  background-color: #fff;
  box-shadow: 0px 1px 6px rgba(0, 0, 0, .1);
  // border-radius: 5px;
  .top {
    padding: 10px;
    border-bottom: 1px solid #F4F5F7;
  }
  .content {
    padding: 5px;
  }
}
</style>
