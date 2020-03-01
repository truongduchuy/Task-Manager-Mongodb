const express = require('express')
const router = new express.Router()
const User = require('../models/user');
const auth = require('../middleware/auth');
const multer = require('multer');

router.post('/users/signup', async (req, res) => {
    const user = new User(req.body);
    try {
        
        await user.save();
        const token = await user.generateAuthToken();
        console.log(token)
        res.status(201).send({user, token});
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
    
        res.send({user, token});
    } catch (e) {
        res.status(400).send();
    }
})

router.post('/users/logout', auth, async (req,res) => {
    try {
        req.user.tokens = req.user.tokens.filter(item => item.token !== req.token);
   
        await req.user.save();

        res.send();
    } catch (e) {
        res.status(500).send()
    }
});

router.post('/users/logoutAll', auth, async (req,res) => {
    try {
        req.user.tokens = [];
   
        await req.user.save();

        res.send();
    } catch (e) {
        res.status(500).send()
    }
});

router.post('/users', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        res.status(201).send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
});

router.get('/users/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const user = await User.findById(_id);

        if(!user) return res.sendStatus(400).send()

        res.send(user);
    } catch (e) {
        res.status(500).send();
    }
})

router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if(!isValidOperation) {
        return res.status(400).send({error: 'Invalid updates!'});
    }

    try {
        updates.forEach(update => req.user[update] = req.body[update])

        await req.user.save();

        res.send(req.user);
    } catch (e) {
        res.status(400).send(e);
    } 
});

router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove();

        res.send(req.user);
    } catch (e) {
        res.status(500).send();
    }
})

const upload = multer({
    dest: 'avatars',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, callback) {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/))
            callback(new Error('Please choose an image file'))
        callback(undefined, true);
    }
});

// nếu middle upload.single('avatar') throw error thì last middleware được gọi, mục đích trả về error kiểu JSON
router.post('/users/me/avatar', upload.single('avatar'), (req, res) => {
    res.send();
}, (error, req, res, next) => {
    res.status(400).send({error: error.message})
})

module.exports = router;