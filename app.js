const mongoose = require('mongoose');
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const logger = require('morgan');
const { Server } = require('socket.io');
const { createServer } = require('node:http');
// const {isLoggedIn} = require('./src/middleware')
// const { chat } = require('./src/controllers/chat');
const Chat = require('./src/models/chat.js');
require('dotenv').config();

const { getAllCountries } = require('./src/controllers/other');
const passport = require('passport');
require('./src/utils/authGoogle');
const apartmentsRouter = require('./src/routes/api/Apartments');
const reservesRouter = require('./src/routes/api/Reserves');
const authRouter = require('./src/routes/api/auth');
const userRouter = require('./src/routes/api/users');
const chatRouter = require('./src/routes/api/ChatRouter.js');
const addMessageChat = require('./src/controllers/chat/add.js');
const app = express();
const server = createServer(app);

mongoose.set('strictQuery', false);
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';
app.set('view engine', 'ejs');
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// socket io server

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

// io.on('connection', (socket) => {
//   console.log(`user ${socket.id} is connected`);
//   socket.on('message', (data) => {
//     socket.broadcast.emit('message:received', data);

//     const newMessage = new Chat({
//       message: data.message,
//       name: data.name,
//       owner: data.userId._rawValue,
//     });
//     newMessage.save();
//     socket.on('disconnect', () => {
//       console.log(`user ${socket.id} disconnectet`);
//     });
//   });
// });

const usersConection = [];
io.on('connection', (socket) => {
  console.log(`user ${socket.id} is connected`);
  let newUser = {
    user: socket.id,
  };
  usersConection.push(newUser);

  // console.log(usersConection, 'usersConection');
  // Listen for incoming chat messages
  io.emit('connection', { online: usersConection.length });
  // Chat.find().then((result) => socket.emit('messages', result));
  socket.once('disconnect', () => {
    usersConection.splice(0, 1);
  });

  socket.on('message', async (data) => {
    if (data.message === '') return;

    const newId = mongoose.Types.ObjectId();
    const message = new Chat({
      owner: data.owner,
      message: data.message,
      name: data.name,
      socketID: newId,
    });

    io.emit('message', { ...data, socketID: newId });

    await message.save();
  });

  socket.on('update message', async (updateData) => {
    try {
      const updatedChat = await Chat.findOneAndUpdate(
        { socketID: updateData.socketID },
        {
          message: updateData.message,
          edited: true,
        },
        {
          new: true,
        },
      );

      if (updatedChat) {
        // Update successful, emit to all clients with the updated document
        io.emit('update message', updatedChat);
      } else {
        console.error('Chat message update failed: Document not found');
        // Consider sending an error message to the client
      }
    } catch (error) {
      console.error('Error updating chat message:', error);
      // Consider emitting an error event to the client
    }
  });

  // socket.on('update message', (updateData) => {
  //   Chat.findByIdAndUpdate(updateData.socketID, {
  //     message: updateData.message,
  //   }).then(() => io.emit('update message', updateData));
  // });
  // Listen for user disconnection
  // socket.on('disconnect', () => {
  //   console.log('User disconnected:', socket.id);
  // });
});

//google

app.use(
  session({
    secret: process.env.SESSION_SECRET_KAY,
    resave: false,
    saveUninitialized: true,
  }),
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/apartments', apartmentsRouter);
app.use('/api/reserves', reservesRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/countries', getAllCountries);
app.use('/api/chat', chatRouter);
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'server error' } = err;
  res.status(status).json({ message });
});

const { DB_HOST, PORT = 4000 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    server.listen(PORT);
    console.log(`Server is running on port ${PORT}`);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
