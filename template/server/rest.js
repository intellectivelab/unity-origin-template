const crypto = require('crypto');

const configApi = require("./api/configApi");
const casesApi = require("./api/casesApi");
const contentApi = require("./api/contentApi");
const foldersApi = require("./api/foldersApi");
const usersApi = require("./api/usersApi");
const selectorsApi = require("./api/selectorsApi");

const algorithm = 'des-ecb';
const cryptoKey = Buffer.from("d0e276d0144890d3", "hex");

module.exports = function (app) {
	configApi(app);
	usersApi(app);
	contentApi(app);
	casesApi(app);
	foldersApi(app);
	selectorsApi(app);

	app.get('/api/data/export', function (req, res) {
		const file = `${__dirname}/export/export.csv`;

		res.download(file);
	});

	app.post('/api/gateway/link/generate/:resourceName/:resourceType/:resourceId', (req, res) => {

		let inputData = req.params.resourceName + '/' + req.params.resourceType
			+ '/' + req.params.resourceId;
		if (req.body.users && req.body.users.length > 0) {
			inputData += '&users=' + req.body.users;
		}
		console.log("makeLink inputData: ", inputData);

		if (Math.random() > 0.8) {
			res.status(500).send("Unexpected error has occurred.");
			return;
		}

		const cipher = crypto.createCipheriv(algorithm, cryptoKey, null);
		let encrypted = cipher.update(inputData, 'utf8', 'hex');
		encrypted += cipher.final('hex');

		res.send({
			content: req.protocol + '://' + req.get('host') + "/api/shared/open?hash=" + encrypted
		});
	});

	app.get('/api/shared/open', (req, res) => {
		console.log("open link");

		const decipher = crypto.createDecipheriv(algorithm, cryptoKey, null);
		let decrypted = decipher.update(req.query.hash, 'hex', 'utf8');
		decrypted += decipher.final('utf8');
		console.log("Decrypted link: ", decrypted);

		const context = {
			resourceName: "cases",
			resourceLink: "./api/data/" + decrypted
		};
		const base64Context = Buffer.from(JSON.stringify(context)).toString("base64");

		res.redirect('/?p=resourceView&context=' + base64Context);
	});

	app.post('/api/validate/zipCode', (req, res) => {
		const {value = ''} = req.body;

		const error = value !== null && value.startsWith('0');
		const errorMsg = error ? 'The specified ZIP code does not exist' : undefined;

		setTimeout(() => {
			res.send({error, errorMsg});
		}, 1000);
	});

};
