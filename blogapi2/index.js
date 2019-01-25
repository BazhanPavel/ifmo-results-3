const express = require('express');
const app = express();
const fetch = require('node-fetch');
let posts = [
  { id: 1,
  title: 'Hi!',
  categories: 'Computer, Friends',
  content: 'Post about Friends'
  },
  {
  id: 2,
  title: 'New Post',
  categories: 'Candy',
  content: 'Post about Candy'
  }
]

app.listen(1234);
app
    .set('view engine', 'pug')
    .set('views', __dirname + '/views')
    .get('/', (req, res) => {
      res.render('index', {posts: posts});
    })
    .get('/new_post', (req, res) => {
      res.sendFile(__dirname + '/public/post.html');
    })
    .get('/api/posts', (req, res) => {
      res.send(posts);
    })
    .post('/api/posts', (req, res) => {
      res.send('post is created');
    })
    .get('/api/posts/:id', (req, res) => {
      res.send(`post #${req.params.id}`);
    })
