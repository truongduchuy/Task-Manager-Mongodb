require('../src/db/mongoose');
const User = require('../src/models/user');

User.findByIdAndUpdate('5e4d0c84a5aeec057008f82b', {age: 2}).then(user => {
    console.log(user);
    return User.countDocuments({age: 1})
}).then(result => {
    console.log(result);
}).catch(e => {
    console.log(e);
})