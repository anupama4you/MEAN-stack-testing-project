const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    name: { type: String },
    email: { type: String },
    tel : { type: String }
}, {
    timestamps: true
});

module.exports = mongoose.model('Project_lead', NoteSchema);