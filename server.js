const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.use(express.static( __dirname + '/./public/dist/public' ));
app.use(bodyParser.json())

mongoose.connect('mongodb://localhost/authors2');
mongoose.Promise = global.Promise;

const AuthorSchema = new mongoose.Schema({
  name: {type: String, required: true, minlength: 3}
})
mongoose.model('Author', AuthorSchema)
const Author = mongoose.model('Author')

app.listen(8000, () => {
  console.log('LISTENING TO PORT 8000')
})


app.get('/authors', (req, res) => {
  Author.find().then(results => {
    res.json({status:"success", data: results})
  }).catch(err => {
    res.json({status:"error", data: {error: "Can't fetch from database"}})
  })
})

app.get('/authors/:id', (req, res) => {
  Author.findById(req.params.id).then(results => {
    res.json({status:"success", data: results})
  }).catch(err => {
    res.json({status:"error", data: {error: "Can't fetch from database"}})
  })
})

app.post('/authors', (req, res) => {
  Author.create(req.body).then(result => {
    res.json({status:"success", data: result})
  }).catch(err => {
    res.json({status:"error", data: {error: "Name is too short"}})
  })
})

app.put('/authors/:id', (req, res) => {
  Author.findByIdAndUpdate(req.params.id, req.body, {runValidators: true, new: true})
  .then(author => { return author.save()})
  .then(result => {
    res.json({status:"success", data: result})
  }).catch(err => {
    res.json({status:"error", data: {error: "Name is too short"}})
  })
})

app.delete('/authors/:id', (req, res) => {
  Author.findByIdAndDelete(req.params.id).then(result => {
    res.json({status:"success", data: result})
  }).catch(err => {
    res.json({status:"error", data: {error: "Can't delete."}})
  })
})

app.all("*", (req,res) => {
  res.sendFile(__dirname + "/./public/dist/public/index.html")
});

