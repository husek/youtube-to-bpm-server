import './LoadEnv';
import app from '@server';
import logger from '@shared/Logger';
import mongoose from 'mongoose';

// Start the server
const port = Number(process.env.PORT || 3000);

if (process.env.SAVE_RESULTS !== 'false') {
  mongoose.connect(`${process.env.MONGODB_URL}`, { useUnifiedTopology: true, useNewUrlParser: true });

  const db = mongoose.connection;

  db.once('open', () => {
    console.log('MongoDB database connection established successfully');
  });
}

app.listen(port, () => {
  logger.info(`Server started on port: ${port}`);
});
