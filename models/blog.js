const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema(
  // First object contains the structure of the documents that we want to store in our MongoDB collection.
  {
    title: {
      type: String,
      required: true,
    },
    snippet: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  // This second object is optional that consists a couple of options.
  // One of them being timestamps.
  { timestamps: true }
);

// mongoose.model(name of our schema(mongoose will pluralise this and look for that collection inside the database whenever we use this model in the future to communicate with the database),)
const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;
