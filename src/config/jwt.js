const jwt = require("jsonwebtoken");

const jwtAuthMiddleware = (req, res, next) => {
  const token = req.header.authorization.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({error: "Invalid Token"})
  }
};

const genrateToken = (userdata)=> {
    return jwt.sign(userdata, process.env.JWT_SECRET)
}

module.exports = {jwtAuthMiddleware, genrateToken}; 