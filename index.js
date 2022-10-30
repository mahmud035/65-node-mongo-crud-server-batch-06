const express = require('express');
const cors = require('cors');
const app = express();

const Port = process.env.PORT || 5000;

//* middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from node mongo crud server');
});

app.listen(Port, () => {
  console.log('Server is running on port ' + Port);
});
