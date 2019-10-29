<template>
  <el-row :gutter="24">
    <el-col :xs="10" :sm="8" :md="8">
      <div>
          <span class="font-main-color ">{{projectName}}</span>
      </div>
    </el-col>
    <el-col :xs="10" :sm="14" :md="14" class="hidden-xs-only">
      <div style="height: 1px"></div>
    </el-col>
    <el-col :xs="4" :sm="2" :md="2" class="text-right">
      <el-dropdown trigger="click" placement="bottom-end" @command="handleClick">
        <el-button type="text"  class="font-main-color " v-if="userInfo">
          {{userInfo.username}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown"  class="font-main-color ">
          <el-dropdown-item command="updatepwd" divided>修改密码</el-dropdown-item>
          <el-dropdown-item command="logout" divided>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
    <!--修改密码-->
    <el-dialog title="修改密码" :visible.sync="modifyPwdDialogVisible"
               class="update-pwd"
               width="400px">
      <UpdatePwd
        @status-change="statusChange"
      />
    </el-dialog>
  </el-row>
</template>

<script>
import 'element-ui/lib/theme-chalk/display.css'

// import { Service } from '@/js/base'
// import UpdatePwd from "@/components/UpdatePwd";;
import userInfoMixins from '@/js/mixins/userInfo-mixin.js'
// import BASE_CONFIG from '@/js/baseConfig'
export default {
  name: 'AppHeader',
  components: {
    //    ElCol,
    //      VThemePicker,
    //    UpdatePwd,
  },
  mixins: [userInfoMixins],
  data () {
    return {
      projectName: 'XXX管理系统', // BASE_CONFIG.PROJECT_NAME,
      modifyPwdDialogVisible: false
    }
  },
  methods: {
    logout () {
      //      service.USER.logout({},
      //        rsp => {
      //          sessionStorage.token = "";
      //        },
      //        error => {
      //
      //        });
      this.$router.push('/')
    },
    handleClick (e) {
      if (e === 'disabledTab') {
        localStorage.DISABLE_TAB = !this.disabledTab
        location.reload()
      } else if (e === 'logout') {
        this.logout()
        //      } else if (e === 'updatepwd') {
        //        this.modifyPwdDialogVisible = true;
        //      } else if (e === 'userCenter') {
        //        this.$router.push("/userCenter");
      }
    },
    statusChange (type) {
      if (type === 'cancel') {
        this.modifyPwdDialogVisible = false
      }
    }
  }
}
</script>

<style>
  .update-pwd .dialog-footer .el-button span{
    color: #606266;
  }
  .font-main-color {
    color: rgb(191, 203, 217);
  }
</style>
