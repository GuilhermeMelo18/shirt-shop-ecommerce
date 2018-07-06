var express = require('express');
var router = express.Router();


var ClienteController = require('../controllers/usuario');
var clienteController = new ClienteController();

router.route('/').get(function (req, res) {

    clienteController.getAll(function (result, error) {
        if (error) {
            res.json(error);
        } else {
            res.json(result);
        }
    });
});


/*--- EXPORT ROUTER--*/
module.exports = router;