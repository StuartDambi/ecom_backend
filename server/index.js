import express from 'express';
import mongoose from 'mongoose';
import hbs from 'express-handlebars';
import path from 'path';

const app = express();
const userRoute = require('./routes/users');

// View Engine
app.engine('hbs', hbs({ extname: 'hbs', defaultLayout: 'layout', layoutsDir: `${__dirname}/views/layouts` }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.json());
app.use('/api/auth', userRoute);

// Connect to Database
// eslint-disable-next-line prefer-template
mongoose.connect('mongodb+srv://Admin:' + process.env.MONGO_ATLAS_PWD + '@cluster0-3dega.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const port = process.env.PORT || 5000;
// eslint-disable-next-line no-console
app.listen(port, () => console.log(`NobleMart is running on port ${port}`));
module.exports = app;
