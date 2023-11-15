import Rcon from "rcon";
import { getCategory, getOrder, getProductByID, getServer, updateBuyer } from "../dataBase/queries.js";

export const sendRconCommand = (order_id) => new Promise ((resolve,reject) => {
    getOrder(order_id).then((order) => {
        if(!order) {
            throw new Error("no order found");
        }
        getProductByID(order[0]?.product_id).then((product) => {
            if(product){
                getCategory(product.Category_id).then((category) => {
                    getServer(category.Server_id).then((server) => {
                        if(server){
                            const {IP,PORT,PASSWORD} = server;
                            const connection = new Rcon(IP,PORT,PASSWORD);
                            if(product.subcat_id == "privilliges"&&!product.temporary){
                                updateBuyer(order[0].player,category.Category_id,product.subcat_id,order[0].price);
                            }
                            connection.connect();
                            connection.on('auth', () => {
                                if(product.command.includes(',')) {
                                    const commandArr = product.command.split(',');
                                    commandArr.map((command) => {
                                        connection.send(command.replace('%p',order[0].player).replace('%q', order[0].quantity));
                                        resolve();
                                    })
                                } else {
                                    const command = product.command.replace('%p',order[0].player).replace('%q', order[0].quantity);
                                    connection.send(command);
                                    resolve();
                                }
                            }).on('error', (err) => {
                                reject(err);
                                throw err;
                            });
                        }
                        else {
                            reject("NO SERVER");
                        }
                    }).catch(err => reject(err)) 
                }).catch(err => reject(err)) ;
            } else {
                reject("NOT FOUND");
            }
        }).catch(err => reject(err)) 
    }).catch(err => reject(err)) ;
  })

