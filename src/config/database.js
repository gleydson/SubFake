import mongoose from 'mongoose';

import { user, pass, db_url, db_name } from '../credentials/database';

const uri = `mongodb+srv://${db_url}?retryWrites=true&w=majority`;

export default (function() {
  mongoose.connect(uri, {
    useNewUrlParser: true,
    dbName: db_name,
    user,
    pass,
  });

  mongoose.connection.on('connected', function() {
    console.log(`Mongoose > Connected on ${uri}`);
  });

  mongoose.connection.on('disconnected', function() {
    console.log(`Mongoose > Disconnected from ${uri}`);
  });

  mongoose.connection.on('error', function(erro) {
    console.log(`Mongoose > Connection error with mongo database: ${erro}`);
  });

  mongoose.set('debug', false); // Show operations with database in the console
})();
