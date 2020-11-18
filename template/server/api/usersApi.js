const fs = require('fs');
const R = require("ramda");

const rsql = require("../rsql");
const _export = require("../export");

const components = require('../config/components');

const {sortData} = require("../sorting");
const {selectFacets} = require("../analytics");

const filteringLogic = rsql.filteringLogic;
const TestCondition = rsql.TestCondition;
const getTestFile = _export.getTestFile;
const shortHash = _export.shortHash;

const getIsAddon = num => num === 1;

const {v4: uuidv4} = require('uuid');

const idLens = R.lensProp("id");
const resourceNameLens = R.lensProp("resourceName");
const resourceTypeLens = R.lensProp("resourceType");
const scopeLens = R.lensProp("scope");
const pathLens = R.lensProp("path");
const titleLens = R.lensProp("title");
const relatedLens = R.lensProp("related");

const NO_DELAY = false; // set to true to speed up mock response time;
const respTime = (maxTimeMs = 1000) => NO_DELAY ? 1 : Math.random() * maxTimeMs;

const folders = Object.values(require("../folders"));

const userModel = require('../models/userModel');
const userList = require("../data/users.js");
const userProps = ['firstName', 'lastName', 'gender', 'email', 'dob', 'age', 'phone'];

const addUserLinks = (user) => {
	const _links = {
		"self": {
			href: "/api/data/details/users/" + user.id
		},
		"download": {
			"href": "/api/data/download/" + user.id
		},
		"view_content": {
			"href": "/api/data/view/" + user.id
		},
		"view": {
			href: "/api/config/components/usersView" + (user.age % 2)
		},
		"contents": {
			href: "/api/data/contents/" + user.id
		},
		"attachments": {
			href: `/api/users/${user.gender}/users`
		},
		"delete": {
			href: "/api/data/details/users/" + user.id
		},
		detach: {
			href: "/api/casetasks/detach"
		}
	};

	if (user.age % 2 === 1) {
		_links["checkin"] = {"href": "/api/data/" + user.id + "/checkin"};
		_links["cancelCheckOut"] = {"href": "/api/data/" + user.id + "/reservation/cancel"};
	} else {
		_links["checkout"] = {"href": "/api/data/" + user.id + "/checkout"};
	}

	const num = shortHash(user.id, 3);
	if (getIsAddon(num)) {
		const file = getTestFile(user.id, 0);
		if (file.contentType === 'application/msword') {
			_links["office.addon"] = "/api/users/" + user.id + "/office";
		}
	}

	const toSelector = (name, value) => ({name: name, value: value});

	const mimeType = [
		'application/xml',
		'application/text',
		'application/octet-stream',
		'application/x-compress',
		'application/pdf',
		'application/msword',
		'application/vnd.ms-excel',
		'application/vnd.ms-powerpoint',
		'audio/xxx',
		'image/tiff'
	];

	return {
		...user,
		country: toSelector(user.countryName, user.countryCode),
		state: Array.isArray(user.state) ? user.state.map(item => toSelector(item, item)) : toSelector(user.state, user.state),
		retire: user.age > 60,
		linkedUser: user.id,
		mimeType: mimeType[Math.floor(Math.random() * mimeType.length)],
		_links
	};
};

const relatedUsers = (cnt = 10, users = userList, props = userProps) => {
	const indices = R.times(() => Math.floor(Math.random() * users.length), cnt);

	return indices.map(ind => users[ind]).map(R.pick(props));
};

const users = userList
	.map(user => R.over(idLens, () => uuidv4(), user))
	.map(user => R.over(titleLens, () => user.fullName, user))
	.map(user => R.over(resourceNameLens, () => 'documents', user))
	.map(user => R.over(resourceTypeLens, () => 'User', user))
	.map(user => R.over(scopeLens, () => 'Major', user))
	.map(user => R.over(pathLens, () => R.view(pathLens, folders[Math.floor(Math.random() * folders.length)]), user))
	.map(user => R.over(relatedLens, () => relatedUsers(R.add(Math.floor(Math.random() * 3), 1))
		.map(related => R.over(idLens, () => uuidv4(), related)), user))
	.map(user => addUserLinks(user));

const usersAsResources = users.map(({_links = {}, ...otherProps}) => {
	const {self, view} = _links;

	return {
		...otherProps,
		resourceName: 'resources',
		resourceType: 'User',
		_links: {self, view},
	};
});

const filterUsers = filteringLogic(users);
const filterUsersAsResources = filteringLogic(usersAsResources);

// add dynamic action links
const withRecordLinks = (typeName, record) => record;

const getUsersByGender = (res, gender, offset, limit, query, sort) => {
	const usersQuery = query ? `gender==${gender}, ${query}` : `gender==${gender}`;
	const users = filterUsers(usersQuery);

	const sortedUsers = sortData(users, sort);

	const data = sortedUsers.slice(offset, offset + limit);
	const eol = offset + limit >= users.length;

	setTimeout(() => {
		res.send({
			total: users.length,
			data,
			eol
		});
	}, respTime());
};

