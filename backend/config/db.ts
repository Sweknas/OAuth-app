import mongoose from 'mongoose'

async function connectToDB(): Promise<Boolean> {
  const {
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
    DB_NAME,
  } = process.env

  const dbUrl = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`
  const connection = mongoose.connect(dbUrl).then(
    () => {
      console.log("Connected to DB")
      return true
    },
    (error) => {
      console.log("Failed to connect to DB", error)
      return false
    }
  )
  return connection
}

export default connectToDB
