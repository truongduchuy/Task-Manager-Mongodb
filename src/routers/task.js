const express = require('express')
const router = new express.Router()
const Task = require('../models/task');
const auth = require('../middleware/auth');

router.get('/tasks', auth, async (req, res) => {
    try {
        // const tasks = await Task.find({owner: req.user._id});
        await req.user.populate('tasks').execPopulate();
        res.send(req.user.tasks);
     } catch (e) {
        res.sendStatus(500).send();
    }
});

router.get('/tasks/:id', auth, async (req,res) => {
    const _id = req.params.id

    try {
        const task = await Task.findOne({ _id, owner: req.user._id});

        if(!task) return res.status(400).send();
    
        res.send(task);
    } catch (e){
        res.sendStatus(500).send();
    }
});

router.post('/tasks', auth, async (req,res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id 
    });

    try {
        await task.save();
        res.status(201).send(task);
    } catch (e) {
        res.status(400).send(e);
    }
})

router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['completed', 'description'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if(!isValidOperation) {
        return res.status(400).send({error: 'Invalid Updates!'});
    }

    try {
        const _id = req.params.id
        // const task = await Task.findById(req.params.id);
        const task = await Task.findOne({ _id , owner: req.user._id})
      
        if(!task) {
            return res.status(404).send();
        }

        updates.forEach(update => task[update] = req.body[update]);

        await task.save();

        res.send(task);
    } catch (e) {
        res.status(400).send();
    }
});

router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const _id = req.params.id
        const task = await Task.findByIdAndDelete({ _id, owner: req.user._id});
        
        if(!task) {
            return res.status(404).send();
        }

        res.send(task);
    } catch (e) {
        res.status(500).send();
    }
})

module.exports = router;