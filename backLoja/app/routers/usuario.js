var express = require('express');
var router = express.Router();
var Usuario = require('../models/usuario');

var ClienteController = require('../controllers/usuario');
var clienteController = new ClienteController();


router.route('/').get(function (req, res) {

    
    clienteController.getAll(function (usuarios, error) {
        if (error) {
            res.status(404);
            res.send(error);
        } else {
            res.json(usuarios);
        }
    });
});


router.route('/insert').post(function (req, res) {
    
    clienteController.insert(req.body, function (result, error) {
        if (error) {
            res.status(404);
            res.send(error);
        } else {
            res.json(result);
        }

    });
});

router.route('/addUser/:id/:idAmigo').get(function (req, res) {

    clienteController.addAmigo(req.params.id, req.params.idAmigo, function (usuario, error) {
        if (error) {
            res.json(error);
        } else {
            res.json(usuario);
        }
    });
});


router.route('/login').post(function(req, res){

    clienteController.login(req.body, function(usuario, error){
        if (error) {
            res.json(error);
        } else {  
            res.json(usuario);
            console.log(usuario);
        }
    });

});
/*--- END ROTAS ALERTMEDICINES--*/
module.exports = router;