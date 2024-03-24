require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const bcrypt = require('bcrypt');
const cookieparser = require('cookie-parser');
const authRouter = require('./routers/authRouter');
const userRouter = require('./routers/userRouter');
const postRouter = require('./routers/postRouter');
const commentRouter = require('./routers/commentRouter');
const notifyRouter = require('./routers/notifyRouter');
const messageRouter = require('./routers/messageRouter');
const socketServer = require('./socketServer');



const app = express();


app.use('/uploads',express.static(__dirname + '/uploads'));

app.use(express.json());
app.use(cors());

app.use(cookieparser());


const http = require('http').createServer(app);
const io = require('socket.io')(http);

//router
app.use('/api',postRouter);
app.use('/api',authRouter);
app.use('/api',userRouter);
app.use('/api', commentRouter);
app.use('/api', notifyRouter);
app.use('/api', messageRouter);
//RlkTYhs7p5WxemCs
//RlkTYhs7p5WxemCs
const port =process.env.PORT || 5000;
const URL = process.env.MONGO_URI;

io.on('connection', (socket)=>{
    socketServer(socket);
})

mongoose.connect(URL);

app.get('/', (req,res)=>{
    res.status(500).send("hello word");
});

http.listen(port , () =>{
    console.log(`app is running on ${port}`);
})