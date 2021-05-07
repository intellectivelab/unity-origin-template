const R = require("ramda");
const crypto = require('crypto');

const algorithm = 'des-ecb';
const cryptoKey = Buffer.from("d0e276d0144890d3", "hex");

const unityApiMocks = require("@intellective/unity-api-mocks");

const contentApi = require("./api/documents/contentApi");
const documentsApi = require("./api/documents/documentsApi");
const selectorsApi = require("./api/selectors/selectorsApi");

const domainConfig = require("./config");

const shouldConcat = R.anyPass([R.equals('actions'), R.equals('selectors')]);

const concatValues = (k, l, r) => shouldConcat(k) ? R.concat(l, r) : r

const config = R.mergeDeepWithKey(concatValues, unityApiMocks.defaultConfig, domainConfig);

const documents = require("./api/documents/data/data");

const fileTypes = R.compose(R.uniq, R.pluck('fileType'))(documents);
const users = R.compose(R.take(20), R.pluck('modifiedBy'))(documents);

module.exports = function (app) {
	unityApiMocks.configApi(app, config);
	unityApiMocks.casesApi(app, config);
	unityApiMocks.foldersApi(app, config);
	unityApiMocks.usersApi(app, config);
	unityApiMocks.userSettings(app, config);

	//register domain API
	const data = {users, fileTypes};

	documentsApi(app, config, data);
	contentApi(app, config, data);
	selectorsApi(app, config, data);

	app.get('/api/data/export', function (req, res) {
		const file = `${__dirname}/export/export.csv`;

		res.download(file);
	});

	app.post('/api/gateway/link/generate/:resourceName/:resourceType/:resourceId', (req, res) => {

		let inputData = req.params.resourceName + '/' + req.params.resourceType + '/' + req.params.resourceId;

		if (req.body.users && req.body.users.length > 0) {
			inputData += '&users=' + req.body.users;
		}

		const cipher = crypto.createCipheriv(algorithm, cryptoKey, null);
		let encrypted = cipher.update(inputData, 'utf8', 'hex');
		encrypted += cipher.final('hex');

		res.send({
			context: "",
			path: "/api/shared/open?hash=" + encrypted
		});
	});

};
