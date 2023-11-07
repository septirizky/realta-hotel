import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import router from './routes/index.js';

const app = express();
const PORT = process.env.PORTS || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('hello world');
});

app.use(router);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
