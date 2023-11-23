
import express from 'express';
import {getRules, getAgreement} from '../../dataBase/queries';
export const rules = express.Router();

rules.get('/rules', function(request, response) {
  getRules.then((result) => {
    response.status(200);
    response.send(result);
  }, (error) => {
    response.status(404);
    response.send('not found');
  });
});

rules.get('/user-agreement', (req, response) => {
  getAgreement.then((result) => {
    response.status(200);
    response.send(result[0]);
  }, (error) => {
    response.status(404);
    response.send('not found');
  });
});
