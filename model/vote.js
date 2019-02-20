const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

var Vote = new Schema({
    user_id: {type: ObjectId, required: true},
    vote: {type: [String], required: true},
});

module.exports = mongoose.model('Vote', Vote);
