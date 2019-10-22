import express from 'express';
import mongoose from 'mongoose';
import hbs from 'express-handlebars';
import path from 'path';

const app = express();

// // Error handling
// app.use((req, res, next) => {
//   const error = new Error('Not found');
//   error.status = 404;
//   next(error);
// });
// app.use((error, req, res) => {
//   res.status(error.status || 500);
//   res.json({
//     error: {
//       message: error.message,
//     },
//   });
// });

// Routes
const userRoute = require('./routes/users');
const productRoute = require('./routes/products');
const orderRoute = require('./routes/orders');

// View Engine
app.engine('hbs', hbs({ extname: 'hbs', defaultLayout: 'layout', layoutsDir: `${__dirname}/views/layouts` }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.json());
app.use('/api/auth', userRoute);
app.use('/api/products', productRoute);
app.use('/api/orders', orderRoute);

// Connect to Database
// eslint-disable-next-line prefer-template
mongoose.connect('mongodb+srv://Admin:' + process.env.MONGO_ATLAS_PWD + '@cluster0-3dega.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.Promise = global.Promise;

const port = process.env.PORT || 5000;
// eslint-disable-next-line no-console
app.listen(port, () => console.log(`NobleMart is running on port ${port}`));
module.exports = app;
