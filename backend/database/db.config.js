import mongoose from 'mongoose';
const Connection = () => {
    const DB_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.e3trzsq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    try {
        mongoose.connect(DB_URI, { useNewUrlParser: true })
        console.log("Database connection established")
    } catch (error) {
        console.error(`Error connecting to database : ${error.message}`)
    }
}

export default Connection;