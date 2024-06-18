const ROOMMODEL = require('../models/room_model');
const ERRORMODEL = require('../models/error_model');

module.exports = {
    async postDataRoom (req, res) {
        try {
            let luminosity = parseInt(req.body.salle_niorttech.luminosite);
            let temperature = parseFloat(req.body.salle_niorttech.temperature);
            let collect_date = Date(req.body.salle_niorttech.date_collecte);

            if(luminosity > ''){
                req.body.luminosite = luminosity;
            }else{
                throw new Error('La valeur luminosité incorrect ou Null');
            }
            if(temperature > ''){
                req.body.temperature = temperature;
            }else{
                throw new Error('La valeur temperature incorrect ou Null');
            }
            if(collect_date > ''){
                req.body.date_collecte = collect_date;
            }else{
                throw new Error('La valeur collect_date incorrect ou Null');
            }


            ROOMMODEL.postDataRoom(req.body)
            .then((result) => {
                res.status(201).send({ "salle_niorttech": result });
            }).catch(Error => {
                ERRORMODEL.updateNumberError();
                res.status(422).send({erreur : Error.message});
            });
        }
        catch ( Error ) {
            ERRORMODEL.updateNumberError();
            res.status(422).send({erreur : Error.message});
        }
    },

    async getLastDataRoom(req, res){
        try{
            ROOMMODEL.getLastDataRoom()
            .then((result) => {
                res.status(200).send({
                    "salles": [
                        { "salle_niorttech": result }
                    ]
                });
            }).catch(Error => {
                res.status(422).send({erreur : Error.message});
            });
        }
        catch ( Error ) {
            res.status(422).send({erreur : Error.message});
        }
        
    }
}