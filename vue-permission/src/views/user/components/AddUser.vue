<template>
    <el-form :model="form" :inline="inline" :rules="defaultRules">
      <el-form-item label="用户名" prop="username" >
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="手机号"    prop="telephone" >
        <el-input v-model="form.telephone" type="telephone"></el-input>
      </el-form-item>
      <el-form-item label="密码"  required prop="password"  >
        <el-input v-model="form.password"></el-input>
      </el-form-item>
    </el-form>
</template>

<script>
export default {
  name: 'AddUser',
  components: {
  },
  props: {
    value: {
      type: Object,
      default: () => {
        return {}
      }
    },
    roles: {
      type: Object,
      default: () => {
        return {}
      }
    },
    inline: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      form: {
      },
      defaultRules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 6, max: 16, message: '用户名长度在6到16之间', trigger: 'blur' }
        ],
        telephone: [
          { required: false, message: '请输入手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.defaultRules = this.roles ? this.roles : this.defaultRules
      this.form = {...this.form, ...this.value}
    }
  }
}
</script>
