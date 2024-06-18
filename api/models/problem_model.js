const mongoose = require('../../services/moogosee.service').mongoose;
const Schema = mongoose.Schema;

const PROBLEMSCHEMA = new Schema({
    description: String,
    image: String,
    commentaire: String,
    gestionProbleme: String,
    dateCreation: Date
});

PROBLEMSCHEMA.virtual('id').get(function () {
    return this._id.toHexString();
});

PROBLEMSCHEMA.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => { 
        delete ret._id;
    }
});

const Problem = mongoose.model('problem', PROBLEMSCHEMA);

exports.postProblem = async (problemData) => {
    const problem = new Problem(problemData);

    let problem_json = problem.toJSON();

    delete problem_json._id;

    problem_json.gestionProbleme = "À traiter";

    return problem_json;
}