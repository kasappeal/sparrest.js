const notFoundMiddleware = (req, res) => {
  res.status(404).json({ msg: `Route ${req.url} not found` });
};

module.exports = notFoundMiddleware;
