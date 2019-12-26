/**
* Created By wifi_uncle on 2019/12/26
*/
<template>
    <div>
      <ul >
        <li v-for="item in showItem"
          :key="item.key">
          <span>{{item.name}}</span>
          <span>{{userInfo[item.key]}}</span>
        </li>
      </ul>
    </div>
</template>

<script>
export default {
  name: 'UserDetail',
  props: {
    userInfo: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      showItem: [{
        name: '用户名',
        key: 'username'
      }, {
        name: '邮箱',
        key: 'email'
      }, {
        name: '电话',
        key: 'telephone'
      }, {
        name: '住址',
        key: 'address'
      }]
    }
  }
}
</script>

<style lang="less" scoped>
  @import "../../../assets/less/common";
</style>
