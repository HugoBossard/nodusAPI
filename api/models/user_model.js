const { date } = require('clever-tools/src/parsers');

const mongoose = require('../../services/moogosee.service').mongoose;
const Schema = mongoose.Schema;

const PROBLEMSCHEMA = new Schema({
    description: String,
    image: String,
    commentaire: String,
    gestionProbleme: String,
    dateCreation: Date
});

const USERSCHEMA = new Schema({
    personID: String,
    nom: String,
    prenom: String,
    problems: [ PROBLEMSCHEMA ]
});

USERSCHEMA.virtual('id').get(function () {
    return this._id.toHexString();
});

USERSCHEMA.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => { 
        delete ret._id;
    }
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

const User = mongoose.model('user', USERSCHEMA);

exports.postDataUser = (userData) => {
    const user = new User(userData);
    return user.save();
}

exports.getUser = async (id) => {
    try {
        const user = await User.findOne({"personID": id});

        if (user == undefined || user == null || user == "") {
            throw new Error("L'utilisateur n'a pas été trouvé.");
        }
        
        let user_json = user.toJSON();

        delete user_json._id; 

        return user_json;
    }
    catch ( Error ) {
        return Error.message;
    }
}

exports.updateUser = async (id, problemData) => {
    try {
        return new Promise((resolve, reject) => {
            User.findOneAndUpdate({
                "personID": id
            }, problemData)
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
        return Error.message;
    }
}

exports.getAllUser = async () => {
    try {
        const users = await User.find();

        return users;
    }
    catch ( Error ) {
        return Error.message;
    }
}

exports.updateProblem = async (body) => {
    try {
        const problemID = String(body.problemID);

        const users = await this.getAllUser();

        for (const user of users) {
            const problemIndex = user.problems.findIndex(problem => String(problem._id) === problemID);
            if (problemIndex !== -1) {
                const problem = user.problems[problemIndex];
                let gestionProbleme = problem.gestionProbleme;
                if (gestionProbleme === "À traiter") {
                    gestionProbleme = "En cours de traitement";
                } else if (gestionProbleme === "En cours de traitement") {
                    gestionProbleme = "Traité";
                }
                problem.gestionProbleme = gestionProbleme;

                const updatedUser = await User.findOneAndUpdate(
                    { personID: user.personID },
                    { $set: { problems: user.problems } },
                    { new: true }
                );
                return updatedUser.problems[problemIndex];
            }
        }
        throw new Error("Il semble qu'il y ait une erreur; vous avez essayé de modifier un user ou un problème qui n'existe pas");
    } catch ( Error ) {
        return Error.message;
    }
}

exports.updateCommentaire = async (body) => {
    try {
        const problemID = String(body.problemID);

        const users = await this.getAllUser();

        for (const user of users) {
            const problemIndex = user.problems.findIndex(problem => String(problem._id) === problemID);
            if (problemIndex !== -1) {
                const problem = user.problems[problemIndex];
                problem.commentaire = String(body.commentaire);

                const updatedUser = await User.findOneAndUpdate(
                    { personID: user.personID },
                    { $set: { problems: user.problems } },
                    { new: true }
                );
                return updatedUser.problems[problemIndex];
            }
        }
        throw new Error("Il semble qu'il y ait une erreur; vous avez essayé de modifier un user ou un problème qui n'existe pas");
    } catch (error) {
        return error;
    }
}

exports.problemMonth = async () => {
    try {
        const users = await this.getAllUser();

        let problems = {};
        let liste_problem = [];

        let currentDate = new Date();

        for (const user of users) {
            let index = -1;

            user.problems.forEach(problem => {
                let problem_json = problem.toJSON();

                let dateCreation = String(new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(problem_json.dateCreation));

                if ( (parseInt(dateCreation.substring(0,2)) - 1 == currentDate.getMonth()) && (parseInt(dateCreation.substring(6,10)) == currentDate.getFullYear())) {
                    let jour = dateCreation.substring(3,5);
                    let condition = {"date": `${jour}/${dateCreation.substring(0,2)}/${currentDate.getFullYear()}`, "nb": problems[`${jour}/${dateCreation.substring(0,2)}/${currentDate.getFullYear()}`]};
                    if ( (problems[`${jour}/${dateCreation.substring(0,2)}/${currentDate.getFullYear()}`] != undefined) || (liste_problem.filter(objet => objet == condition)[0] != undefined) ) {
                        problems[`${jour}/${dateCreation.substring(0,2)}/${currentDate.getFullYear()}`] += 1;
                        liste_problem[index] = {"date": `${jour}/${dateCreation.substring(0,2)}/${currentDate.getFullYear()}`, "nb": problems[`${jour}/${dateCreation.substring(0,2)}/${currentDate.getFullYear()}`]};
                    }
                    else {
                        problems[`${jour}/${dateCreation.substring(0,2)}/${currentDate.getFullYear()}`] = 1;
                        liste_problem.push({"date": `${jour}/${dateCreation.substring(0,2)}/${currentDate.getFullYear()}`, "nb": problems[`${jour}/${dateCreation.substring(0,2)}/${currentDate.getFullYear()}`]});
                        index += 1;
                    }
                }
            });
        }
        
        return liste_problem;
    }
    catch ( Error ) {
        return Error.message;
    }
}