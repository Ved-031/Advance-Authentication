import mongoose from 'mongoose';
import { MongoClient, ServerApiVersion } from "mongodb"

export const connectDB = async () => {
    await mongoose.connect(process.env.MONGODB_URI as string)
    .then(() => {
        console.log("MongoDB connected...") 
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err.message);
        process.exit(1);
    });
}

if (!process.env.MONGODB_URI) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}
   
const uri = process.env.MONGODB_URI
const options = {
serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
},
}
   
let client: MongoClient
   
if (process.env.NODE_ENV === "development") {
    let globalWithMongo = global as typeof globalThis & {
        _mongoClient?: MongoClient
    }

    if (!globalWithMongo._mongoClient) {
        globalWithMongo._mongoClient = new MongoClient(uri, options)
    }
    client = globalWithMongo._mongoClient
} else {
    client = new MongoClient(uri, options)
}

export default client
