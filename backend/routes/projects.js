const express = require('express');
const router = express.Router();
const { db, saveDb } = require('../db');

// Get all projects
router.get('/', (req, res) => {
  res.json({
    success: true,
    count: db.projects.length,
    projects: db.projects
  });
});

// Create project
router.post('/', (req, res) => {
  const { title, team_count } = req.body;
  if (!title) {
    return res.status(400).json({ success: false, error: 'Project title is required' });
  }

  const newProject = {
    id: `proj_${Date.now()}`,
    title,
    status: 'In Progress',
    progress: 0,
    team_count: team_count || 1,
    updated_at: new Date().toISOString().split('T')[0]
  };

  db.projects.push(newProject);
  saveDb();

  res.status(201).json({
    success: true,
    project: newProject
  });
});

// Get tasks
router.get('/tasks', (req, res) => {
  res.json({
    success: true,
    tasks: db.tasks
  });
});

// Add task
router.post('/tasks', (req, res) => {
  const { project_id, title, priority, assignee } = req.body;
  if (!title) {
    return res.status(400).json({ success: false, error: 'Task title is required' });
  }

  const newTask = {
    id: `task_${Date.now()}`,
    project_id: project_id || 'proj_1',
    title,
    priority: priority || 'Medium',
    status: 'Todo',
    assignee: assignee || 'Unassigned'
  };

  db.tasks.push(newTask);
  saveDb();

  res.status(201).json({
    success: true,
    task: newTask
  });
});

// Update task status
router.patch('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { status, priority } = req.body;
  const task = db.tasks.find(t => t.id === id);

  if (!task) {
    return res.status(404).json({ success: false, error: 'Task not found' });
  }

  if (status) task.status = status;
  if (priority) task.priority = priority;
  saveDb();

  res.json({
    success: true,
    task
  });
});

module.exports = router;
