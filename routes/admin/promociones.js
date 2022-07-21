var express = require('express');
var router = express.Router();
var promocionesModel = require('../../models/promocionesModel');

router.get('/', async function (req, res, next) {
    var promociones = await promocionesModel.getPromociones();
    res.render('admin/promociones', {
        layout: 'admin/layout',
        persona: req.session.nombre,
        promociones
    });
});

router.get('/agregar', (req, res, next) => {
    res.render('admin/agregar', {
        layout: 'admin/layout'
    })
})


router.post('/agregar', async (req, res, next) => {
    //console.log(req.body)
    try {
        if (req.body.titulo != "" && req.body.subtitulo != "" && req.body.cuerpo != "") {
            await promocionesModel.insertPromociones(req.body)
            res.redirect('/admin/promociones')
        } else {
            res.render('admin/agregar', {
                layout: 'admin/layout',
                error: true,
                message: 'Todos los campos son requeridos'
            })

        }

    } catch (error) {
        console.log(error)
        res.render('admin/agregar', {
            layout: 'admin/layout',
            error: true,
            message: 'No se cargó la promoción'

        })
    }
})

/* ELIMINAR LA NOVEDAD  */
router.get('/eliminar/:id', async (req, res, next) => {
    console.log(req.params.id);
    var id = req.params.id;
    await promocionesModel.deletePromocionesByID(id);
    res.redirect('/admin/promociones');
})

/*vista de modificar + los datos de campos para modificar */

router.get('/modificar/:id', async(req, res,next) => {
    var id = req.params.id;
    var promociones = await promocionesModel.getPromocionesByID(id);
    res.render('admin/modificar', {
        layout: 'admin/layout',
        promociones
    })

})

/*actualización de los datos */

router.post('/modificar',async(req,res,next) =>{
    try{
        var obj = {
            titulo:req.body.titulo,
            subtitulo:req.body.subtitulo,
            cuerpo:req.body.cuerpo
        }

        await promocionesModel.modificarPromocionesByID(obj, req.body.id);
        res.redirect('/admin/promociones');

    }catch(error){
        console.log(error)
        res.render('admin/modificar',{
            layout:'admin/layout',
            error:true,
            message:'No se modificó la promoción'
        })

    }
})

module.exports = router;