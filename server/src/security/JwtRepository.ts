import jwt from 'jsonwebtoken';
import { Socket } from 'socket.io';
import jwtConfig from '../config/jwt.config';
import CharacterModel, { ICharacter } from '../models/Character';

export default class JwtRepository {
  public static SignToken(data: object): string {
    return jwt.sign(data, jwtConfig.secret);
  }

  public static async DecodeCharacterFromSocket(socket: Socket): Promise<ICharacter> {
    const token = socket.handshake.auth.token || '';
    const id = jwt.verify(token, jwtConfig.secret);
    const character = await CharacterModel.findById(id);
    return character || new CharacterModel();
  }

  public static VerifyToken(token: string): boolean {
    try {
      jwt.verify(token, jwtConfig.secret);
      return true;
    } catch {
      return false;
    }
  }
}
