import socketio from 'socket.io';
import express from 'express';
import http from 'http';
import cors from 'cors';
import DatabaseConnector from '../database/DatabaseConnector';
import Logger from '../commons/Logger';
import CharactersController from '../modules/characters/CharactersController';
import CharactersListener from '../modules/characters/CharactersListener';
import MovementListener from '../modules/movement/MovementListener';
import socketioMiddleware from '../middleware/socketio.middleware';

export default class AppBootstraper {
  public expressApp: express.Express;
  public httpServer: http.Server;
  public io: socketio.Server;

  constructor() {
    DatabaseConnector.Establish();

    this.expressApp = express();
    this.expressApp.use(express.json());

    this.httpServer = http.createServer(this.expressApp);

    this.io = new socketio.Server(this.httpServer);
  }

  public registerListeners(): void {
    this.io.on('connection', (socket) => {
      if (socketioMiddleware(socket)) {
        CharactersListener.Register(socket);
        MovementListener.Register(socket);
      }
    });
  }

  public registerControllers(): void {
    CharactersController.Register(this.expressApp);
  }

  public enableCors(): void {
    Logger.Log('Cors for http server enabled!');
    this.expressApp.use(cors());
  }

  public startOnPort(port: number = 8080): void {
    this.httpServer.listen(port, () => {
      Logger.Log(`Starting app on port *::${port}`);
    });
  }
}
