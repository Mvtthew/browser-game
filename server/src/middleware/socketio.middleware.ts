import { Socket } from 'socket.io';
import JwtRepository from '../security/JwtRepository';

const socketioMiddleware = (socket: Socket, next: any): void => {
  const { token } = socket.handshake.auth;
  if (!token) {
    socket.disconnect();
    next(new Error());
  } else if (!JwtRepository.VerifyToken(token)) {
    socket.disconnect();
    next(new Error());
  } else {
    next();
  }
};

export default socketioMiddleware;
