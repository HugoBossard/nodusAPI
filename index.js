const express = require("express");

const ROUTER = require("./api/routes");

const swaggerUI = require("swagger-ui-express");
const swaggerFile = require("./api/doc/swagger-output.json");
const cors = require("cors");

const APP = express();

const PORT = process.env.PORT || 4000;

APP.use(express.json());

let corsOptions= {
	origin:["http://localhost:3000", "http://app-409e923a-1bf4-466c-a744-2c7f732388bc.cleverapps.io"],
	optionsSuccessStatus : 200
};

APP.use(cors(corsOptions));

APP.use("/api", ROUTER);

APP.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));

const SERVER = APP.listen(PORT);
console.log(`Server is listening on PORT ${PORT}`);

module.exports = SERVER;