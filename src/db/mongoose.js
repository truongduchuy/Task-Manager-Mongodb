const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
});

const User = mongoose.model('User', {
    name: {
        type: String, 
        required: true
    },
    age: {
        type: Number,
        validate(value) {
            if(value < 0)
                throw new Error('Age must be a positive number');
        }
    }
});

// const huy = new User({ });  // error: name is required
// const huy = new User({ name: huy }); 
const huy = new User({ name: 'huy', age: -1 }); // error: ge must be a positive number

huy.save().then(() =>{
    console.log(huy);
}).catch(error =>{
    console.log('Error: '+error);
});

// const Task = mongoose.model('Task', {
//     description: {
//         type: String
//     },
//     completed: {
//         type: Boolean
//     }
// });

// const task = new Task({
//     description: 'Sql',
//     completed: true
// });

// task.save().then(()=>{
//     console.log(task);
// }).catch(error => {
//     console.log(error);
// });