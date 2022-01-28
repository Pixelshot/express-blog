const express = require('express');
const Blog = require('../models/blog');
// Router() is an object from express
// router gives us a new instance of the Router object
// Attach request handlers to router
const router = express.Router();

// Get Method
router.get('/', (req, res) => {
  // There is a sort method in mongoose.
  // createdAt is coming from Blog Model
  // - 1 = descending order. Newest to oldest
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render('index', {
        title: 'Home',
        blogs: result,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

// Post Method
// middleware express.urlencoded() grants us access to the data from form.
router.post('/', (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => res.redirect('/'))
    .catch((err) => console.log(err));
});

// Create blog - This should be higher than getting a single blog[get('blogs/:id')]
router.get('/create', (req, res) => {
  res.render('create', {
    title: 'Create New Blog',
  });
});

// Get a single blog
router.get('/:id', (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) =>
      res.render('details', { blog: result, title: 'Blog Details' })
    )
    .catch((err) => console.log(err));
});

// Delete a blog
// For delete we'll need to use an npm package to override html method because by default it only accepts GET & POST
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then(res.redirect('/'))
    .catch((err) => console.log('error: ', err));
});

module.exports = router;
