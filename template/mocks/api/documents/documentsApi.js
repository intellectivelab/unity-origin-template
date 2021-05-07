const R = require("ramda");

const _export = require('./utils/export');

const unityApiMocks = require("@intellective/unity-api-mocks");

const {rsql, sort: sorting} = unityApiMocks.utils;

const {sortData} = sorting;

const TestCondition = rsql.TestCondition;
const getTestFile = _export.getTestFile;

const {v4: uuidv4} = require('uuid');

const {respTime} = require("../../utils");

const docs = require("./data/data");
const decorator = require("./utils/decorator");
const docModel = require('./model/model');

const DocClassName = docModel.name;

module.exports = function (app, config = require("../../config"), ...args) {
	const {documents, filterAs, transform, versions} = decorator(docs, ...args);

	// add dynamic action links
	const withDynamicActionLinks = (typeName, record) => record;

	app.get('/api/documents', function (req, res) {
		setTimeout(() => res.send(docModel), respTime());
	});

	app.post('/api/documents', (req, res) => {
		const record = {id: uuidv4(), ...req.body};

		const {_links, ...fields} = transform(record);

		setTimeout(() => res.send({fields, _links}), respTime());
	});

	app.post('/api/documents/query', (req, res) => {
		let {offset, limit} = req.body;

		if (req.query.offset && Number(req.query.offset) > 0) {
			offset = Number(req.query.offset);
		}

		if (req.query.limit && Number(req.query.limit) > 0) {
			limit = Number(req.query.limit);
		}

		const {query, sort} = req.body;

		const documents = filterAs(query);

		const sortedDocuments = sortData(documents, sort);

		const _links = {};

		const nextOffset = offset + limit;

		if (nextOffset < documents.length) {
			_links.next = {
				href: `/api/documents/query?offset=${nextOffset}&limit=${limit}`
			};
		}

		setTimeout(() => {
			res.send({
				total: documents.length,
				data: sortedDocuments.slice(offset, nextOffset),
				_links
			});
		}, respTime());
	});

	app.post('/api/documents/list', (req, res) => {
		const {typedIds = []} = req.body;

		const ids = typedIds.map(({id}) => id);

		setTimeout(() => res.send(documents.filter(document => ids.includes(document.id))), respTime(1000));
	});

	app.get('/api/documents/' + DocClassName + '/:docId', function (req, res) {
		const condition = TestCondition('id==' + req.params.docId);

		const filteredData = documents.filter(row => condition(row));

		if (filteredData.length > 0) {

			const {_links, ...fields} = withDynamicActionLinks(req.params.typeName, filteredData[0]);

			setTimeout(() => res.send({fields, fieldsAsNames: R.keys(fields), _links}), respTime());
		} else {
			res.status(404).send('Sorry cant find ' + req.params.docId);
		}
	});

	app.put('/api/documents/' + DocClassName + '/:docId', function (req, res) {
		res.send({result: "success"});
	});

	app.post('/api/documents/' + DocClassName + '/:docId', function (req, res) {
		res.send({result: "success"});
	});

	app.delete('/api/documents/' + DocClassName + '/:docId', function (req, res) {
		res.send({result: "success"});
	});

	app.post('/api/documents/' + DocClassName + '/:docId', function (req, res) {
		res.send({result: "success"});
	});

	app.post('/api/documents/' + DocClassName + '/:docId/checkin', function (req, res) {
		res.send({result: "success"});
	});

	app.post('/api/documents/' + DocClassName + '/:docId/checkout', function (req, res) {
		res.send({result: "success"});
	});

	app.post('/api/documents/' + DocClassName + '/:docId/reservation/cancel', function (req, res) {
		res.send({result: "success"});
	});

	app.put('/api/documents/' + DocClassName + '/:docId/rename', function (req, res) {
		setTimeout(() => {
			res.send({result: "success"});
		}, respTime());
	});

	app.post('/api/documents/' + DocClassName + '/:docId/versions', function (req, res) {
		setTimeout(() => {
			const _condition = TestCondition('id==' + req.params.docId);
			const _data = versions.filter(row => _condition(row));

			if (R.isEmpty(_data)) {
				res.status(404).send('Unable to find document versions: ' + req.params.docId);
				return;
			}

			let data = _data;
			const v = Number(req.params.docId[0]);
			if (v % 2 === 0) {
				data = R.repeat(_data[0], v);
			}

			res.send({
				total: data.length,
				data: data.map((d, ind) => R.mergeLeft({version: `${data.length - ind}.0`})(d))
			});

		}, respTime());
	});

	app.get('/api/documents/' + DocClassName + '/:docId/office', (req, res) => {
		setTimeout(() => {
			const testFile = getTestFile(req.params.docId, 0);

			res.send({
				sessionId: 'MDAwMGtLVXQ3NnRNOVRRelpZakU1ZDU1dWJqOmQ2YjY2MGRmLTJlYWEtNGZmZC1hMTY0LTU5NjBhZWRjNzMwNw==',
				original: {title: testFile.fileName, mimeType: testFile.contentType, documentDescriptor: {}}
			});
		}, respTime());
	});
};
