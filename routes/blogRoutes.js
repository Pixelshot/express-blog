const express = require('express');
const {
  blog_index,
  blog_details,
  blog_create_get,
  blog_create_post,
  blog_delete,
} = require('../controllers/blogController');

// Router() is an object from express
// router gives us a new instance of the Router object
// Attach request handlers to router
const router = express.Router();

// Get Method
router.get('/', blog_index);

// Post Method
// middleware express.urlencoded() grants us access to the data from form.
router.post('/', blog_create_post);

// Create blog - This should be higher than getting a single blog[get('blogs/:id')]
router.get('/create', blog_create_get);

// Get a single blog
router.get('/:id', blog_details);

// Delete a blog
// For delete we'll need to use an npm package to override html method because by default it only accepts GET & POST
router.delete('/:id', blog_delete);

module.exports = router;
