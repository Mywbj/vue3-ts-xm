<template>
  <div class="login-phone">
    <el-form label-width="65px" :rules="rules" :model="phoneData">
      <el-form-item label="手机号" prop="phoneNum">
        <el-input v-model="phoneData.phoneNum" />
      </el-form-item>
      <el-form-item label="验证码">
        <div class="bottom-box">
          <el-input v-model="phoneData.code" />
          <el-button type="primary" class="right-btn">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'
// 验证手机号规则
import { rules } from '../config/phone-config'
export default defineComponent({
  setup() {
    const phoneData = reactive({
      phoneNum: '',
      code: ''
    })

    const loginAction = () => {
      console.log('phone登录')
    }

    return {
      phoneData,
      rules,
      loginAction
    }
  }
})
</script>
<style lang="less" scoped>
.bottom-box {
  display: flex;
  .right-btn {
    margin-left: 7px;
  }
}
</style>
