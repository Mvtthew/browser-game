import socketio from 'socket.io';
import JwtRepository from '../../security/JwtRepository';
import MovementService from './MovementService';

export default class MovementListener {
  public static Register(io: socketio.Server, socket: socketio.Socket): void {
    socket.on('move', async (message) => {
      const character = await JwtRepository.DecodeCharacterFromSocket(socket);
      const { direction } = message;

      await MovementService.MoveCharacter(character, direction);

      io.emit('update-character-positions', await MovementService.GetAllCharactersPositions());
    });
  }
}
