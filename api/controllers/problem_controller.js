const USERMODEL = require('../models/user_model')
const PROBLEMEMODEL = require('../models/problem_model');
const USERCONTROLLER = require('../controllers/user_controller');

module.exports = {
    async postProblem (req, res) {
        try {
            let personID = USERCONTROLLER.retrait_espaces(String(req.body.personID));

            USERMODEL.getUser(personID).then(user => {
                req.body.personID = personID;

                req.body.dateCreation = new Date();

                delete req.body.personID;
                
                PROBLEMEMODEL.postProblem(req.body).then(problem => {
                    user.problems.push(problem);
                    USERMODEL.updateUser(personID, user).then(result => {
                        res.status(201).send({user});
                    });
                })
                .catch(Error => {
                    res.status(422).send({erreur : Error.message});
                });
            })
            .catch(Error => {
                res.status(422).send({erreur : Error.message});
            });
        }
        catch ( Error ) {
            res.status(422).send({erreur : Error.message});
        }
    },

    async getProblemsByPersonID (req, res) {
        try {
            let personID = String(req.body.personID);

            personID = USERCONTROLLER.retrait_espaces(personID);

            USERMODEL.getUser(personID).then(user => {
                let problems = user.problems;

                res.status(200).send({problems});
            });
        }
        catch ( Error ) {
            res.status(422).send({erreur : Error.message});
        }
    },

    async getListProblem (req, res) {
        try {
            let users = await USERMODEL.getAllUser();

            let liste_problems = [];

            users.forEach(user => {
                user.problems.forEach(problem => {
                    let problem_json = problem.toJSON();

                    problem_json.personID = user.personID;
                    problem_json.personLastName = user.nom;
                    problem_json.personFirstName = user.prenom;

                    liste_problems.push(problem_json);
                });
            });

            res.status(200).send({liste_problems});
        }
        catch ( Error ) {
            res.status(422).send({erreur : Error.message});
        }
    },

    async updateProblem (req, res) {
        try {
            let probleme = await USERMODEL.updateProblem(req.body);

            let probleme_json = probleme.toJSON();

            res.status(201).send({"probleme": probleme_json});
        }
        catch ( Error ) {
            res.status(422).send({erreur : Error.message});
        }
    },

    async problemsMonth (req, res) {
        try {
            USERMODEL.problemMonth().then(problems => {
                res.status(200).send({ problems });
            });
        }
        catch ( Error ) {
            res.status(422).send({erreur : Error.message});
        }
    }
}