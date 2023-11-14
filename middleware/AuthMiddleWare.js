const jsonwebtoken = require("jsonwebtoken");

function verifyToken(req, resp, next) {
  const authorizeHeader = req.headers.authorization;
  if (!authorizeHeader) {
    return resp.status(401).json({ error: "unAuthorize" });
  }
  if (authorizeHeader.startsWith("Bearer ")) {
    return resp.status(401).json({ error: "invalid format" });
  }
  const token = authorizeHeader.slice(7);
  if (!token) {
    return resp.status(401).json({ error: "invalid token" });
  }

  try {
    const decodedData = jsonwebtoken.verify(token, process.env.SECRET_KEY);
    next();
  } catch (error) {
    return resp.status(401).json({ error: "unAuthorize" });
  }
}

module.exports = verifyToken;
