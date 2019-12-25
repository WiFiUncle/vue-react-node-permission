<template>
  <div class="login-main" :style="{backgroundImage: 'url(' + bgImgs[activeBgIndex] + ')'}">
    <div class="container">
      <div class="main_content">
        <p class="title">后台管理系统</p>
        <form>
          <div class="form-group mg-t20">
            <input v-model="form.username" class="login_input" placeholder="请输入用户名">
          </div>
          <div class="form-group mg-t20">
            <input v-model="form.pwd" type="password" class="login_input" placeholder="请输入密码">
          </div>
          <div class="checkbox mg-b25">
            <label>
              <input type="checkbox"><span style="">记住我的登录信息</span>
            </label>
          </div>
          <button class="login_btn" @click="login">登 录</button>
        </form>
      </div>
    </div>
    <button @click="updateBg" class="update-bg">更换背景图</button>
  </div>
</template>
<script>

import md5 from 'md5'
import { Utils } from '@/js/base'
import LoginBg1 from '@/assets/images/login/login-bg-1.jpg'
import LoginBg2 from '@/assets/images/login/login-bg-2.jpg'
import LoginBg3 from '@/assets/images/login/login-bg-3.jpg'
import LoginBg4 from '@/assets/images/login/login-bg-4.jpg'
export default {
  name: 'Login',
  data () {
    return {
      form: {
        username: 'admin',
        pwd: '123456'
      },
      activeBgIndex: 0,
      bgImgs: [
        LoginBg1,
        LoginBg2,
        LoginBg3,
        LoginBg4
      ]
    }
  },
  methods: {
    login () {
      let _this = this
      if (!this.form.username || !this.form.pwd) {
        Utils.showWarnMsg('请输入账号或密码')
        return
      }
      this.$store.dispatch('login', {
        username: this.form.username,
        password: md5(this.form.pwd)
      }).then(rsp => {
        if (rsp.data) {
          const data = rsp.data
          sessionStorage.token = data.token
          sessionStorage._id = data._id
          _this.loginSuccess()
        }
      })
        .catch(e => {
          let msg = '帐号或密码错误'
          msg = (e && e.data && e.data.message) ? e.data.message : msg
          Utils.reqFailMsg(msg, e)
          console.log(e)
        })
    },
    loginSuccess () {
      let _this = this
      Utils.showSuccessMsg('登录成功')
      _this.$router.push({name: 'user'})
    },
    updateBg () {
      let index = this.activeBgIndex + 1
      this.activeBgIndex = index > this.bgImgs.length - 1 ? 0 : index
    }
  }
}
</script>
<style scoped lang="less">
  @import '../assets/less/common.less';
  .login-main {
    @main-color: #3872f6;
    @font-color: #fff;
    // background:url('../assets/images/login-bg-1.jpg');
    height: 100%;
    .container {
      width: 400px;
      height: 450px;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      margin:auto;
      .main_content {
        padding: 50px;
        background: url('../assets/images/login-bg-repeat.png') repeat;
        margin-left: auto;
        margin-right: auto;
        text-align: left;
        float: none;
        border-radius: 8px;
      }
      .title {
        color: @font-color;
        text-align: center;
        font-size: 20px;
        letter-spacing: 2px;
      }
      .checkbox {
        color: @font-color;
        padding: 12px 0;
        font-size: 12px;
        input {
          position: relative;
          top: 3px;
        }
      }
      .form-group{
        margin-top: 20px;
      }
      .login_btn{
        display: block;
        background: @main-color;
        color: @font-color;
        font-size: 15px;
        width: 100%;
        line-height: 40px;
        border-radius: 3px;
        border: none;
      }
      .login_input{
        box-sizing: border-box;
        width: 100%;
        color: @font-color;
        border: 1px solid @main-color;
        border-radius: 3px;
        line-height: 40px;
        padding: 2px 5px 2px 10px;
        background: none;
      }
    }
    .update-bg {
      float: right;
      border: none;
      background: transparent;
      color: #fff;
      padding-top: 10px;
    }
    .update-bg:focus {
      outline: none;
    }
  }
</style>
