var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

router.get('/', function (req, res, next) {
  res.render('contacto', {
    isContacto: true
  }); //view/nosotros.hbs
});

router.post('/', async function (req, res, next) {
  console.log(req.body)
  var nombre = req.body.nombre;
  var email = req.body.email;
  var comentarios = req.body.comentarios;

  var obj = {
    to: 'lu.puppo.91@gmail.com',
    subject: 'Contacto desde la pagina web',
    html: nombre + " se contactó a través de la web y quiere saber más info a este correo: " + email + ".<br> Su comentario es: " + comentarios + "."
  }

  var transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  var info = await transport.sendMail(obj);

  res.render('contacto', {
    message: 'Mensaje enviado correctamente'
  })

})

// SMTP_HOST = smtp.mailtrap.io
// SMTP_PORT = 2525
// SMTP_USER = f80fbb541e24b7
// SMTP_PASS = 3034fdd44fb52c





module.exports = router;
