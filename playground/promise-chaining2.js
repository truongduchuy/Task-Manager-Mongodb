require('../src/db/mongoose');
const Task = require('../src/models/task');

Task.findByIdAndDelete('5e44b1ba84ff2c083848f195').then(task => {
    console.log(task);

    return Task.countDocuments({completed: false});
}).then(result => {
    console.log(result);
}).catch(e => {
    console.log(e);
})