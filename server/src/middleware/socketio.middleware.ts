import { Socket } from 'socket.io';
import JwtRepository from '../security/JwtRepository';

const socketioMiddleware = (socket: Socket): boolean => {
  const token = socket.request.headers.authorization;
  if (!token) {
    socket.disconnect();
    return false;
  }
  if (!JwtRepository.VerifyToken(token)) {
    socket.disconnect();
    return false;
  }
  return true;
};

export default socketioMiddleware;
