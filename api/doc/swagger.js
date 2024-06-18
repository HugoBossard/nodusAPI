const swaggerAutogen = require("swagger-autogen")();

const doc = {
	info: {
		version: "1.0.0",
		title: "Nodus-API",
		description: "Documentation automatique de l'api pour le projet <b>Nodus-API</b>."
	},
	host: "",
	basePath: "/api",
	schemes: [""],
	consumes: ["application/json"],
	produces: ["application/json"],
	tags: [
		{
			"name": "Room"
		},
        {
            "name": "Error"
        },
        {
            "name": "User"
        },
        {
            "name": "Problem"
        }
	],
    definitions: {
		salles: [
				{
					"salle_niorttech": {
						"temperature": "20.9",
						"date_collecte": "2023-03-02T17:51:59.000Z",
						"allume": false
					}
				}
		],
		number_of_error: {
			"nombre_erreur": 0
		},
		number_of_error_warning: {
			"nombre_erreur": 12,
			"warning": "Pas de données reçu depuis au moins 3 envois"
		},
		user: {
			"personID": "04404f3202110ffffff90",
			"nom": "Collignon",
			"prenom": "Antoine",
			"problems": [
				{
					"description": "J'ai trouvé un cable HDMI cassé",
					"dateCreation": "2023-03-01T16:30:39.969Z",
					"_id": "63ff7daf17102a25e76a2267"
				}
			],
			"id": "63ff7d3017102a25e76a2252"
		},
		listProblem: [
			{
				"description": "J'ai trouvé un cable HDMI cassé",
				"dateCreation": "2023-03-01T16:30:39.969Z",
				"_id": "63ff7daf17102a25e76a2267",
				"personID": "04404f3202110ffffff90",
				"person": "Antoine Collignon"
			}
		],
		problemByPersonID: [
			{
				"description": "J'ai trouvé un cable HDMI cassé",
				"dateCreation": "2023-03-01T15:38:16.164Z",
				"_id": "63ff71680dd1bcb41c259bb5"
			}
		]
	}
};

const outputFile = "./api/doc/swagger-output.json";
const endpointsFiles = ["./api/routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
	require("../../index.js");
});