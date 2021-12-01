const express = require('express');
const router = express.Router();
const Task = require('../model/task');
const Fecha = require('../model/date');

router.get('/', async (req, res) => {
  const tasks = await Task.find();
  //console.log('marco123',tasks)
  res.render('index', {
    tasks
  });
});



router.post('/add', async (req, res, next) => {
  const task = new Task(req.body);
  await task.save();
  res.redirect('/');
});



var count = 0;
var handle 
var anterior=''
var dayString

async function intervalFunc() {
  var moment = require('moment-timezone');
  var day = new Date()
  var dayWrapper = moment(day); 
  dayString = dayWrapper.format("H");

  var day1 = new Date()
  var dayWrapper = moment(day1); 
  var dayString1 = dayWrapper.format("DD/MM/YYYY H:mm:ss");

const re1='farmaco1'
const re2='farmaco2'
const re3='farmaco3'

  if(anterior !== dayString){

    const fechas = await Fecha.find();
    console.log('hh=',fechas)
    if(fechas.length > 0)
    {
      email(fechas).catch(console.error);
      console.log('enviando email',fechas)
    }

    //consulta remedio1 si esta envia email
    const myVal1 = fechas.find(function(element) {
      return element.nota === re1;
    });
    
    if(myVal1?.nota===undefined){
        const doc1 = new Fecha();
        doc1.nota = re1
        doc1.fecha = dayString1
        console.log('graba rem1')
        await doc1.save();
    }

    //consulta remedio2 si esta envia email
    const myVal2 = fechas.find(function(element) {
      return element.nota === re2;
    });
    if(myVal2?.nota===undefined){
        const doc2 = new Fecha();
        doc2.nota = re2
        doc2.fecha = dayString1
        console.log('graba rem2')
        await doc2.save();
    }

   //consulta remedio3 si esta envia email
    const myVal3 = fechas.find(function(element) {
      return element.nota === re3;
    });
    if(myVal3?.nota===undefined){
        const doc3 = new Fecha();
        doc3.nota = re3
        doc3.fecha = dayString1
        console.log('graba rem3')
        await doc3.save();
    }
    count = 0;
    anterior=dayString
  }

  count++;
  //console.log('fecha!',/*count+':'+dayString+':'+*/fechas);
  console.log('ticks:',count);

  // if (count == '15') {
  //   count = 0;
  //   clearInterval(this);
  // }  
  
}




router.get('/play', async (req, res, next) => {
  handle=setInterval(intervalFunc, 10*60*1000); //cada 10 min
  //res.redirect('/play');
})
router.get('/stop', async (req, res, next) => {
  count = 0;
  clearInterval(handle);
  //res.redirect('/play');
})


//****** funcion envia email */

const nodemailer = require("nodemailer");

async function email(fechas) {
      let testAccount = await nodemailer.createTestAccount();

      let transporter = nodemailer.createTransport({
        host: 'mail.gmx.com',
        port: 587,
        tls: {
            ciphers:'SSLv3',
            rejectUnauthorized: false
        },
        debug:true,
            auth: {
            user: 'juanPerez2022@gmx.es',
            pass: 'juanitoperez2022'
        }    
      });

      var content = fechas.reduce(function(a, b) {
        return a + '<tr><td>' + b.nota + '</a></td><td>' + b.fecha + '</td><td>' ;
      }, '');

      // var content = fechas.map((m)=>{
      //   return '<tr><td>' + m.nota + '</a></td><td>' + m.fecha + '</td><td>' 
      // })


      console.log('email=',content)
      //send mail with defined transport object
      let info = await transporter.sendMail({
        from: "Recordatorio pastillero 👻juanPerez2022@gmx.es", // sender address
        to: "juanPerez2022@gmx.es", // list of receivers
        subject: "Recuerda ✔", // Subject line
        text: 'hh', // plain text body
        html:  '<div><table><thead><tr><th>REMEDIO</th><th>FECHA</th></tr></thead><tbody>' + content + '</tbody></table></div>' // html body, // html body
      });
}



//*******fin funcion envia email */

router.post('/cale', async (req, res, next) => {
   var moment = require('moment-timezone');
  var day = new Date()
  var dayWrapper = moment(day); 
  var dayString = dayWrapper.format("DD/MM/YYYY H:mm:ss");

  const doc = new Fecha();
  //console.log('body',req.body)
  doc.nota = req.body.mensa
  doc.fecha = dayString
  await doc.save();
  
  //res.json([{hoy:dayString}])
  res.redirect('/getCale');
});



router.get('/getCale', async (req, res, next) => {
 
 const fechas = await Fecha.find();

//const tasks = await Task.find();
  //console.log('marco123',fechas)



//***** enviandop emai*/

"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main() {
      // Generate test SMTP service account from ethereal.email
      // Only needed if you don't have a real mail account for testing
      let testAccount = await nodemailer.createTestAccount();

      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: 'mail.gmx.com',
        port: 587,
        tls: {
            ciphers:'SSLv3',
            rejectUnauthorized: false
        },
        debug:true,
            auth: {
            user: 'juanPerez2022@gmx.es',
            pass: 'juanitoperez2022'
        }    
      });

//**** */
// const hh=`Hola olvidaste. ${esto}!`
// console.log('kkkkk',hh)
 var content = fechas.reduce(function(a, b) {
  return a + '<tr><td>' + b.nota + '</a></td><td>' + b.fecha + '</td><td>' ;
}, '');
//console.log(content);
//**** */

      //send mail with defined transport object
      // let info = await transporter.sendMail({
      //   from: "Recordatorio pastillero 👻juanPerez2022@gmx.es", // sender address
      //   to: "juanPerez2022@gmx.es", // list of receivers
      //   subject: "Recuerda ✔", // Subject line
      //   text: 'hh', // plain text body
      //   html:  '<div><table><thead><tr><th>REMEDIO</th><th>FECHA</th></tr></thead><tbody>' + content + '</tbody></table></div>' // html body, // html body
      // });

      //console.log("Message sent: %s", info.messageId);
      //console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

main().catch(console.error);

//***** fin envia correo */  





  res.render('remedios', {fechas});  
// res.json([{fechas:fecha}])
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
  //console.log(task)
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

router.get('/deleteRemedio/:id', async (req, res, next) => {
  let { id } = req.params;
  await Fecha.remove({_id: id});
  res.redirect('/getCale');
});

module.exports = router;
