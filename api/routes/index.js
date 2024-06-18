let express = require("express");
let router = express.Router();

let room_controller = require("../controllers/room_controller");
let error_controller = require("../controllers/error_controller");
let user_controller = require("../controllers/user_controller");
let problem_controller = require("../controllers/problem_controller");

router.get(
	/*
	#swagger.tags = ['Room']
	#swagger.description = 'Récupérer la dernière donnée envoyée'
	*/

	/*
	#swagger.responses[200] = {
		schema: { "$ref": "#/definitions/salles" },
		description: "Récupérer la dernière donnée envoyée" }
	}
	*/

	"/capteurs", 
	room_controller.getLastDataRoom
);

router.post (
	/*
	#swagger.tags = ['Room']
	#swagger.description = 'Ajouter une nouvelle donnée (temperature, luminosité)'
	*/

	/*
	#swagger.responses[201] = {
		schema: { "$ref": "#/definitions/salles" },
		description: "Ajouter les informations dans la base (temperature, luminosité)" }
	}
	*/

	"/capteurs",
	room_controller.postDataRoom
);

router.get(
	/*
	#swagger.tags = ['Error']
	#swagger.description = "Récupérer le nombre d'erreurs"
	*/

	/*
	#swagger.responses[200] = {
		schema: { "$ref": "#/definitions/number_of_error" },
		description: "Récupérer le nombre d'erreurs" }
	}
	*/

	"/erreurs",
	error_controller.getNbError
);

router.get(
	/*
	#swagger.tags = ['User']
	#swagger.description = "Récupéré les données d'un utilisateur"
	*/

	/*
	#swagger.responses[200] = {
		schema: { "$ref": "#/definitions/user" },
		description: "Récupéré les données d'un utilisateur" }
	}
	*/

	"/scan/:personID",
	user_controller.getUser
);

router.post(
	/*
	#swagger.tags = ['User']
	#swagger.description = 'Ajouter un nouvel utilisateur'
	*/

	/*
	#swagger.responses[201] = {
		schema: { "$ref": "#/definitions/user" },
		description: "Ajouter les informations dans la base (temperature, luminosité)" }
	}
	*/

	"/user",
	user_controller.postDataUser
);

router.get(
	/*
	#swagger.tags = ['Problem']
	#swagger.description = 'Récuperer les problèmes signalés par un utilisateur'
	*/

	/*
	#swagger.responses[200] = {
		schema: { "$ref": "#/definitions/problemByPersonID" },
		description: "Récuperer les problèmes signaler par un utilisateur" }
	}
	*/

	"/probleme",
	problem_controller.getProblemsByPersonID
);

router.get(
	/*
	#swagger.tags = ['Problem']
	#swagger.description = 'Récuperer la liste des problèmes signalés'
	*/

	/*
	#swagger.responses[200] = {
		schema: { "$ref": "#/definitions/listProblem" },
		description: "Signaler un nouveau problème" }
	}
	*/

	"/listProbleme",
	problem_controller.getListProblem
);

router.post(
	/*
	#swagger.tags = ['Problem']
	#swagger.description = { "Signaler un nouveau problème" }
	*/

	/*
	#swagger.responses[201] = {
		schema: { "$ref": "#/definitions/problemByPersonID" },
		description: "Signaler un nouveau problème" }
	}
	*/

	"/probleme",
	problem_controller.postProblem
);

router.patch(
	"/gestionProbleme",
	problem_controller.updateProblem
);

router.get(
	"/problemeCurrentMonth",
	problem_controller.problemsMonth
);

router.patch(
	"/commentaireProbleme",
	user_controller.updateCommentaire
)

module.exports = router;