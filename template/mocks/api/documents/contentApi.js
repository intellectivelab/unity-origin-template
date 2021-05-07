const fs = require('fs');
const R = require("ramda");

const _export = require('./utils/export');

const {respTime} = require("../../utils");

const getTestFile = _export.getTestFile;

const docModel = require('./model/model');

const DocClassName = docModel.name;

const assignContentLinks = (documentId, index, mimeType) => {
	const links = {
		"download": {href: "/api/documents/" + DocClassName + "/" + documentId + "/download?contentIndex=" + index},
		"view_content": {href: "/api/documents/" + DocClassName + "/" + documentId + "/view_content?contentIndex=" + index},
	};

	return R.cond([
		[R.equals('application/msword'), R.always({
			...links,
			"open.browser": {href: `https://vegaecm2com.sharepoint.com/productmanagement/Shared%20Documents/U4SP/ClaimLetter.doc?d=w4c2953499285484cb1c6c8da61825ed2`},
			"open.desktop": {href: `ms-word:ofe|u|https://vegaecm2com.sharepoint.com/productmanagement/Shared%20Documents/U4SP/ClaimLetter.doc`}
		})],
		[R.equals('application/vnd.ms-excel'), R.always({
			...links,
			"open.browser": {href: `https://vegaecm2com.sharepoint.com/productmanagement/Shared%20Documents/U4SP/Request%20for%20Proposal.xlsx?d=wbd6559337f364793b91795d51232dbaa`},
			"open.desktop": {href: `ms-excel:ofe|u|https://vegaecm2com.sharepoint.com/productmanagement/Shared%20Documents/U4SP/Request%20for%20Proposal.xlsx`}
		})],
		[R.equals('application/vnd.ms-powerpoint'), R.always({
			...links,
			"open.browser": {href: `https://vegaecm2com.sharepoint.com/productmanagement/Shared%20Documents/U4SP/This%20is%20a%20Request%20for%20a%20New%20Proposal.pptx?d=w8f9802c8dbce4240b6bf7ef66223368a`},
			"open.desktop": {href: `ms-powerpoint:ofe|u|https://vegaecm2com.sharepoint.com/productmanagement/Shared%20Documents/U4SP/This%20is%20a%20Request%20for%20a%20New%20Proposal.pptx`}
		})],
		[R.T, R.always(links)]
	])(mimeType);
};

const getOriginalContent = (documentId, index) => {
	const file = getTestFile(documentId, index);

	const _links = assignContentLinks(documentId, index, file.contentType);

	return {
		mimeType: file.contentType,
		contentSize: file.contentSize,
		fileName: file.fileName,
		contentIndex: index,
		_links
	};
};

const getContentWithDomainLinks = (documentId) => {
	let contents = [];

	contents.push(getOriginalContent(documentId, 0));

	const _links = {
		"self": {
			href: "/api/documents/" + DocClassName + "/" + documentId
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
	app.post('/api/documents/download', function (req, res) {
		suTokenCheck(req);

		const typedIds = req.body || [];

		const ids = typedIds.map(({id}) => id);

		const testFile = getTestFile(ids, 0);

		res.setHeader('Content-Type', testFile.contentType);
		res.setHeader('Content-Disposition', 'attachment; filename=' + testFile.fileName);

		fs.createReadStream(__dirname + '/content/' + testFile.fileName).pipe(res);
	});

	app.get('/api/documents/' + DocClassName + '/:docId/contents', function (req, res) {
		setTimeout(() => {
			res.send(getContentWithDomainLinks(req.params.docId));
		}, respTime());
	});

	app.get('/api/documents/' + DocClassName + '/:docId/download', function (req, res) {
		suTokenCheck(req);

		const testFile = getTestFile(req.params.docId, 0);

		res.setHeader('Content-Type', testFile.contentType);
		res.setHeader('Content-Disposition', 'attachment; filename=' + testFile.fileName);

		fs.createReadStream(__dirname + '/content/' + testFile.fileName).pipe(res);
	});

	app.get('/api/documents/' + DocClassName + '/:docId/view_content', function (req, res) {
		suTokenCheck(req);

		const testFile = getTestFile(req.params.docId, 0);

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
