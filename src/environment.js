export const WS_ENDPOINT = () => {
  const location = window.location;

  let protocol = 'ws://';

  if (location.protocol === 'https:') {
    protocol = 'wss://';
  }

  const endpoint = protocol + 'www.ask2live.me/ws';
  // const endpoint = protocol + '3.36.230.239:8000/ws';
  // const temp = 'ws://'
  // + '127.0.0.1:8000'
  // + '/ws'

  return endpoint;
}