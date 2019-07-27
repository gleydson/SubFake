import http from 'http';
import app from './config/express';

import './config/database.js';

http.createServer(app).listen(app.get('port'), function() {
  console.log(`Server running on port ${app.get('port')}`);
});
