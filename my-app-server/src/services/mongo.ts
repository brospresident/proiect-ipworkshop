import mongoose from 'mongoose';

const MONGO_URI: string = 'mongodb+srv://ipworkshop:ipworkshop@ipworkshopdb.tuebi.mongodb.net/ipwdb?retryWrites=true&w=majority';

mongoose.connection.once('open', (): void => console.log(`[Mongo]: Connection started at ${new Date()}`));
mongoose.connection.on('error', (err): void => console.error(err));

export async function connectMongo(): Promise<void> {
  await mongoose.connect(MONGO_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });
}