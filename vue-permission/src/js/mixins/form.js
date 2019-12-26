
export default {
  methods: {
    checkForm (formName) {
      return this.$refs[formName].validate((valid) => {
        return Promise.resolve(valid)
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
