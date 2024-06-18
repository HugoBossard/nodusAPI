const ERRORMODEL = require('../models/error_model');

module.exports = {
    async getNbError (req, res) {
        try {
            ERRORMODEL.getNumberError().then(number_of_error => {
                if(number_of_error.warning != undefined && number_of_error.warning != null && number_of_error.warning != ""){
                    res.status(404).send({number_of_error});
                }
                else{
                    res.status(200).send({"nombre_erreur" : number_of_error.nombre_erreur});
                }
            });
        }
        catch ( Error ) {
            res.status(404).send({Error});
        }
    }
}