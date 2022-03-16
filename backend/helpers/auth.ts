import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { Response, NextFunction, Request } from "express"
import { BadRequest, Unauthorized } from './'
import { UserModel } from "../models"

type validateToken = [boolean, any]

function createHash(string: string): string {
  return bcrypt.hashSync(string, parseInt(process.env.SALT_ROUNDS || "10"));
}

function validateHash(string: string, hash: string): boolean {
  return bcrypt.compareSync(string, hash);
}

function getTokenConfig(isAuth: boolean): [string, number] {
  if (isAuth) {
    return [
      process.env.AUTH_SECRET || "authSecret",
      parseInt(process.env.AUTH_TOKEN_LIFETIME || "60")
    ]
  } else {
    return [
      process.env.REFRESH_SECRET || "refreshSecret",
      parseInt(process.env.REFRESH_TOKEN_LIFETIME || "86400")
    ]
  }
}

function generateToken(data: Object, isAuth: boolean) {
  const [ secret, lifetime ] = getTokenConfig(isAuth)
  return jwt.sign(data, secret, { expiresIn: lifetime})
}

function validateToken(token: string, isAuth: boolean): validateToken {
  const [ secret ] = getTokenConfig(isAuth)
  let returnValues: validateToken = [false, undefined]
  jwt.verify(token, secret, function(err, decoded) {
    if (!err) {
      returnValues = [true, decoded]
    }
  })
  return returnValues
}

function authMiddleware (req: Request, res: Response, next: NextFunction) {
  const bearerToken = req.get('Authorization')
  if (bearerToken) {
    const jwtToken = bearerToken.replace('Bearer ','')
    const [authorized, userData] = validateToken(jwtToken, true)
    const user = authorized && UserModel.findOne({ email: userData.email })
    if(authorized && user) {
      req.user = userData
      next()
    } else {
      next(new Unauthorized("User is unauthorized"))
    }
  }
  next(new BadRequest("Request is missing authorization token"))
}

export { 
  createHash,
  validateHash,
  generateToken,
  validateToken,
  authMiddleware
}