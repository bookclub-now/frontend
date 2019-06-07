/* eslint-disable */
import { Socket } from './Phoenix';
import Config from '../config';
import moment from 'moment';

const TIMEOUT = 10000;
const URL = Config.CHAT_URL;

export default (clubId, chapter, token, onChat) => {
  // construct a socket
  const socket = new Socket(URL, { params: { token } });

  // configure the event handlers
  socket.onOpen(event => console.log('Connected.'));
  socket.onError(event => console.log('Cannot connect.'));
  socket.onClose(event => console.log('Goodbye.'));

  // open a connection to the server
  socket.connect();

  // configure a channel into a room - https://www.youtube.com/watch?v=vWFX4ylV_ko
  const chan = socket.channel(`chat_room:${clubId}/${chapter}`, {});

  // join the channel and listen for admittance
  chan
    .join()
    .receive('ignore', () => console.log('Access denied.'))
    .receive('ok', () => console.log('Access granted.'))
    .receive('timeout', () => console.log('Must be a MongoDB.'));

  // add some channel-level event handlers
  chan.onError(event => console.log('Channel blew up.'));
  chan.onClose(event => console.log('Channel closed.'));

  // when we receive a new chat message, just trigger the appropriate callback
  chan.on('shout', msg => onChat && onChat(msg));

  // a function to shut it all down
  const close = () => socket.disconnect();

  // a function to send a message
  const send = message => {
    chan.push('shout', {
      text: message.replace(/^\s+|\s+$/g, ''),
    });
  };
  
  // a function to send a message
  const getUnseenMessages = timestamp => {
    chan.push('load', {
      last_message_timestamp: timestamp || moment().format()
    });
  };

  // reveal a couple ways to drive this bus
  return { close, send, getUnseenMessages };
};
