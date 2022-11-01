const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('colors');
const app = express();
const Port = process.env.PORT || 5000;

//* middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from node mongo crud server');
});

// mongodb atlas
// username: dbuser2
// password: YNvMylTHa8A0Yx4N

const uri =
  'mongodb+srv://dbuser2:YNvMylTHa8A0Yx4N@cluster0.yeflywl.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const dbConnect = async () => {
  try {
    await client.connect();
    console.log('Database connected'.yellow.italic);
  } catch (error) {
    console.log(error.name.bgRed, error.message.bold);
  }
};
dbConnect();

const userCollections = client.db('nodeMongoCrud').collection('users');

app.get('/users', async (req, res) => {
  try {
    const query = {};
    const cursor = userCollections.find(query);
    const users = await cursor.toArray();
    res.send(users);
  } catch (error) {
    console.log(error.message);
  }
});

app.post('/users', async (req, res) => {
  try {
    const user = req.body;
    const result = await userCollections.insertOne(user);
    console.log(result);
    res.send(result);
  } catch (error) {
    console.log(error.message);
  }
});

app.delete('/users/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: ObjectId(id) };
    const result = await userCollections.deleteOne(query);
    console.log(result);
    res.send(result);
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(Port, () => {
  console.log('Server up and running'.cyan.bold);
});
