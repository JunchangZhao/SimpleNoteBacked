const Note = require("../../model/db/mongodb/note")
const BaseDao = require("./base_dao")

class NoteDao extends BaseDao {
    constructor() {
        super(Note);
    }

    async getNoteCreateAndMotifyInfoByUser(user) {
        let wherestr = {'user': user};
        let feilds = "createTime modifyTime";
        return await this.findAll(wherestr, feilds);
    };

    async getNoteByCreateTimeAndUser(userName, createTime) {
        let wherestr = {'user': userName, 'createTime': createTime};
        return await this.findAll(wherestr, null);
    }
}


module.exports = new NoteDao();