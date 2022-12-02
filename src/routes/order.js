'use strict';

const express = require('express');

const { orderInterface } = require('../models');

const router = express.Router();

router.get('/order', async (req, res, next) => {
  try{
    const orders = await orderInterface.read();
    res.status(200).send(orders);
  } catch(e){
    next(e);
  }
});


router.get('/order/:id', async (req, res, next) => {

  try{
    let id = parseInt(req.params.id);
    const orders = await orderInterface.read(id);
    res.status(200).send(orders);
  } catch(e){
    next(e);
  }
});

router.post('/order', async (req, res, next) => {
  try {
    const newOrders = await orderInterface.create(req.body);
    res.status(200).send(newOrders);
  } catch(e){
    next(e);
  }
});

router.put('/order/:id', async (req, res, next) => {
  try {
    const result = await orderInterface.update(req.body, req.params.id);
    res.status(200).send(result);
  } catch(e){
    next(e);
  }
});

router.delete('/order/:id', async (req, res, next) => {
  try {
    let id = parseInt(req.params.id);
    await orderInterface.destroy({where: {id}});
    res.status(200).send('customer deleted');
  } catch(e){
    next(e);
  }
});



module.exports = router;