const express = require('express');
const app = express();
const fetch = require('node-fetch');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect("mongodb://localhost:27017/postsdb", { useNewUrlParser: true });

const postScheme = new mongoose.Schema({
  id: Number,
  title: String,
  categories: String,
  content: String
}, { collection: 'posts'});

const Post = mongoose.model("Post", postScheme);

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
      console.log(`http://${req.get('host')}/api/posts`);
      fetch(`http://${req.get('host')}/api/posts`)
        .then(r => r.text())
        .then(body => {
          console.log(body);
          res.render('index', {posts: JSON.parse(body).reverse()})
        });
    })
    .get('/new_post', (req, res) => {
      res.render('new_post');
    })
    .get('/api/posts', (req, res) => {
      Post.find({}, (err, docs) => {
        res.send(docs);
      })
    })
    .post('/api/posts', (req, res) => {
      // оборачиваем в Post.find для установки правильного id
      Post.find({}, (err, docs) => {
        // новый id равен количеству эл-ов ++
        let newid = ++docs.length;

        let post = new Post({
          id: newid,
          title: req.body.title,
          categories: req.body.categories,
          content: req.body.content
        });

        post.save(err => {
          if(err) return console.log(err);
          console.log("  -----\nСохранен объект\n", post, "\n  -----");
        });
        res.redirect('/');
      })
    })
    .get('/api/posts/:id', (req, res) => {
      res.send(`post #${req.params.id}`);
    })
