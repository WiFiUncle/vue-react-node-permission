<template>
  <div>
    <CommonTable
      :data="tableData"
      :columns="columns"
      :loading="loading"
      :pagination= 'pagination'
      @page-change="pageChange"  >
      <div slot="handle" slot-scope="scope">
        <el-button @click="detailsBtnClick(scope.row)" type="primary" size="mini" >详情</el-button>
        <el-button @click="updateBtnClick(scope.row)" type="warning" size="mini" >修改</el-button>
        <el-button @click="deleteBtnClick(scope.row)" type="danger" size="mini">删除</el-button>
      </div>
    </CommonTable>
    <!--修改弹框-->
    <el-dialog :title="titleDialog" :visible.sync="userInfoVisible"
               width="400px">
      <add-user v-model="userInfo" :hide-item="hideItem" ref="updateUser"></add-user>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelUserInfo">取 消</el-button>
        <el-button type="primary" @click="confirmUserInfo()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="用户详情" :visible.sync="userDetailVisible"
               width="370px">
      <user-detail :user-info="userInfo"></user-detail>
    </el-dialog>

  </div>
</template>

<script>
import {Service, Utils, Config} from '@/js/base'
import CommonTable from '@/components/CommonTable.vue'
import AddUser from '@/views/user/components/AddUser.vue'
import UserDetail from '@/views/user/components/UserDetail.vue'

const HANDLE_TYPE = {
  DETAIL: 'DETAIL',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE'
}
export default {
  name: 'userManageTable',
  components: {
    CommonTable,
    AddUser,
    UserDetail
  },
  props: {
  },
  mixins: [],
  data () {
    return {
      columns: [{
        prop: 'username',
        label: '账号'
      }, {
        prop: 'email',
        label: '邮箱'
      }, {
        prop: 'telephone',
        label: '手机号'
      }, {
        prop: 'createTime',
        label: '创建时间',
        width: '220px'
      }, {
        prop: 'address',
        label: '地址'
      }],
      tableData: [],
      dataTotal: 0,
      loading: true,
      params: {
        pageSize: Config.PAGE_SIZE,
        pageNo: Config.PAGE_NO
      },
      pagination: {
        total: 0,
        current: Config.PAGE_NO
      },
      handleType: '',
      userInfo: {},
      titleDialog: '',
      userInfoVisible: false,
      hideItem: {password: true},
      HANDLE_TYPE: HANDLE_TYPE,
      userDetailVisible: false
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.getList(this.params)
    },
    getList (params = this.params) {
      let _this = this
      params.pageNo = this.pagination.current
      params.pageSize = this.params.pageSize
      _this.loading = true
      Service.USER.getUserList(params).then(rsp => {
        _this.tableData = rsp.data.list
        _this.pagination.total = rsp.data.total
        _this.loading = false
      }).catch(error => {
        Utils.Common.Log(error)
        _this.loading = false
      })
    },
    pageChange (val) {
      this.pagination.current = val.pageNo
      this.params.pageSize = val.pageSize
      this.getList()
    },

    updateBtnClick (row) {
      this.titleDialog = '修改用户'
      this.userInfoVisible = true
      this.handleType = HANDLE_TYPE.UPDATE
      this.userInfo = Utils.Common.deepClone(row)
    },
    detailsBtnClick (row) {
      this.handleType = HANDLE_TYPE.DETAIL
      Service.USER.getUserInfo(row._id).then(rsp => {
        this.userDetailVisible = true
        this.userInfo = rsp.data
      })
    },
    deleteBtnClick (row) {
      const _this = this
      Utils.Common.Confirm({
        tips: '确认永久删除' + row.username + '吗?'
      }).then(() => {
        Service.USER.deleteUser({
          _id: row._id
        }).then(rsp => {
          Utils.Common.showSuccessMsg('删除成功！')
          _this.getList()
        })
      })
    },
    confirmUserInfo () {
      this.updateUser(this.userInfo)
    },
    cancelUserInfo () {
      this.handleType = ''
      this.userInfoVisible = false
      this.$refs.updateUser.resetForm('form')
    },
    updateUser (userInfo) {
      const _this = this
      this.$refs.updateUser.$refs.form.validate(valid => {
        if (valid) {
          Service.USER.updateUserInfo(userInfo).then(rsp => {
            Utils.Common.showSuccessMsg('更新成功！')
            _this.userInfoVisible = false
            _this.getList()
          })
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
  @import "../../../assets/less/common";

</style>
