const getCurrent = async (req, res) => {
  const { email, name, phone, _id } = req.user;

  res.json({ email, name, phone, _id });
};

module.exports = getCurrent;
