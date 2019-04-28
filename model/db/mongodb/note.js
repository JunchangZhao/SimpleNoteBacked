const mongoose = require("../../../config/mongodb_config");

Schema = mongoose.Schema;

const Note = new Schema({
    title: {type: String},
    context: {type: String},
    createTime: {type: Number},
    modifyTime: {type: Number},
    user: {type: String},
});

module.exports = mongoose.model('note', Note);