import winston from 'winston'
import expressWinston from 'express-winston'

function setUpLogger() {
  return expressWinston.logger({
    transports: [
      new winston.transports.Console()
    ],
    format: winston.format.simple(),
    meta: true,
    msg: "HTTP {{req.method}} {{req.url}}", 
    expressFormat: false, 
    colorize: false
  })
}

export default setUpLogger