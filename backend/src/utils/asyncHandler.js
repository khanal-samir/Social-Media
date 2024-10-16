export const asyncHandler = (asyncFunction) => {
  return (req, res, next) => {
    Promise.resolve(asyncFunction(req, res, next)).catch((error) =>
      next(error)
    );
  };
};
