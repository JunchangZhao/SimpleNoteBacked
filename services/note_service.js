const noteDao = require("../dao/mongodb/note_dao");
const Note = require("../model/db/mongodb/note");


class NoteService {

    async getAllNotesTimeInfoByUserName(userName) {
        let notes = await noteDao.getNoteCreateAndMotifyInfoByUser(userName);
        return notes;
    }


    async saveNote(user, data) {
        let wherestr = {'user': user, 'createTime': data.createTime};
        let feilds = "modifyTime";
        let note = await noteDao.findOne(wherestr, feilds);
        if (note === null) {
            await noteDao.save(new Note({
                    title: data.title,
                    context: data.context,
                    createTime: data.createTime,
                    modifyTime: data.modifyTime,
                    user: user,
                    isDeleted: data.isDeleted
                })
            );
        } else {
            if (note.modifyTime < data.modifyTime) {
                let updater = {
                    title: data.title,
                    context: data.context,
                    modifyTime: data.modifyTime,
                    isDeleted: data.isDeleted
                }
                await noteDao.update(wherestr, updater);
            }
        }
    }

    async getNoteByCreateTime(userName, createTime) {
        let notes = await noteDao.getNoteByCreateTimeAndUser(userName, createTime);
        return notes;
    }

}

module.exports = new NoteService();