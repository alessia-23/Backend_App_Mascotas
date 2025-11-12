import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

mongoose.set('strictQuery', true);

const connection = async () => {
    try {
        // Conectarse a MongoDB Atlas (variable del entorno en Vercel)
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`✅ Database connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('❌ Error connecting to MongoDB Atlas:', error.message);
    }
};

export default connection;
