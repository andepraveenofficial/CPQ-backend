/* -----> Import Database <----- */
import db from '../knexdb';

/* -----> Connect database & Run the Server <----- */
const connectDatabase = async () => {
  try {
    await db.raw('SELECT 1');
    console.log('Successfully Database Connected');
  } catch (error) {
    console.error('Error in Database Connection:', error);
  }
};

export default connectDatabase;
