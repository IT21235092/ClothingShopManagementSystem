const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

//import routes
const postRoutes = require('./routes/pamudu/posts');

//app middleware
app.use(bodyParser.json());
app.use(cors());

app.use(postRoutes);

const port = 8000;

const DB_URL = "mongodb+srv://clothingShop:clothing123@clothings.d20ufpp.mongodb.net/?retryWrites=true&w=majority"

mongoose.set('strictQuery', false);
mongoose.connect(DB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() =>{
    console.log('DB connected')
})

.catch((err) => console.log('DB connection error', err));


app.listen(port, () => {
    console.log('App is running on 8000')
})

