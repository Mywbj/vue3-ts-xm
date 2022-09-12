<template>
  <div class="login-account">
    <el-form :rules="rules" :model="account" ref="formRef">
      <el-form-item label="账号" prop="username">
        <el-input v-model="account.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { ElForm } from 'element-plus'
import localCache from '@/utils/cache'
// 账号密码验证规则
import { rules } from '../config/account-config'
export default defineComponent({
  setup() {
    const store = useStore()
    const account = reactive({
      username: localCache.getCache('username'),
      password: localCache.getCache('password')
    })
    const formRef = ref<InstanceType<typeof ElForm>>()

    const loginAction = (isRemember: boolean) => {
      formRef.value?.validate((valid) => {
        if (valid) {
          if (isRemember) {
            localCache.setCache('username', account.username)
            localCache.setCache('password', account.password)
          } else {
            localCache.deleteCache('username')
            localCache.deleteCache('password')
          }
          // 开始登录
          store.dispatch('login/accountLoginAction', { ...account })
        }
      })
    }

    return {
      account,
      rules,
      formRef,
      loginAction
    }
  }
})
</script>
<style lang="less" scoped></style>
