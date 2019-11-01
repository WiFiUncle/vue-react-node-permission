<template>
    <el-form :model="form" :inline="true">
        <el-form-item label="用户名：" >
          <el-input v-model="form.username" clearable @keyup.enter.native="search"></el-input>
        </el-form-item>
        <el-form-item label="邮箱: ">
          <el-input v-model="form.email" clearable @keyup.enter.native="search"></el-input>
        </el-form-item>
        <el-form-item label="手机号: ">
          <el-input v-model="form.telephone" clearable @keyup.enter.native="search"></el-input>
        </el-form-item>
        <el-form-item label="地址: ">
          <el-input v-model="form.address" clearable @keyup.enter.native="search"></el-input>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
  name: 'SearchUser',
  props: {
  },
  data () {
    return {
      form: {
        username: '',
        email: '',
        telephone: '',
        address: ''
      }
    }
  },
  watch: {
    form: {
      handler () {
        this.$emit('input', this.form)
        this.$emit('change', this.form)
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    init () {
      this.form = {...this.form, ...this.value}
    },
    search () {
      this.$parent.search()
    }
  }
}
</script>
