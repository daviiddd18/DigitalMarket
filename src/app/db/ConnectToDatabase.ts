import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error('Por favor, define la MONGODB_URI dentro de .env.local');
}

async function connectToDatabase() {
  
  if (mongoose.connection.readyState >= 1) {
    console.log('Ya estamos conectados a MongoDB');
    return; 
  }

  console.log('Conexión establecida con MongoDB');
  return mongoose.connect(MONGODB_URI);
}

export { connectToDatabase };
