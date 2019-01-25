const express = require('express');
const app = express();
const fetch = require('node-fetch');
const mongoose = require('mongoose');

const postScheme = new mongoose.Schema({
  id: Number,
  title: String,
  categories: String,
  content: String
});
const Post = mongoose.model("Post", postScheme);

let posts = [
  { id: 1,
  title: 'Hi!',
  categories: 'Computer, Friends',
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur non sodales ligula, sed tristique metus. Duis ultrices velit nisl, congue pretium quam tempus in. Vestibulum finibus sed augue in ultrices. Duis pulvinar faucibus tortor vitae pharetra. Curabitur tincidunt, nisi ut cursus rhoncus, odio sapien gravida dolor, a pulvinar eros dolor ac mi.'
  },
  {
  id: 2,
  title: 'New Post',
  categories: 'Candy',
  content: 'Vivamus tincidunt fermentum justo, et malesuada urna pellentesque vel. Aenean elementum cursus feugiat. Donec volutpat felis orci, a egestas mauris mollis eget. Praesent feugiat metus ac purus ultrices, a ultricies nisi cursus. Duis lacinia mauris magna, vel accumsan nisl euismod eget. Nullam at enim interdum, cursus urna rhoncus, eleifend ligula.'
  }
]

app.listen(1234);
app
    .set('view engine', 'pug')
    .set('views', __dirname + '/views')
    .get('/public/:file', (req, res) => {
      res.sendFile(`${__dirname}/public/${req.params.file}`);
    })
    .get('/', (req, res) => {
      res.render('index', {posts: posts});
    })
    .get('/new_post', (req, res) => {
      res.render('new_post');
    })
    .get('/api/posts', (req, res) => {
      mongoose.connect("mongodb://localhost:27017/postsdb", { useNewUrlParser: true });
      let post = new Post({
        id: 1,
        title: 'String',
        categories: 'String',
        content: 'String'
      });
      post.save(err => {
        mongoose.disconnect();  // отключение от базы данных
        if(err) return console.log(err);
        console.log("Сохранен объект", user);
      });
      res.send(posts);
    })
    .post('/api/posts', (req, res) => {
      res.send('post is created');
    })
    .get('/api/posts/:id', (req, res) => {
      res.send(`post #${req.params.id}`);
    })
