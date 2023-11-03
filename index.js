require('dotenv').config();

const cors = require('cors');
const jsonServer = require('json-server');
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

const initDB = require('./database/initDB');
const config = require('./config');
const authRouter = require('./routes/authRoutes');
const uploadRouter = require('./routes/uploadRouter');
const usersRouter = require('./routes/usersRoutes');
const jsonServerRouter = require('./routes/jsonServerRoutes');

const notFoundMiddleware = require('./middleware/notFoundMiddleware');

initDB();

const server = jsonServer.create();
const middlewares = jsonServer.defaults();

server.use(cors());
server.use(middlewares);
server.use(jsonServer.bodyParser);

server.get('/', (req, res) => {
  res.send('<h1>Sparrest API</h1><a href="/api/docs">Documentation</a>');
});

const { servers } = swaggerDocument;
if (servers && servers.length > 0) {
  servers[0].url = `http://localhost:${config.PORT}`;
}

server.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
server.use('/users', usersRouter);
server.use('/auth', authRouter);
server.use('/upload', uploadRouter);
server.use(/^\/api/, jsonServerRouter);

server.use(notFoundMiddleware);

server.listen(config.PORT, () => {
  console.log(`JSON Server is running on port ${config.PORT}`);
});
