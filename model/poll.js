const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const Vote = require('./vote').schema

var Poll = new Schema({
    admin_id: {type: ObjectId, required: true},
    admin_name: {type: String, required: false},
    options: {type: Number, required: true},
    poll_id: {type: ObjectId, required: true},
    poll_items: {type: [String], required: false},
    status: {type: Boolean, required: true},
    threshold: {type: Number, required: true},
    title: {type: String, required: true},
    votes: {type: [Vote], required: false},
    members: {type: [ObjectId], required: true}
});

module.exports = mongoose.model('Poll', Poll);
