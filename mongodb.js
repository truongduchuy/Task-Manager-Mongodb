const {MongoClient, ObjectID} = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client)=> {
    if(error)
        return console.log('Unable to connect to database!');
    const db = client.db(databaseName);

    // db.collection('users').findOne({name: 'thanh'}, (error, user)=>{
    //     if(error) return console.log('Unable to find user!');

    //     console.log(user)
    // });

    db.collection('tasks').findOne({_id: new ObjectID("5e414fb6615ef6027804aab9")}, (error, task) =>{
        console.log(task);
    });

    db.collection('tasks').find({completed: false}).toArray((error, tasks)=>{
        console.log(tasks);
    });
});