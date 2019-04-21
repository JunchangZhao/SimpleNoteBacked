const Note = require("../../model/db/note")

let getNoteByUser = function (user) {
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


module.exports = {
    getNoteByUser,
}