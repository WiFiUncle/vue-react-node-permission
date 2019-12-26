<template>
  <div>
    <el-form :model="form"
             :label-position="labelPosition"
             label-width="80px"
             :inline="inline" :rules="defaultRules" ref="form">
      <el-form-item label="用户名" prop="username" v-if="!hideItem.username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email"  v-if="!hideItem.email">
        <el-input v-model="form.email" ></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="telephone"  v-if="!hideItem.telephone">
        <el-input v-model="form.telephone" type="telephone"></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="address"   v-if="!hideItem.address">
        <el-input v-model="form.address" type="telephone"></el-input>
      </el-form-item>
      <el-form-item label="密码"  prop="password"  v-if="false">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { Utils } from '@/js/base'
import fromMixins from '@/js/mixins/form'
export default {
  name: 'AddUser',
  components: {
  },
  mixins: [fromMixins],
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
      labelPosition: 'right',
      form: {
      },
      defaultRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: Utils.Validate.email, trigger: 'blur' }
        ],
        telephone: [
          { required: false, message: '请输入手机号', trigger: 'blur' },
          { validator: Utils.Validate.telephone, trigger: 'blur' }
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
      this.defaultRules = Object.keys(this.roles).length ? this.roles : this.defaultRules
      this.form = {...this.form, ...this.value}
    },
    checkForm (formName) {
      return this.$refs[formName].validate((valid) => {
        return valid
      })
    },
    resetForm (formName) {
      this.$refs['form'].resetFields()
    }
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
  }
}
</script>
