const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

var Poll = new Schema({
    poll_id: {type: ObjectId, required: true},
    user_id: {type: ObjectId, required: true},
    title: {type: String, required: true},
});

module.exports = mongoose.model('Poll', Poll);
