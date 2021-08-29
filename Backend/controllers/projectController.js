const Project = require('../models/project');
const ProjectLead = require('../models/project_lead');

// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
    if(!req.body.name) {
        return res.status(400).send({
            message: "Project name can not be empty"
        });
    }

    // Create a Note
    const project = new Project({
        name: req.body.name || "project default",
        logo: req.body.logo,
        status: req.body.status,
        client_name: req.body.client_name,
        client_email: req.body.client_email,
        client_tel : req.body.client_tel,
        proj_lead_id : req.body.proj_lead_id,
        category : req.body.category
    });

    // Save Note in the database
    project.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the project."
        });
    });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Project.find()
        .then(notes => {
            res.send(notes);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving projects."
        });
    });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    Project.findById(req.params.projectId)
        .then(note => {
            if(!note) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.projectId
                });
            }
            res.send(note);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.projectId
            });
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.projectId
        });
    });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.name) {
        return res.status(400).send({
            message: "Project name can not be empty"
        });
    }

    // Find note and update it with the request body
    Project.findByIdAndUpdate(req.params.projectId, {
        name: req.body.name || "Default Project",
        logo: req.body.logo,
        status: req.body.status,
        client_name: req.body.client_name,
        client_email: req.body.client_email,
        client_tel : req.body.client_tel,
        proj_lead_id : req.body.proj_lead_id,
        category : req.body.category
    }, {new: true})
        .then(note => {
            if(!note) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.projectId
                });
            }
            res.send(note);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.projectId
            });
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.projectId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Project.findByIdAndRemove(req.params.projectId)
        .then(note => {
            if(!note) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.projectId
                });
            }
            res.send({message: "Note deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.projectId
            });
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.projectId
        });
    });
};
