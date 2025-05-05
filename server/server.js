import config from './../config/config';
import app from './express';
import mongoose from 'mongoose';

// Connection URL
mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUri, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
}).catch(err => {
  console.error(`MongoDB connection error: ${err}`);
  process.exit(1);  // Exit the app with failure code
});

mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
  throw new Error(`unable to connect to database: ${config.mongoUri}`);
});

app.listen(config.port, (err) => {
  if (err) {
    console.log(err);
  }
  console.info('Server started on port %s.', config.port);
});

if (process.env.NODE_ENV === 'development') {
  console.log("Mongo URI: ", config.mongoUri);
}
