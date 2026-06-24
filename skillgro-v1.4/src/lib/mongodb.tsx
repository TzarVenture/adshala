import mongoose from "mongoose";


const clientPromise = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/enquiredata`)
        console.log("db connected", connectionInstance.connection.host)
    } catch (error) {
        console.log("some error has occured", error)
        process.exit(1)
    }
}

export default clientPromise;