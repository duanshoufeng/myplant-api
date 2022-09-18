export default function config() {
  if (!process.env.JWT_KEY) {
    throw new Error("FATAL ERROR: JWT_KEY is not defined.");
  }

  if (!process.env.MONGODB_URL) {
    throw new Error("FATAL ERROR: MONGO_CONNECTION is not defined.");
  }
}
