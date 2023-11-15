import express from "express";
import { api } from './routes/index.js';
import db from "./dataBase/connection.js";
import path from 'path';
import dotenv from "dotenv"


const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
dotenv.config();
app.use('/',api);
 app.use((error, request, response, next) => {
    console.error("Prevented sending this error to client:\n", error)
    const status = error.statusCode ? error.statusCode : 500
    response.status(status)
    response.send('500 Internal Server Error');
  })
app.listen(PORT, () => console.log('SERVER STARTED ON PORT', PORT, "\n"));
db.then();
app.use('/sitemap.xml',(req,res) => {
  const __dirname = new URL('./', import.meta.url).pathname;
  res.sendFile(path.join(__dirname, 'sitemap.xml'));
})
app.use('/api/texturepack/survival',(req,res) => {
  const __dirname = new URL('./resourcepack', import.meta.url).pathname;
  res.sendFile(path.join(__dirname, 'survival.zip'));
})
app.use('/api/texturepack/grief',(req,res) => {
  const __dirname = new URL('./resourcepack', import.meta.url).pathname;
  res.sendFile(path.join(__dirname, 'grief.zip'));
})
app.use(express.static('frontend/build'));
app.get('*', function (req, res) {
    const __dirname = new URL('./', import.meta.url).pathname;
    res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
    });



