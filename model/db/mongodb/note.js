let {Schema} = require('mongoose');
let {mongoClient} = require('../../mongo_model.js');

const NoteSchema = new Schema({
    title: {type: String},
    context: {type: String},
    createTime: {type: Number},
    modifyTime: {type: Number},
    user: {type: String},
});

let Note = mongoClient.model(`Note`, NoteSchema, 'note');

module.exports = Note;