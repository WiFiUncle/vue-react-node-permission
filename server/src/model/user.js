/**
 * Created By wifi_uncle on 2019/10/24
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String
  },
  address: {
    type: String
  },
  email: {
    type: String
  },
  telephone: {
    type: String
  },
  createTime: {
    type: Date
  },
  modifyTime: {
    type: Date
  },
  isDeleted: {
    type: Number,
    default: 0
  }
}, {
  collection: 'user',
  versionKey: false
})

module.exports = mongoose.model('User', userSchema)
