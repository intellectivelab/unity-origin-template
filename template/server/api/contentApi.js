const fs = require('fs');
const R = require("ramda");

const _export = require("../export");

const getTestFile = _export.getTestFile;
const shortHash = _export.shortHash;

const getIsAddon = num => num === 1;

const NO_DELAY = false; // set to true to speed up mock response time;
const respTime = (maxTimeMs = 1000) => NO_DELAY ? 1 : Math.random() * maxTimeMs;

const getContentLinks = (userId, index, isAddon, mimeType, fileName) => {
	const links = {
		"download": {href: "/api/data/content/download/" + userId + "/" + index},
		"view_content": {href: "/api/data/content/view/" + userId + "/" + index},
	};

	if (mimeType !== 'application/msword' || isAddon) {
		return links;
	}

	return {
		...links,
		"open.browser": {href: `https://vkozyr.sharepoint.com/Shared%20Documents/sharepoint/Open%20in%20Office/storybook/${fileName}?d=w9eb8f4109e4f43e5baf71be900f300ed`},
		"open.desktop": {href: `ms-word:ofe|u|https://vkozyr.sharepoint.com/Shared%20Documents/sharepoint/Open%20in%20Office/storybook/${fileName}`},
	};
};

const getContent = (userId, index, isAddon) => {
	const file = getTestFile(userId, index);

	const _links = getContentLinks(userId, index, isAddon, file.contentType, file.fileName);

	return {
		mimeType: file.contentType,
		contentSize: file.contentSize,
		fileName: file.fileName,
		contentIndex: index,
		_links
	};
};

const contentWithLinks = (userId, _getIsAddon = getIsAddon) => {
	let contents = [];

	const num = shortHash(userId, 3);
	const isAddon = _getIsAddon(num);

	if (num > 0) contents.push(getContent(userId, 0, isAddon));
	if (num > 1) contents.push(getContent(userId, 1, isAddon));
	if (num > 2) contents.push(getContent(userId, 2, isAddon));

	const _links = {
		"self": {
			href: "/api/data/details/users/" + userId
		}
	};

	return {
		data: contents,
		_links
	};
};

function suTokenCheck(req) {
	const su_token = req.query['su_token'];
	const numMs = new Date().getTime();

	if (!su_token) {
		// throw new Error("su_token is not provided: " + su_token);
		return;
	}

	if (R.is(String, su_token) && (R.isNil(su_token) || R.isEmpty(su_token))) {
		throw new Error("su_token is invalid: " + su_token);
	}

	const suNum = parseInt(('' + su_token).trim(), 10);

	if (suNum > numMs || suNum < numMs - 3 * 60000) {
		throw new Error("su_token is expired: " + su_token);
	}
}

module.exports = function (app) {
	app.get('/api/data/download/:Id', function (req, res) {
		suTokenCheck(req);

		const testFile = getTestFile(req.params.Id, 0);

		res.setHeader('Content-Type', testFile.contentType);
		res.setHeader('Content-Disposition', 'attachment; filename=' + testFile.fileName);

		fs.createReadStream(__dirname + '/content/' + testFile.fileName).pipe(res);
	});

	app.get('/api/data/view/:Id', function (req, res) {
		suTokenCheck(req);

		const testFile = getTestFile(req.params.Id, 0);

		res.setHeader('Content-Type', testFile.contentType);
		res.setHeader('Content-Disposition', 'inline; filename=' + testFile.fileName);
		fs.createReadStream(__dirname + '/content/' + testFile.fileName).pipe(res);
	});

	app.get('/api/data/contents/:Id', function (req, res) {
		setTimeout(() => {
			res.send(contentWithLinks(req.params.Id));
		}, respTime());
	});

	app.get('/api/data/contents/:Id/addon', function (req, res) {
		setTimeout(() => {
			res.send(contentWithLinks(req.params.Id, num => true));
		}, respTime());
	});

	app.get('/api/data/content/download/:Id/:i', function (req, res) {
		suTokenCheck(req);

		const testFile = getTestFile(req.params.Id, req.params.i);

		res.setHeader('Content-Type', testFile.contentType);
		res.setHeader('Content-Disposition', 'attachment; filename=' + testFile.fileName);
		fs.createReadStream(__dirname + '/content/' + testFile.fileName).pipe(res);
	});

	app.get('/api/data/content/view/:Id/:i', function (req, res) {
		suTokenCheck(req);

		const testFile = getTestFile(req.params.Id, req.params.i);

		res.setHeader('Content-Type', testFile.contentType);
		res.setHeader('Content-Disposition', 'inline; filename=' + testFile.fileName);
		fs.createReadStream(__dirname + '/content/' + testFile.fileName).pipe(res);
	});

	app.get('/public/api/oauth/su_token', function (req, res) {
		const numMs = '' + new Date().getTime();
		console.log("su_token issued: " + numMs);

		res.send(numMs);
	});

};
