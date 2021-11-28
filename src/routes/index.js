const express = require('express');
const router = express.Router();
const Task = require('../model/task');
const Fecha = require('../model/date');

router.get('/', async (req, res) => {
  const tasks = await Task.find();
  console.log('marco123',tasks)
  res.render('index', {
    tasks
  });
});



router.post('/add', async (req, res, next) => {
  const task = new Task(req.body);
  await task.save();
  res.redirect('/');
});

router.get('/cale', async (req, res, next) => {
   var moment = require('moment-timezone');
  var day = new Date()
  var dayWrapper = moment(day); 
  var dayString = dayWrapper.format("DD/MM/YYYY H:mm:ss");

  const doc = new Fecha();
  doc.fecha = dayString
  await doc.save();
  
  res.json([{hoy:dayString}])
});


router.get('/getCale', async (req, res, next) => {
 
 const fecha = await Fecha.find();

 res.json([{fechas:fecha}])
});



router.get('/turn/:id', async (req, res, next) => {
  let { id } = req.params;
  const task = await Task.findById(id);
  task.status = !task.status;
  await task.save();
  res.redirect('/');
});


router.get('/edit/:id', async (req, res, next) => {
  const task = await Task.findById(req.params.id);
  console.log(task)
  res.render('edit', { task });
});

router.post('/edit/:id', async (req, res, next) => {
  const { id } = req.params;
  await Task.update({_id: id}, req.body);
  res.redirect('/');
});

router.get('/delete/:id', async (req, res, next) => {
  let { id } = req.params;
  await Task.remove({_id: id});
  res.redirect('/');
});


module.exports = router;
