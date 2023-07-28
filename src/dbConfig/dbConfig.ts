import mongoose from 'mongoose';
export async function connect() {
  try {
    mongoose.connect(process.env.MONGODB_URL!); //! is used as that is not an optional
    const connection = await mongoose.connection;
    connection.on('connected', () => {
      console.log('Mongodb connected');
    });

    connection.on('error', (err) => {
      console.log('mongodb connection error', err);
      process.exit();
    });
  } catch (error) {
    console.log('Something went Wrong!!');
    console.log(error);
  }
}
