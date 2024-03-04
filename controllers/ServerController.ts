import express from 'express';
import { BaseController } from "./BaseController";
import axios from "axios";

export class ServerController extends BaseController {
    protected async executeImplementation(req: express.Request, res: express.Response): Promise<any> {
        try {
            axios.all([
                axios.get('https://api.mcsrvstat.us/2/play.md-resorts.ru'),
                axios.get('https://api.mcsrvstat.us/2/play.md-resorts.ru:25568'),
                axios.get('https://api.mcsrvstat.us/2/node.md-resorts.ru:25567'),
                axios.get('https://api.mcsrvstat.us/2/play.md-resorts.ru:25567'),
              ]).then(axios.spread((bungee, survival, grief, bedwars) => {
                this.ok(res, {bungee: bungee.data, survival: survival.data, grief: grief.data, bedwars: bedwars.data}); 
                return;
              }));
        } catch (err: any) {
          return this.fail(res, err.toString())
        }
    }
}