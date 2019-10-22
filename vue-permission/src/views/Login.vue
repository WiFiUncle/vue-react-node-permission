<template>
  <div class="login">
      <el-form class="login-form" :rules="rules" ref="loginForm">
        <h3 class="text-align-center">系统登录</h3>
        <el-form-item>
          <el-input type="text"  v-model="form.username" placeholder="请输入用户名"/>
        </el-form-item>
        <el-form-item>
          <el-input type="password" v-model="form.password" placeholder="请输入密码"/>
        </el-form-item>
        <el-form-item>
         <el-button class="login-btn" type="primary" @click="login()" >登录</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>
<script>
import {Utils } from '@/js/base'
export default {
  name: 'Login',
  // mixins: [formMixin],
  data () {
    return {
      form: {
        username: 'admin',
        password: '123'
      },
      rules: {
        username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
        password: [{required: true, message: '请输入密码', trigger: 'blur'}]
      }
    }
  },
  methods: {
    login () {
      let _this = this
      const flag = this.$refs['loginForm'].validate((valid) => {
        console.log(valid)
        return valid
      })
      if (true) {
        this.$store.dispatch('login', this.form).then(rsp => {
          sessionStorage.token = rsp.data.token
          _this.loginSuccess()
        })
          .catch(e => {
            let msg = '帐号或密码错误'
            msg = (e && e.data && e.data.message) ? e.data.message : msg
            Utils.reqFailMsg(msg, e)
            console.log(e)
          })
      }
    },
    loginSuccess () {
      let _this = this
      Utils.showSuccessMsg('登录成功')
      _this.$router.push({name: 'user'})
    },
    checkForm (formName) {
      return this.$refs[formName].validate((valid) => {
        console.log(valid)
        return valid
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style scoped lang="less">
  @import '../assets/less/common.less';
  .login {
    width: 100%;
    height: 100%;
    .login-btn {
      width: 100%;
    }
  }
  .login-form {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
</style>
