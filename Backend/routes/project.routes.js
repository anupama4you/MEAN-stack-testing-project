module.exports = (app) => {
    const projects = require('../controllers/projectController');
    const project_leads = require('../controllers/projectLeadController');
    const users = require('../controllers/userController');

    // Create a new Note
    app.post('/projects', projects.create);

    // Retrieve all Notes
    app.get('/projects', projects.findAll);

    // Retrieve a single Note with noteId
    app.get('/projects/:projectId', projects.findOne);

    // Update a Note with noteId
    app.put('/projects/:projectId', projects.update);

    // Delete a Note with noteId
    app.delete('/projects/:projectId', projects.delete);

    //project leads --------------------
    // Create
    app.post('/project_leads', project_leads.create);

    // Retrieve all
    app.get('/project_leads', project_leads.findAll);

    // Retrieve a single item with Id
    app.get('/project_leads/:projectLeadId', project_leads.findOne);

    // Update an item with Id
    app.put('/projects/:projectLeadId', project_leads.update);

    // Delete an item with Id
    app.delete('/projects/:projectLeadId', project_leads.delete);


    //users --------------------
    // Create
    app.post('/users', users.create);

    // Retrieve all
    app.get('/users', users.findAll);

    // Retrieve a single item with Id
    app.get('/users/:userId', users.findOne);

    // Update an item with Id
   // app.put('/projects/:projectLeadId', project_leads.update);

    // Delete an item with Id
    //app.delete('/projects/:projectLeadId', project_leads.delete);
}