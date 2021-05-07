const R = require("ramda");

const _export = require('./export');

const unityApiMocks = require("@intellective/unity-api-mocks");

const {rsql} = unityApiMocks.utils;

const filteringLogic = rsql.filteringLogic;

const getTestFile = _export.getTestFile;
const shortHash = _export.shortHash;

const getIsAddon = num => num === 1;

const resourceNameLens = R.lensProp("resourceName");
const resourceTypeLens = R.lensProp("resourceType");
const scopeLens = R.lensProp("scope");

const documentClass = require("../model/model").name;

const getOpenInOfficeLinks = R.cond([
	[R.propEq('fileType', "application/msword"), R.always(
		{
			"open.browser": {href: `https://vegaecm2com.sharepoint.com/productmanagement/Shared%20Documents/U4SP/ClaimLetter.doc?d=w4c2953499285484cb1c6c8da61825ed2`},
			"open.desktop": {href: `ms-word:ofe|u|https://vegaecm2com.sharepoint.com/productmanagement/Shared%20Documents/U4SP/ClaimLetter.doc`}
		}
	)],
	[R.propEq('fileType', "application/vnd.ms-excel"), R.always(
		{
			"open.browser": {href: `https://vegaecm2com.sharepoint.com/productmanagement/Shared%20Documents/U4SP/Request%20for%20Proposal.xlsx?d=wbd6559337f364793b91795d51232dbaa`},
			"open.desktop": {href: `ms-excel:ofe|u|https://vegaecm2com.sharepoint.com/productmanagement/Shared%20Documents/U4SP/Request%20for%20Proposal.xlsx`}
		}
	)],
	[R.propEq('fileType', "application/vnd.ms-powerpoint"), R.always(
		{
			"open.browser": {href: `https://vegaecm2com.sharepoint.com/productmanagement/Shared%20Documents/U4SP/This%20is%20a%20Request%20for%20a%20New%20Proposal.pptx?d=w8f9802c8dbce4240b6bf7ef66223368a`},
			"open.desktop": {href: `ms-powerpoint:ofe|u|https://vegaecm2com.sharepoint.com/productmanagement/Shared%20Documents/U4SP/This%20is%20a%20Request%20for%20a%20New%20Proposal.pptx`}
		}
	)],
	[R.T, R.always({})]
]);

const decorateWithLinks = (document) => {
	const _links = {
		"self": {
			href: "/api/documents/" + documentClass + "/" + document.id
		},
		"view": {
			href: "/api/config/components/documentOpenView"
		},
		"contents": {
			href: "/api/documents/" + documentClass + "/" + document.id + "/contents"
		},
		"versions": {
			href: "/api/documents/" + documentClass + "/" + document.id + "/versions"
		},
		"copy_link": {
			href: "/api/gateway/link/generate/documents/" + documentClass + "/" + document.id
		},
		"download": {
			"href": "/api/documents/" + documentClass + "/" + document.id + "/download"
		},
		"view_content": {
			"href": "/api/documents/" + documentClass + "/" + document.id + "/view_content"
		},
		"rename": {
			href: "/api/documents/" + documentClass + "/" + document.id + "/rename"
		},
	};

	if (Number(document.id[0]) % 2 === 1) {
		_links["checkin"] = {"href": "/api/documents/" + documentClass + "/" + document.id + "/checkin"};
		_links["cancelCheckOut"] = {"href": "/api/documents/" + documentClass + "/" + document.id + "/reservation/cancel"};
	} else {
		_links["checkout"] = {"href": "/api/documents/" + documentClass + "/" + +document.id + "/checkout"};
	}

	const num = shortHash(document.id, 3);

	if (getIsAddon(num)) {
		const file = getTestFile(document.id, 0);

		if (file.contentType === 'application/msword') {
			_links["office.addon"] = "/api/documents/" + documentClass + "/" + document.id + "/office";
		}
	}

	return {
		...document,
		_links: R.mergeRight(_links, getOpenInOfficeLinks(document)),
		content: document.content + document.title,
		mimeType: document.fileType
	};
};

module.exports = function (docs, context, transformer = R.identity) {
	const documents = docs
		.map(document => R.over(resourceNameLens, () => 'documents', document))
		.map(document => R.over(resourceTypeLens, () => documentClass, document))
		.map(document => R.over(scopeLens, () => 'Major', document))
		.map(R.compose(transformer, decorateWithLinks));

	const versions = documents.map(({_links = {}, ...otherProps}) => ({
		...otherProps,
		_links: R.pick(["self", "download", "view"], _links)
	}));

	return {
		documents,
		versions,
		filterAs: filteringLogic(documents),
		transform: R.compose(transformer, decorateWithLinks)
	};
}
