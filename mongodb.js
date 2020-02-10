const {MongoClient, ObjectID} = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

const id = new ObjectID();
console.log(id);
console.log(id.id.length);
console.log(id.getTimestamp());

MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client)=> {
    if(error)
        return console.log('Unable to connect to database!');
    const db = client.db(databaseName);

    db.collection('users').insertOne({
        _id: id,
        name: 'Huy',
        age: 21
    }, {forceServerObjectId: true}, (error, result)=>{
        if(error) return console.log('Unable to insert user');

        console.log(result.ops)
    });

    // db.collection('users').insertMany([
    //     {name: 'Tin', age: 22},
    //     {name: "thanh", age: 22}
    // ], (error, result) => {
    //     if(error) return console.log('Unable to insert documents!');

    //     console.log(result.ops);
    // }) 

    // db.collection('tasks').insertMany([
    //     {description: 'nodejs', completed: false},
    //     {description: 'reactjs', completed: true},
    //     {description: 'C#', completed: false}
    // ], (error, record) => {
    //     if(error) return console.log(error);

    //     console.log(record.ops);
    // })
});