import express from 'express';
import Connection from './database/db.config.js';
import routes from './routes/routes.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json({extended: true}));
app.use('/', routes);

const PORT = process.env.SERVER_PORT;
Connection();


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})