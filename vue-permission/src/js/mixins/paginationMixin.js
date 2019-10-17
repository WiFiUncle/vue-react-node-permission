/**
 * Created By WiFi ON 2018/11/18
 * 翻页
 */
export default {
  methods: {
    pageNoChange(pageNo) {
      this.params.pageNo = pageNo;
      this.getList ();
    },
    pageSizeChange (pageSize) {
      this.params.pageSize = pageSize;
      this.getList ();
    },
    indexNo(index) {
      return (this.params.pageSize * (this.params.pageNo - 1 )) + index + 1;
    },
  }
}
