import { UserModel, User } from '../models'
import {
  tryCatch,
  response,
  generateToken,
  validateHash,
  validateToken,
  BadRequest
} from '../helpers'

function create() {
  const error = {
    code: 500,
    message: "Unknown error when creating user"
  }
  return tryCatch(async ({ body }, res) => {
    const refreshToken = generateToken(
      {
        fullName: body.fullName,
        email: body.email
      },
      false
    )
    const authToken = generateToken(
      {
        fullName: body.fullName,
        email: body.email
      },
      true
    )
    const user = new UserModel({
      ...body,
      refreshToken
    })
    await user.save()
    res.json(response(
      "success",
      {
        ...user.toObject(),
        authToken
      }
    ))
  }, error)
}

function auth() {
  const error = {
    code: 500,
    message: "Unknown error when authorizing user"
  }
  return tryCatch(async ({ body }, res, next) => {
    const user: User | null = await UserModel.findOne({ email: body.email })

    const passwordMatch = body.password &&
      user?.password &&
      validateHash(body.password, user.password)

    if (user && passwordMatch) {
      const refreshToken = generateToken(
        {
          fullName: user.fullName,
          email: user.email
        },
        false
      )
      const authToken = generateToken(
        {
          fullName: user.fullName,
          email: user.email
        },
        true
      )
      user.refreshToken = refreshToken
      await user.save()

      res.json(response(
        "success",
        {
          ...user.toObject(),
          authToken
        }
      ))
    } else {
      next(new BadRequest("Authentication failed"))
    }
  }, error)
}

function refresh() {
  const error = {
    code: 500,
    message: "Unknown error when refresh authToken"
  }
  return tryCatch(async ({ body }, res, next) => {
    const user: User | null = await UserModel.findOne({ refreshToken: body.refreshToken })
    const [valid, data] = validateToken(body.refreshToken, false)
    if (user && valid) {
      const authToken = generateToken(
        {
          fullName: user.fullName,
          email: user.email
        },
        true
      )
      res.json(response(
        "success",
        {
          authToken
        }
      ))
    } else {
      next(new BadRequest('Refreshing authToken failed'))
    }
  }, error)
}

export default {
  create,
  auth,
  refresh
}