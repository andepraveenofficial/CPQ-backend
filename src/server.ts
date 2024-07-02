import app from './app';
import connectDatabase from './config/database';

const port = process.env.PORT || 5000;

connectDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`⚙️  Server is running at port: ${port}`);
    });
  })
  .catch((err: unknown) => {
    console.log(`Failed to connect to the database. ${err}`);
    process.exit(1);
  });
