import io from 'socket.io-client';
let socket = io("http://localhost:3002/");
export default socket;