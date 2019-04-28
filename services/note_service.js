const NoteDao = require("../dao/mongodb/note_dao");


class NoteService {

    noteDao = new NoteDao();


}

module.exports = NoteService