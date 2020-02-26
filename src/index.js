const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT || 3000;

// app.use((req, res, next) => {
//     res.status(503).send({message: 'the server under maintenance, please check back soon'});
// })

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
    console.log(`Server is up on port  ${port}`);
});


const user = {
    name: 'huy',
    age: 21
}
               
user.toJSON = function () {
    return user.name
}

console.log(JSON.stringify(user));

// res.send(data) thì res.send sẽ JSON.stringify(data), 
// hàm toJSON của instance user sẽ tự động gọi mỗi khi instance của nó stringify.
// Cụ thể, hàm user.toJSON sẽ tự động gọi khi JSON.stringify(user)