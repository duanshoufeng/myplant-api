export default function config() {
  if (!process.env.JWT_KEY) {
    throw new Error("FATAL ERROR: JWT_KEY is not defined.");
  }

  if (!process.env.MONGODB_URL) {
    throw new Error("FATAL ERROR: MONGODB_URL is not defined.");
  }
}
