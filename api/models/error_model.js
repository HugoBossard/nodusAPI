const mongoose = require('../../services/moogosee.service').mongoose;
const Schema = mongoose.Schema;

const ERRORSCHEMA = new Schema({
    nombre_erreur: Number
});

const Error = mongoose.model('error', ERRORSCHEMA);

exports.initNumberError = async (errorData) => {
    let error = new Error(errorData);
    return error.save();
}

exports.initCondition = async () => {
    let number_of_error = await Error.findOne();
    if (number_of_error == undefined || number_of_error == null || number_of_error == "") {
        this.initNumberError({
            "nombre_erreur": 0
        });
    }
}

this.initCondition();

exports.updateNumberError = async () => {
    try {
        let number_of_error = await Error.findOne();
        let number_of_error_json = number_of_error.toJSON();
        number_of_error_json.nombre_erreur += 1;

        return new Promise((resolve, reject) => {
            Error.findOneAndUpdate({

            }, number_of_error_json)
            .exec( (err, nbError) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(nbError);
                }
            });
        });
    }
    catch ( Error ) {
        return Error
    }
};

exports.getNumberError = async () => {
    try {
        let number_of_error = await Error.findOne();
        let number_of_error_json = number_of_error.toJSON();
        if (number_of_error_json.nombre_erreur >= 3){
            number_of_error_json.warning = "Pas de données reçu depuis au moins 3 envois";
        }

        delete number_of_error_json._id;
        delete number_of_error_json.__v;

        return number_of_error_json;
    }
    catch ( Error ) {
        return Error
    }
}