import express from 'express';
import mongoose from 'mongoose';

const app = express();

app.use(express.json());

// eslint-disable-next-line prefer-template
mongoose.connect('mongodb+srv://Admin:' + process.env.MONGO_ATLAS_PWD + '@cluster0-3dega.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const port = process.env.PORT || 5000;
// eslint-disable-next-line no-console
app.listen(port, () => console.log(`NobleMart is running on port ${port}`));
module.exports = app;
