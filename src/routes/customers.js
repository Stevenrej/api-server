'use strict';

const express = require('express');
const { CustomerModel } = require('../models');
const { customerInterface, orderInterface } = require('../models');

const router = express.Router();

router.get('/customer', async (req, res, next) => {
  try{
    const customers = await customerInterface.read();
    res.status(200).send(customers);
  } catch(e){
    next(e);
  }
});


router.get('/customer/:id', async (req, res, next) => {

  try{
    let id = parseInt(req.params.id);
    const customers = await customerInterface.read(id);
    res.status(200).send(customers);
  } catch(e){
    next(e);
  }
});

router.get('/customerWithOrders/:id', async (req, res, next) => {
  const customerWithOrders = await customerInterface.readManyToOne(req.params.id, orderInterface.model);
  res.status(200).send(customerWithOrders);
});

router.post('/customer', async (req, res, next) => {
  try {
    const newCustomer = await customerInterface.create(req.body);
    res.status(200).send(newCustomer);
  } catch(e){
    next(e);
  }
});

router.put('/customer/:id', async (req, res, next) => {
  try {
    const result = await customerInterface.update(req.body, req.params.id);
    res.status(200).send(result);
  } catch(e){
    next(e);
  }
});

router.delete('/customer/:id', async (req, res, next) => {
  try {
    let id = parseInt(req.params.id);
    await customerInterface.destroy(id);
    res.status(200).send('customer deleted');
  } catch(e){
    next(e);
  }
});



module.exports = router;