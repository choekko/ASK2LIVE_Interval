import ReconnectingWebSocket from 'reconnecting-websocket';
import { WS_ENDPOINT } from '../environment';
import { ON_MESSAGES_VALUE_CHANGE, ON_MESSAGES_READING, ON_MESSAGES_READ } from './types';

//export const onMessagesValueChange = data => ( console.log('data',data));
export const onMessagesValueChange = data => ({ type: ON_MESSAGES_VALUE_CHANGE, payload: data });

export const onRoomMessagesRead = holeId => dispatch => {
  dispatch({ type: ON_MESSAGES_READING });

  const socket = new ReconnectingWebSocket(`${WS_ENDPOINT()}/hole/${holeId}/`);
  // const socket = new WebSocket(`${WS_ENDPOINT()}/hole/${holeId}/`);
  socket.debug = true;
  // socket.timeoutInterval = 4400;

  // const socket = new WebSocket(`${WS_ENDPOINT()}/hole/${holeId}`);
  console.log("-----------socket--------------",socket);

  socket.onopen = event => console.log('WebSocket Connected');
  socket.onerror = event => console.log('error event : ', event);
  socket.onmessage = event => dispatch({ type: ON_MESSAGES_READ, payload: { messages: JSON.parse(event.data) } });

  socket.onclose = event => console.log('WebSocket Disconnected');

  return socket;
}