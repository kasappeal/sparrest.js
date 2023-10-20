require('dotenv').config();

const cors = require('cors');
const jsonServer = require('json-server');

const initDB = require('./database/initDB');
const config = require('./config');

const authRouter = require('./routes/authRoutes');
const jsonServerRouter = require('./routes/jsonServerRoutes');
const uploadRouter = require('./routes/uploadRouter');
const usersRouter = require('./routes/usersRoutes');
const notFoundMiddleware = require('./middleware/notFoundMiddleware');

initDB();

const server = jsonServer.create();
const middlewares = jsonServer.defaults();

server.use(cors());
server.use(middlewares);
server.use(jsonServer.bodyParser);

server.use('/users', usersRouter);
server.use('/auth', authRouter);
server.use(/^\/api/, uploadRouter);
server.use(/^\/api/, jsonServerRouter);

server.use(notFoundMiddleware);

server.listen(config.PORT, () => {
  console.log(`JSON Server is running on port ${config.PORT}`);
});
