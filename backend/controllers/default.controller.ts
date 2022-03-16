import { tryCatch, response } from '../helpers'

function get() {
  const error = {
    code: 500,
    message: "Unknown error in get defaultController"
  }
  return tryCatch((req, res) => {
    res.json(response(
      "success",
      undefined,
      "This is home"
    ))
  }, error)
}

function secret() {
  const error = {
    code: 500,
    message: "Unknown error in secret route"
  }
  return tryCatch((req, res) => {
    res.json(response(
      "success",
      undefined,
      "This is a secret"
    ))
  }, error)
}



export default {
  get,
  secret
}
