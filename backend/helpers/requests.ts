import { Response, NextFunction, Request } from "express"

type Status = "success" | "fail"
type Data = Object | Array<Object>

function response(status: Status, data?: Data, message?: string) {
  return {
    status,
    data,
    message
  }
}

type RequestArgs = [Request, Response, NextFunction];
type RequestFunc = (a: Request, b: Response, c: NextFunction) => void | Promise<void>

interface IError {
  message: string
  data?: object
}

function tryCatch (fn: RequestFunc, error: IError) {
  return async function tryCatchWrap(...args: RequestArgs) {
    try {
      await fn(...args)
    } catch(e) {
      const next = args[2]
      next(e)
    }
  }
}

export {
  response,
  tryCatch
}
