import mongoose from 'mongoose';
import databaseConfig from '../config/database.config';

export default class DatabaseConnector {
  public static Establish() {
    mongoose.connect(databaseConfig.connectionUri);
  }
}
