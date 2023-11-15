import express, { response } from "express";
import axios from "axios";

export const server = express.Router();
server.get('/server/status', (request,response) => {
    axios.all([
        axios.get('https://api.mcsrvstat.us/2/play.md-resorts.ru'),
        axios.get('https://api.mcsrvstat.us/2/play.md-resorts.ru:25568'),
        axios.get('https://api.mcsrvstat.us/2/node.md-resorts.ru:25567'),
        axios.get('https://api.mcsrvstat.us/2/play.md-resorts.ru:25567')
    ]).then(axios.spread((bungee,survival,grief,bedwars) => {
        response.status(200).send({bungee: bungee.data,survival: survival.data, grief: grief.data, bedwars: bedwars.data});
        return;
    }));  
});

server.get('/bonus', (req,res) => {
}); 
