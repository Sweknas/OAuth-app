import { ErrorRequestHandler  } from 'express'
import { response } from './'

interface ErrorKeyValue {
  [key: string]: any;
}

class BadRequest extends Error {
  code: number
  data?: object
  constructor(message: string, data?: object) {
    super(message)
    this.name = "BadRequest"
    this.code = 400
    this.data = data
  }
}

class Unauthorized extends Error {
  code: number
  data?: object
  constructor(message: string, data?: object) {
    super(message)
    this.name = "Unauthorized"
    this.code = 401
    this.data = data
  }
}

class InternalServerError extends Error {
  code: number
  data?: object
  constructor(message: string, data?: object) {
    super(message)
    this.name = "InternalServerError"
    this.code = 500
    this.data = data
  }
}

const errorHandler: ErrorRequestHandler = (err, req, res, next): void => {
  // constructing variables
  let statusCode = err.code || 500
  let data: ErrorKeyValue = {
    type: err.name || "InternalServerError",
  }
  let message = err.message || "unknown server error"

  // handler multiple errors
  if (err.errors) {
    let errors: ErrorKeyValue = {}

    Object.keys(err.errors).forEach((key) => {
      errors[key] = err.errors[key].message;
    });
    data.errors = errors
  }

  // vaidate statusCode
  if(statusCode < 100 && statusCode > 599) {
    statusCode = 500
  }

  res.status(statusCode).json(
    response(
      "fail",
      data,
      message
    )
  )
}

export default errorHandler

export {
  BadRequest,
  Unauthorized,
  InternalServerError
}
