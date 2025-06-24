import app from './app.js';
import http from 'http';
import { PORT } from './config/index.js';


const server = http.createServer(app);

server.listen(PORT, () => console.log(`Running on port ${PORT}`));