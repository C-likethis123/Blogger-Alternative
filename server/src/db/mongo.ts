import mongoose, { Mongoose } from "mongoose";
/**
 * TODO: Improve this class. Not sure what I can do to improve it, it looks like it should be a singleton pattern.
 */
class MongoConnection {
  private static db: Promise<Mongoose>;

  static isInitialized(): boolean {
    return this.db !== undefined;
  }

  static getDatabase(): Promise<Mongoose> {
    if (this.isInitialized()) {
        return this.db;
    }

    // Initialize the connection.
    try {
        this.db = mongoose.connect(process.env.MONGODB_URL);
        return this.db;
    } catch (e) {
        throw new Error("Database cannot be initialised - " + e.message);
    }
  }
}

export default MongoConnection;