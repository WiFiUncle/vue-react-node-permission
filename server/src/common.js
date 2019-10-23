const DB = require('./db.js')

module.exports = {
  getSchoolById: async (id = '') => {
    if (!id) return null
    let doc = await DB.find('school', {'_id': DB.getObjectId(id)})
    return doc[0]
  }
}
