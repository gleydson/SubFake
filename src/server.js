import http from 'http';
import app from './config/express';
import 'dotenv/config';

import './config/database.js';

app.set('port', process.env.PORT || 3333);

http.createServer(app).listen(app.get('port'), function() {
  console.log(`Server running on port ${app.get('port')}`);
});
