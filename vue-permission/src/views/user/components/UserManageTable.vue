<template>
  <div>
    <CommonTable
      :data="tableData"
      :columns="columns"
      :pagination= 'pagination'
      @page-change="pageChange">
      <div slot="handle">
        <el-button @click="detailsBtnClick(scope.row)" type="warning" size="mini" >详情</el-button>
        <el-button @click="deleteBtnClick(scope.row)" type="danger" size="mini">删除</el-button>
      </div>
    </CommonTable>
  </div>
</template>

<script>
import {Service, Utils, Config} from '@/js/base'
import MyPagination from '@/components/MyPagination.vue'
import CommonTable from '@/components/CommonTable.vue'
import { paginationMixin } from '@/js/mixins'

export default {
  name: 'userManageTable',
  components: {
    MyPagination,
    CommonTable
  },
  props: {
  },
  mixins: [paginationMixin],
  data () {
    return {
      columns: [{
        prop: 'username',
        label: '账号'
      }, {
        prop: 'roleName',
        label: '角色'
      }, {
        prop: 'telephone',
        label: '手机号'
      }],
      tableData: [
      ],
      dataTotal: 0,
      loading: true,
      params: {
        pageSize: Config.PAGE_SIZE,
        pageNo: Config.PAGE_NO
      },
      pagination: {
        total: 0,
        current: Config.PAGE_NO
      }
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
      this.params.pageNo = this.pagination.current
      _this.loading = true
      Service.USER.getUserList(params).then(rsp => {
        _this.tableData = rsp.data
        _this.pagination.total = 11 // rsp.total
        _this.loading = false
      }).catch(error => {
        Utils.Log(error)
        _this.loading = false
      })
    },
    pageChange (val) {
      this.pagination.current = val.pageNo
      this.getList()
    },
    detailsBtnClick () {

    },
    deleteBtnClick (row) {
      let _this = this
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
