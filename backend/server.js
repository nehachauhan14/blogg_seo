const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
//bring routes
const blogRoutes = require('./routes/blog')
const authRoutes = require('./routes/auth')
//app
const app = express();

//db setup
mongoose.connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => {
    console.log("Db connected!")
})

//middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())

//cors
if(process.env.NODE_ENV == "development") {
    app.use(cors({origin: `${process.env.CLIENT_URL}`}))
}

//routes middleware
app.use('/api', blogRoutes);
app.use('/api', authRoutes)

//port
const port = process.env.port || 8000;

app.listen(port, () =>{
    console.log(`Server running at ===> http://localhost:${port}`)
})