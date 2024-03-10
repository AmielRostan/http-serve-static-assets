const http = require('http');
const fs = require("fs");

const server = http.createServer((req, res) => {
  // Your code here
  let content;

  if(req.url.startsWith('/static')) {
    const url = req.url.split('/');
    url.shift();
    url.shift();
    const route = url.join('/');
    const content = fs.readFileSync('./assets/' + route);
    const contentType = url.pop().split('.').pop();

    if(contentType === 'css') {
      res.setHeader('Content-type', 'text/' + contentType);
    } else {
      res.setHeader('Content-type', 'image/' + contentType);
    }
    res.end(content)
  } else {
    content = fs.readFileSync('./index.html');
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/html');
    res.end(content);
  }
});




const port = 5000;

server.listen(port, () => console.log('Server is listening on port', port));
