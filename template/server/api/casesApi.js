const fs = require('fs');
const R = require("ramda");

const rsql = require("../rsql");

const {sortData} = require("../sorting");
const {selectFacets} = require("../analytics");

const filteringLogic = rsql.filteringLogic;
const TestCondition = rsql.TestCondition;

const {v4: uuidv4} = require('uuid');

const idLens = R.lensProp("id");
const resourceNameLens = R.lensProp("resourceName");
const resourceTypeLens = R.lensProp("resourceType");

const eventIdLens = R.lensProp("eventId");

const workitemNameLens = R.lensProp("workitemName");
const ucmLockedStatusLens = R.lensProp("ucmLockedStatus");

const NO_DELAY = false; // set to true to speed up mock response time;
const respTime = (maxTimeMs = 1000) => NO_DELAY ? 1 : Math.random() * maxTimeMs;

const addCaseLinks = (task) => {
	const _links = {
		self: {
			href: "/api/data/details/casetasks/" + task.id
		},
		view: {
			href: "/api/config/components/casetasksView" + (task.task_id ? task.task_id % 2 : 0)
		},
		copy_link: {
			href: "/api/gateway/link/generate/details/casetasks/" + task.id
		},
		copy: {
			href: "/api/casetasks"
		},
		split: {
			href: "/api/data/casetasks/caseType/" + task.id + "/split"
		},
		reassign: {
			href: "/api/data/casetasks/" + task.id + "/reassign"
		},
		comment: {
			href: "/api/data/details/history"
		},
		history: {
			href: "/api/history/" + task.id + "/query"
		},
		comments: {
			href: "/api/comments/" + task.id + "/query"
		},
		attachments: {
			href: "/api/users/Male/users"
		},
		attach: {
			href: "/api/casetasks/attach"
		}
	};
	// emulate actions allocation
	if (task.task_id % 2) {
		_links.lock = {
			href: "/api/data/casetasks/" + task.id + "/lock"
		};
	} else {
		_links.unlock = {
			href: "/api/data/casetasks/" + task.id + "/unlock"
		};
	}

	return {...task, _links};
};

const addHistoryLinks = (item) => {
	const _links = {
		self: {
			href: "/api/data/details/history/" + item.eventId
		},
	};
	if (item["eventType"] === "USER_COMMENT") {
		_links['view'] = {href: "/api/config/components/commentEditView0"};
		_links['delete'] = {..._links['self']};
	}

	return {id: item["eventId"], ...item, _links};
};

const caseModel = require('../models/caseModel');

const cases = require("../data/cases.js")
	.map(caseTask => R.over(idLens, () => uuidv4(), caseTask))
	.map(caseTask => R.over(workitemNameLens, () => caseTask.task_name, caseTask))
	.map(caseTask => R.over(resourceNameLens, () => 'cases', caseTask))
	.map(caseTask => R.over(resourceTypeLens, () => 'TestCase', caseTask))
	.map(caseTask => R.over(ucmLockedStatusLens, () => Math.floor(Math.random() * 3), caseTask))
	.map(task => addCaseLinks(task));

const casesAsResources = cases.map(({_links, ...otherProps}) => {
	const {self, view} = _links;

	return {
		...otherProps,
		resourceName: 'resources',
		resourceType: 'TestCase',
		_links: {self, view},
	};
});

const history = require("../data/history")
	.map(item => R.over(eventIdLens, () => uuidv4(), item))
	.map(item => addHistoryLinks(item));

const comments = history.filter(item => item.eventType === "USER_COMMENT");

const filterCaseTasks = filteringLogic(cases);
const filterHistory = filteringLogic(history);
const filterComments = filteringLogic(comments);

const filterCaseTasksResourceRecords = filteringLogic(casesAsResources);

const addCaseRecordLinks = record => {
	const _links = {...record._links};
	_links['dispatch'] = {
		href: "/api/data/casetasks/" + record.id + "/dispatch"
	};
	_links['dispatch.Approve'] = {
		href: "/api/data/casetasks/" + record.id + "/dispatch/approve"
	};
	if (record.task_id % 2) {
		_links['dispatch.Reject'] = {
			href: "/api/data/casetasks/" + record.id + "/dispatch/reject"
		};
	} else {
		_links['dispatch.Close'] = {
			href: "/api/data/casetasks/" + record.id + "/dispatch/close"
		};
	}
	// Return actual attachments query link for given Case;
	_links["attachments.2"] = { // 2 = Documents;
		href: "/api/users/" + (record.task_id % 2 === 0 ? "male" : "female") + "/users/"
	};

	return {...record, _links};
};

const updateData = R.curry((id, updater, data) => {
	const condition = TestCondition('id==' + id);
	const filteredData = data.filter(row => condition(row));
	filteredData.forEach(item => updater(item));
});

const deleteData = (data = [], predicate) => {
	const index = data.findIndex(predicate);
	index >= 0 && data.splice(index, 1);
};

