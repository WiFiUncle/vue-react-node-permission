
export default {
  methods: {
    checkForm (formName) {
      return this.$refs[formName].validate((valid) => {
        return valid
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
