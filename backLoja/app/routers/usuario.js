var express = require('express');
var router = express.Router();
var User = require('../models/usuario');

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

router.route('/get-by-id/:id').get(function (req, res) {

    
    clienteController.getById(req.params.id, function (result, error) {
        if (result instanceof Error) {
            res.status(404)
            res.json(result.message);
        } else {
            res.json(result);
        }
    });
});

router.route('/insert').post(function (req, res){
    
    clienteController.insert(req.body, function (result, error) {
        if (result instanceof Error) {
            res.status(500);
            res.json(result.message);
        } else {
            res.json(result);
        }
    });
});

router.route('/update/:id').post(function (req, res) {

    clienteController.update(req.params.id, req.body, function (result, error) {
        if (result instanceof Error) {
            res.status(404)
            res.json(result.message);
        } else {
            res.json(result);
        }
    });
});

router.route('/remove/:id').post(function (req, res) {

    clienteController.remove(req.params.id, function (result, error) {
        if (result instanceof Error) {
            res.status(404)
            res.json(result.message);
        } else {
            res.json(result);
        }
    });
});

router.route('/login').post(function(req, res){

    clienteController.login(req.body, function(result, error){
        if (result instanceof Error) {
            res.status(404)
            res.json(result.message);
        } else {  
            res.json(result);
        }
    });

});

router.route('/login-facebook').post(function(req, res){

    clienteController.loginFacebook(req.body, function(result, error){
        if (result instanceof Error) {
            res.status(404)
            res.json(result.message);
        } else {  
            res.json(result);
        }
    });

});

/*--- EXPORT ROUTER--*/
module.exports = router;