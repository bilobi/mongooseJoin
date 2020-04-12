const express=require('express');
const bodyParser=require('body-parser');
const path = require('path');

const route = require('./routes');
const port=process.env.Port ||3000;
const app=express();

app.use(bodyParser.json());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

//serving api routes
app.use('/api',route);



// Home route. Currently just to make sure app is running returns hello message.
app.get("/", function(req, res) {
  res.send("Hello from demo app!");
});


app.listen(process.env.Port || 3000,()=>console.log(`API running on localhost:${port}`))
