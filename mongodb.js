const {MongoClient, ObjectID} = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client)=> {
    if(error)
        return console.log('Unable to connect to database!');
    const db = client.db(databaseName);

    db.collection('users').updateOne({
        _id: new ObjectID("5e41494fe899d61fb077e241")
    }, {
        // $inc: {
        //     age: 2
        //     // age: -2
        // }
        $set: {
            age: 2
        }
    }).then(result => console.log(result))
    .catch(error => console.log(error));

    db.collection('tasks').updateMany({}, {
        $set: {completed: true}
    }).then(result => console.log(result))
    .catch(error=> console.log(error));
});