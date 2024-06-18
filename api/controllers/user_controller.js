const USERMODEL = require('../models/user_model');

function retrait_espaces(text) {
    let new_text = "";

    for (i = 0; i < text.length; i ++) {
        if (i < text.length + 1) {
            if (text.substring(i,i+1) != " ") {
                new_text += text.substring(i,i+1);
            }
        }
    }

    return new_text;
}

module.exports = {
    retrait_espaces(text) {
        let new_text = "";
    
        for (i = 0; i < text.length; i ++) {
            if (i < text.length + 1) {
                if (text.substring(i,i+1) != " ") {
                    new_text += text.substring(i,i+1);
                }
            }
        }
    
        return new_text;
    },

    async postDataUser (req, res) {
        try {
            let personID = retrait_espaces(String(req.body.personID));

            USERMODEL.getUser(personID).then(user => {
                req.body.personID = personID;

                USERMODEL.postDataUser(req.body).then(result => {
                    res.status(201).send({ "user": result });
                });
            }).catch(Error => {
                res.status(422).send({erreur : Error.message});
            });
        }
        catch ( Error ) {
            res.status(422).send({erreur : Error.message});
        }
    },

    async getUser (req, res) {
        try {
            let personID = retrait_espaces(String(req.params.personID));

            USERMODEL.getUser(personID).then(user => {
                res.status(200).send({ "user": user });
            }).catch(Error => {
                res.status(422).send({erreur : Error.message});
            });
        }
        catch ( Error ) {
            res.status(422).send({erreur : Error.message});
        }
    },

    async updateCommentaire (req, res) {
        try {
            let probleme = await USERMODEL.updateCommentaire(req.body);

            let probleme_json = probleme.toJSON();

            res.status(201).send({"probleme": probleme_json});
        }
        catch ( Error ) {
            res.status(422).send({erreur : Error.message});
        }
    }
}