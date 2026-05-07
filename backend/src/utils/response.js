export const success = (res, data) => {
  return res.json({
    success: true,
    data,
    error: null,
  });
};

export const failure = (res, error, status = 500) => {
  return res.status(status).json({
    success: false,
    data: null,
    error: error.message || error,
  });
};
