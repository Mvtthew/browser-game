import socketio from 'socket.io';
import express from 'express';
import http from 'http';
import cors from 'cors';
import DatabaseConnector from '../database/DatabaseConnector';
import Logger from '../commons/Logger';

export default class AppBootstraper {
  public expressApp: express.Express;
  public httpServer: http.Server;
  public io: socketio.Server;

  constructor() {
    DatabaseConnector.Establish();

    this.expressApp = express();
    this.httpServer = http.createServer(this.expressApp);
    this.io = new socketio.Server(this.httpServer);

    // Mockup
    this.io.on('connection', (socket) => {
      socket.on('message', (message) => {
        console.log(message);
        socket.emit('hello', { message: 'Hello there!' });
        socket.local.emit('hello', { message: 'Hello there!' });
      });
      socket.on('disconnect', () => console.log('bye!'));
    });
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
