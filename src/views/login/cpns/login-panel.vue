<template>
  <div class="login-panel">
    <el-tabs type="border-card" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <span><i class="el-icon-user-solid"></i> 账号登录</span>
        </template>
        <LoginAccount ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span><i class="el-icon-mobile-phone"></i> 手机登录</span>
        </template>
        <LoginPhone ref="phoneRef" />
      </el-tab-pane>
    </el-tabs>
    <div class="account-content">
      <el-checkbox v-model="isRemember"> 记住密码 </el-checkbox>
      <el-link type="primary" :underline="false">找回密码</el-link>
    </div>
    <el-button type="primary" class="login-btn" @click="handleLoginClick"> 立即登录 </el-button>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import LoginAccount from './login-account.vue'
import LoginPhone from './login-phone.vue'

export default defineComponent({
  components: {
    LoginAccount,
    LoginPhone
  },
  props: {
    age: {
      type: Number
    }
  },
  setup() {
    // 选择账号还是手机登录
    const currentTab = ref('account')
    // 是否记住密码
    const isRemember = ref(true)
    // 拿到账号和手机组件的实例
    const accountRef = ref<InstanceType<typeof LoginAccount>>()
    const phoneRef = ref<InstanceType<typeof LoginPhone>>()

    const handleLoginClick = () => {
      if (currentTab.value === 'account') {
        accountRef.value?.loginAction(isRemember.value)
      } else {
        phoneRef.value?.loginAction()
      }
    }
    return {
      isRemember,
      handleLoginClick,
      accountRef,
      phoneRef,
      currentTab
    }
  }
})
</script>
<style lang="less" scoped>
.account-content {
  display: flex;
  justify-content: space-between;
}
.login-btn {
  width: 100%;
}
</style>
