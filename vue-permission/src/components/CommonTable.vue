<template>
  <div class="table-container">
    <el-table
      :data="data"
      v-loading="loading"
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
        v-if="showHandle"
        label="操作"
        width="240">
        <template slot-scope="scope" >
          <slot name="handle" :row="scope.row"></slot>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <my-pagination
      v-if="showPagination"
      :total="pagination.total"
      :page-size="params.pageSize"
      @size-change="pageSizeChange"
      @current-change="pageNoChange">
    </my-pagination>
  </div>
</template>

<script>
import { Config } from '@/js/base'
import MyPagination from '@/components/MyPagination.vue'
import { paginationMixin } from '@/js/mixins'

export default {
  name: 'CommonTable',
  components: {
    MyPagination
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    /**
     * 列表数据
     */
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    /**
     * 列
     */
    columns: {
      type: Array,
      default: () => {
        return []
      }
    },
    /**
     * 是否显示操作栏
     */
    showHandle: {
      type: Boolean,
      default: true
    },
    /**
     * 是否显示分页组件
     */
    showPagination: {
      type: Boolean,
      default: true
    },
    /**
     * 分页
     */
    pagination: {
      type: Object,
      default: () => {
        return {
          total: 0,
          current: 1
        }
      }
    },
    onChange: {
      type: Function,
      default: () => {
        return () => {}
      }
    }
  },
  mixins: [paginationMixin],
  data () {
    return {
      params: {
        pageSize: Config.PAGE_SIZE,
        pageNo: Config.PAGE_NO
      }
    }
  },
  methods: {
    pageNoChange (pageNo) {
      this.params.pageNo = pageNo
      this.pageChange(this.params)
    },
    pageSizeChange (pageSize) {
      this.params.pageSize = pageSize
      this.$emit('size-change', pageSize)
      this.pageChange(this.params)
    },
    pageChange (val) {
      this.$emit('page-change', val)
    },
    indexNo (index) {
      return (this.params.pageSize * (this.params.pageNo - 1)) + index + 1
    }
  }
}
</script>
