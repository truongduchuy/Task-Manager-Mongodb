const express = require('express')
const router = new express.Router()
const Task = require('../models/task');

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.send(tasks);
     } catch (e) {
        res.sendStatus(500).send();
    }
});

router.get('/tasks/:id', async (req,res) => {
    try {
        const task = Task.findById(req.params.id);
        if(!task) return res.status(400).send();
    
        res.send(task);
    } catch (e){
        res.sendStatus(500).send();
    }
});

router.post('/tasks', async (req,res) => {
    const task = new Task(req.body);

    try {
        await task.save();
        res.status(201).send(task);
    } catch (e) {
        res.status(400).send(e);
    }
})

router.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['completed', 'description'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if(!isValidOperation) {
        return res.status(400).send({error: 'Invalid Updates!'});
    }

    try {
        const task = await Task.findById(req.params.id);

        updates.forEach(update => task[update] = req.body[update]);

        await task.save();
        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});

        if(!task) {
            return res.status(404).send();
        }

        res.send(task);
    } catch (e) {
        res.status(400).send();
    }
});

router.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);

        if(!task) {
            return res.status(404).send();
        }

        res.send(task);
    } catch (e) {
        res.status(500).send();
    }
})

module.exports = router;