const Blog = require('../models/blog');

const blog_index = (req, res) => {
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
};

const blog_details = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) =>
      res.render('details', { blog: result, title: 'Blog Details' })
    )
    .catch((err) => console.log(err));
};

blog_create_post = (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => res.redirect('/'))
    .catch((err) => console.log(err));
};

blog_create_get = (req, res) => {
  res.render('create', {
    title: 'Create New Blog',
  });
};

blog_delete = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then(res.redirect('/'))
    .catch((err) => console.log('error: ', err));
};

module.exports = {
  blog_index,
  blog_details,
  blog_create_post,
  blog_create_get,
  blog_delete,
};
