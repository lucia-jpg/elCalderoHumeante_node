var express = require('express');
var router = express.Router();
var usuariosModel = require('./../../models/usuariosModel');

router.get('/', function(req,res,next){
    res.render('admin/login', {
        layout:'admin/layout'
    });
});

router.get('/logout', function(req,res,next){
    req.session.destroy(); //destruye el id, nombre...todo
    res.render('admin/login',{
        layout:'admin/layout'
    })
})

router.post('/', async function(req,res,next){

try{
    console.log(req.body);
    var usuario = req.body.usuario;
    var password = req.body.password;


    var data = await usuariosModel.getUserAndPassword(usuario,password);
    // var data = select * from usuarios where usuario = 'falvia' and password = md5(1234)
    //columna id, usuario, password

    if(data != undefined){
        req.session.id_usuario = data.id; //1
        req.session.nombre = data.usuario; //lucia
    res.redirect('/admin/promociones')
 } else{
    res.render('admin/login',{
        layout:'admin/layout',
        error:true
    })
}

}catch(error){
    console.log(error)
}

});

module.exports = router;
