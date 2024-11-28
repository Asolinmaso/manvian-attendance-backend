const Project = require('../models/Project');

// Controller to create a new project
exports.createProject = async (req, res) => {
    const { projectName, start, deadline, priority, status } = req.body;

    try {
        const newProject = new Project({
            projectName,
            start: new Date(start),
            deadline: new Date(deadline),
            priority,
            status,
            createdBy: req.user.id, // Associate the project with the logged-in user
        });

        await newProject.save();
        res.status(201).json(newProject);
    } catch (err) {
        res.status(500).json({ error: 'Error creating project' });
    }
};

// Controller to get all projects for the logged-in user
exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find({ createdBy: req.user.id }); // Fetch projects by the logged-in user
        res.status(200).json(projects);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching projects' });
    }
};

// Controller to update a project by ID
exports.updateProject = async (req, res) => {
    const { projectName, start, deadline, priority, status } = req.body;

    try {
        const updatedProject = await Project.findByIdAndUpdate(
            req.params.id,
            {
                projectName,
                start: new Date(start),
                deadline: new Date(deadline),
                priority,
                status,
            },
            { new: true }
        );

        if (!updatedProject) {
            return res.status(404).json({ error: 'Project not found' });
        }

        res.status(200).json(updatedProject);
    } catch (err) {
        res.status(500).json({ error: 'Error updating project' });
    }
};
