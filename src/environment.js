export const WS_ENDPOINT = () => {
  const location = window.location;

  let protocol = 'ws://';

  if (location.protocol === 'https:') {
    protocol = 'wss://';
  }

  const endpoint = protocol + 'www.ask2live.me:8001/ws';

  return endpoint;
}