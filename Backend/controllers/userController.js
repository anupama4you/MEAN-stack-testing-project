const User = require('../models/user');

// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
    if(!req.body.email) {
        return res.status(400).send({
            message: "Email can not be empty"
        });
    }
    if(!req.body.password) {
        return res.status(400).send({
            message: "Password can not be empty"
        });
    }

    // Create a Note
    const user = new User({
        email: req.body.email,
        password: req.body.password
    });

    // Save Note in the database
    user.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the user."
        });
    });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    User.find()
        .then(notes => {
            res.send(notes);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    User.findById(req.params.userId)
        .then(note => {
            if(!note) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            res.send(note);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        return res.status(500).send({
            message: "Error retrieving User with id " + req.params.userId
        });
    });
};

// Update a note identified by the noteId in the request
// exports.update = (req, res) => {
//     // Validate Request
//     if(!req.body.name) {
//         return res.status(400).send({
//             message: "Project name can not be empty"
//         });
//     }
//
//     // Find note and update it with the request body
//     Project.findByIdAndUpdate(req.params.projectId, {
//         name: req.body.name || "Default Project",
//         logo: req.body.logo,
//         status: req.body.status,
//         client_name: req.body.client_name,
//         client_email: req.body.client_email,
//         client_tel : req.body.client_tel,
//         proj_lead_id : req.body.proj_lead_id,
//         category : req.body.category
//     }, {new: true})
//         .then(note => {
//             if(!note) {
//                 return res.status(404).send({
//                     message: "Note not found with id " + req.params.projectId
//                 });
//             }
//             res.send(note);
//         }).catch(err => {
//         if(err.kind === 'ObjectId') {
//             return res.status(404).send({
//                 message: "Note not found with id " + req.params.projectId
//             });
//         }
//         return res.status(500).send({
//             message: "Error updating note with id " + req.params.projectId
//         });
//     });
// };

// Delete a note with the specified noteId in the request
// exports.delete = (req, res) => {
//     Project.findByIdAndRemove(req.params.projectId)
//         .then(note => {
//             if(!note) {
//                 return res.status(404).send({
//                     message: "Note not found with id " + req.params.projectId
//                 });
//             }
//             res.send({message: "Note deleted successfully!"});
//         }).catch(err => {
//         if(err.kind === 'ObjectId' || err.name === 'NotFound') {
//             return res.status(404).send({
//                 message: "Note not found with id " + req.params.projectId
//             });
//         }
//         return res.status(500).send({
//             message: "Could not delete note with id " + req.params.projectId
//         });
//     });
// };