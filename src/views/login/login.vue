<template>
  <div class="login">
    <LoginPanel :age="18" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import LoginPanel from './cpns/login-panel.vue'
export default defineComponent({
  components: {
    LoginPanel
  }
})
</script>
<style lang="less" scoped>
.login {
  width: 310px;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