module.exports = function (app) {
	app.get('/api/users', function (req, res) {
		setTimeout(() => res.send(userModel), respTime());
	});

	app.post('/api/users', (req, res) => {
		const record = {id: uuidv4(), ...req.body};

		const {_links, ...fields} = addUserLinks(record);

		setTimeout(() => res.send({fields, _links}), respTime());
	});

	app.post('/api/users/query', (req, res) => {
		const {offset, limit, query, sort} = req.body;

		const users = filterUsers(query);

		const sortedUsers = sortData(users, sort);

		setTimeout(() => {
			res.send({
				total: users.length,
				data: sortedUsers.slice(offset, offset + limit)
			});
		}, respTime());
	});

	app.post('/api/users/:gender/users', (req, res) => {
		const gender = req.params.gender;
		const {offset = 0, limit = 20, query, sort} = req.body;

		getUsersByGender(res, gender, parseInt(offset), parseInt(limit), query, sort);
	});

	app.get('/api/documents/User/:id', function (req, res) {
		const _condition = TestCondition('id==' + req.params.id);
		const _data = users.filter(row => _condition(row));

		if (R.isEmpty(_data)) {
			res.status(404).send('Unable to find resource: ' + req.params.id);
			return;
		}

		const {_links, ...fields} = withRecordLinks(req.params.resourceName, _data[0]);

		setTimeout(() => res.send({fields, _links}), respTime());
	});

	app.get('/api/resources/User/:id', function (req, res) {
		const _condition = TestCondition('id==' + req.params.id);
		const _data = users.filter(row => _condition(row));

		if (R.isEmpty(_data)) {
			res.status(404).send('Unable to find resource: ' + req.params.id);
			return;
		}

		const {_links, ...fields} = withRecordLinks(req.params.resourceName, _data[0]);

		setTimeout(() => res.send({fields, _links}), respTime());
	});

	// Used in loading existing documents for Attach Repository Document action;
	app.get('/api/users/:gender/users', (req, res) => {
		const gender = req.params.gender;
		const {offset = 0, limit = 20, query, sort} = req.query;

		getUsersByGender(res, gender, parseInt(offset), parseInt(limit), query, sort);
	});

	app.post('/api/resources/users/query', (req, res) => {
		const {offset, limit, query, sort} = req.body;

		const resources = filterUsersAsResources(query);

		const sortedResources = sortData(resources, sort);

		setTimeout(() => {
			res.send({
				total: resources.length,
				data: sortedResources.slice(offset, offset + limit)
			});
		}, respTime());
	});

	app.post('/api/documents/list', (req, res) => {
		const {typedIds = []} = req.body;

		const ids = typedIds.map(({id}) => id);

		setTimeout(() => res.send(users.filter(user => ids.includes(user.id))), respTime());
	});

	app.post('/api/users/list', (req, res) => {
		const {typedIds = []} = req.body;

		const ids = typedIds.map(({id}) => id);

		setTimeout(() => res.send(users.filter(user => ids.includes(user.id))), respTime());
	});

	app.post('/api/users/facets/select', function (req, res) {
		let {query, facets = []} = req.body;

		let users = filterUsers(query);

		setTimeout(() => {
			res.send({
				facetItems: selectFacets(users, facets)
			});
		}, respTime());
	});

	app.get('/api/data/details/users/:userId', function (req, res) {
		const condition = TestCondition('id==' + req.params.userId);

		const filteredData = users.filter(row => condition(row));

		if (filteredData.length > 0) {
			const {_links, ...fields} = withRecordLinks(req.params.typeName, filteredData[0]);

			setTimeout(() => res.send({fields, _links}), respTime());
		} else {
			res.status(404).send('Sorry cant find ' + req.params.dataId);
		}
	});

	app.put('/api/data/details/users/:userId', function (req, res) {
		setTimeout(() => {
			if (req.body.fullName === 'error500') {
				res.status(500).send('Server error ');
			} else if (req.body.fullName === 'error400') {
				res.status(400).send('Bad request ');
			} else {
				res.send({result: "success"});
			}
		}, respTime());
	});

	// POST is executed when Details form having file fields is saved;
	app.post('/api/data/details/users/:userId', function (req, res) {
		setTimeout(() => {
			if (req.body.fullName === 'error500') {
				res.status(500).send('Server error ');
			} else if (req.body.fullName === 'error400') {
				res.status(400).send('Bad request ');
			} else {
				res.send({result: "success"});
			}
		}, respTime());
	});

	app.delete('/api/data/details/users/:userId', function (req, res) {
		setTimeout(() => {
			if (req.body.fullName === 'error500') {
				res.status(500).send('Server error ');
			} else if (req.body.fullName === 'error400') {
				res.status(400).send('Bad request ');
			} else {
				res.send({result: "Successfully deleted"});
			}
		}, respTime());
	});

	app.post('/api/data/users/:userId', function (req, res) {
		setTimeout(() => {
			if (req.body.fullName === 'error500') {
				res.status(500).send('Server error ');
			} else if (req.body.fullName === 'error400') {
				res.status(400).send('Bad request ');
			} else {
				res.send({result: "success"});
			}
		}, respTime());
	});

	app.post('/api/data/:id/checkin', function (req, res) {
		res.send({result: "success"});
	});

	app.post('/api/data/:id/checkout', function (req, res) {
		res.send({result: "success"});
	});

	app.post('/api/data/:id/reservation/cancel', function (req, res) {
		res.send({result: "success"});
	});

	app.get('/api/users/:userId/office', (req, res) => {
		setTimeout(() => {
			const testFile = getTestFile(req.params.userId, 0);
			res.send({
				sessionId: 'MDAwMGtLVXQ3NnRNOVRRelpZakU1ZDU1dWJqOmQ2YjY2MGRmLTJlYWEtNGZmZC1hMTY0LTU5NjBhZWRjNzMwNw==',
				original: {title: testFile.fileName, mimeType: testFile.contentType, documentDescriptor: {}}
			});
		}, respTime());
	});

	app.get('/api/config/components/:lookupId/data', function (req, res) {
		const lookupConfig = components[req.params.lookupId];

		const idField = lookupConfig.idField;
		const labelField = lookupConfig.labelField;

		const resources = filterUsersAsResources(idField + '==' + req.query.id);

		setTimeout(() => {
			res.send({
				value: req.query.id,
				name: resources[0][labelField]
			});
		}, respTime());
	});
};
