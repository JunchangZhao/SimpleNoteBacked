const Note = require("../../model/db/mongodb/note")
const BaseDao = require("./base_dao")

class NoteDao extends BaseDao{
    constructor() {
        super(Note);
    }

    getNoteCreateAndMotifyInfoByUser(user) {
        let wherestr = {'user': user};
        let feilds = "createTime modifyTime";
        return this.findAll(wherestr,feilds);
    };
}


module.exports = new NoteDao() ;