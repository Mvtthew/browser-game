import { io } from 'socket.io-client';

localStorage.debug = '*';

const socket = io('http://localhost:3001', {
  autoConnect: false,
});

export default socket;
