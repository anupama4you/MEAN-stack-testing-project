const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    email: { type: String },
    password: { type: String }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', NoteSchema);