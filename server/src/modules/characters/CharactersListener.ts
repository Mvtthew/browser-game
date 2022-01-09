import socketio from 'socket.io';
import Logger from '../../commons/Logger';

export default class CharactersListener {
  public static Register(socket: socketio.Socket): void {
    socket.on('character-login', (message) => {
      const { name } = message;
      Logger.Log(`Character logged in (${name})`);
    });
  }
}
