<template>
    <el-form :model="form" :inline="true">
        <el-form-item label="用户名：" class="inline-block">
          <el-input v-model="form.name" clearable @keyup.enter.native="search"></el-input>
        </el-form-item>
        <el-form-item label="邮箱: " class="inline-block">
          <el-input v-model="form.email" clearable @keyup.enter.native="search"></el-input>
        </el-form-item>
        <el-form-item label="手机号: " class="inline-block">
          <el-input v-model="form.telephone" clearable @keyup.enter.native="search"></el-input>
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
        name: '',
        email: '',
        telephone: '',
        realName: ''
      }
    }
  },
  watch: {
    form: {
      handler (val) {
        this.search(val)
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    init () {
      this.form = {...this.form, ...this.value}
    },
    search (val = this.form) {
      this.$emit('input', val)
      this.$emit('change', val)
    }
  }
}
</script>
