const express = require('express');
const Task = require('../models/task');
const router = new express.Router();

router.post('/tasks', async (req, res) => {
  const task = new Task(req.body);

  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findById({ _id: req.params.id });

    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
});

router.patch('/tasks/:id', async (req, res) => {
  const reqKeys = Object.keys(req.body);
  const allowedToUpdate = ['completed', 'description'];
  const isAllowed = reqKeys.every((key) => allowedToUpdate.includes(key));

  if (!isAllowed) {
    return res.status(400).send({ error: 'Invalid request!' });
  }

  try {
    const task = await Task.findById(req.params.id);
    reqKeys.forEach((key) => (task[reqKeys] = req.body[reqKeys]));
    await task.save();

    // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });

    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
