const http = require('http');
const fs = require('fs');
const port = process.env.PORT || 3000;

function serverStaticFile(res, path, contentType, responseCode = 200){
  fs.readFile(__dirname + path, (err, data)=> {
    if(err){
      res.writeHead(500, {'Content-Type': 'text/plain'});
      return res.end('500 - Internal Error');
    }
    res.writeHead(responseCode, {'Content-Type': contentType});
    res.end(data);
  });
}

const server = http.createServer((req, res)=>{
  //쿼리 스트링, 옵션인 마지막 슬래시를 없애고 소문자로 바꿔서 url을 정규화
  const path = req.url.replace(/\/?(?:\?.*)?$/,'').toLowerCase();

  switch(path){
    case '' :
      serverStaticFile(res, '/public/home.html','text/html');
      break;
    case '/about' :
      serverStaticFile(res, '/public/about.html','text/html');
      break;
    case '/img/logo.png':
      serverStaticFile(res, '/public/img/logo.png','image/png');
      break;
    default :
      serverStaticFile(res, '/public/404.html','txt/html',404);
      break;
  }
});

server.listen(port,()=> console.log('server started on port ${port};' + 'press Ctrl-C to terminate....'));
