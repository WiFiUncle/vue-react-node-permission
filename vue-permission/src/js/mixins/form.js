
export default {
  methods: {
    myCheckForm (formName) {
      return this.$refs[formName].validate((valid) => {
        return valid
      })
    },
    myResetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
