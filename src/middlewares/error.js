export const ErrorMiddleware = (err, req, res, next) => {
  err.message ||= "Internal server error";
  err.statusCode ||= 500;
  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export const tryCatch = (func) => (req, res, next) => {
  return Promise.resolve(func(req, res, next)).catch(next);
};
tryCatch();
