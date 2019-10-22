<template>
    <div class="">
      <!--分页-->
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes='[5, 10, 15, 20, 30, 100]'
        :page-size="pageSize"
        layout='total, sizes, prev, pager, next, jumper'
        :total="total">
      </el-pagination>
    </div>
</template>

<script>
import {Config} from '@/js/base'
export default {
  name: 'MyPagination',
  props: {
    total: {
      type: Number,
      default: 0
    },
    currentPage: {
      type: Number,
      default: 0
    },
    pageSize: {
      type: Number,
      default: Config.PAGE_SIZE
    }
    //      pageSizes: {
    //        type: String,
    //        default: '[5, 10, 20, 30, 100]'
    //      },
  },
  data () {
    return {
    }
  },
  methods: {
    handleSizeChange (val) {
      this.$emit('size-change', val)
    },
    handleCurrentChange (val) {
      this.$emit('current-change', val)
    }
  }
}
</script>

<style lang="less" scoped>
  .el-pagination {
    margin-top: 20px;
    text-align: right;
  }
</style>
