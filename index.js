const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('colors');
const app = express();
const Port = process.env.PORT || 5000;

//* middleware
app.use(cors());
app.use(express.json());

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
    const userCollections = client.db('nodeMongoCrud').collection('users');

    const user = {
      name: 'Akhi',
      email: 'akhi@example.com',
    };

    const result = await userCollections.insertOne(user);
    console.log(result);
  } catch (error) {
    console.log(error.name.bgRed, error.message.bold);
  }
};
dbConnect();

app.get('/', (req, res) => {
  res.send('Hello from node mongo crud server');
});

app.listen(Port, () => {
  console.log('Server up and running'.cyan.bold);
});
