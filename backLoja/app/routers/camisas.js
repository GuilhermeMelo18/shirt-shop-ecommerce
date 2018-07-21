var express = require('express');
var router = express.Router();
var Shirt = require('../models/shirt');


var ClienteController = require('../controllers/usuario');
var clienteController = new ClienteController();
var Shirt = 

router.route('/').get(function (req, res) {

    clienteController.getAll(function (result, error) {
        if (error) {
            res.json(new Shirt());
        } else {
            res.json(result);
        }
    });
});


/*--- EXPORT ROUTER--*/
module.exports = router;