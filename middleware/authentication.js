import jwt from "jsonwebtoken";

const authentication = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRETKEY, (err, data) => {
      if (err) {
        return res
          .status(401)
          .json({ message: "unauthorized admin", success: false });
      } else {
        next();
      }
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Token is missing or Invalid", success: false });
  }
};

export default authentication;
