const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

var Vote = new Schema({
    vote_id: {type: ObjectId, required: true},
    poll_id: {type: ObjectId, required: true},
    user_id: {type: ObjectId, required: true},
});

module.exports = mongoose.model('Vote', Vote);
