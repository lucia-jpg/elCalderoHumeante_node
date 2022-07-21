var express = require('express');
var router = express.Router();
var promocionesModel = require('../models/promocionesModel');

router.get('/', async function(req, res, next) {

  var promociones = await promocionesModel.getPromociones();
    res.render('promociones',{
      isNosotros: true,
      promociones
    }); //view/nosotros.hbs
  });

module.exports = router;
