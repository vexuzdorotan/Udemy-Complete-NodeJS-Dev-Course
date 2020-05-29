const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error, client) => {
    if (error) {
      return console.log('Unable to connect to database.');
    }

    const db = client.db(databaseName);

    // db.collection('users').findOne(
    //   { _id: new ObjectID('5ecfedc34a6bf4183cc58cef') },
    //   (error, user) => {
    //     if (error) {
    //       return console.log('Unable to fetch.');
    //     }

    //     console.log(user);
    //   }
    // );

    // db.collection('users')
    //   .find({ age: 24 })
    //   .toArray((error, users) => {
    //     console.log(users);
    //   });

    // db.collection('users')
    //   .find({ age: 24 })
    //   .count((error, count) => {
    //     console.log(count);
    //   });

    // db.collection('tasks').findOne(
    //   { _id: new ObjectID('5ecff1f89277ef19e06db5b3') },
    //   (error, result) => {
    //     console.log(result);
    //   }
    // );

    // db.collection('tasks')
    //   .find({ completed: true })
    //   .toArray((error, documents) => {
    //     console.log(documents);
    //   });

    // 5ecfedc34a6bf4183cc58cef

    // db.collection('users')
    //   .updateOne(
    //     {
    //       _id: new ObjectID('5ecfedc34a6bf4183cc58cef'),
    //     },
    //     {
    //       $inc: {
    //         age: 1,
    //       },
    //     }
    //   )
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    // db.collection('tasks')
    //   .updateMany(
    //     {
    //       completed: false,
    //     },
    //     {
    //       $set: {
    //         completed: true,
    //       },
    //     }
    //   )
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    // db.collection('users')
    //   .deleteMany({
    //     age: 24,
    //   })
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    // db.collection('tasks')
    //   .deleteOne({
    //     description: 'desc3',
    //   })
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }
);
