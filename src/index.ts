import {server} from './server.ts';

// Define hostname and port
const hostname = '127.0.0.1' // localhost
const port = 3000;


// Run server
server.listen(port, hostname, () => {
    console.log(`Server ran on http://${hostname}:${port}/`);
});
