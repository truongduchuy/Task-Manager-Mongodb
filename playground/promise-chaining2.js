require('../src/db/mongoose');
const Task = require('../src/models/task');

// Task.findByIdAndDelete('5e44b1ba84ff2c083848f195').then(task => {
//     console.log(task);

//     return Task.countDocuments({completed: false});
// }).then(result => {
//     console.log(result);
// }).catch(e => {
//     console.log(e);
// })

const deleteAndCountTask = async (id) => {
    await Task.findByIdAndDelete(id);
    return await Task.countDocuments({completed: true})
};

deleteAndCountTask("5e426d3771d09e07e4e5e03f").then(count => {
    console.log(count);
}).catch(e => {
    console.log(e);
});