module.exports = function (app) {
	app.get('/api/casetasks', function (req, res) {
		setTimeout(() => res.send(caseModel), respTime());
	});

	app.post('/api/casetasks', (req, res) => {
		const record = {id: uuidv4(), ...req.body};

		const {_links, ...fields} = addCaseLinks(record);

		setTimeout(() => res.send({fields, _links}), respTime());
	});

	app.post('/api/cases/list', (req, res) => {
		const {typedIds = []} = req.body;

		const ids = typedIds.map(({id}) => id);

		setTimeout(() => res.send(cases.filter(task => ids.includes(task.id)).map(addCaseRecordLinks)), respTime());
	});

	app.post('/api/casetasks/list', (req, res) => {
		const {typedIds = []} = req.body;

		const ids = typedIds.map(({id}) => id);

		setTimeout(() => res.send(cases.filter(task => ids.includes(task.id)).map(addCaseRecordLinks)), respTime());
	});

	app.post('/api/casetasks/facets/select', function (req, res) {
		let {query, facets = []} = req.body;

		let caseTasks = filterCaseTasks(query);

		setTimeout(() => res.send({facetItems: selectFacets(caseTasks, facets)}), respTime());
	});

	app.post('/api/casetasks/query', (req, res) => {
		const {offset, limit, query, sort} = req.body;

		const caseTasks = filterCaseTasks(query);

		const sortedData = sortData(caseTasks, sort);

		res.send({
			total: caseTasks.length,
			data: sortedData.slice(offset, offset + limit)
		});
	});

	app.post('/api/resources/casetasks/query', (req, res) => {
		const {offset, limit, query, sort} = req.body;

		const resources = filterCaseTasksResourceRecords(query);

		const sortedResources = sortData(resources, sort);

		setTimeout(() => {
			res.send({
				total: resources.length,
				data: sortedResources.slice(offset, offset + limit)
			});
		}, respTime());
	});

	app.get('/api/data/details/casetasks/:dataId', function (req, res) {
		const condition = TestCondition('id==' + req.params.dataId);
		const filteredData = cases.filter(row => condition(row));

		if (filteredData.length > 0) {
			const {_links, ...fields} = addCaseRecordLinks(filteredData[0]);

			setTimeout(() => res.send({fields, _links}), respTime());
		} else {
			res.status(404).send('Sorry cant find ' + req.params.dataId);
		}
	});

	app.get('/api/data/details/history/:dataId', function (req, res) {
		const condition = TestCondition('id==' + req.params.dataId);
		const filteredData = history.filter(row => condition(row));

		if (filteredData.length > 0) {
			const {_links, ...fields} = addCaseRecordLinks(filteredData[0]);

			setTimeout(() => res.send({fields, _links}), respTime());
		} else {
			res.status(404).send('Sorry cant find ' + req.params.dataId);
		}
	});

	app.get('/api/data/details/comments/:dataId', function (req, res) {
		const condition = TestCondition('id==' + req.params.dataId);
		const filteredData = comments.filter(row => condition(row));

		if (filteredData.length > 0) {
			const {_links, ...fields} = addCaseRecordLinks(filteredData[0]);

			setTimeout(() => res.send({fields, _links}), respTime());
		} else {
			res.status(404).send('Sorry cant find ' + req.params.dataId);
		}
	});

	app.put('/api/data/details/casetasks/:dataId', function (req, res) {
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
	app.post('/api/data/details/casetasks/:dataId', function (req, res) {
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

	app.delete('/api/data/details/casetasks/:dataId', function (req, res) {
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

	app.post('/api/data/casetasks/:dataId', function (req, res) {
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

	app.post('/api/data/casetasks/:caseType/:id/split', function (req, res) {
		console.log(req.body);
		setTimeout(() => {
			const foundTask = cases.find(TestCondition('id==' + req.params.id));
			if (!foundTask || foundTask.case_id % 10 === 0)
				res.status(500).send('Server error for Case ' + req.params.id);
			else {
				const {_links, ...oldFields} = foundTask;
				const newFields = {...oldFields, ...req.body.caseData, case_type: req.body.caseType || foundTask.case_type, id: uuidv4()};
				const newCase = addCaseLinks(newFields);
				cases.push(newCase);
				res.send({_links: newCase._links});
			}
		}, respTime());
	});

	app.post('/api/data/casetasks/:id/reassign', function (req, res) {
		res.send({result: "success"});
	});

	app.post('/api/data/casetasks/:id/lock', function (req, res) {
		setTimeout(() => {
			res.send({result: "success"});
		}, respTime(1500));

	});

	app.post('/api/data/casetasks/:id/unlock', function (req, res) {
		setTimeout(() => {
			res.send({result: "success"});
		}, respTime(2000));
	});

	app.post('/api/data/casetasks/:id/dispatch/approve', function (req, res) {
		updateData(req.params.id, item => item['task_status'] = 'Approved', cases);
		res.send({result: "success"});
	});

	app.post('/api/data/casetasks/:id/dispatch/reject', function (req, res) {
		updateData(req.params.id, item => item['task_status'] = 'Rejected', cases);
		res.send({result: "success"});
	});

	app.post('/api/data/casetasks/:id/dispatch/close', function (req, res) {
		deleteData(cases, TestCondition('id==' + req.params.id));
		res.send({result: "success"});
	});

	app.post('/api/data/casetasks/reassign', function (req, res) {
		res.send({result: "success"});
	});

	app.post('/api/data/casetasks/lock', function (req, res) {
		res.send({result: "success"});
	});

	app.post('/api/data/casetasks/unlock', function (req, res) {
		res.send({result: "success"});
	});

	app.post('/api/data/casetasks/dispatch/approve', function (req, res) {
		res.send({result: "success"});
	});

	app.post('/api/data/casetasks/dispatch/reject', function (req, res) {
		res.send({result: "success"});
	});

	app.post('/api/data/casetasks/dispatch/close', function (req, res) {
		res.send({result: "success"});
	});

	app.post('/api/history', (req, res) => {
		const record = {id: uuidv4(), ...req.body};

		const {_links, ...fields} = addHistoryLinks(record);

		setTimeout(() => res.send({fields, _links}), respTime());
	});

	app.post('/api/history/:id/query', (req, res) => {
		const {offset, limit, query, sort} = req.body;

		const history = filterHistory(query);

		const sortedData = sortData(history, sort);

		res.send({
			total: history.length,
			data: sortedData.slice(offset, offset + limit)
		});
	});

	app.post('/api/comments/:id/query', (req, res) => {
		const {offset, limit, query, sort} = req.body;

		const history = filterComments(query);

		const sortedData = sortData(history, sort);

		res.send({
			total: history.length,
			data: sortedData.slice(offset, offset + limit)
		});
	});

	app.post('/api/data/details/history', function (req, res) {
		res.send({result: "success"});
	});

	app.post('/api/casetasks/attach', (req, res) => {
		if (req.is('application/json')) {
			const {docId} = req.body;
			console.log("Attach: docId=", docId);
		} else { // multipart with file;
			const {title} = req.body;
			console.log("Attach: title=", title);
		}
		setTimeout(() => {
			res.send({});
		}, respTime());
	});

	app.delete('/api/casetasks/detach', (req, res) => {
		const {docId} = req.body;
		console.log("Detach: docId=", docId);
		setTimeout(() => {
			res.send({});
		}, respTime());
	});

	app.get('/api/cases/:resourceType/:id', function (req, res) {
		const _condition = TestCondition('id==' + req.params.id);
		const _data = cases.filter(row => _condition(row));

		if (R.isEmpty(_data)) {
			res.status(404).send('Unable to find resource: ' + req.params.id);
			return;
		}

		const {_links, ...fields} = addCaseRecordLinks(_data[0]);

		setTimeout(() => res.send({fields, _links}), respTime());
	});

	app.get('/api/casetasks/:resourceType/:id', function (req, res) {
		const _condition = TestCondition('id==' + req.params.id);
		const _data = cases.filter(row => _condition(row));

		if (R.isEmpty(_data)) {
			res.status(404).send('Unable to find resource: ' + req.params.id);
			return;
		}

		const {_links, ...fields} = addCaseRecordLinks(_data[0]);

		setTimeout(() => res.send({fields, _links}), respTime());
	});

	app.get('/api/resources/:resourceType/:id', function (req, res) {
		const _condition = TestCondition('id==' + req.params.id);
		const _data = cases.filter(row => _condition(row));

		if (R.isEmpty(_data)) {
			res.status(404).send('Unable to find resource: ' + req.params.id);
			return;
		}

		const {_links, ...fields} = addCaseRecordLinks(_data[0]);

		setTimeout(() => res.send({fields, _links}), respTime());
	});

	app.get('/api/workitems/:resourceType/:id', function (req, res) {
		const _condition = TestCondition('id==' + req.params.id);
		const _data = cases.filter(row => _condition(row));

		if (R.isEmpty(_data)) {
			res.status(404).send('Unable to find resource: ' + req.params.id);
			return;
		}

		const {_links, ...fields} = addCaseRecordLinks(_data[0]);

		setTimeout(() => res.send({fields, _links}), respTime());
	});

	app.get('/api/workitems/:id', function (req, res) {
		const condition = TestCondition('id==' + req.params.id);

		const workitems = cases.filter(row => condition(row));

		if (workitems.length > 0) {
			const workitem = workitems[0];

			setTimeout(() => res.send(addCaseRecordLinks(workitem)), respTime());
		} else {
			res.status(404).send('Sorry cant find ' + req.params.id);
		}
	});

};
