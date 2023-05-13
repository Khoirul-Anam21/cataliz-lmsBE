import { ApiError } from "@point-hub/express-error-handler";
import pkg from "jsonwebtoken";

// eslint-disable-next-line import/no-named-as-default-member
const { sign, verify } = pkg;

export const tokenType = "Bearer";

export const getTokenFromHeader = (authorization: string) => {
  if (authorization && authorization.split(" ")[0] === tokenType) {
    return authorization.split(" ")[1];
  }
};

export const signNewToken = (issuer: string, secret: string, id: string) => {
  const date = new Date().getTime();
  // expired in 24 hour
  const exp = new Date().setTime(date + 1000 * 60 * 60 * 24);
  return sign(
    {
      iss: issuer,
      sub: id,
      iat: date,
      exp: exp,
    },
    secret
  );
};

export const generateRefreshToken = (issuer: string, secret: string, id: string) => {
  const date = new Date().getTime();
  // expired in 1 month
  const exp = new Date().setTime(date + 1000 * 60 * 60 * 24 * 30);
  return sign(
    {
      iss: issuer,
      sub: id,
      iat: date,
      exp: exp,
    },
    secret
  );
};

export const verifyToken = (token: string, secret: string) => {
  const result = verify(token, secret);
  if (!result) throw new ApiError(401);
  return result
};

export const isExpired = (exp: number) => {
  if (new Date().getTime() < exp) {
    return false;
  }

  return true;
};
