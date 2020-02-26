const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
    console.log(`Server is up on port  ${port}`);
});

const bcrypt = require('bcryptjs');

const myFunction = async () => {
    const password = 'Huy123';
    
    
    bcrypt.hash(password, 8).then(hashedPassword => {
        bcrypt.compare(password, hashedPassword).then(isMatch => {
            console.log(isMatch)
        }).catch(e => {
            console.log(e)
        })
    }).catch(e => {
        console.log(e)
    })
    
    // promise chaining
    bcrypt.hash(password, 8).then(hashedPassword => {
        console.log(password, hashedPassword)
        return bcrypt.compare(password, hashedPassword);
    }).then(isMatch => {
        console.log(isMatch);
    }).catch(e => {
        console.log(e)
    })

    // async await
    const hashedPassword = await bcrypt.hash(password, 8);

    console.log(password, hashedPassword)
    const isMatch = await bcrypt.compare('Huy123', hashedPassword);
    console.log(isMatch)
}

myFunction()