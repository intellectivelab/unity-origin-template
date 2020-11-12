const fs = require('fs');

const R = require("ramda");

const crypto = require('crypto');

const configApi = require("./configApi");
const casesApi = require("./casesApi");
const contentApi = require("./contentApi");
const usersApi = require("./usersApi");

const {v4: uuidv4} = require('uuid');

const selectors = require('./config/selectors');
const countryStateCity = require('./data/countryStateCity');

const idLens = R.lensProp("id");
const labelLens = R.lensProp("label");
const pathLens = R.lensProp("path");
const parentIdLens = R.lensProp("parentId");
const browseLinkLens = R.lensPath(["_links", "self"]);

const algorithm = 'des-ecb';
const key = Buffer.from("d0e276d0144890d3", "hex");

const NO_DELAY = false; // set to true to speed up mock response time;
const respTime = (maxTimeMs = 1000) => NO_DELAY ? 1 : Math.random() * maxTimeMs;

const idMapper = item => ({...R.over(idLens, () => uuidv4(), item), ...item});
const labelMapper = item => ({...R.over(labelLens, () => item.name, item), ...item});

const safeParentPath = R.ifElse(R.endsWith('/'), R.identity, path => R.concat(path, '/'));
const pathMapper = R.curry((path, item) => ({...R.over(pathLens, () => R.concat(safeParentPath(path), item.name), item), ...item}));
const parentIdMapper = R.curry((parentId, item) => ({...R.over(parentIdLens, () => parentId, item), ...item}));
const browseLinkMapper = item => ({...R.over(browseLinkLens, () => ({href: `/api/folders/browse?root=${item.path}`}), item), ...item});
const filterValueMapper = item => ({...R.over(R.lensProp('filterValue'), () => item.path, item), ...item});

const countries = countryStateCity.map((country) => ({name: country.name, value: country.iso2}));
const states = countryStateCity.reduce((acc, country) => (
	country.states
		? Object.entries(country.states)
			.reduce((acc, [state]) => ([...acc, {name: state, value: state}]), acc)
		: ([...acc, {name: country.capital, value: country.capital}])), []);

const statesByCountry = countryStateCity.reduce((acc, country) => (
	Object.assign(acc, {
		[country.iso2]: country.states ? Object.keys(country.states).map(key => ({
				name: key,
				value: key
			}))
			: []
	})
), {});

const treeReducer = (parentPath, parentId) => (acc, _item) => {
	const item = R.compose(
		idMapper, labelMapper, filterValueMapper, browseLinkMapper, pathMapper(parentPath), parentIdMapper(parentId)
	)(_item);

	const {id, path, children = []} = item;
	const traversed = children.reduce(treeReducer(path, id), {});
	return {...acc, [id]: item, ...traversed};
};

const folders = JSON.parse(fs.readFileSync(__dirname + '/data/folders.json')).reduce(treeReducer("/"), {});
const folderEntries = Object.values(folders);

const filterFolders = (folderEntries, lazy, filterPath) => {

	const root = folderEntries.length > 0 && folderEntries[0];

	const withChildren = (item) => {
		return folderEntries.filter(folder => item.id === folder.parentId).map(item => (
			{...item, children: lazy ? [] : withChildren(item)}
		));
	};

	if (!lazy) {
		return {...root, children: withChildren(root)};
	}

	const parentItem = folderEntries.find(item => item.path === filterPath) || root;
	return parentItem && {...R.omit(['parentId'], parentItem), children: withChildren(parentItem)};
};

module.exports = function (app) {
	configApi(app);
	usersApi(app);
	contentApi(app);
	casesApi(app);

	app.get('/api/data/export', function (req, res) {
		const file = `${__dirname}/export/export.csv`;

		res.download(file);
	});

	app.get('/api/selectors/:cName', function (req, res) {
		setTimeout(() => {
			res.send(selectors.find(selector => selector.name === req.params.cName));
		}, 1000);
	});

	app.post('/api/selectors/:selectorId/items', (req, res) => {
		const {offset, limit, search, queryContext = {}} = req.body;

		const selectorId = req.params.selectorId;

		switch (selectorId) {
			case 'country' :
				res.send({
					total: countries.length,
					data: countries
						.filter(country => country.name.includes(search))
						.slice(offset, offset + limit)
				});

				break;
			case 'state' : {
				const country = queryContext.country || queryContext.countryCode;
				const _statesByCountry = country ? statesByCountry[country]
					.filter(state => state.name.includes(search)) : states;
				const data = _statesByCountry.slice(offset, offset + limit);
				res.send({
					total: data.length,
					data
				});

				break;
			}
			default:
				res.send({
					total: 0,
					data: []
				});
		}
	});

	app.get('/api/folders/browse', (req, res) => {

		const {scope, root: path, offset, limit, query, sort, lazy = true} = req.query;

		const result = filterFolders(folderEntries, lazy, path);

		setTimeout(() => {

			res.send(result ? {
				...result,
				total: result.children.length,
				children: result.children.slice(offset, offset + limit)
			} : {});

		}, respTime());
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

		const cipher = crypto.createCipheriv(algorithm, key, null);
		let encrypted = cipher.update(inputData, 'utf8', 'hex');
		encrypted += cipher.final('hex');

		res.send({
			content: req.protocol + '://' + req.get('host') + "/api/shared/open?hash=" + encrypted
		});
	});

	app.get('/api/shared/open', (req, res) => {
		console.log("open link");

		const decipher = crypto.createDecipheriv(algorithm, key, null);
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
