export function notFound(req, res) {
  res.status(404).json({ message: `Route ${req.method} ${req.originalUrl} not found` })
}

export function errorHandler(error, req, res, next) {
  console.error(error)
  if (error.name === 'ValidationError') return res.status(400).json({ message: 'Please review the submitted fields' })
  res.status(error.statusCode || 500).json({ message: error.statusCode ? error.message : 'Something went wrong' })
}
