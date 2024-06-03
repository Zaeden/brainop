import jwt from "jsonwebtoken";

const setToken = async (payload) => {
  const { JWT_SECRET_KEY } = process.env;
  const token = jwt.sign(payload, JWT_SECRET_KEY, {
    expiresIn: "1d",
  });

  return token;
};

const getPayload = (token) => {
  try {
    const { JWT_SECRET_KEY } = process.env;
    const payload = jwt.verify(token, JWT_SECRET_KEY);
    return payload;
  } catch (error) {
    return error;
  }
};

export { setToken, getPayload };
