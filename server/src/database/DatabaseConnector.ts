import mongoose from 'mongoose';
import Logger from '../commons/Logger';
import databaseConfig from '../config/database.config';

export default class DatabaseConnector {
  public static Establish() {
    mongoose.connect(databaseConfig.connectionUri, () => {
      Logger.Log('Establised connection with mongodb database.');
    });
  }
}
