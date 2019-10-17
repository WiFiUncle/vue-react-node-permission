const DB = require('./db.js');

const getModelListByIds = async (list = []) =>{
  if(!list) return [];
  let modelIdList = [];
  list.forEach(item => {
    modelIdList.push(DB.getObjectId(item));
  });
  return await DB.find('model',{"_id":{"$in": modelIdList}});
}

module.exports = {
  getModelListByIds,
  getSchoolById: async (id = "") =>{
    if(!id) return null;
    let doc = await DB.find('school',{"_id": DB.getObjectId(id)});
    return doc[0];
  },
};
