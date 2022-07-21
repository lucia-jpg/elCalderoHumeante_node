var pool = require('./bd'); /*llama a la base de datos */

async function getPromociones(){ /*función para traer las novedades - es asincrónico porque no sabemos cuando lo va a a traer */
    var query = 'select * from promociones'; /*EL PEDIDO DE LO QUE QUIERO - se pide como en MySQL con los comandos */
    var rows = await pool.query(query);
    return rows;
}

async function insertPromociones(obj){
    try{
        var query = 'insert into promociones set ?';
        var rows = await pool.query(query,[obj]);
        return rows;

    }catch(error){
        console.log(error);
        throw error;
    }
}

async function deletePromocionesByID(id){
    var query = 'delete from promociones where id= ?';
    var rows = await pool.query(query,[id]);
    return rows;
}

async function getPromocionesByID(id){
var query = 'select * from promociones where id= ?';
var rows = await pool.query(query, [id]);
return rows[0];
}

async function modificarPromocionesByID(obj,id){
    try{
        var query = 'update promociones set ? where id=?'
        var rows = await pool.query(query,[obj, id]);
        return rows;

    }catch(error){
        throw error;
    }
}


module.exports = { getPromociones, insertPromociones, deletePromocionesByID, getPromocionesByID, modificarPromocionesByID }