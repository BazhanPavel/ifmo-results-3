const express = require('express');
const app = express();

app.listen(1234);
app
    .get('/', (req, res) => {
      res.send('hello');
    })
