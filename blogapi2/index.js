const express = require('express');
const app = express();

app.listen(1234);
app
    .get('/', (req, res) => {
      res.send('hello');
    })
    .get('/api/posts', (req, res) => {
      res.send('posts are here');
    })
    .post('/api/posts', (req, res) => {
      res.send('post is created');
    })
    .get('/api/posts/:id', (req, res) => {
      res.send(`post #${req.params.id}`);
    })
