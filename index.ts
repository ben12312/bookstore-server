import express from 'express';
import bodyParser from "body-parser";
import router from './router/router';
import cors from "cors";
const  app = express();
const  port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({ extended: false })
);
app.use('/', router);

app.listen(port, () => {
  console.log(`server running in port ${port}`)
})