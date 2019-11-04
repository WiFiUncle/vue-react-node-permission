<template>
    <el-form :model="form" :inline="inline" :rules="defaultRules" ref="form">
      <el-form-item label="用户名" prop="username" required   v-if="!hideItem.username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email" required   v-if="!hideItem.email">
        <el-input v-model="form.email" ></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="telephone"   v-if="!hideItem.telephone">
        <el-input v-model="form.telephone" type="telephone"></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="telephone"   v-if="!hideItem.address">
        <el-input v-model="form.address" type="telephone"></el-input>
      </el-form-item>
      <el-form-item label="密码"  prop="password"  v-if="!hideItem.password">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
    </el-form>
</template>

<script>
// import fromMixins from '@/js/mixins/form'
export default {
  name: 'AddUser',
  components: {
  },
  // mixins: [fromMixins],
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
    },
    hideItem: {
      type: Object,
      default: () => {
        return {}
      }
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
  watch: {
    form: {
      handler (val) {
        this.$emit('input', val)
        this.$emit('change', val)
      },
      immediate: true,
      deep: true
    },
    value: {
      handler (val) {
        this.form = val
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    init () {
      this.defaultRules = this.roles ? this.roles : this.defaultRules
      this.form = {...this.form, ...this.value}
    },
    checkForm () {
      return this.$refs['form'].validate((valid) => {
        return valid
      })
    },
    resetForm (formName) {
      this.$refs['form'].resetFields()
    }
  }
}
</script>
