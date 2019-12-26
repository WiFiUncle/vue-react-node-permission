/**
* Created By wifi_uncle on 2019/12/26
*/
<template>
    <div>
      <ul>
        <li>dddd</li>
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
        key: ''
      }]
    }
  }
}
</script>

<style scoped>

</style>
