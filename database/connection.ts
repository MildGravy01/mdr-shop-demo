import mysql, { Connection } from 'mysql';
import {databaseSettings, QIWI_CONF} from './constants.js';
import QiwiBillPaymentsAPI from '@qiwi/bill-payments-node-js-sdk';

let connection: Connection;
function handleDisconnect() {
  connection = mysql.createConnection(databaseSettings);


  connection.connect(function(err) {
    if (err) {
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000);
    }
  });

  connection.on('error', function(err) {
    console.error('db error', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleDisconnect();
    } else {
      throw err;
    }
  });
}

handleDisconnect();

const db = () => new Promise<Connection>((resolve) => {
  if (connection) {
    resolve(connection);
  } else {
    throw new Error('NO DB CONNECTION');
  }
});

export const QIWI_API = new QiwiBillPaymentsAPI(QIWI_CONF.SECRET_KEY);
export default db;
