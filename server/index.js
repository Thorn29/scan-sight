const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv').config({ path: path.join(__dirname, './config/dev.env')});;
const userRouter = require('./routers/user');
const textRouter = require('./routers/text');

const app = express();
app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(textRouter);

const port = process.env.PORT || '3000';

app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
})
