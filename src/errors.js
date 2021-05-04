export function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
}

export function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).render("error", { error: err });
}
