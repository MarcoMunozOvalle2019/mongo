const express = require('express');
const router = express.Router();
const Task = require('../model/task');
const Fecha = require('../model/date');
const Health = require('../model/healthCheck');
const Historico = require('../model/historico');
const Estado = require('../model/estado');

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


///******************************************************* */
async function intervalFuncPrueba() {
  var http = require('http'); //importing http
  countPrueba++;
  console.log('ticks:',countPrueba);
  if (countPrueba == '55') {
    count = 0;
    clearInterval(this);
  }    


  var options = {
    host: 'mongo2022.herokuapp.com',
    port: 80,
    path: '/healthCheck',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
};
  http.get(options, function(res) {
    res.on('data', function(chunk) {
        try {
            // optional logging... disable after it's working
            console.log("HEROKU RESPONSE: " + chunk);
        } catch (err) {
            console.log(err.message);
        }
    });
}).on('error', function(err) {
    console.log("Error: " + err.message);
});




}
///******************************************************** */


var una = 0
var count = 0;
var countPrueba = 0;
var handle 
var dayString

async function intervalFunc() {
  var moment = require('moment-timezone');
  var day = new Date()
  var dayWrapper = moment(day); 
  dayString = dayWrapper.format("H");

  var day1 = new Date()
  var dayWrapper = moment(day1); 
  var dayString1 = dayWrapper.format("DD/MM/YYYY H:mm:ss");

  const re1='Ciclomex'
  const re2='aradix'
  const re3='escitalopran'
  const re4='losartan'
  const re5='vitamina e'
  const re6='Elcal D'

  

  const filter = { fecha: 'unico' };
  let estado1 = await Estado.findOne(filter);

  //*****ANTES de TOMARSE REMEDIOS */
  if(dayString==='6' && estado1.estado==='0'){
    
    const filter = { fecha: 'unico' };
    const update = { estado: '1' };
    let estado1 = await Estado.findOneAndUpdate(filter, update);

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    (async () => {
      console.log('1');
      await delay(1000);
      console.log('2');
    })();



    const fechas = await Fecha.find();

    //consulta remedio1 si esta envia email
    const myVal1 = fechas.find(function(element) {
      return element.nota === re1;
    });
    if(myVal1?.nota===undefined){
        const doc1 = new Fecha();
        doc1.nota = re1
        doc1.fecha = dayString1
     //   console.log('graba rem1')
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
     //   console.log('graba rem2')
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
    //    console.log('graba rem3')
        await doc3.save();
    }

   //consulta remedio4 si esta envia email
   const myVal4 = fechas.find(function(element) {
    return element.nota === re4;
  });
  if(myVal4?.nota===undefined){
      const doc4 = new Fecha();
      doc4.nota = re4
      doc4.fecha = dayString1
    //  console.log('graba rem4')
      await doc4.save();
  }

   //consulta remedio5 si esta envia email
   const myVal5 = fechas.find(function(element) {
    return element.nota === re5;
  });
  if(myVal5?.nota===undefined){
      const doc5 = new Fecha();
      doc5.nota = re5
      doc5.fecha = dayString1
   //   console.log('graba rem5')
      await doc5.save();
  }

   //consulta remedio6 si esta envia email
   const myVal6 = fechas.find(function(element) {
    return element.nota === re6;
  });
  if(myVal6?.nota===undefined){
      const doc6 = new Fecha();
      doc6.nota = re6
      doc6.fecha = dayString1
    //  console.log('graba rem6')
      await doc6.save();
  }

  count = 0;
  }


  //*****ANTES de TOMARSE REMEDIOS */
 if(dayString==='8' && estado1.estado==='1'){

    const filter = { fecha: 'unico' };
    const update = { estado: '0' };
    let estado1 = await Estado.findOneAndUpdate(filter, update);


    const fechas = await Fecha.find();
    if(fechas.length > 0)
    {
      email(fechas).catch(console.error);
    //  console.log('enviando email',fechas)
    }

    count = 0;
}

  count++;
  console.log('ticks:',count);
  // if (count == '15') {
  //   count = 0;
  //   clearInterval(this);
  // }    
}

if(una===0){
  una=1
  handle=setInterval(intervalFunc, /*20*60**/180000); //cada 20 min
  handle=setInterval(intervalFuncPrueba, 300000); //5min
}



router.get('/play', async (req, res, next) => {
  handle=setInterval(intervalFuncPrueba, 180000); 
  res.send('/play');
})

router.get('/stop', async (req, res, next) => {
  count = 0;
  clearInterval(handle);
  res.send('/play');
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
        to: /*"juanPerez2022@gmx.es",*/ "rdaniela4@gmail.com", 
        subject: "Se han olvidado estos remedios ✔", // Subject line
        text: 'hh', // plain text body
        html:  '<div><table><thead><tr><th>REMEDIO</th><th>FECHA</th></tr></thead><tbody>' + content + '</tbody></table></div>' // html body, // html body
      }).catch(function(error) {
        console.log('fallo:', error);
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
  var moment = require('moment-timezone');
  const fechas = await Fecha.find();

  const filter = { fecha: 'unico' };
  let estado1 = await Estado.findOne(filter);

  var day2 = new Date()
  var dayWrapper2 = moment(day2); 
  var dayString2 = dayWrapper2.format("DD:H:mm:ss");

  res.render('remedios', {fechas,estado1,dayString2});  
});


router.get('/healthCheck', async (req, res, next) => {

  var day12 = new Date()
  var dayWrapper12 = moment(day12); 
  var dayString12 = dayWrapper2.format("DD:H:mm:ss");
  
  const doc14 = new Health();
  doc14.nota = 'ok'
  doc14.fecha = dayString12
  await doc14.save();  

  res.send('Ok')
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

router.get('/deleteRemedio/:id/:nota', async (req, res, next) => {
  let { id, nota } = req.params;

  var moment = require('moment-timezone');
  var day = new Date()
  var dayWrapper = moment(day); 
  var fecs = dayWrapper.format("DD/MM/YYYY H:mm:ss");

  const doc4 = new Historico();
  doc4.nota = nota
  doc4.fecha = fecs
  await doc4.save();  

  await Fecha.remove({_id: id});
  res.redirect('/getCale');
});

module.exports = router;
