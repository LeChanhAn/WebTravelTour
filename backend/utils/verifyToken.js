import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "You are not authorized" });
  }

  // if token is exist then verify the token
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res
        .status(401)
        .json({ success: false, message: "token is invalid" });
    }

    req.user = user;
    next(); // don't forget to call next
  });
};

// xác thực người dùng (user)
export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next);
};

// xác thực người dùng (admin)
export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === "admin") {
      next();
    } else {
      return res
        .status(401)
        .json({ success: false, message: "You're not authorize" });
    }
  });
};
