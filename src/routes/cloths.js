'use strict';

const express = require('express');
const { clothInterface } = require('../models');

const router = express.Router();

router.get('/cloths', async (req, res, next) => {
  try{
    const cloths = await clothInterface.read();
    res.status(201).send(cloths);
  } catch(e){
    next(e);
  }
});


router.get('/cloths/:id', async (req, res, next) => {

  try{
    let id = parseInt(req.params.id);
    const cloths = await clothInterface.read(id);
    res.status(200).send(cloths);
  } catch(e){
    next(e);
  }
});

router.post('/cloths/', async (req, res, next) => {
  try {
    const newCloths = await clothInterface.create(req.body);
    res.status(200).send(newCloths);
  } catch(e){
    next(e);
  }
});

router.put('/cloths/:id', async (req, res, next) => {
  try {
    const result = await clothInterface.update(req.body, req.params.id);
    res.status(200).send(result);
  } catch(e){
    next(e);
  }
});

router.delete('/cloths/:id', async (req, res, next) => {
  try {
    let id = parseInt(req.params.id);
    await clothInterface.destroy({where: {id}});
    res.status(200).send('cloths deleted');
  } catch(e){
    next(e);
  }
});



module.exports = router;