<template>
  <div class="table-container">
    <el-table
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%">
      <el-table-column
        type="index"
        label="序号"
        width="50">
      </el-table-column>
      <el-table-column
        v-for="item in columns"
        :prop="item.prop"
        :width="item.width"
        :key="item.prop"
        :label="item.label">
      </el-table-column>
      <el-table-column
        label="操作"
        width="240">
        <template slot-scope="scope" >
          <el-button @click="detailsBtnClick(scope.row)" type="warning" size="mini" >详情</el-button>
          <el-button @click="deleteBtnClick(scope.row)" type="danger" size="mini"  v-if="false">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <my-pagination
      v-if="false"
      :total="dataTotal"
      :page-size="params.pageSize"
      @handleSizeChangeSignal="pageSizeChange"
      @handleCurrentChangeSignal="pageNoChange">
    </my-pagination>
  </div>
</template>

<script>
import {requestData, Utils, Config} from '@/js/base'
import MyPagination from '@/components/MyPagination.vue'
import { paginationMixin } from '@/js/mixins'

export default {
  name: 'userManageTable',
  components: {
    MyPagination
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
    getList (params) {
      let _this = this
      _this.loading = true
      requestData.USER.getUserList(params).then(rsp => {
        _this.tableData = rsp.data
        _this.dataTotal = rsp.total
        _this.loading = false
      }).catch(error => {
        Utils.Log(error)
        _this.loading = false
      })
    },
    detailsBtnClick () {

    },
    deleteBtnClick (row) {
      let _this = this
      Utils.Confirm({
        tips: '确认永久删除' + row.username + '吗?'
      }).then(() => {
        requestData.USER.deleteUser({
          id: row._id
        }).then(rsp => {
          Utils.showSuccessMsg('删除成功！')
          _this.getList()
        }).catch(error => {
          Utils.showFailMsg('删除失败！')
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
