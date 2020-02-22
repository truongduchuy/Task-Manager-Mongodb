const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
});

// const huy = new User({ name: '  HUY  ', email: ' HUY0935903718@gmail.com   ', password: 'dfdd' }); // error: age must be a positive number

// huy.save().then(() =>{
//     console.log(huy);
// }).catch(error =>{
//     console.log('Error: '+error);
// });


// const task = new Task({
//     description: 'Sql',
// });

// task.save().then(()=>{
//     console.log(task);
// }).catch(error => {
//     console.log(error);
// });