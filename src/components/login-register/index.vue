<template>
  <div class="login-register-wrapper">
    <el-tabs v-model="activeName">
      <el-tab-pane label="登陆" name="login">
        <el-form
          label-position="right"
          class="login-form-wrapper form-wrapper"
          :model="loginRegisterForm"
          ref="loginForm"
          :rules="loginRules"
        >
          <el-form-item prop="username">
            <el-input placeholder="请输入用户名" v-model="loginRegisterForm.username"></el-input>
          </el-form-item>
          <el-form-item prop="password" ref="loginFormPasswordItem">
            <el-input
              placeholder="请输入密码"
              v-model="loginRegisterForm.password"
              :type="showPassword? '':'password'"
              class="password-input"
            >
              <i
                class="password-input-icon el-icon-remove"
                slot="suffix"
                @click="onShowPasswordIconClick"
                :style="{'color': showPassword ? '#606266' : '#409eff'}"
              ></i>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="rememberMe">记住我</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :loading="loginLoading" @click="onLoginButtonClick">登录</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="注册" name="register">
        <el-form
          class="register-form-wrapper form-wrapper"
          ref="registerForm"
          :model="loginRegisterForm"
          :rules="loginRules"
        >
          <el-form-item prop="username">
            <el-input placeholder="用户名（6-16位字符组成）" v-model="loginRegisterForm.username"></el-input>
          </el-form-item>
          <el-form-item prop="nickname">
            <el-input placeholder="昵称（3-10位字符组成）" v-model="loginRegisterForm.nickname"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              placeholder="密码（6-16位字符组成，区分大小写）"
              v-model="loginRegisterForm.password"
              :type="showPassword? '':'password'"
              class="password-input"
            >
              <i
                class="password-input-icon el-icon-remove"
                slot="suffix"
                @click="onShowPasswordIconClick"
                :style="{'color': showPassword ? '#606266' : '#409eff'}"
              ></i>
            </el-input>
          </el-form-item>
          <el-form-item ref="allowContractItem" class="allowContractItem">
            <el-checkbox v-model="allowContract">我已同意《用户使用协议》和《隐私政策》</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onRegisterButtonClick" :loading="registerLoading">注册</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {
  isValidUsername,
  isValidPassword,
  isValidNickname
} from '@/config/validate'
import { mapActions } from 'vuex'
import { register } from '@/api/account'

export default {
  name: 'login-register',
  data () {
    const validateUsername = (rule, value, callback) => {
      if (!isValidUsername(value)) {
        callback(new Error('用户名应在6-16位之间，只含-、_、字母、数字'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (!isValidPassword(value)) {
        callback(
          new Error('密码应在6-16位之间，必须是包含大小写字母和数字的组合')
        )
      } else {
        callback()
      }
    }
    const validateNickname = (rule, value, callback) => {
      if (!isValidNickname(value)) {
        callback(new Error('昵称应在3-10位之间，不包含特殊字符'))
      } else {
        callback()
      }
    }
    return {
      activeName: 'login',
      rememberMe: true,
      allowContract: false,
      showPassword: false,
      loginLoading: false,
      registerLoading: false,
      loginRegisterForm: {
        username: '',
        password: '',
        nickname: ''
      },
      loginRules: {
        username: [
          { required: true, trigger: 'change', validator: validateUsername }
        ],
        password: [
          { required: true, trigger: 'change', validator: validatePassword }
        ],
        nickname: [
          { required: true, trigger: 'change', validator: validateNickname }
        ]
      }
    }
  },
  methods: {
    ...mapActions('account', ['login']),
    onShowPasswordIconClick () {
      this.showPassword = !this.showPassword
    },
    onLoginButtonClick () {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          this.loginLoading = true
          try {
            await this.login({
              username: this.loginRegisterForm.username,
              password: this.loginRegisterForm.password
            })
            this.loginLoading = false
            console.log('登录成功')
            this.$router.go(0)
          } catch (error) {
            console.log('登录失败')
            this.loginLoading = false
            this.$refs.loginFormPasswordItem.validateState = 'error'
            this.$refs.loginFormPasswordItem.validateMessage =
              '用户名或密码错误'
          }
        } else {
          console.log('参数验证不合法！')
          return false
        }
      })
    },
    onRegisterButtonClick () {
      if (!this.allowContract) {
        this.$refs.allowContractItem.validateState = 'error'
        this.$refs.allowContractItem.validateMessage =
          '请同意《用户使用协议》和《隐私政策》'
        return
      }
      this.$refs.registerForm.validate(async valid => {
        if (valid) {
          this.registerLoading = true
          // 首先尝试进行注册操作
          try {
            await register({
              username: this.loginRegisterForm.username,
              password: this.loginRegisterForm.password,
              nickname: this.loginRegisterForm.nickname
            })
            this.registerLoading = false
            console.log('注册成功')
          } catch (error) {
            this.registerLoading = false
            console.log('注册失败')
            return false
          }
          // 注册完成后直接使用注册的用户名和密码进行登录，并刷新页面
          try {
            await this.login({
              username: this.loginRegisterForm.username,
              password: this.loginRegisterForm.password
            })
            console.log('登录成功')
            this.$router.go(0)
          } catch (error) {
            console.log('登录失败')
            return false
          }
        } else {
          console.log('参数验证不合法！')
          return false
        }
      })
    }
  },
  watch: {
    allowContract (value) {
      if (value) this.$refs.allowContractItem.clearValidate()
    }
  }
}
</script>

<style lang="scss">
.login-register-wrapper {
  padding: 0 10px 0 10px;
  .form-wrapper {
    margin-top: 15px;
    .el-input {
      width: 100%;
    }
    .el-button {
      width: 100%;
    }
  }
  .el-tabs__nav-wrap::after {
    background-color: white !important;
  }
  .el-tabs__item {
    font-size: 17px;
  }
  .login-form-wrapper {
    .password-input {
      .el-input__suffix {
        margin-right: 7px;
      }
      .password-input-icon {
        font-size: 16px;
      }
    }
  }
  .register-form-wrapper {
    .password-input {
      .el-input__suffix {
        margin-right: 7px;
      }
      .password-input-icon {
        font-size: 16px;
      }
    }
    .allowContractItem {
      .el-form-item__error {
        margin-top: -10px;
      }
    }
  }
}
</style>
