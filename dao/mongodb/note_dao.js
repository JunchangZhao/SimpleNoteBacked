const Note = require("../../model/db/mongodb/note")


class NoteDao {
    getNoteCreateAndMotifyInfoByUser(user) {
        return new Promise(function (resolve, reject) {
            let wherestr = {'user': user};

            Note.findAll(wherestr, function (err, res) {
                if (err) {
                    resolve(null)
                } else {
                    if (res == null || res.length == 0) {
                        resolve(null)
                    } else {
                        resolve(res)
                    }
                }
            })

        })
    };
}


module.exports = NoteDao;