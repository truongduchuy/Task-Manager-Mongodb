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

const multer = require('multer');
const upload = multer({
    dest: 'images',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, callback) {
        if(!file.originalname.match(/\.(doc|docx)$/)) {
            return callback(new Error('Please upload a Word document'))
        }

        callback(undefined, true);
    }
});

app.post('/upload', upload.single('file'), (req, res) => {
    res.send();
});