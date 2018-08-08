var express = require('express');
var router = express.Router();
var Shirt = require('../models/shirt');


var ClienteController = require('../controllers/usuario');
var clienteController = new ClienteController();

var ShirtController = require('../controllers/shirt');
var shirtController = new ShirtController();


router.route('/').get(function (req, res) {

    shirtController.getAll(function (result, error) {
        if (error) {
            res.json(new Shirt());
        } else {
            res.json(result);
        }
    });
});

router.route('/insert').post(function (req, res){
    
    shirtController.insert(req.body, function (result, error) {
        if (result instanceof Error) {
            res.status(500);
            res.json(result.message);
        } else {
            // Salva a Sessão no Usuário     
            // req.session.cliente = result;
            res.json(result);
        }
    });
});


/*--- EXPORT ROUTER--*/
module.exports = router;