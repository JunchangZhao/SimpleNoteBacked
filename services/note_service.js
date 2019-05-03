const noteDao = require("../dao/mongodb/note_dao");


class NoteService {

    async getAllNotesTimeInfoByUserName(userName) {
        let notes = await noteDao.getNoteCreateAndMotifyInfoByUser(userName);
        return notes;
    }

}

module.exports = new NoteService();