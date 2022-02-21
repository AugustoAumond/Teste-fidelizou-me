const express = require('express');
const cors = require('cors');

const app = express();
app.use(function(req, res, next) {  
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(cors());

const db = require('./db.json');
port = 3003

function index(req, res) {
  res.send(db)
}

function random(req, res) {
  const n = req.params.n
  const list = []
  for(let i=0; i < n; i++) {
    const r = Math.floor(Math.random()*db.length)
    list.push(db[r])
  }
  res.send(list)
}

app.get('/', index)
app.get('/random/:n', random)
app.listen(port, () => console.log(`Beer server running on port ${port}!`))
