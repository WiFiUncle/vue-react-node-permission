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
    <!--用户弹框-->
    <el-dialog :title="titleDialog" :visible.sync="userInfoVisible"
               width="400px">
      <add-role v-model="userInfo" :hide-item="hideItem"></add-role>
      <div slot="footer" class="dialog-footer" v-if="handleType === HANDLE_TYPE.UPDATE">
        <el-button @click="cancelUserInfo">取 消</el-button>
        <el-button type="primary" @click="confirmUserInfo()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {Service, Utils, Config} from '@/js/base'
import CommonTable from '@/components/CommonTable.vue'
import AddRole from '@/views/user/components/AddRole.vue'
const HANDLE_TYPE = {
  DETAIL: 'DETAIL',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE'
}
export default {
  name: 'userManageTable',
  components: {
    CommonTable,
    AddRole,
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
      HANDLE_TYPE: HANDLE_TYPE
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
        Utils.Log(error)
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
      this.userInfo = row
    },
    detailsBtnClick (row) {
      const _this = this
      this.handleType = HANDLE_TYPE.DETAIL
      Service.USER.getUserInfo({
        _id: row._id
      }).then(rsp => {
        _this.titleDialog = '查看详情'
        _this.userInfoVisible = true
        _this.userInfo = rsp.data
      })
    },
    deleteBtnClick (row) {
      const _this = this
      Utils.Confirm({
        tips: '确认永久删除' + row.username + '吗?'
      }).then(() => {
        Service.USER.deleteUser({
          _id: row._id
        }).then(rsp => {
          Utils.showSuccessMsg('删除成功！')
          _this.getList()
        }).catch(() => {
          // Utils.showFailMsg('删除失败！')
        })
      })
    },
    confirmUserInfo () {
      this.updateUser(this.userInfo)
    },
    cancelUserInfo () {
      this.handleType = ''
      this.userInfoVisible = false
    },
    updateUser (row) {
      const _this = this
      Service.USER.updateUserInfo(row).then(rsp => {
        Utils.showSuccessMsg('更新成功！')
        _this.userInfoVisible = false
        _this.getList()
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
 // @import "../../../assets/scss/_tabelContainer.scss";
  /*.el-radio {*/
  /*  margin-top: 15px;*/
  /*}*/
</style>
