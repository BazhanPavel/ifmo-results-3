const express = require('express');
const app = express();
const fetch = require('node-fetch');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const {
  performance
} = require('perf_hooks');
mongoose.connect("mongodb://localhost:27017/postsdb", { useNewUrlParser: true });

const postScheme = new mongoose.Schema({
  id: Number,
  title: String,
  categories: String,
  content: String
}, { collection: 'posts'});
const Post = mongoose.model("Post", postScheme);

let posts;

posts = [
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
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .get('/public/:file', (req, res) => {
      res.sendFile(`${__dirname}/public/${req.params.file}`);
    })
    .get('/', (req, res) => {

      time = performance.now();
      Post.find({}, (err, docs) => {
        if (err) {
          console.log(err);
          return;
        }
        time = performance.now() - time;
        console.log(time);
        time = performance.now();
        res.render('index', {posts: docs});
        time = performance.now() - time;
        console.log(time + '\n');
      });

    })
    .get('/new_post', (req, res) => {
      res.render('new_post');
    })
    .get('/api/posts', (req, res) => {
      res.send(posts);
    })
    .post('/api/posts', (req, res) => {
      mongoose.connect("mongodb://localhost:27017/postsdb", { useNewUrlParser: true });
      console.log(req.body.content);
      let post = new Post({
        id: 1,
        title: req.body.title,
        categories: req.body.categories,
        content: req.body.content
      });
      post.save(err => {
        if(err) return console.log(err);
        console.log("Сохранен объект\n", post);
      });
      res.redirect('/');
    })
    .get('/api/posts/:id', (req, res) => {
      res.send(`post #${req.params.id}`);
    })
