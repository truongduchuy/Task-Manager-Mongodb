const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
});

const User = mongoose.model('User', {
    name: {
        type: String
    },
    age: {
        type: Number
    }
});

const huy = new User({name: 'Huy', age: 22});

huy.save().then(() =>{
    console.log(huy);
}).catch(error =>{
    console.log('Error: '+error);
});

const Task = mongoose.model('Task', {
    description: {
        type: String
    },
    completed: {
        type: Boolean
    }
});

const task = new Task({
    description: 'Sql',
    completed: true
});

task.save().then(()=>{
    console.log(task);
}).catch(error => {
    console.log(error);
});