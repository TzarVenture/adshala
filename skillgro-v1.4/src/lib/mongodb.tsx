import mongoose from "mongoose";

const clientPromise = async () => {
    // Re-use existing connection if already connected (prevents connection leaks in Next.js dev & serverless)
    if (mongoose.connection.readyState >= 1) {
        return mongoose.connection;
    }

    const mongoUrl = process.env.MONGODB_URL;
    if (!mongoUrl) {
        throw new Error("MONGODB_URL environment variable is not defined");
    }

    try {
        const connectionInstance = await mongoose.connect(`${mongoUrl}/enquiredata`);
        console.log("db connected", connectionInstance.connection.host);
        return connectionInstance;
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw error;
    }
}

export default clientPromise;