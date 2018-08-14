var express = require('express');
var router = express.Router();
var Shirt = require('../models/shirt');


var ClienteController = require('../controllers/usuario');
var clienteController = new ClienteController();

var ShirtController = require('../controllers/shirt');
var shirtController = new ShirtController();

// Get All Shirts
router.route('/').get(function (req, res) {

    shirtController.getAll(function (result, error) {
        if (error) {
            res.status(404);
            res.json("Without Shirts");
        } else {
            res.json(result);
        }
    });
});

// Get Shirts By user id
router.route('/get-by-user-id/:id').get(function (req, res){
    
    shirtController.getByIdUser(req.params.id, function (result) {
        if (result instanceof Error) {
            res.status(500);
            res.json(result.message);
        } else {    
            res.json(result);
        }
    });
});

// Insert New Shirt
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

// Remove Shirt
router.route('/remove/:id').post(function (req, res){
    
    shirtController.remove(req.params.id, function (result, error) {
        if (result instanceof Error) {
            res.status(500);
            res.json(result.message);
        } else {
            res.json(result);
        }
    });
});

// Add Shirt to Bag Client
router.route('/add-bag-user/:id/:idShirt').post(function (req, res){
    console.log(req.params);
    shirtController.addBagUser(req.params.id, req.params.idShirt, function (result, error) {
        if (result instanceof Error) {
            res.status(500);
            res.json(result.message);
        } else {
            res.json(result);
        }
    });
});

// Get All Shirt Bag By User
router.route('/get-shirt-author/:id').get(function (req, res){
    //console.log(req.params);
    shirtController.getShirtsAuthors(req.params.id, function (result, error) {
        if (result instanceof Error) {
            res.status(500);
            res.json(result.message);
        } else {
            res.json(result);
        }
    });
});

// Likes Shirt
router.route('/likes-shirt/:id').post(function (req, res){

    shirtController.likesShirt(req.params.id, function (result, error) {
        if (result instanceof Error) {
            res.status(500);
            res.json(result.message);
        } else {
            res.status(200);
            res.json("200 - Ok");
        }
    });
});

// List top likes Shirts
router.route('/top-likes-shirt/').get(function (req, res){

    shirtController.topLikesShirts(function (result, error) {
        if (result instanceof Error) {
            res.status(500);
            res.json(result.message);
        } else {
            res.status(200);
            res.json(result);
        }
    });
});


/*--- EXPORT ROUTER--*/
module.exports = router;