const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    name: { type: String },
    logo: { type: String },
    status : { type: String },
    client_name : { type: String},
    client_email : { type: String},
    client_tel : { type: String},
    proj_lead_id : { type: String},
    category : { type: String}
}, {
    timestamps: true
});

module.exports = mongoose.model('Project', NoteSchema);