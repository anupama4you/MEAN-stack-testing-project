const ProjectLead = require('../models/project_lead');

// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
    if(!req.body.name) {
        return res.status(400).send({
            message: "Project Lead name can not be empty"
        });
    }

    // Create a Note
    const project_lead = new ProjectLead({
        name: req.body.name || "project default",
        email: req.body.email,
        tel: req.body.tel
    });

    // Save Note in the database
    project_lead.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the project lead."
        });
    });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    ProjectLead.find()
        .then(project_leads => {
            res.send(project_leads);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving project leads."
        });
    });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    ProjectLead.findById(req.params.projectLeadId)
        .then(note => {
            if(!note) {
                return res.status(404).send({
                    message: "Project lead not found with id " + req.params.projectLeadId
                });
            }
            res.send(note);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Project lead not found with id " + req.params.projectLeadId
            });
        }
        return res.status(500).send({
            message: "Error retrieving Project Lead with id " + req.params.projectLeadId
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
    ProjectLead.findByIdAndUpdate(req.params.projectLeadId, {
        name: req.body.name || "project default",
        email: req.body.email,
        tel: req.body.tel
    }, {new: true})
        .then(note => {
            if(!note) {
                return res.status(404).send({
                    message: "Project Lead not found with id " + req.params.projectLeadId
                });
            }
            res.send(note);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Project Lead not found with id " + req.params.projectLeadId
            });
        }
        return res.status(500).send({
            message: "Error updating Project with id " + req.params.projectLeadId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    ProjectLead.findByIdAndRemove(req.params.projectLeadId)
        .then(note => {
            if(!note) {
                return res.status(404).send({
                    message: "Project lead not found with id " + req.params.projectLeadId
                });
            }
            res.send({message: "Project lead deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Project lead not found with id " + req.params.projectLeadId
            });
        }
        return res.status(500).send({
            message: "Could not delete project lead with id " + req.params.projectLeadId
        });
    });
};