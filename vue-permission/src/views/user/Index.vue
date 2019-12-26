<template>
    <div class="main" >
      <div class="search-container">
        <search-user v-model="params" ref="searchUser"></search-user>
        <el-button type="primary" size="mini" @click="search()">
          查询
        </el-button>
        <el-button type="primary" size="mini" @click="addBtnClick()">
          新增
        </el-button>
      </div>
      <user-manage-table
        ref="table"
      ></user-manage-table>
      <!--添加用户弹框-->
      <el-dialog :title="titleDialog" :visible.sync="addUserVisible"
                 width="370px">
        <add-user v-model="addUserForm" ref="searchUser"></add-user>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelAddUser">取 消</el-button>
          <el-button type="primary" @click="add()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>
<script>

import { Utils, Service, formMixin } from '@/js/base'
import UserManageTable from '@/views/user/components/UserManageTable.vue'
import AddUser from '@/views/user/components/AddUser.vue'
import SearchUser from '@/views/user/components/Search.vue'

export default {
  name: 'UserManage',
  components: {
    SearchUser,
    UserManageTable,
    AddUser
  },
  mixins: [formMixin],
  data () {
    return {
      params: {
        username: '',
        email: '',
        telephone: '',
        address: ''
      },
      titleDialog: '',
      addUserForm: {
      },
      addUserVisible: false
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {

    },
    addBtnClick () {
      this.titleDialog = '添加用户'
      this.addUserVisible = true
    },
    add () {
      let params = JSON.parse(JSON.stringify(this.addUserForm))
      let flag = this.$refs.searchUser.checkForm('form')
      if (flag) {
        Service.USER.addUser(params).then(rsp => {
          Utils.Common.showSuccessMsg('添加成功！初始秘密为123456')
          this.addUserVisible = false
          this.$refs.table.getList(this.params)
        }).catch(error => {
          this.$log(error)
          this.addUserVisible = false
        })
      }
    },
    cancelAddUser () {
      this.addUserVisible = false
      this.$refs.searchUser.resetForm('form')
    },
    search () {
      this.$refs.table.getList(this.params)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
   /*@import "../../../assets/scss/common.scss";*/
</style>
