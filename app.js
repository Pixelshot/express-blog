const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const blogRoutes = require('./routes/blogRoutes');

require('dotenv').config();

const dbURI = process.env.db_URI;
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  // Only listen for requests AFTER connection to the database is established
  .then((data) => {
    app.listen(3000),
      console.log('MongoDB database connection established successfully...');
  })
  .catch((err) => console.log(err));
console.log('mongoose connection: ', mongoose.connection);
// express app
const app = express();

// register view engine
// use app.set() lets us configure some application settings like view engines
app.set('view engine', 'ejs');

// By default express is going to look for a views folder to serve view files
// This can be changed by using app.set()
// app.set('views', name of the folder where the views are)

app.use(cors());

// Express will run through these routes from TOP to BOTTOM

// Middleware & Static Files

// The server protects our files automatically from users in a browser. They can't just access our files anytime they want.
// We have to specify what files should be allowed for public view.
// Usually app.use() is used for middlewares.
// Use built in Express function express.static('name of the folder for the public') to serve our CSS.
app.use(express.static('public'));

// This middleware is used to save/capture data from our form(that's attached to name attributes) into a workable format.
app.use(express.urlencoded({ extended: true })); // extended option is optional
// Morgan
app.use(morgan('dev'));
// Method override is used to override html method. By default it only supports GET and POST. We want to use this package for put/delete and possibly others
app.use(methodOverride('_method'));

// How to render our view
// Use res.render(name of the file without the extension. extension has been declared at the top with app.set())
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
  });
});

// mongoose and mongo sandbox routes

// Blog Routes
app.use('/blogs', blogRoutes);
// 404 page
// this use method tells express to use this function for every incoming request.
// Hence why this needs to be at the bottom of the file, otherwise it'll stop other routes from running.
app.use((req, res) => {
  res.status(404).render('404', {
    title: '404',
  });
});

// listen for requests
// app.listen(3000);

// === === === === === === === === === === === === === === === === === === === === === === === === ===
// app.get('/', (req, res) => {
//   const blogs = [
//     {
//       title: 'Yoshi finds eggs',
//       snippet: 'Lorem ipsum dolor sit amet consectetur',
//     },
//     {
//       title: 'Mario finds stars',
//       snippet: 'Lorem ipsum dolor sit amet consectetur',
//     },
//     {
//       title: 'How to defeat bowser',
//       snippet: 'Lorem ipsum dolor sit amet consectetur',
//     },
//   ];
//   // Dynamic data is passed through to our front-end via object as a second argument in res.render()
//   res.render('index', {
//     title: 'Home',
//     blogs,
//   });
// });

// app.get('/', (req, res) => {
//   // res.send('<p>home page</p>');
//   // use sendFile to serve our HTML page.
//   // if root is not specified, then the computers root path will be the default path.
//   // setting root to __dirname like below tells express that root is at the top of this project directory's path.
//   res.sendFile('./views/index.html', { root: __dirname });
// });

// app.get('/about', (req, res) => {
//   // res.send('<p>about page</p>');
//   res.sendFile('./views/about.html', { root: __dirname });
// });

// app.use((req, res) => {
//   res.sendFile('./views/404.html', { root: __dirname });
// });

// How to redirect a URL
// app.get('/about-us', (req, res) => {
//   // Under the hood express makes a new request and send this request to '/about'
//   res.redirect('/about');
// });

// // Add a blog
// app.get('/add-blog', (req, res) => {
//   const blog = new Blog({
//     title: 'New Blog 2',
//     snippet: 'about my new blog',
//     body: 'more about my new blog',
//   });

//   // save() is a mongoose method
//   blog
//     .save()
//     .then((result) => res.send(result))
//     .catch((err) => console.log(err));
// });

// Get all blogs(this returns an array of objects containing all of the info)
// app.get('/all-blogs', (req, res) => {
//   Blog.find()
//     .then((result) => res.send(result))
//     .catch((err) => console.log(err));
// });

// app.get('/single-blog', (req, res) => {
//   Blog.findById('61de6d6f48a4deeb3adf2ea4')
//   .then((result) => res.send(result))
//   .catch((err) => console.log(err));
// });
