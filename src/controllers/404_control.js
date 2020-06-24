exports.apiNotFound_control = (req, res, next) => {
  res.status(404).json({ error: "API not found" });
};
