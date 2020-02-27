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


const Task = require('./models/task');
const User = require('./models/user');

const main = async () => {
    // const task = await Task.findById('5e577ddd35d4c122ac2f2aa4');
    // await task.populate('owner').execPopulate();
    // console.log(task.owner)

    const user = await User.findById('5e57763d4e834b31c4fcbcce');
    await user.populate('tasks').execPopulate()
    console.log(user.tasks)
}

main()