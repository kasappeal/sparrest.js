require('dotenv').config();

const cors = require('cors');
const path = require('path');
const bcrypt = require('bcrypt');
const multer = require('multer');

const jsonServer = require('json-server');

const initDB = require('./database/initDB');
const getDB = require('./database/getDB');
const config = require('./config/config');
const { createToken, verifyToken } = require('./utils/JWT');
const authRouter = require('./routes/authRoutes');

const dbFileName = process.env.DB_FILE || 'db.json';
const dbFilePath = path.join(__dirname, dbFileName);

const getUsers = () => {
  try {
    const db = getDB();
    return Array.isArray(db.users) ? db.users : [];
  } catch (err) {
    console.error('Error while retrieving users', err);
    return [];
  }
};

const getAuthenticatedUser = (username, password) => {
  const encryptedPassword = bcrypt.hashSync(password, config.SALT);
  const users = getUsers();
  const user = users.find((user) => user.username === username);
  if (user && bcrypt.compareSync(password, user.password)) {
    return user;
  }
  return null;
};

const encryptPassword = (password) => {
  return bcrypt.hashSync(password, config.SALT);
};

const userExists = (username) => {
  const users = getUsers();
  const findedUser = users.find((user) => user.username === username) || null;
  return findedUser;
};

const checkAuth = (req, res, next) => {
  try {
    const [bearer, token] = req.headers.authorization.split(' ');
    const { err, decode } = verifyToken(token);
    if (err) {
      throw err;
    }
    req.body.userId = decode.userId;
    if (req.method === 'POST' || req.method === 'PUT') {
      req.body.updatedAt = new Date().toISOString();
    }
    return next();
  } catch (err) {
    const status = 401;
    const message = 'Wrong access token';
    return res.status(status).json({ status, message });
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, config.UPLOAD_FOLDER);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    );
  },
});

initDB();

const server = jsonServer.create();
const router = jsonServer.router(dbFilePath);
const middlewares = jsonServer.defaults();

server.use(cors());
server.use(middlewares);
server.use(jsonServer.bodyParser);

server.use('/auth', authRouter);

if (config.AUTH_READ) {
  server.get(/^\/api/, checkAuth);
}

if (config.AUTH_WRITE) {
  server.put(/^\/api/, checkAuth);
  server.post(/^\/api/, checkAuth);
  server.delete(/^\/api/, checkAuth);
  server.post('/upload', checkAuth);
}

server.post('/upload', (req, res) => {
  let upload = multer({ storage }).single('file');
  upload(req, res, function (err) {
    if (req.fileValidationError) {
      return res.status(400).json({ message: req.fileValidationError });
    } else if (!req.file) {
      return res.status(400).json({ message: 'file field is required' });
    } else if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: err });
    } else if (err) {
      return res.status(400).json({ message: err });
    }
    const path = `${req.protocol}://${req.get('host')}/${req.file.path
      .replace(config.UPLOAD_FOLDER, '')
      .replace('\\', '/')
      .replace('//', '/')}`;
    return res.status(201).json({ path });
  });
});

server.use('/api/', router);
server.listen(config.PORT, () => {
  console.log(`JSON Server is running on port ${config.PORT}`);
});
