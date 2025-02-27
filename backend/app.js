const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' })
const UserRoutes = require('./routes/user');
const TodoRoutes = require('./routes/taskRoutes');



const app = express();

app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json());
app.use(express.json());

mongoose.connect('mongodb://localhost/todo-app')
  .then(() => console.log('connection is successfull'))
  .catch(err => console.error('Couldn"t connect to mongodB', err))

app.use('/TODO', UserRoutes)
app.use('/TODO', TodoRoutes)


const port = process.env.PORT || 2000;
app.listen(port, () => console.log('Server is running in port 2000'));