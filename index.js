require('dotenv').config();

const cors = require('cors');
const path = require('path');
const multer = require('multer');

const jsonServer = require('json-server');

const initDB = require('./database/initDB');
const config = require('./config');
const authRouter = require('./routes/authRoutes');

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
const router = jsonServer.router(config.dbFilePath);
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
