const express = require('express');
const connectDB = require('./config/db');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
const path = require('path')

//connect Database
connectDB()

//Init middleware
app.use(cors())
app.use(express.json({extended:false}));  

 

//define routes
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/posts', require('./routes/api/post'))
app.use('/api/profile', require('./routes/api/profile'))

app.use(express.static('client/build'))
//serve static assets in production
if(process.env.NODE_ENV === 'production') {
    //set static folder
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})