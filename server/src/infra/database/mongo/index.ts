import mongoose from "mongoose";

async function bootstrap() {
  const database = process.env.MONGODB_DATABASE;

  if (!database) {
    throw new Error('Failed to load Mongodb database!');
  }

  mongoose.set('strictQuery', false);

  await mongoose.connect(`mongodb://localhost/${database}`);
}

bootstrap();
