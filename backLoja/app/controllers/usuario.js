var Usuario = require('../models/usuario');
var Functions = require('../util/functions');

function ClienteController() {
    this.functions = new Functions();

}

ClienteController.prototype.getAll = function(callback) {
    Usuario.find(function (error, clientes) {
        if (error) {
            callback(null, error);
        } else {
            callback(clientes);
        }
    });
};

ClienteController.prototype.insert = function (req, callback) {
    var usuario = new Usuario();
    usuario.nome = req.nome;
    usuario.email = req.email;
    usuario.senha = req.senha;
    
    usuario.save(function (error, usuario) {
        if (error) {
            callback(null, error);
        } else {
            callback(usuario);
        }
    })
}

ClienteController.prototype.login = function(req, callback){

       Usuario.find({ email: req.email, senha: req.senha}, function(error,usuario){

            if(error){
                  callback("Error",error);  
            }else{
                callback(usuario);
            }

       }); 
}


ClienteController.prototype.addAmigo = function(idUser,idAmigoUser, callback){
    Usuario.findById(idUser, function (err, usuario) {
        
        try{
            if(err){
                callback({error: 'Error ao encontrar usuário!'})
            }else{
                if(usuario){
                    usuario.amigos.push(idAmigoUser);
                    usuario.save(function (err) {
                        if(err){
                            callback({error: 'Error ao atualizar!'})
                        }else{
                            callback({success: 'true'})
                        }
                    })
                }else{
                    callback({error: 'Usuário não existe!'})
                }
            }

        }catch(e){

            
            callback({error: "Erro "})
        }
        
	}) 
}

module.exports = ClienteController;
